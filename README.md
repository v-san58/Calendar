# Calendar
Das ist eine einfache Kalender-Webapp, die ich ohne Framework ausschließlich mit HTML, CSS und JavaScript entwickelt habe.
Das Projekt dient als Lernprojekt und läuft in allen gängigen modernen Webbrowsern.


## Live-Demo
Hier auf den Link klicken: https://v-san58.github.io/Calendar/


## Installation
1. Repository herunterladen oder klonen
```bash
git clone https://github.com/v-san58/Calendar.git
```

2. Die Datei index.html im Browser öffnen

## Features
- Berechnung und Anzeige von Kalenderdaten
- Hervorhebung des aktuellen Tages
- Navigation zwischen Monaten
- Rückkehr zum aktuellen Monat
- Erstellen und Anzeigen von Terminen über ein Formular
- Speicherung von Terminen im `localStorage`
- Löschen von Terminen per "❌"-Button

## Projektstruktur
- `index.html` – Grundstruktur
- `style.css` – Styling
- `main.js` – Kalenderlogik und Rendering
- `save_load.js` - Speicherlogik der Termine

## Lernen
Während der Entwicklung wurden folgende Konzepte praktisch umgesetzt:
- DOM-Manipulation (Baumstruktur)
  - Elemente auswählen
  - neue Elemente erzeugen und als Kinder bereits existierender Elemente anfügen
  - Elemente entfernen
- CSS dynamisch verändern
- OOP in JS
- Date-Klasse
- **Datumslogik** (Berechnung der Daten)
- Dynamisches Rendering mit `showMonth()` in `main.js`
