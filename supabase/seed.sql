-- Seed data matching src/data/mock.ts (illustrative v1 values).

insert into public.disciplines (id, nombre, tipo, genero, sede) values
  ('futbol', 'Futbol', 'grupal', 'M', 'Cancha principal'),
  ('basquet', 'Basquet', 'grupal', 'M', 'Coliseo norte'),
  ('voley', 'Voley', 'grupal', 'F', 'Coliseo sur'),
  ('salto-alto', 'Salto alto', 'individual', 'M', 'Pista atletica'),
  ('salto-largo', 'Salto largo', 'individual', 'M', 'Pista atletica'),
  ('posta', 'Posta 4x100', 'individual', 'M', 'Pista atletica'),
  ('ajedrez', 'Ajedrez', 'individual', 'unisex', 'Biblioteca')
on conflict (id) do update set nombre = excluded.nombre, tipo = excluded.tipo, genero = excluded.genero, sede = excluded.sede;

insert into public.courses (grade, paralelo, color) values
  ('3ero Bach', 'A', '#1E3A5F'),
  ('3ero Bach', 'B', '#334155'),
  ('3ero Bach', 'C', '#475569'),
  ('3ero Bach', 'D', '#64748B'),
  ('2do Bach', 'A', '#3F4A5A'),
  ('2do Bach', 'B', '#5B6575'),
  ('1ero Bach', 'A', '#6B7280'),
  ('1ero Bach', 'B', '#7C8798')
on conflict (grade, paralelo) do update set color = excluded.color;
