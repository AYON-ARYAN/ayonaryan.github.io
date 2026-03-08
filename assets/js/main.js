/**
 * Ayon Aryan — Personal Portfolio
 * Main JavaScript
 */

(function () {
  "use strict";

  /* ========== PRELOADER ========== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /* ========== NAVBAR — SCROLL HIDE/SHOW ========== */
  const navbar = document.getElementById("navbar");
  let lastScrollY = 0;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  document.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  /* ========== MOBILE NAV TOGGLE ========== */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ========== SCROLLSPY ========== */
  const navAnchors = document.querySelectorAll(".nav-links a");
  function scrollspy() {
    const scrollPos = window.scrollY + 200;
    navAnchors.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navAnchors.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("load", scrollspy);
  document.addEventListener("scroll", scrollspy);

  /* ========== SCROLL TOP BUTTON ========== */
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  if (scrollTopBtn) {
    function toggleScrollTop() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /* ========== CURSOR GLOW ========== */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = 0,
      mouseY = 0;
    let glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add("active");
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ========== AOS INIT ========== */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
      });
    }
  });

  /* ========== TYPED.JS ========== */
  window.addEventListener("load", () => {
    const typedEl = document.querySelector(".typed");
    if (typedEl && typeof Typed !== "undefined") {
      const items = typedEl.getAttribute("data-typed-items").split(",");
      new Typed(".typed", {
        strings: items,
        loop: true,
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        showCursor: false,
      });
    }
  });

  /* ========== GLIGHTBOX ========== */
  window.addEventListener("load", () => {
    if (typeof GLightbox !== "undefined") {
      GLightbox({ selector: ".glightbox" });
    }
  });

  /* ========== ISOTOPE ========== */
  window.addEventListener("load", () => {
    document
      .querySelectorAll(".isotope-layout")
      .forEach(function (isotopeItem) {
        const layout = isotopeItem.getAttribute("data-layout") || "masonry";
        const filter = isotopeItem.getAttribute("data-default-filter") || "*";
        const sort = isotopeItem.getAttribute("data-sort") || "original-order";

        let iso;
        if (
          typeof imagesLoaded !== "undefined" &&
          typeof Isotope !== "undefined"
        ) {
          imagesLoaded(
            isotopeItem.querySelector(".isotope-container"),
            function () {
              iso = new Isotope(
                isotopeItem.querySelector(".isotope-container"),
                {
                  itemSelector: ".isotope-item",
                  layoutMode: layout,
                  filter: filter,
                  sortBy: sort,
                },
              );
            },
          );

          isotopeItem
            .querySelectorAll(".isotope-filters button")
            .forEach(function (btn) {
              btn.addEventListener("click", function () {
                isotopeItem
                  .querySelector(".isotope-filters .filter-active")
                  .classList.remove("filter-active");
                this.classList.add("filter-active");
                if (iso) {
                  iso.arrange({ filter: this.getAttribute("data-filter") });
                }
              });
            });
        }
      });
  });

  /* ========== SMOOTH SCROLL FOR HASH LINKS ========== */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });
})();
