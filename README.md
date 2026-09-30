# Olimpiadas Escolares — School Olympics Platform

## Vision

A web platform to manage and showcase a school olympics week (Monday to Friday).
The central goal is a live **overall leaderboard ("campeon de campeones")** that
aggregates points across all disciplines, plus dedicated views per discipline,
conflict-free scheduling, and role-based access (public vs admin).

## Overall Leaderboard — Campeon de Campeones

- Single general standings table aggregating points from every discipline.
- Points system is consistent across team and individual events.
- Tie-break rules are documented and applied transparently.
- Live updates as results are entered by admins.

## Disciplines

### Team sports

- **Futbol (soccer)** — group-stage + knockout bracket.
- **Basquet (basketball)** — group-stage + knockout bracket.
- **Voley (volleyball)** — group-stage + knockout bracket.

### Individual events

- **Salto alto (high jump)** — best-mark ranking.
- **Salto largo (long jump)** — best-mark ranking.
- **Posta (relay race)** — timed heats + final.
- **Ajedrez unisex (chess, mixed)** — Swiss or round-robin standings.

Each discipline has its own standings, fixtures/results, and contributes
points to the overall leaderboard.

## Schedule — Mon–Fri, No Conflicts

- One weekly calendar view: **Monday to Friday**.
- No overlapping matches/events for the same team or venue.
- Venue and referee assignments visible per event.
- Filters by day, discipline, and team.

## Panels — Public vs Admin

- **Public panel (no login):** leaderboard, fixtures, results, schedule,
  discipline pages. Read-only, mobile-friendly.
- **Admin panel (authenticated):** create/edit teams, athletes, fixtures,
  results, schedule entries; publish/unpublish; manage points and tie-breaks.
- Auth and row-level security enforced via Supabase Auth + RLS.

## Database — Supabase

- **Supabase (Postgres)** as the primary database.
- Tables (planned): teams, athletes, disciplines, fixtures, results,
  standings cache, users/roles.
- Supabase Auth for admin login; RLS policies separate public read from
  admin write.
- Realtime subscriptions for live leaderboard updates.

## Design Direction

- Minimalist, formal, sober aesthetic. No neon colors, no playful gradients.
- Straight corners (no pill radii); restrained palette and typography.
- Priority on readability: tables, schedules, and standings first.

## Current Status

Repo initialized with `README.md` + `.gitignore` only. React + Vite scaffold
not yet created.
