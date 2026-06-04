# Santa Iglesia del Señor · SIDS

Sitio web oficial de la **Santa Iglesia del Señor** (SIDS) · Árbol de Vida — Ingeniero Allan, Buenos Aires.

🌐 **Sitio**: [sids.iglesia](https://sids.iglesia)
📍 **Dirección**: Calle 21 y 7, Barrio el Parque, Ingeniero Allan
⛪ **Fundada**: 1974

## Stack técnico

- **[Astro 5](https://astro.build/)** — framework estático (HTML puro en producción)
- **CSS vanilla** — sin frameworks, sin Tailwind, sin preprocesadores
- **JavaScript vanilla** — IIFE, sin dependencias runtime
- **@astrojs/sitemap** — sitemap XML automático
- **Despliegue**: Vercel (salida estática desde `dist/`)

## Estructura

```
.
├── astro.config.mjs        # Config: site URL, output static, sitemap
├── package.json
├── tsconfig.json
├── public/                 # Assets estáticos (se copian tal cual a dist/)
│   ├── robots.txt
│   └── assets/
│       ├── logo.png
│       └── img/            # Imágenes del hero, obispo, features
├── src/
│   ├── pages/
│   │   └── index.astro     # Página principal
│   ├── layouts/
│   │   └── Base.astro      # Shell HTML + SEO (OG, Twitter, JSON-LD, canonical)
│   ├── components/         # Secciones: Loader, Nav, Hero, Marquee, About,
│   │                       # Values, Stats, Meetings, Location, Footer
│   ├── styles/
│   │   └── global.css      # 1000+ líneas, paleta en CSS custom properties
│   └── scripts/
│       └── main.js         # Loader, nav scroll, reveal, contadores, smooth scroll
└── dist/                   # Output de build (generado, ignorar en git)
```

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo → http://localhost:4321
npm run build        # Generar dist/ para producción
npm run preview      # Preview del build local
```

## Despliegue en Vercel

1. Conectá el repo en [vercel.com/new](https://vercel.com/new)
2. Vercel detecta Astro automáticamente:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. (Opcional) Configurá el dominio personalizado `sids.iglesia` en _Settings → Domains_

## SEO incluido

- ✅ Meta description y theme-color
- ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
- ✅ Twitter Card con imagen grande
- ✅ Canonical URL
- ✅ JSON-LD `Church` (horarios, dirección, redes)
- ✅ Sitemap XML automático (`/sitemap-index.xml`)
- ✅ `robots.txt` apuntando al sitemap
- ✅ `lang="es"` y geo-tags (`geo.region`, `geo.placename`)
- ✅ Imágenes con `alt` y `loading="lazy"`
- ✅ Preconnect a Google Fonts

## Performance

- HTML estático puro (sin SSR runtime)
- 0 KB de JavaScript de framework (Astro no envía runtime)
- Solo el JS vanilla de la página (~1 KB minificado, inlinado)
- CSS único, minificado, ~20 KB
- Imágenes con `loading="lazy"` y preconnect a fonts

## Personalización

### Cambiar el dominio

En `astro.config.mjs`:

```js
site: "https://tu-dominio.com",
```

### Cambiar colores / tipografías

Todas las variables de diseño están en `src/styles/global.css` bajo `:root`:

```css
--bg-light, --bg-dark, --bg-deep, --bg-black
--accent (#DAE953)
--font-sans (Inter), --font-serif (Playfair Display), --font-display (Space Mono)
```

### Cambiar la imagen Open Graph

Reemplazá `public/assets/logo.png` con una imagen de 1200×630 px (formato PNG o JPG) y actualizá la referencia en `src/layouts/Base.astro` si usás otro nombre.

## Licencia

© Santa Iglesia del Señor. Todos los derechos reservados.
