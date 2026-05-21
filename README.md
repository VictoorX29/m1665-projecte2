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
| `index.html` | Interfície: formulari d'enquesta i panell d'analítica |
| `css/styles.css` | Estils de la pàgina, targetes, KPIs i gràfics |
| `js/app.js` | Estat global (`respostes`), grups vàlids i validació de puntuació |
| `js/formulari.js` | Captura, validació i desament de respostes |
| `js/panell.js` | Actualització del panell (KPIs, llista d'últimes respostes) |

## Parts del projecte

| Part | Rama | Estat |
|------|------|-------|
| A — Formulari i validació | `PartA-Formulari` | En curs |
| A — (remot) | `origin/PartA` | Referència remota |
| Integració / lliurament | `main` | Base del repositori |

## Estat actual

**Implementat**

- Formulari amb selecció de grup (DAW1A, DAW1B, ASIX1), puntuació 1–5 i comentari opcional
- Validació de grup i puntuació amb missatges d'error
- Emmagatzematge de respostes en memòria (`respostes` a `app.js`)
- Panell: filtre sincronitzat amb el grup del formulari, KPI de nombre de respostes i llista de les 5 últimes respostes del grup

**Pendent / placeholder**

- KPIs de mitjana i % positives (es mostren com a «—»)
- Gràfics de barres, quesito i comparativa per grup al HTML (valors estàtics de disseny; cal connectar-los a les dades reals en parts posteriors)

## Decisions tècniques

- **Vanilla JS** sense frameworks ni bundler
- **Dades en memòria**: les respostes es perden en recarregar la pàgina (sense `localStorage` ni backend)
- **Mòduls per fitxer**: `app.js` exposa `window.App` i coordina `initFormulari()` i `actualitzarPanell()` al `DOMContentLoaded`

## Autoria

Projecte acadèmic M1665 — Projecte 2. Víctor Martínez Nevado
