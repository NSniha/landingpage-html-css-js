# Loodo — Privacy & Data Trust Platform

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/Framework-None-lightgrey?style=flat)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat)
![License](https://img.shields.io/badge/License-Not%20Specified-inactive?style=flat)

A responsive SaaS landing page concept for **Loodo**, a privacy and data-compliance platform. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Overview

Loodo's landing page automates the "trust story" a compliance SaaS product needs to tell: consent management, data protection, and regulatory compliance, presented through a full marketing funnel from hero to pricing to sign-up.

## Features

- **Interactive hero** with pointer-based parallax and a scrolling trusted-brands strip
- **Scroll-reveal animations** across every major section, powered by `IntersectionObserver`
- **Animated stat counters** that count up into view on the trust section
- **Draggable / swipeable pricing table** for touch and pointer input
- **Accessible mobile navigation drawer** with focus trapping and keyboard (Esc) support
- **Smooth-scroll anchor navigation** between sections
- **Newsletter signup** with client-side email validation
- Fully responsive layout, semantic HTML, and ARIA labelling throughout

## Sections

| Section | Purpose |
|---|---|
| Hero | Value proposition, primary CTAs, trusted-brand logos |
| Compliance / Solutions | Core product capabilities |
| Use Cases | Industries and teams the platform serves |
| Trust | Social proof with animated stats |
| How It Works | 3-step onboarding process |
| Customer Stories | Testimonial marquee |
| Pricing | Plan comparison table |
| Footer | Site navigation, newsletter signup, legal links |

## Tech Stack

- HTML5 (semantic markup, ARIA)
- CSS3 (custom properties, Grid/Flexbox, animations)
- Vanilla JavaScript (ES6+, no dependencies)
- [Ionicons](https://ionic.io/ionicons) for iconography
- Google Fonts — Manrope & Italianno

## Project Structure

```
landingpage-html-css-js/
├── assets/
│   ├── images/       # Photography, hero background
│   └── svg/          # Brand logos and icons
├── css/
│   └── style.css      # All styling
├── js/
│   └── script.js       # All interactivity
└── index.html          # Markup and content
```

## Getting Started

Clone the repo and open `index.html` directly, or serve it locally:

```bash
git clone https://github.com/NSniha/landingpage-html-css-js.git
cd landingpage-html-css-js
```

Then open `index.html` in your browser, or run a local server:

```bash
npx serve .
```

No build tools or dependencies required.

## Roadmap

- [ ] Final CTA banner section before the footer
- [ ] Live GitHub Pages deployment link

## Author

**Niha** — [@NSniha](https://github.com/NSniha)
Frontend developer building landing pages and UI concepts. 

## License

No license specified yet — all rights reserved by default until one is added.
