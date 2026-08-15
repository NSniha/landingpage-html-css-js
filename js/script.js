"use strict";

const body = document.body;
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const menuClose = document.querySelector(".mobile-menu-close");
const mobileNav = document.querySelector(".mobile-navigation");
const mobileOverlay = document.querySelector(".mobile-nav-overlay");
const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* Page entrance */

const initializePage = () => {
  requestAnimationFrame(() => {
    body.classList.add("is-ready");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}


/* Mobile navigation */

const openMenu = () => {
  mobileNav.classList.add("is-open");
  mobileOverlay.classList.add("is-open");
  body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
  mobileOverlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    menuClose.focus();
  }, 250);
};

const closeMenu = () => {
  mobileNav.classList.remove("is-open");
  mobileOverlay.classList.remove("is-open");
  body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  mobileOverlay.setAttribute("aria-hidden", "true");
};

menuToggle?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
mobileOverlay?.addEventListener("click", closeMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
    closeMenu();
    menuToggle.focus();
  }
});


/* Close drawer when switching to desktop */

window.addEventListener("resize", () => {
  if (window.innerWidth > 920 && mobileNav.classList.contains("is-open")) {
    closeMenu();
  }
});


/* Hero mouse parallax */

if (hero && !prefersReducedMotion) {
  hero.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 920) {
      return;
    }

    const bounds = hero.getBoundingClientRect();

    const relativeX =
      (event.clientX - bounds.left) / bounds.width - 0.5;

    const relativeY =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    const movementX = relativeX * -10;
    const movementY = relativeY * -8;

    hero.style.setProperty("--hero-x", `${movementX}px`);
    hero.style.setProperty("--hero-y", `${movementY}px`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0px");
    hero.style.setProperty("--hero-y", "0px");
  });
}


/* Smooth anchor navigation */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});