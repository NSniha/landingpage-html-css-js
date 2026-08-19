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



/* Compliance section reveal */

const complianceRevealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-feature"
);

if (complianceRevealElements.length) {
  if (prefersReducedMotion) {
    complianceRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const complianceObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -55px"
      }
    );

    complianceRevealElements.forEach((element) => {
      complianceObserver.observe(element);
    });
  }
}


/* Interactive feature cards */

const complianceFeatures = document.querySelectorAll(
  ".compliance-feature"
);

const activateComplianceFeature = (selectedFeature) => {
  complianceFeatures.forEach((feature) => {
    feature.classList.remove("is-active");
  });

  selectedFeature.classList.add("is-active");
};

complianceFeatures.forEach((feature) => {
  feature.addEventListener("click", () => {
    activateComplianceFeature(feature);
  });

  feature.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    activateComplianceFeature(feature);
  });
});


/* Subtle image movement */

const complianceMedia = document.querySelector(
  ".compliance-image-wrap"
);

if (complianceMedia && !prefersReducedMotion) {
  complianceMedia.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 920) {
      return;
    }

    const bounds = complianceMedia.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / bounds.width - 0.5;

    const y =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    const moveX = x * -8;
    const moveY = y * -6;

    const image = complianceMedia.querySelector(
      ".compliance-image"
    );

    image.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0) scale(1.075)`;
  });

  complianceMedia.addEventListener("pointerleave", () => {
    const image = complianceMedia.querySelector(
      ".compliance-image"
    );

    image.style.transform = "";
  });
}




/* Use cases reveal */

const useCaseRevealElements = document.querySelectorAll(
  ".use-cases-reveal, .use-case-reveal"
);

if (useCaseRevealElements.length) {
  if (prefersReducedMotion) {
    useCaseRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const useCasesObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -55px"
      }
    );

    useCaseRevealElements.forEach((element) => {
      useCasesObserver.observe(element);
    });
  }
}


/* Use case interaction */

const useCaseCards = document.querySelectorAll(".use-case-card");

const setActiveUseCase = (selectedCard) => {
  useCaseCards.forEach((card) => {
    card.classList.remove("is-active");
  });

  selectedCard.classList.add("is-active");
};

useCaseCards.forEach((card) => {
  card.addEventListener("click", () => {
    setActiveUseCase(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    setActiveUseCase(card);
  });
});



/* Trust section reveal */

const trustRevealElements = document.querySelectorAll(
  ".trust-header-reveal, .trust-card-reveal"
);

if (trustRevealElements.length) {
  if (prefersReducedMotion) {
    trustRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const trustRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -50px"
      }
    );

    trustRevealElements.forEach((element) => {
      trustRevealObserver.observe(element);
    });
  }
}


/* Animated statistics */

const trustCounters = document.querySelectorAll(".trust-number");

const animateTrustCounter = (counter) => {
  if (counter.dataset.counted === "true") {
    return;
  }

  counter.dataset.counted = "true";

  const target = Number(counter.dataset.counter);
  const decimals = Number(counter.dataset.decimals || 0);
  const suffix = counter.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress =
      1 - Math.pow(1 - progress, 4);

    const currentValue = target * easedProgress;

    counter.textContent =
      `${currentValue.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
      return;
    }

    counter.textContent =
      `${target.toFixed(decimals)}${suffix}`;
  };

  requestAnimationFrame(updateCounter);
};


if (trustCounters.length) {
  if (prefersReducedMotion) {
    trustCounters.forEach((counter) => {
      const target = Number(counter.dataset.counter);
      const decimals = Number(counter.dataset.decimals || 0);
      const suffix = counter.dataset.suffix || "";

      counter.textContent =
        `${target.toFixed(decimals)}${suffix}`;
    });
  } else {
    const trustCounterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateTrustCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.65
      }
    );

    trustCounters.forEach((counter) => {
      trustCounterObserver.observe(counter);
    });
  }
}



/* How it works reveal */

