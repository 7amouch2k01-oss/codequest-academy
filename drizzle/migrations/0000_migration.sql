create type public.app_role as enum ('admin', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Student',
  xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id text not null,
  best_score integer not null default 0,
  passed boolean not null default false,
  attempts integer not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
grant select on public.lesson_progress to authenticated;
grant all on public.lesson_progress to service_role;
alter table public.lesson_progress enable row level security;
create policy "Users read own progress" on public.lesson_progress for select to authenticated using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'Student'));
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Records a quiz attempt. Pass needs 80%+. XP is awarded only on the first pass.
create or replace function public.submit_lesson_attempt(_lesson_id text, _score integer, _xp integer)
returns jsonb language plpgsql security definer set search_path = public
as $$
declare
  uid uuid := auth.uid();
  was_passed boolean;
  now_passed boolean := _score >= 80;
  gained integer := 0;
  p public.profiles;
  today date := (now() at time zone 'utc')::date;
begin
  if uid is null then raise exception 'Not signed in'; end if;
  if _score < 0 or _score > 100 then raise exception 'Invalid score'; end if;

  select passed into was_passed from public.lesson_progress where user_id = uid and lesson_id = _lesson_id;

  insert into public.lesson_progress (user_id, lesson_id, best_score, passed, attempts, completed_at, updated_at)
  values (uid, _lesson_id, _score, now_passed, 1, case when now_passed then now() end, now())
  on conflict (user_id, lesson_id) do update set
    best_score = greatest(public.lesson_progress.best_score, excluded.best_score),
    passed = public.lesson_progress.passed or excluded.passed,
    attempts = public.lesson_progress.attempts + 1,
    completed_at = coalesce(public.lesson_progress.completed_at, excluded.completed_at),
    updated_at = now();

  if now_passed and coalesce(was_passed, false) = false then
    gained := least(greatest(_xp, 0), 200);
  end if;

  select * into p from public.profiles where id = uid;
  if now_passed then
    if p.last_active_date = today then
      null;
    elsif p.last_active_date = today - 1 then
      p.current_streak := p.current_streak + 1;
    else
      p.current_streak := 1;
    end if;
    p.last_active_date := today;
  end if;

  update public.profiles set
    xp = xp + gained,
    current_streak = p.current_streak,
    longest_streak = greatest(longest_streak, p.current_streak),
    last_active_date = p.last_active_date
  where id = uid;

  return jsonb_build_object('passed', now_passed, 'xp_gained', gained, 'streak', p.current_streak);
end; $$;

revoke execute on function public.submit_lesson_attempt(text, integer, integer) from public, anon;
grant execute on function public.submit_lesson_attempt(text, integer, integer) to authenticated;