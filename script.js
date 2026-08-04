/* PULSE FITNESS — shared interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          const tick = () => {
            cur += step;
            if (cur >= target) {
              el.textContent = target.toLocaleString() + suffix;
            } else {
              el.textContent = cur.toLocaleString() + suffix;
              requestAnimationFrame(tick);
            }
          };
          tick();
          cObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cObs.observe(c));
  }

  // Contact form (client-side demo handling)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".form-note");
      const name = form.querySelector("#name");
      if (note) {
        note.textContent =
          "Thanks" + (name && name.value ? ", " + name.value.split(" ")[0] : "") +
          "! Your message has been received. We'll be in touch within 24 hours. 💪";
        note.classList.add("ok");
      }
      form.reset();
    });
  }

  // Newsletter (footer)
  document.querySelectorAll(".newsletter").forEach((nl) => {
    nl.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = nl.querySelector("input");
      const btn = nl.querySelector("button");
      if (input && input.value) {
        if (btn) btn.textContent = "Subscribed ✓";
        input.value = "";
        setTimeout(() => { if (btn) btn.textContent = "Join"; }, 2500);
      }
    });
  });

  // Footer year
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
