(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── Loader ─── */
  (() => {
    const loader = $("#loader");
    const pctEl  = $("#loaderPct");
    const page   = $("#page");
    if (!loader || !pctEl || !page) return;

    if (prefersReducedMotion) {
      loader.classList.add("hidden");
      page.classList.add("visible");
      return;
    }

    let count = 0;
    const target = 100;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 7) + 3;
      if (count >= target) count = target;
      pctEl.innerHTML = count + '<span class="cursor">_</span>';
      if (count >= target) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("hidden");
          page.classList.add("visible");
        }, 350);
      }
    }, 90);
  })();

  /* ─── Nav: scroll + mobile menu ─── */
  (() => {
    const nav = $("#navWrap");
    const toggle = $("#menuToggle");
    if (!nav) return;

    let lastY = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 80);
      lastY = y;
    }, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });

      $$(".nav-links a", nav).forEach(a => {
        a.addEventListener("click", () => {
          if (nav.classList.contains("menu-open")) {
            nav.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menú");
          }
        });
      });
    }
  })();

  /* ─── Reveal-on-scroll ─── */
  (() => {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal-el").forEach(el => el.classList.add("reveal"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal-el").forEach(el => io.observe(el));
  })();

  /* ─── Stat counters ─── */
  (() => {
    if (!("IntersectionObserver" in window)) return;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.floor(easeOut(t) * target);
        el.textContent = value + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    $$(".stat-value[data-count]").forEach(el => io.observe(el));
  })();

  /* ─── Smooth scroll for anchor links ─── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ─── Year ─── */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
