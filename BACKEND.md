# Gedeelde Data, Foto's En Live Status

De site werkt zonder backend, maar dan blijft alles lokaal per browser/apparaat.

Voor echt gedeelde functies is de code voorbereid op Supabase:
- site-state voor alerts, slaapnotities en programma-overrides
- gedeeld takenbord
- gedeelde boodschappenlijst
- gedeelde quotes
- foto-upload
- live `Waar is iedereen?` status

## Supabase Setup

1. Maak een Supabase-project aan.
2. Draai het SQL-bestand [supabase-setup.sql](/Users/wessel.van.den.berg/Documents/Woezik3_Weekend/supabase-setup.sql) in de Supabase SQL Editor.
3. Vul in [config.js](/Users/wessel.van.den.berg/Documents/Woezik3_Weekend/config.js) de waarden in:

```js
window.WOEZIK_BACKEND = {
  supabaseUrl: "https://jouw-project.supabase.co",
  supabaseAnonKey: "jouw-anon-key",
  photoBucket: "weekend-photos",
};
```

4. Deploy daarna dezelfde bestanden naar Vercel.

## Wat je minimaal nodig hebt

Voor live `Waar is iedereen?` heb je alleen dit nodig:
- Supabase project
- `presence_status` tabel uit [supabase-setup.sql](/Users/wessel.van.den.berg/Documents/Woezik3_Weekend/supabase-setup.sql)
- ingevulde `supabaseUrl` en `supabaseAnonKey` in [config.js](/Users/wessel.van.den.berg/Documents/Woezik3_Weekend/config.js)

Voor de uitgebreidere admin-, taken- en quotefuncties heb je daarnaast deze tabellen nodig uit hetzelfde SQL-bestand:
- `site_state`
- `shared_tasks`
- `shared_shopping_items`
- `shared_quotes`

Foto's worden lokaal getoond en daarnaast naar Supabase geupload.

## Live Status

De pagina `Waar is iedereen?` gebruikt nu:

- zonder Supabase: alleen `localStorage`
- met Supabase: gedeelde live status voor iedereen

De site pollt de `presence_status` tabel periodiek. Dat is bewust simpel gehouden; voor dit teamweekend is dat ruim voldoende.

## Nieuwe gedeelde functies

Na het opnieuw draaien van [supabase-setup.sql](/Users/wessel.van.den.berg/Documents/Woezik3_Weekend/supabase-setup.sql) werken ook:

- live home announcement via `site_state`
- slaapindeling-notitie via `site_state`
- programma-overrides via `site_state`
- gedeeld takenbord via `shared_tasks`
- gedeelde boodschappenlijst via `shared_shopping_items`
- gedeelde quotes + verwijderen via `shared_quotes`

## Belangrijk

Dit is client-side intern weekendgereedschap, geen echte securitylaag. De organizer-lock op de site houdt spoilers uit zicht, maar beschermt geen gevoelige data zoals een echte backend-authflow dat zou doen.
