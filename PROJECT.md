# PROJECT · Santa Iglesia del Señor (SIDS)

Documento de proyecto: estado, decisiones técnicas, contenido y roadmap.

---

## 1. Identidad

| | |
|---|---|
| **Nombre** | Santa Iglesia del Señor |
| **Acrónimo** | SIDS |
| **Lema** | Árbol de Vida |
| **Fundación** | 1974 |
| **Dirección** | Calle 21 y 7, Barrio el Parque, Ingeniero Allan, Buenos Aires, Argentina |
| **Coordenadas aproximadas** | -34.8867, -58.1245 |
| **Obispos** | Dr. Edgardo Norberto Montenegro · Dra. Magdalena Ciulla de Montenegro |
| **Idioma** | Español (Argentina) |
| **Domicilio digital** | sidsiglesia.com.ar |

## 2. Pilares (Valores)

1. **Fe** — Creer en la Palabra
2. **Esperanza** — Confiar en el Señor
3. **Amor** — Servir a la comunidad

## 3. Reuniones semanales

| Día | Hora | Nombre |
|---|---|---|
| Jueves | 20:00 hs | Reunión General |
| Sábado | 18:00 hs | Reunión de Jóvenes |
| Domingo | 18:00 hs | Reunión General |

**Total**: 3+ reuniones semanales.

## 4. Presencia digital (redes)

| Red | URL |
|---|---|
| Facebook | https://www.facebook.com/MinisterioSantaIglesia |
| YouTube | https://www.youtube.com/@sids2025 |
| Instagram | https://www.instagram.com/sids_iglesia/ |

## 5. Arquitectura del sitio

### Stack
- **Framework**: Astro 5 (static output)
- **CSS**: vanilla con custom properties (sin Tailwind / sin SCSS)
- **JS**: vanilla, IIFE, sin dependencias
- **Sitemap**: `@astrojs/sitemap`
- **Deploy**: Vercel (carpeta `dist/`)

### Por qué Astro
Para una landing page como esta, Astro produce HTML estático puro en producción. Resultado:
- **0 KB** de JavaScript de framework
- **~1 KB** de JS propio inlinado
- **~20 KB** de CSS minificado
- Carga casi instantánea, perfecto para SEO y Core Web Vitals

### Estructura
```
src/pages/index.astro     # Compone las secciones
src/layouts/Base.astro    # Shell HTML + SEO (OG, Twitter, JSON-LD)
src/components/           # Una sección = un componente
src/styles/global.css     # Todos los estilos, variables en :root
src/scripts/main.js       # Lógica cliente
public/assets/            # Imágenes estáticas
```

## 6. Paleta de colores

Definida como CSS custom properties en `global.css`:

| Variable | Hex | Uso |
|---|---|---|
| `--bg-light` | `#FAF4E6` | Fondo principal claro |
| `--bg-cream-soft` | `#F5EFE0` | Fondo crema suave |
| `--bg-dark` | `#0D1F18` | Fondo oscuro (secciones) |
| `--bg-deep` | `#144137` | Verde profundo (gradientes, nav) |
| `--bg-black` | `#060A08` | Fondo negro (citas) |
| `--accent` | `#DAE953` | Amarillo-verde acento (CTAs, hover) |
| `--accent-warm` | `#C9D845` | Acento cálido |
| `--accent-soft` | `#EBF5BA` | Acento suave |
| `--green-mid` | `#2A6A47` | Verde medio |
| `--green` | `#73A243` | Verde |
| `--teal` | `#5F9492` | Teal |
| `--teal-soft` | `#A3CCBE` | Teal claro |

## 7. Tipografías

| Familia | Uso | Pesos |
|---|---|---|
| **Inter** (sans) | UI, headlines, párrafos | 200, 350, 400, 500, 550, 700 |
| **Playfair Display** (serif) | Énfasis, citas, statement | 400, italic 300/400 |
| **Space Mono** (display) | Números, tags, decoración | 400, 700 |

