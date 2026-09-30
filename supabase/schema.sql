-- Supabase schema for Olimpiadas Escolares (v1).
-- Public read access, write restricted to authenticated admins.
-- Run with: supabase db push (or psql against the project).

create extension if not exists "pgcrypto";

-- Courses: each grade section competing in the olympics.
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  grade text not null,
  paralelo text not null,
  color text not null default '#1E3A5F',
  created_at timestamptz not null default now(),
  unique (grade, paralelo)
);

-- Disciplines: team (grupal) or solo (individual) events.
create table if not exists public.disciplines (
  id text primary key,
  nombre text not null,
  tipo text not null check (tipo in ('grupal', 'individual')),
  genero text not null check (genero in ('M', 'F', 'unisex')),
  sede text not null default ''
);

-- Athletes: students enrolled through a course.
create table if not exists public.athletes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  course_id uuid not null references public.courses (id) on delete cascade,
  genero text not null check (genero in ('M', 'F')),
  created_at timestamptz not null default now()
);

-- Entries: course registration per discipline; athlete optional for team events.
create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  discipline_id text not null references public.disciplines (id) on delete cascade,
  athlete_id uuid references public.athletes (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (course_id, discipline_id, athlete_id)
);

-- Fixtures: Monday-Friday calendar slots, no overlapping enforced in app layer.
create table if not exists public.fixtures (
  id uuid primary key default gen_random_uuid(),
  discipline_id text not null references public.disciplines (id) on delete cascade,
  fecha text not null check (fecha in ('Lun', 'Mar', 'Mie', 'Jue', 'Vie')),
  hora time not null,
  sede text not null default '',
  course_a uuid references public.courses (id) on delete set null,
  course_b uuid references public.courses (id) on delete set null,
  created_at timestamptz not null default now(),
  check (course_a is distinct from course_b)
);

-- Results: points per fixture (team) or per entry (individual) with position.
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  fixture_id uuid references public.fixtures (id) on delete cascade,
  entry_id uuid references public.entries (id) on delete cascade,
  puntos integer not null default 0 check (puntos >= 0),
  posicion integer check (posicion >= 1),
  created_at timestamptz not null default now(),
  check (fixture_id is not null or entry_id is not null)
);

-- Overall standings: champion of champions aggregation.
create or replace view public.v_course_totals as
select
  c.id as course_id,
  c.grade,
  c.paralelo,
  coalesce(sum(r.puntos), 0)::integer as total_puntos
from public.courses c
left join public.entries e on e.course_id = c.id
left join public.results r on r.entry_id = e.id
group by c.id, c.grade, c.paralelo
order by total_puntos desc, c.grade asc, c.paralelo asc;

-- Row Level Security: public read, authenticated admin write.
alter table public.courses enable row level security;
alter table public.disciplines enable row level security;
alter table public.athletes enable row level security;
alter table public.entries enable row level security;
alter table public.fixtures enable row level security;
alter table public.results enable row level security;

drop policy if exists "public read" on public.courses;
create policy "public read" on public.courses for select using (true);
drop policy if exists "admin write" on public.courses;
create policy "admin write" on public.courses for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read" on public.disciplines;
create policy "public read" on public.disciplines for select using (true);
drop policy if exists "admin write" on public.disciplines;
create policy "admin write" on public.disciplines for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read" on public.athletes;
create policy "public read" on public.athletes for select using (true);
drop policy if exists "admin write" on public.athletes;
create policy "admin write" on public.athletes for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read" on public.entries;
create policy "public read" on public.entries for select using (true);
drop policy if exists "admin write" on public.entries;
create policy "admin write" on public.entries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read" on public.fixtures;
create policy "public read" on public.fixtures for select using (true);
drop policy if exists "admin write" on public.fixtures;
create policy "admin write" on public.fixtures for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read" on public.results;
create policy "public read" on public.results for select using (true);
drop policy if exists "admin write" on public.results;
create policy "admin write" on public.results for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
