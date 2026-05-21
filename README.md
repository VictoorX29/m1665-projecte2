# Projecte d'Enquesta de l'aula — M1665 Projecte 2

Aplicació web per recollir respostes d'enquesta de satisfacció (grup, puntuació 1–5, comentari opcional) i mostrar un panell d'analítica amb filtres, KPIs i gràfics.

## Desplegament (Vercel)

L'aplicació està publicada a Vercel des de la branca `main`:

**[https://m1665-projecte2.vercel.app](https://m1665-projecte2.vercel.app)**

Repositori: [github.com/VictoorX29/m1665-projecte2](https://github.com/VictoorX29/m1665-projecte2)

## Requisits

- Navegador modern amb suport per a ES6+, `<template>` i `conic-gradient` (CSS)
- No cal instal·lar dependències: el projecte és HTML, CSS i JavaScript vanilla

## Execució

**En línia:** obre [https://m1665-projecte2.vercel.app](https://m1665-projecte2.vercel.app), omple el formulari i consulta el panell.

**En local:**

1. Clona o descarrega el repositori.
2. Obre `index.html` directament al navegador, **o** serveix la carpeta amb un servidor local:

```bash
npx serve .
```

3. Omple el formulari i prem **Guardar resposta** per afegir dades en memòria.
4. Canvia el **Filtre del panell** (Tots o un grup concret) per veure l'analítica actualitzada.

## Estructura del repositori

| Fitxer / carpeta  | Rol                                                               |
| ----------------- | ----------------------------------------------------------------- |
| `index.html`      | Formulari d'enquesta i panell d'analítica complet                 |
| `css/styles.css`  | Estils: targetes, KPIs, barres, quesitos i comparativa            |
| `js/app.js`       | Estat global (`respostes`), grups vàlids i validació              |
| `js/formulari.js` | Captura, validació i desament de respostes                        |
| `js/panell.js`    | Filtre, KPIs, gràfics, comparativa i llista de respostes          |
| `js/supabase.js`  | _(Part D, pendent)_ Client Supabase: insert i select de respostes |

## Parts del projecte

| Part                       | Àmbit | Rama (prevista)              | Estat                                    |
| -------------------------- | ----- | ---------------------------- | ---------------------------------------- |
| A — Formulari i validació  | IA4   | `PartA-Formulari`            | **Completada**                           |
| B — Panell d'analítica     | IA4   | `PartB---Panell-d'analitica` | **Completada**                           |
| C — Cloud (Git + Vercel)   | IA3   | `PartC-Cloud`                | **Completada**                           |
| D — Base de dades Supabase | IA5   | `PartD---Supabase`           | **Pendent**                              |
| Producció                  | —     | `main`                       | Desplegada a Vercel; integra Parts A i B |

## Part A — completada

Inclou la base del projecte (branca `PartA-Formulari`):

- **Formulari**: grup (DAW1A, DAW1B, ASIX1), puntuació 1–5 i comentari opcional
- **Validació**: grup vàlid i puntuació enter entre 1 i 5, amb missatges d'error
- **Desament**: respostes en memòria amb `id`, `grup`, `puntuació`, `comentari` i `data` (ISO)

## Part B — completada

La branca `PartB---Panell-d'analitica` afegeix el panell d'analítica sobre les dades guardades:

- **Filtre independent**: selector `Tots` o un grup concret; el panell no depèn del grup seleccionat al formulari
- **KPIs**: nombre de respostes, mitjana, % de puntuacions 4 o 5 i grup/filtre analitzat
- **Distribució de valoracions**: gràfic de barres (1–5) amb comptadors i amplada proporcional al màxim
- **Gràfics de quesito**: distribució per puntuació i repartiment positives (4–5) vs no positives (1–3), amb `conic-gradient` i llegenda dinàmica
- **Comparativa**: mitjana per grup (DAW1A, DAW1B, ASIX1) amb barres; ressalta el grup si el filtre coincideix
- **Llista de respostes**: totes les del filtre actiu, ordenades per data (més recents primer), amb data formatada (`ca-ES`) i estil per puntuació

El panell s'actualitza en guardar una resposta o en canviar el filtre (`initPanell()` + `actualitzarPanell()`).

## Part C — completada (Cloud, IA3)

La branca `PartC-Cloud` cobreix la publicació i el flux Git:

- **Repositori GitHub** amb branques `main` (producció) i `dev` (integració)
- **Pull requests** de les parts de funcionalitat cap a `main` (Parts A i B integrades)
- **Desplegament a Vercel** des de `main`: app estàtica (`index.html`) accessible a [https://m1665-projecte2.vercel.app](https://m1665-projecte2.vercel.app)

> Les dades continuen en memòria del navegador (IA4); la persistència a Supabase és objectiu de la Part D.

## Part D — pendent (Base de dades, IA5)

Objectiu: persistir les respostes a Supabase mantenint la mateixa interfície.

- **Taula `respostes`** a Supabase: `grup`, `puntuació`, `comentari`, `data` (i `id` de la BD)
- **Formulari**: `insert` a Supabase en lloc d'afegir només a l'array en memòria
- **Panell**: lectura des de Supabase (càrrega inicial i després de cada guardat)
- **Conclusions**: text breu (5–8 línies) amb **2 conclusions** llegint les dades reals del projecte

Estructura de dada (sense canvis al front):

```json
{
	"id": 1,
	"grup": "DAW1A",
	"puntuacio": 4,
	"comentari": "Tot clar",
	"data": "2026-05-21T10:00:00"
}
```

Fitxer previst: `js/supabase.js` per connectar client, escriure i llegir respostes.

### Notes per Part D (configuració i desplegament)

- Copia `js/config.example.js` a `js/config.js` i omple `SUPABASE_URL` i `SUPABASE_ANON_KEY` (anon public key). No commitis `js/config.js`.
- `.gitignore` inclou `js/config.js` per evitar fuites de claus.
- Crear el projecte Supabase, executar `supabase/schema.sql` al SQL Editor i configurar RLS (polítiques d'insert/select per `anon`).
- L'aplicació utilitza la CDN de `@supabase/supabase-js` i `js/supabase.js` per a `insert` i `select`.
- Per desplegar a Vercel: defineix les variables d'entorn en el dashboard i genera `js/config.js` en build o inclou un petit script de deploy que creï el fitxer.

## Decisions tècniques

- **Vanilla JS** sense frameworks ni bundler
- **Hosting estàtic a Vercel**: sense build; serveix directament HTML, CSS i JS
- **Dades en memòria (IA4, Parts A–C)**: les respostes es perden en recarregar; la Part D les mourà a Supabase
- **Separació de mòduls**: `app.js` coordina `initFormulari()`, `initPanell()` i la primera crida a `actualitzarPanell()`
- **Gràfics sense llibreries**: barres amb amplada en %; quesitos amb `conic-gradient` construït des de comptadors

## Autoria

Projecte acadèmic M1665 — Projecte 2. Víctor Martínez Nevado