const processRevealElements = document.querySelectorAll(
  ".process-header-reveal, .process-card-reveal"
);

if (processRevealElements.length) {
  if (prefersReducedMotion) {
    processRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const processRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -50px"
      }
    );

    processRevealElements.forEach((element) => {
      processRevealObserver.observe(element);
    });
  }
}


/* Interactive process cards */

const processCards = document.querySelectorAll(".process-card");

const activateProcessCard = (selectedCard) => {
  processCards.forEach((card) => {
    card.classList.remove("is-active");
  });

  selectedCard.classList.add("is-active");
};

processCards.forEach((card) => {
  card.addEventListener("click", () => {
    activateProcessCard(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    activateProcessCard(card);
  });
});




/* Customer stories reveal */

const storiesRevealElements = document.querySelectorAll(
  ".stories-header-reveal, .stories-marquee-reveal"
);

if (storiesRevealElements.length) {
  if (prefersReducedMotion) {
    storiesRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const storiesObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px"
      }
    );

    storiesRevealElements.forEach((element) => {
      storiesObserver.observe(element);
    });
  }
}


/* Pause marquee while interacting */

const storiesMarquee = document.querySelector(".stories-marquee");

if (storiesMarquee) {
  storiesMarquee.addEventListener("focusin", () => {
    storiesMarquee.classList.add("is-paused");
  });

  storiesMarquee.addEventListener("focusout", () => {
    storiesMarquee.classList.remove("is-paused");
  });
}


/* Drag interaction */

const storyRows = document.querySelectorAll("[data-marquee]");

storyRows.forEach((row) => {
  const track = row.querySelector(".stories-track");

  if (!track || prefersReducedMotion) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const getPointerX = (event) => {
    if (event.touches?.length) {
      return event.touches[0].clientX;
    }

    return event.clientX;
  };

  const startDrag = (event) => {
    isDragging = true;
    startX = getPointerX(event);

    storiesMarquee?.classList.add("is-dragging");

    track.style.animationPlayState = "paused";

    row.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!isDragging) {
      return;
    }

    const pointerX = getPointerX(event);
    const distance = pointerX - startX;

    currentX = Math.max(
      -130,
      Math.min(130, distance)
    );

    track.style.translate = `${currentX}px 0`;
  };

  const endDrag = () => {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    storiesMarquee?.classList.remove("is-dragging");

    track.style.transition =
      "translate 650ms cubic-bezier(0.16, 1, 0.3, 1)";

    track.style.translate = "0 0";

    window.setTimeout(() => {
      track.style.transition = "";
      track.style.animationPlayState = "";
      currentX = 0;
    }, 660);
  };

  row.addEventListener("pointerdown", startDrag);
  row.addEventListener("pointermove", moveDrag);
  row.addEventListener("pointerup", endDrag);
  row.addEventListener("pointercancel", endDrag);
  row.addEventListener("pointerleave", endDrag);
});



/* Pricing section reveal */

const pricingRevealElements = document.querySelectorAll(
  ".pricing-header-reveal, .pricing-item-reveal, .pricing-table-reveal"
);

if (pricingRevealElements.length) {
  if (prefersReducedMotion) {
    pricingRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const pricingObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px"
      }
    );

    pricingRevealElements.forEach((element) => {
      pricingObserver.observe(element);
    });
  }
}


/* Pricing card interaction */

const pricingPlans = document.querySelectorAll(".pricing-plan");

pricingPlans.forEach((plan) => {
  plan.addEventListener("click", (event) => {
    if (event.target.closest(".pricing-action")) {
      return;
    }

    pricingPlans.forEach((item) => {
      item.classList.remove("is-selected");
    });

    plan.classList.add("is-selected");
  });
});


/* Pricing actions */

const pricingActions = document.querySelectorAll(
  "[data-pricing-action]"
);

pricingActions.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.closest(".pricing-plan");

    if (!plan) {
      return;
    }

    pricingPlans.forEach((item) => {
      item.classList.remove("is-selected");
    });

    plan.classList.add("is-selected");
  });
});




