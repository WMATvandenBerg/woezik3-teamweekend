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

create table if not exists site_state (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists shared_tasks (
  task_key text primary key,
  group_title text not null,
  owner text,
  label text not null,
  done boolean not null default false,
  updated_at timestamptz,
  updated_by text
);

create table if not exists shared_quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  person text not null,
  created_at timestamptz not null default now(),
  created_by text
);

create table if not exists shared_shopping_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  created_by text,
  updated_at timestamptz,
  updated_by text
);

alter table award_votes enable row level security;
alter table presence_status enable row level security;
alter table site_state enable row level security;
alter table shared_tasks enable row level security;
alter table shared_quotes enable row level security;
alter table shared_shopping_items enable row level security;

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

drop policy if exists "Iedereen mag site state lezen" on site_state;
create policy "Iedereen mag site state lezen"
on site_state for select
to anon
using (true);

drop policy if exists "Iedereen mag site state plaatsen" on site_state;
create policy "Iedereen mag site state plaatsen"
on site_state for insert
to anon
with check (true);

drop policy if exists "Iedereen mag site state updaten" on site_state;
create policy "Iedereen mag site state updaten"
on site_state for update
to anon
using (true)
with check (true);

drop policy if exists "Iedereen mag taken lezen" on shared_tasks;
create policy "Iedereen mag taken lezen"
on shared_tasks for select
to anon
using (true);

drop policy if exists "Iedereen mag taken plaatsen" on shared_tasks;
create policy "Iedereen mag taken plaatsen"
on shared_tasks for insert
to anon
with check (true);

drop policy if exists "Iedereen mag taken updaten" on shared_tasks;
create policy "Iedereen mag taken updaten"
on shared_tasks for update
to anon
using (true)
with check (true);

drop policy if exists "Iedereen mag quotes lezen" on shared_quotes;
create policy "Iedereen mag quotes lezen"
on shared_quotes for select
to anon
using (true);

drop policy if exists "Iedereen mag quotes plaatsen" on shared_quotes;
create policy "Iedereen mag quotes plaatsen"
on shared_quotes for insert
to anon
with check (true);

drop policy if exists "Iedereen mag quotes verwijderen" on shared_quotes;
create policy "Iedereen mag quotes verwijderen"
on shared_quotes for delete
to anon
using (true);

drop policy if exists "Iedereen mag boodschappen lezen" on shared_shopping_items;
create policy "Iedereen mag boodschappen lezen"
on shared_shopping_items for select
to anon
using (true);

drop policy if exists "Iedereen mag boodschappen plaatsen" on shared_shopping_items;
create policy "Iedereen mag boodschappen plaatsen"
on shared_shopping_items for insert
to anon
with check (true);

drop policy if exists "Iedereen mag boodschappen updaten" on shared_shopping_items;
create policy "Iedereen mag boodschappen updaten"
on shared_shopping_items for update
to anon
using (true)
with check (true);

drop policy if exists "Iedereen mag boodschappen verwijderen" on shared_shopping_items;
create policy "Iedereen mag boodschappen verwijderen"
on shared_shopping_items for delete
to anon
using (true);

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
