(() => {
  "use strict";

  const navbarMarkup = [
    '<header class="nav">',
    '<div class="logo"><span class="dot"></span><div>',
    '<h1><a href="index.html">Suryamuralidhar Loganathan</a></h1>',
    '<p><a href="index.html">Architect | Interior Designer | 3D Visualizer</a></p>',
    '</div></div>',
    '<button class="nav-toggle" type="button" aria-controls="site-navigation" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button>',
    '<nav id="site-navigation" aria-label="Primary navigation">',
    '<a href="resume.html">Resume</a><a href="portfolio.html">Portfolio</a><a href="about.html">About</a><a href="contact.html">Contact</a>',
    '</nav></header><hr>'
  ].join("");

  const footerMarkup = [
    '<footer class="footer">',
    '<div><h4>Phone</h4><p><a href="tel:+919894565903">+91 98945-65903</a></p></div>',
    '<div><h4>Email</h4><p><a href="mailto:suryamuralidhar.offi@gmail.com">suryamuralidhar.offi@gmail.com</a></p></div>',
    '<div><h4>Follow Me</h4><div class="social">',
    '<a href="https://instagram.com/suryamurali_als_"><img src="icons/instagram.png"></a>',
    '<a href="https://www.facebook.com/suryamurali.als/"><img src="icons/facebook.png"></a>',
    '<a href="https://www.linkedin.com/in/suryamuralidhar"><img src="icons/linkedin.png"></a>',
    '</div></div></footer>'
  ].join("");

  function renderSharedLayout() {
    const navbarHost = document.getElementById("navbar");
    const footerHost = document.getElementById("footer");

    if (navbarHost) navbarHost.innerHTML = navbarMarkup;
    if (footerHost) footerHost.innerHTML = footerMarkup;
  }

  function initialiseNavigation() {
    const navigation = document.querySelector(".nav");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll(".nav nav a");
    const pageName = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === pageName) {
        link.setAttribute("aria-current", "page");
      }
    });

    if (!navigation || !navToggle) return;

    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  function initialiseReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = document.querySelectorAll([
      ".hero > *",
      ".about-intro > *",
      ".philosophy-card",
      ".tools-grid .tool",
      ".personal",
      ".hamradio",
      "section.portfolio > *",
      ".resume-header",
      ".summary",
      ".section",
      ".contact-intro",
      ".contact-card",
      ".location",
      ".footer > div"
    ].join(","));

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", String(Math.min(index % 6, 5) * 70) + "ms");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => observer.observe(element));
  }

  function initialiseInteractiveCards() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cards = document.querySelectorAll(".philosophy-card, .tool, .timeline-card, .edu-card, .skill, .cert-btn, .lang, .hobby, .contact-card, .circle, .portfolio-btn, .ham-btn, .download-btn");

    cards.forEach((card) => card.classList.add("interactive-card"));

    if (reduceMotion || !finePointer) return;

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        card.style.setProperty("--tilt-x", String(y * -2.2) + "deg");
        card.style.setProperty("--tilt-y", String(x * 2.2) + "deg");
        card.style.setProperty("--glow-x", String((x + 0.5) * 100) + "%");
        card.style.setProperty("--glow-y", String((y + 0.5) * 100) + "%");
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  function initialiseAmbientMotion() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", scrollable > 0 ? String(window.scrollY / scrollable) : "0");
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    if (reduceMotion || !finePointer) return;

    let frame = 0;
    window.addEventListener("pointermove", (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--mouse-x", String(event.clientX / window.innerWidth * 100) + "%");
        root.style.setProperty("--mouse-y", String(event.clientY / window.innerHeight * 100) + "%");
        frame = 0;
      });
    }, { passive: true });
  }

  renderSharedLayout();
  initialiseNavigation();
  initialiseReveal();
  initialiseInteractiveCards();
  initialiseAmbientMotion();
  document.documentElement.classList.add("js", "site-ready");
})();


/* Premium visual interactions: decorative only, no content or navigation changes. */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;

  function addAmbientStage() {
    if (document.querySelector(".ambient-stage")) return;
    const stage = document.createElement("div");
    stage.className = "ambient-stage";
    stage.setAttribute("aria-hidden", "true");
    stage.innerHTML = '<span class="ambient-orb orb-one"></span><span class="ambient-orb orb-two"></span><span class="ambient-orb orb-three"></span>';
    document.body.prepend(stage);
  }

  function addRipple(card, event) {
    const box = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "press-ripple";
    ripple.style.left = String(event.clientX - box.left) + "px";
    ripple.style.top = String(event.clientY - box.top) + "px";
    card.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  }

  function bindPremiumPointerEffects() {
    if (reducedMotion || !finePointer) return;

    document.addEventListener("pointerdown", (event) => {
      const target = event.target instanceof Element ? event.target.closest(".interactive-card") : null;
      if (target) addRipple(target, event);
    }, { passive: true });

    const nav = document.querySelector(".nav");
    if (nav) {
      nav.addEventListener("pointermove", (event) => {
        const box = nav.getBoundingClientRect();
        nav.style.setProperty("--nav-light-x", String((event.clientX - box.left) / box.width * 100) + "%");
        nav.style.setProperty("--nav-light-y", String((event.clientY - box.top) / box.height * 100) + "%");
      }, { passive: true });
    }

    let animationFrame = 0;
    window.addEventListener("pointermove", (event) => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--premium-x", String(event.clientX / window.innerWidth * 100) + "%");
        root.style.setProperty("--premium-y", String(event.clientY / window.innerHeight * 100) + "%");
        animationFrame = 0;
      });
    }, { passive: true });
  }

  addAmbientStage();
  bindPremiumPointerEffects();
})();
