create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  analysis_id text not null,
  analysis jsonb not null,
  created_at timestamptz not null default now(),
  unique (user_id, analysis_id)
);

create or replace function public.sync_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_profile_created on auth.users;
create trigger on_auth_user_profile_created
  after insert or update on auth.users
  for each row execute procedure public.sync_auth_user_profile();

create or replace function public.is_truthlens_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.analyses enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (display_name) on table public.profiles to authenticated;

drop policy if exists "Users and admins can read profiles" on public.profiles;
create policy "Users and admins can read profiles"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_truthlens_admin());

drop policy if exists "Users and admins can update profile names" on public.profiles;
create policy "Users and admins can update profile names"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_truthlens_admin())
  with check (id = auth.uid() or public.is_truthlens_admin());

revoke all on table public.analyses from anon, authenticated;
grant select, insert, update, delete on table public.analyses to authenticated;

drop policy if exists "Users and admins can read analyses" on public.analyses;
drop policy if exists "Users can read own analyses" on public.analyses;
drop policy if exists "Users can read their own analyses" on public.analyses;
create policy "Users can read their own analyses"
  on public.analyses for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert own analyses" on public.analyses;
drop policy if exists "Users can insert their own analyses" on public.analyses;
create policy "Users can insert their own analyses"
  on public.analyses for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users and admins can update analyses" on public.analyses;
drop policy if exists "Users can update own analyses" on public.analyses;
drop policy if exists "Users can update their own analyses" on public.analyses;
create policy "Users can update their own analyses"
  on public.analyses for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Users and admins can delete analyses" on public.analyses;
drop policy if exists "Users can delete own analyses" on public.analyses;
drop policy if exists "Users can delete their own analyses" on public.analyses;
create policy "Users can delete their own analyses"
  on public.analyses for delete
  to authenticated
  using (user_id = auth.uid());

grant execute on function public.is_truthlens_admin() to authenticated;
revoke execute on function public.is_truthlens_admin() from public, anon;

-- Run once in the Supabase SQL editor after creating the first account.
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';
