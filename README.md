# 🍷 La Botte – Sito Catalogo Vini

**Stack:** React 18 + Vite · Tailwind CSS · Express.js · Node.js

---

## 🚀 Avvio in locale (sviluppo)

### Prerequisiti
- [Node.js](https://nodejs.org/) v18 o superiore

### Primo avvio
```bash
# 1. Installa tutte le dipendenze (root + client)
npm run install:all

# 2. Avvia tutto (server + client in parallelo)
npm run dev
```

Apri il browser su **http://localhost:5173**

---

## 📁 Struttura

```
la-botte/
├── client/                        ← React (Vite + Tailwind)
│   ├── public/
│   │   └── images/
│   │       └── bottles/           ← 📸 PNG bottiglie (sfondo trasparente)
│   └── src/
│       ├── components/            ← Navbar, Hero, WineCard, WineModal, ecc.
│       ├── pages/
│       │   ├── Home.jsx           ← Pagina principale
│       │   └── Admin.jsx          ← /admin (protetta da password)
│       ├── data/wines.js          ← Vini base Teo Costa + categorie
│       └── hooks/useApi.js        ← Chiamate all'API Express
│
└── server/                        ← Express.js (API + serve build)
    ├── routes/
    │   ├── wines.js               ← GET/POST/DELETE /api/wines
    │   ├── articles.js            ← GET/POST/DELETE /api/articles
    │   └── auth.js                ← POST /api/auth/verify
    └── data/
        ├── custom_wines.json      ← Vini aggiunti dall'admin
        └── articles.json          ← Articoli aggiunti dall'admin
```

---

## 🔐 Area Admin

- URL: **http://localhost:5173/admin**
- Password: **`labotte2024`** *(cambiala in `server/routes/auth.js`)*

Dall'admin puoi:
- ➕ Aggiungere vini di **qualsiasi cantina** (scrivi il nome della cantina nel campo "Cantina")
- 🗑️ Eliminare vini personalizzati
- 📰 Aggiungere articoli newsletter
- 🗑️ Eliminare articoli

---

## 📸 Aggiungere immagini bottiglie

1. Prepara un PNG con **sfondo trasparente** (ideale: 160×420 px)
2. Copialo in `client/public/images/bottles/nomefile.png`
3. Nell'admin, compila il campo **"Nome immagine"** con `nomefile` (senza .png)

---

## 🌐 Mettere online

### Opzione A – Netlify (solo frontend statico)
```bash
npm run build
# poi trascina la cartella server/public/ su app.netlify.com/drop
```
> Nota: senza backend, le modifiche admin non vengono salvate.

### Opzione B – VPS/Railway/Render (full stack)
```bash
npm run build   # builda il client in server/public/
node server/index.js  # avvia Express che serve tutto
```

---

## 🔧 Comandi utili

| Comando | Descrizione |
|---|---|
| `npm run install:all` | Installa dipendenze root + client |
| `npm run dev` | Avvia client (5173) + server (3001) |
| `npm run build` | Builda React in server/public/ |
| `npm run server` | Solo server Express |
| `npm run client` | Solo Vite dev server |

---

## ➕ Aggiungere una nuova cantina

1. Vai su `/admin` → "Aggiungi Vino"
2. Nel campo **"Cantina"** scrivi il nome della nuova cantina (es. "Cantina Bava")
3. I vini appaiono automaticamente nel catalogo
4. In futuro si può aggiungere una sezione dedicata in `client/src/pages/Home.jsx`

---

## 🔑 Cambiare la password admin

Nel file `server/routes/auth.js` modifica:
```js
const ADMIN_PASSWORD = 'nuova-password'
```
Oppure usa una variabile d'ambiente:
```bash
ADMIN_PASSWORD=mia-password node server/index.js
```
