# Projecte d'Enquesta de l'aula — M1665 Projecte 2

Aplicació web per recollir respostes d'enquesta de satisfacció (grup, puntuació 1–5, comentari opcional) i mostrar un panell d'analítica filtrat per grup.

## Requisits

- Navegador modern amb suport per a ES6+ i `<template>`
- No cal instal·lar dependències: el projecte és HTML, CSS i JavaScript vanilla

## Execució

1. Clona o descarrega el repositori.
2. Obre `index.html` directament al navegador, **o** serveix la carpeta amb un servidor local:

```bash
npx serve .
```

3. Omple el formulari i prem **Guardar resposta** per afegir dades en memòria.

## Estructura del repositori

| Fitxer / carpeta | Rol |
|------------------|-----|
| `index.html` | Interfície: formulari d'enquesta i panell (Part A) |
| `css/styles.css` | Estils de la pàgina, targetes i llista de respostes |
| `js/app.js` | Estat global (`respostes`), grups vàlids i validació de puntuació |
| `js/formulari.js` | Captura, validació i desament de respostes |
| `js/panell.js` | Comptador de respostes per grup i llista de les 5 últimes |

## Parts del projecte

| Part | Rama | Estat |
|------|------|-------|
| A — Formulari, validació i panell bàsic | `PartA-Formulari` | **Completada** |
| B — Panell d'analítica avançat | `main` (futura) | Pendent |
| Referència remota | `origin/PartA` | Aliniada amb Part A |

## Part A — completada

La branca `PartA-Formulari` inclou tot el que demana la Part A:

- **Formulari**: selecció de grup (DAW1A, DAW1B, ASIX1), puntuació 1–5 i comentari opcional
- **Validació**: grup vàlid i puntuació enter entre 1 i 5, amb missatges d'error visibles
- **Desament**: cada resposta es guarda en memòria amb `id`, `grup`, `puntuació`, `comentari` i `data` (ISO)
- **Panell**: text del grup actiu del formulari, comptador de respostes del grup i llista de les **5 últimes** respostes (plantilla `<template>`), ordenades per data

## Properes parts (pendent)

- KPIs addicionals (mitjana, % positives, etc.)
- Gràfics (barres, quesito, comparativa per grup)
- Filtres i analítica completa del panell

## Decisions tècniques

- **Vanilla JS** sense frameworks ni bundler
- **Dades en memòria**: les respostes es perden en recarregar la pàgina (sense `localStorage` ni backend)
- **Mòduls per fitxer**: `app.js` exposa `window.App` i coordina `initFormulari()` i `actualitzarPanell()` al `DOMContentLoaded`

## Autoria

Projecte acadèmic M1665 — Projecte 2. Víctor Martínez Nevado
