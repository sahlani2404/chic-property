# 🏠 PT Linear Property — Chic Property Website

Company profile website untuk **PT Linear Property** (Chic Property). Dibangun dengan **TanStack Start** (SSR), **React 19**, **Vite**, dan **Tailwind CSS 4**.

**Live:** [ptlinearproperty.com](https://ptlinearproperty.com)

---

## 📸 Features

- ✅ **Server-Side Rendering (SSR)** — SEO-friendly, fast initial load
- ✅ **Responsive Design** — Mobile, tablet, desktop
- ✅ **Property Portfolio** — Showcase properti dengan galeri foto
- ✅ **Admin Panel** — CRUD properti, pesan, pengaturan
- ✅ **Contact Form** — Kirim pesan langsung ke admin
- ✅ **Google Maps** — Lokasi properti interaktif
- ✅ **Dark/Light Mode** — Toggle tema
- ✅ **Team Section** — Profil tim perusahaan

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| UI Components | Radix UI primitives |
| Routing | TanStack Router |
| State | TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Charts | Recharts |

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18 (recommended: 22)
- **Bun** (recommended) atau **npm**

### 1. Clone Repository

```bash
git clone https://github.com/wahyuwayaw/chic-property.git
cd chic-property
```

### 2. Install Dependencies

```bash
# Menggunakan Bun (recommended)
bun install

# Atau menggunakan npm
npm install
```

### 3. Development Server

```bash
# Menggunakan Bun
bun run dev

# Atau menggunakan npm
npm run dev
```

Buka browser → `http://localhost:3000`

### 4. Build untuk Production

```bash
# Build
bun run build
# atau
npm run build

# Preview build
bun run preview
# atau
npm run preview
```

---

## 📁 Project Structure

```
chic-property/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images (portfolio, team, properties)
│   │   ├── BALBOA ESTATE/
│   │   ├── KAIA ESTATE/
│   │   ├── Nebula Park/
│   │   ├── Terra Ruma/
│   │   ├── portfolio/
│   │   └── team/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AdminGate.tsx    # Admin auth wrapper
│   │   ├── MapSection.tsx   # Google Maps component
│   │   ├── MessagePanel.tsx # Contact messages
│   │   ├── PropertyCard.tsx # Property card component
│   │   ├── SiteFooter.tsx   # Footer
│   │   └── SiteHeader.tsx   # Header/Navbar
│   ├── data/
│   │   └── properties.ts    # Property data
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Mobile detection
│   │   └── useProperties.ts # Properties hook
│   ├── lib/
│   │   ├── error-capture.ts # Error handling
│   │   ├── error-page.ts    # Error page
│   │   └── utils.ts         # Utility functions
│   ├── routes/
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Homepage
│   │   ├── about.tsx        # About page
│   │   ├── admin.tsx        # Admin panel
│   │   ├── contact.tsx      # Contact page
│   │   ├── portfolio.tsx    # Portfolio page
│   │   └── properties.tsx   # Properties page
│   ├── router.tsx           # Router config
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   ├── server.ts            # Server entry
│   ├── start.ts             # Start entry
│   └── styles.css           # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── components.json          # shadcn/ui config
├── eslint.config.js
└── bunfig.toml
```

---

## 🌐 Deployment

### Shared Hosting (cPanel)

1. Build project:
   ```bash
   bun run build
   ```

2. Upload `dist/` folder ke `~/chic-property/` di cPanel

3. Setup Node.js App di cPanel:
   - Node.js version: **22**
   - App directory: `~/chic-property`
   - App startup file: `dist/passenger.cjs`

4. Install dependencies di cPanel Terminal:
   ```bash
   cd ~/chic-property
   npm install --production
   ```

5. Restart app di cPanel Node.js Selector

### VPS / Dedicated Server

1. Clone dan install:
   ```bash
   git clone https://github.com/wahyuwayaw/chic-property.git
   cd chic-property
   bun install
   bun run build
   ```

2. Run dengan systemd atau PM2:
   ```bash
   # PM2
   pm2 start dist/passenger.cjs --name chic-property
   
   # Atau langsung
   node dist/passenger.cjs
   ```

3. Setup Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name ptlinearproperty.com;
       
       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## ⚙️ Environment Variables

Buat file `.env` di root project:

```env
# Server
PORT=3000
NODE_ENV=production

# Admin
ADMIN_PASSWORD=your_secure_password

# Google Maps (opsional)
GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build untuk production |
| `bun run preview` | Preview build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code dengan Prettier |

---

## 🎨 Customization

### Mengubah Data Properti

Edit file `src/data/properties.ts` untuk menambah/mengubah data properti.

### Mengubah Gambar

Taruh gambar di folder `src/assets/` sesuai kategori:
- `portfolio/` — Gambar proyek portfolio
- `team/` — Foto tim
- `BALBOA ESTATE/`, `KAIA ESTATE/`, dll — Gambar per cluster

### Mengubah Warna/Tema

Edit `src/styles.css` untuk mengubah CSS variables tema.

---

## 📄 License

Private — © 2026 PT Linear Property. All rights reserved.

---

## 👥 Team

- **Raynaldo** — Director
- **Reza** — Marketing Manager
- **Angga** — Project Manager

---

## 📞 Contact

- **Website:** [ptlinearproperty.com](https://ptlinearproperty.com)
- **Email:** info@ptlinearproperty.com
- **WhatsApp:** +62 XXX-XXXX-XXXX
