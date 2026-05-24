create extension if not exists pgcrypto;

create table if not exists award_votes (
  id uuid primary key default gen_random_uuid(),
  award text not null,
  player text not null,
  voter_id text not null,
  created_at timestamptz not null default now(),
  unique (award, voter_id)
);

create table if not exists presence_status (
  player text primary key,
  status text not null,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table award_votes enable row level security;
alter table presence_status enable row level security;

drop policy if exists "Iedereen mag stemmen lezen" on award_votes;
create policy "Iedereen mag stemmen lezen"
on award_votes for select
to anon
using (true);

drop policy if exists "Iedereen mag stemmen plaatsen" on award_votes;
create policy "Iedereen mag stemmen plaatsen"
on award_votes for insert
to anon
with check (true);

drop policy if exists "Iedereen mag eigen stem updaten" on award_votes;
create policy "Iedereen mag eigen stem updaten"
on award_votes for update
to anon
using (true)
with check (true);

drop policy if exists "Iedereen mag presence lezen" on presence_status;
create policy "Iedereen mag presence lezen"
on presence_status for select
to anon
using (true);

drop policy if exists "Iedereen mag presence plaatsen" on presence_status;
create policy "Iedereen mag presence plaatsen"
on presence_status for insert
to anon
with check (true);

drop policy if exists "Iedereen mag presence updaten" on presence_status;
create policy "Iedereen mag presence updaten"
on presence_status for update
to anon
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('weekend-photos', 'weekend-photos', true)
on conflict (id) do nothing;

drop policy if exists "Iedereen mag weekendfoto's lezen" on storage.objects;
create policy "Iedereen mag weekendfoto's lezen"
on storage.objects for select
to anon
using (bucket_id = 'weekend-photos');

drop policy if exists "Iedereen mag weekendfoto's uploaden" on storage.objects;
create policy "Iedereen mag weekendfoto's uploaden"
on storage.objects for insert
to anon
with check (bucket_id = 'weekend-photos');
