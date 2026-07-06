/* ================================================
   STANNY HO — RESUME 2026
   Interactive JavaScript
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Cursor Glow Effect ----
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById("navbar");
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleNavScroll);
  handleNavScroll();

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // ---- Mobile Menu ----
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinksEl = document.getElementById("navLinks");
  const mobileOverlay = document.getElementById("mobileOverlay");

  const toggleMobile = () => {
    mobileMenuBtn.classList.toggle("active");
    navLinksEl.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    document.body.style.overflow = navLinksEl.classList.contains("active")
      ? "hidden"
      : "";
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobile);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", toggleMobile);
  }

  // Close mobile menu on link click
  navLinksEl.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksEl.classList.contains("active")) {
        toggleMobile();
      }
    });
  });

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // ---- Scroll Animations (IntersectionObserver) ----
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // ---- Typing Effect ----
  const typedTextEl = document.getElementById("typedText");
  const words = [
    "ASP.NET MVC",
    "Azure",
    "Azure OpenAI",
    "AI Foundry",
    "RAG",
    "MCP",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typedTextEl) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 300; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ---- Counter Animation ----
  const counterElements = document.querySelectorAll(
    ".highlight-number[data-count]",
  );

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"));
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counterElements.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const stepTime = duration / target;

    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, stepTime);
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
