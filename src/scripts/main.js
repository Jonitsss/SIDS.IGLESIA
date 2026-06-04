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

    const finish = () => {
      document.body.classList.remove("loading");
    };

    if (prefersReducedMotion) {
      loader.classList.add("hidden");
      page.classList.add("visible");
      finish();
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
          finish();
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

  /* ─── Carousel ─── */
  (() => {
    const root = $("[data-carousel]");
    if (!root) return;

    const slides = $$("[data-carousel-slide]", root);
    const dots   = $$("[data-carousel-dot]", root);
    const prev   = $("[data-carousel-prev]", root);
    const next   = $("[data-carousel-next]", root);
    if (slides.length < 2) return;

    const INTERVAL = 5000;
    let index = 0;
    let timer = null;
    let paused = false;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        const active = k === index;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((d, k) => {
        const active = k === index;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", String(active));
      });
    };

    const nextSlide = () => goTo(index + 1);
    const prevSlide = () => goTo(index - 1);

    const start = () => {
      if (paused || prefersReducedMotion) return;
      stop();
      timer = setInterval(nextSlide, INTERVAL);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    // Pausa al hover/focus
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    // Pausa cuando la pestaña no es visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else start();
    });

    // Controles manuales
    if (prev) prev.addEventListener("click", () => { prevSlide(); start(); });
    if (next) next.addEventListener("click", () => { nextSlide(); start(); });
    dots.forEach((d) => {
      d.addEventListener("click", () => {
        goTo(parseInt(d.dataset.carouselDot, 10) || 0);
        start();
      });
    });

    // Swipe en mobile
    let touchStartX = 0;
    let touchStartY = 0;
    root.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      stop();
    }, { passive: true });
    root.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? nextSlide() : prevSlide();
      }
      start();
    }, { passive: true });

    // Pausa si el usuario no quiere animación
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    paused = motionQuery.matches;
    motionQuery.addEventListener("change", (e) => {
      paused = e.matches;
      if (paused) stop(); else start();
    });

    start();
  })();
})();
