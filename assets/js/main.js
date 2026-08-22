/* Onamma Nwosu — Portfolio interactions */
(function () {
  "use strict";

  /* ---- Sticky nav state + mobile menu ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var toggle = nav.querySelector(".nav__toggle");
    var setScrolled = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll(".nav__links a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---- Highlight the current page in the nav ---- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (link) {
    if (link.getAttribute("href") === here) link.setAttribute("aria-current", "page");
  });

  /* ---- Scroll reveal ---- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealables.forEach(function (el, i) {
      if (!el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", (i % 4) * 90 + "ms");
      }
      observer.observe(el);
    });
  }

  /* ---- Count-up statistics ---- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObserver.unobserve(el);

        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 1300;
        var started = null;

        var step = function (now) {
          if (started === null) started = now;
          var progress = Math.min((now - started) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---- Contact form (static site: no backend, hand off to mail client) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var status = form.querySelector("[data-form-status]");

      if (!name || !email || !message) {
        if (status) status.textContent = "Please fill in every field before sending.";
        return;
      }

      var body = "From: " + name + " (" + email + ")\n\n" + message;
      window.location.href =
        "mailto:onanwosu18373@gmail.com" +
        "?subject=" + encodeURIComponent("Portfolio enquiry from " + name) +
        "&body=" + encodeURIComponent(body);

      if (status) status.textContent = "Opening your mail app…";
      form.reset();
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
