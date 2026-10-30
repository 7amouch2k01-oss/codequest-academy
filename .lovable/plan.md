# Coding School — Build Plan

## What we're building
An online school teaching Python, C, C++ and HTML from zero to expert, with a strict, game-like path.

## Learning path (per language)
```text
Level 1 Beginner -> Level 2 Intermediate -> Level 3 Advanced -> Level 4 Expert
Each level = units -> short lessons -> quiz + coding challenge -> final level exam -> certificate
```
- Each lesson: short explanation, live code editor, then a quiz and a coding task.
- Strict rules: next lesson stays locked until you score at least 80%. Final exam unlocks the next level. Daily streak goal; missing deadlines breaks the streak.
- AI tutor on every lesson: gives hints (not answers), explains errors in simple words.

## Fun layer
- XP for every lesson, quiz, challenge; player levels and badges.
- Weekly leaderboard (global + per language).
- Daily coding battle: one timed challenge per day, ranked by correctness and speed.
- Certificate page per finished level (shareable).

## Access & money
- Beginner level free for everyone. Higher levels paid (subscription).
- Admin panel: grant full free access to chosen students, manage lessons/quizzes, see progress.

## Pages
Home, Courses, Course map (locked/unlocked path), Lesson, Exam, Daily battle, Leaderboard, Profile (XP, badges, streak, certificates), Pricing, Sign in, Admin.

## Build phases
1. Design, home page, sign-in, course map, lesson page with code editor, quizzes, 80% lock, XP/streaks. Starter lessons for all 4 languages (Beginner level).
2. AI tutor, coding challenges with auto-check, level exams, certificates.
3. Leaderboards, daily battles, badges.
4. Admin panel, payments for advanced levels, free-access grants.

## Technical details
- Lovable Cloud: auth, profiles, roles table (admin), progress, XP, streaks, attempts.
- Code running: Python via Pyodide in browser, HTML via sandboxed iframe preview, C/C++ via a remote compile/run service (Judge0-style) through a server function.
- AI tutor via Lovable AI Gateway, server-side.
- Payments enabled in phase 4 after an eligibility check.