Cargadas vía Google Fonts con `preconnect` para performance.

## 8. Funcionalidades implementadas

- [x] **Loader** con porcentaje animado (0→100%)
- [x] **Nav fija** con `mix-blend-mode: difference` → se invierte sobre fondos claros/oscuros
- [x] **Nav con scroll**: backdrop blur al hacer scroll
- [x] **Menú móvil** hamburguesa (≤860px)
- [x] **Hero tipográfico** con 8 imágenes en grid + 4 líneas animadas
- [x] **Marquee infinito** × 2 (light serif y dark display)
- [x] **Reveal on scroll** con `IntersectionObserver`
- [x] **Contadores animados** (1974, 100%, 3+, 100+, 1)
- [x] **Smooth scroll** entre secciones ancla
- [x] **Año dinámico** en footer
- [x] **Imagen del obispo** con filtro B&W + difuminado verde desde abajo
- [x] **Hover accent** (#DAE953) en links, social icons, tags, botones
- [x] **Mapa embebido** de Google Maps
- [x] **Responsive** mobile-first con 3 breakpoints (1100, 860, 520)

## 9. SEO

- ✅ Meta description y `theme-color`
- ✅ Open Graph (og:type, og:title, og:description, og:url, og:image, og:site_name, og:locale, og:image:width, og:image:height, og:image:alt)
- ✅ Twitter Card (`summary_large_image`)
- ✅ Canonical URL
- ✅ JSON-LD `Church` con horarios, dirección, redes sociales
- ✅ Sitemap XML automático (`/sitemap-index.xml`)
- ✅ `robots.txt` con referencia al sitemap
- ✅ `lang="es"` y geo-tags
- ✅ Imágenes con `alt` y `loading="lazy"`
- ✅ Preconnect a Google Fonts

## 10. Accesibilidad

- ✅ HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<blockquote>`)
- ✅ `aria-label` en iconos sociales y menú toggle
- ✅ `aria-expanded` en menú móvil
- ✅ `aria-hidden` en elementos decorativos
- ✅ `prefers-reduced-motion` respetado (desactiva loader, animaciones, marquee)
- ✅ Contraste de color verificado
- ✅ Foco visible (nativo del navegador)

## 11. Build

| Recurso | Tamaño |
|---|---|
| `index.html` | ~18 KB (HTML + JS inlinado) |
| CSS | ~20 KB (minificado) |
| Imágenes | ~1.8 MB (11 JPG + 1 PNG) |

## 12. Roadmap (ideas a futuro)

- [ ] Convertir imágenes a WebP/AVIF para reducir peso ~60%
- [ ] Lazy-load de imágenes del hero con `loading="lazy"` (ya implementado) y `fetchpriority="high"` en la primera
- [ ] Sección "Sermones" o "Mensajes" con últimos videos de YouTube
- [ ] Formulario de contacto / "Quiero ser parte"
- [ ] Suscripción a newsletter
- [ ] Multi-idioma (ES/EN) si crece la congregación
- [ ] PWA (instalable en móvil, offline)
- [ ] Modo claro/oscuro toggle
- [ ] Blog de noticias
- [ ] Integración con calendario (Google Calendar) para eventos especiales

## 13. Mantenimiento

### Cambiar contenido dinámico
- **Horarios, valores, texto**: editar componentes en `src/components/`
- **Estadísticas**: array `stats` en `src/components/Stats.astro`
- **Reuniones**: array `schedule` en `src/components/Meetings.astro`
- **SEO global**: `src/layouts/Base.astro`
- **Colores/tipografías**: `src/styles/global.css` sección `:root`

### Deploy
Cada `git push` a la rama principal dispara un deploy automático en Vercel. No requiere acción manual.

---

**Mantenedor**: Comunidad SIDS · [sidsiglesia.com.ar](https://sidsiglesia.com.ar)
**Última actualización**: ver `git log`
