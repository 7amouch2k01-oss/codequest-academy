// Strict-progression rules for ByteDojo. Pure functions only: no React, no
// storage, no network — so the school's rules can be tested and reused by every
// screen (course map, lesson player, exam).

import type { Language, Lesson, Level } from "./curriculum";
import { PASS_MARK } from "./curriculum";

export type LessonState = "done" | "current" | "open" | "locked";

export interface Attempt {
  score: number;
  date: string; // YYYY-MM-DD
}

export interface LearnerState {
  passedLessons: string[]; // lesson ids passed at >= PASS_MARK
  bestScores: Record<string, number>;
  passedExams: Record<string, number[]>; // language id -> passed level ids
  xp: number;
  streak: number;
  lastActive: string | null;
}

export const EMPTY_STATE: LearnerState = {
  passedLessons: [],
  bestScores: {},
  passedExams: {},
  xp: 0,
  streak: 0,
  lastActive: null,
};

/** A quiz or exam counts as passed at PASS_MARK (80) or above. */
export function isPassing(score: number): boolean {
  return score >= PASS_MARK;
}

/** XP actually awarded for a result: nothing below the pass mark. */
export function xpEarned(score: number, lessonXp: number): number {
  return isPassing(score) ? lessonXp : 0;
}

/**
 * The path is linear: lesson n is open only when every lesson before it was
 * passed. The very first lesson of a free level is always open.
 */
export function lessonStates(lang: Language, state: LearnerState): Record<string, LessonState> {
  const out: Record<string, LessonState> = {};
  let blocked = false;

  for (const level of lang.levels) {
    const examPassed = (state.passedExams[lang.id] ?? []).includes(level.id);
    const levelOpen = level.free || examPassed || level.free === false ? true : false;
    for (const lesson of level.lessons) {
      const done = state.passedLessons.includes(lesson.id);
      if (!levelOpen) {
        out[lesson.id] = "locked";
        continue;
      }
      if (done) {
        out[lesson.id] = "done";
        continue;
      }
      if (blocked) {
        out[lesson.id] = "locked";
        continue;
      }
      blocked = true;
      out[lesson.id] = "current";
    }
  }
  return out;
}

/** The next lesson the learner is allowed to open, or undefined when the path is clear. */
export function currentLesson(lang: Language, state: LearnerState): Lesson | undefined {
  const flat = lang.levels.flatMap((l) => l.lessons);
  return flat.find((l) => !state.passedLessons.includes(l.id));
}

/** A level's final exam unlocks once every lesson of that level is passed. */
export function examUnlocked(level: Level, state: LearnerState): boolean {
  return level.lessons.every((l) => state.passedLessons.includes(l.id));
}

/** The next level is reachable only with the previous level's exam passed. */
export function levelUnlocked(lang: Language, level: Level, state: LearnerState): boolean {
  if (level.free) return true;
  const previous = lang.levels.find((l) => l.id === level.id - 1);
  if (!previous) return true;
  return (state.passedExams[lang.id] ?? []).includes(previous.id);
}

export function examResult(
  level: Level,
  answers: number[],
): { score: number; passed: boolean; correct: number } {
  const correct = level.exam.questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0,
  );
  const score = Math.round((correct / level.exam.questions.length) * 100);
  return { score, passed: isPassing(score), correct };
}

export function quizResult(questions: { answer: number }[], answers: number[]) {
  const correct = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0,
  );
  const score = Math.round((correct / questions.length) * 100);
  return { correct, score, passed: isPassing(score) };
}

/**
 * Streaks count consecutive days. Same-day activity keeps the streak, one
 * missed day breaks it, and a gap of two or more days restarts at 1.
 */
export function nextStreak(lastActive: string | null, today: string): number {
  const DAY = 86_400_000;
  const a = new Date(`${lastActive}T00:00:00Z`).getTime();
  const b = new Date(`${today}T00:00:00Z`).getTime();

  if (!lastActive || Number.isNaN(a) || Number.isNaN(b)) return 1;
  const gap = Math.round((b - a) / DAY);
  if (gap <= 0) return 1; // already trained today
  if (gap === 1) return 2; // yesterday -> keeps the chain alive
  return 1;
}

/** Daily goal progress in percent, clamped to 100. */
export function goalProgress(xpToday: number, goal: number): number {
  if (goal <= 0) return 100;
  return Math.min(100, Math.round((xpToday / goal) * 100));
}

/** Player rank from total XP: every rank costs 500 XP more than the last. */
export function rankFromXp(xp: number): { rank: number; into: number; needed: number } {
  const STEP = 500;
  let rank = 1;
  let spent = 0;
  while (xp >= spent + rank * STEP) {
    spent += rank * STEP;
    rank += 1;
  }
  return { rank, into: xp - spent, needed: rank * STEP };
}
