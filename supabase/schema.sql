-- Schema for m1665 respostes table
create table public.respostes (
  id bigint generated always as identity primary key,
  grup text not null check (grup in ('DAW1A', 'DAW1B', 'ASIX1')),
  puntuacio smallint not null check (puntuacio between 1 and 5),
  comentari text not null default '',
  data timestamptz not null default now()
);

alter table public.respostes enable row level security;

create policy "respostes_select_anon"
  on public.respostes for select to anon using (true);

create policy "respostes_insert_anon"
  on public.respostes for insert to anon
  with check (
    grup in ('DAW1A', 'DAW1B', 'ASIX1')
    and puntuacio between 1 and 5
  );

-- Optional index for ordering
create index if not exists respostes_data_idx on public.respostes (data desc);
