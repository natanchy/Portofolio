document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Feather Icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Hamburger Menu Toggle
  const hamburger = document.querySelector("#hamburger-menu");
  const navbarNav = document.querySelector(".navbar-nav");

  if (hamburger && navbarNav) {
    hamburger.onclick = (e) => {
      e.preventDefault();
      navbarNav.classList.toggle("active");
      hamburger.classList.toggle("active");
    };

    // Klik di luar navbar / hamburger untuk menutup menu
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // Smooth scroll untuk navigasi dengan offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80; // Offset untuk navbar fixed
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Tutup navbar mobile setelah klik link
        if (navbarNav) {
          navbarNav.classList.remove("active");
        }
        if (hamburger) {
          hamburger.classList.remove("active");
        }
      }
    });
  });

  // Typewriter Effect
  const typingElement = document.querySelector(".typing");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    // Start typing effect
    setTimeout(type, 500);
  }

  // Journey Tab Switcher
  const journeyData = {
    udinus: {
      title: "Expanding the Network",
      duration: "2024 - Present",
      description: "Expanding my knowledge in Computer Science at Universitas Dian Nuswantoro. Actively diving deep into programming, software engineering principles, web development frameworks, and database management, while continuing my passion for networking and cybersecurity."
    },
    smk: {
      title: "Building the Foundation",
      duration: "2021 - 2024",
      description: "Started my technology journey at SMK PGRI 1 Tayu majoring in Computer and Network Engineering (TKJ). Acquired solid hands-on knowledge about networking hardware, configuration of routers/switches (MikroTik, Cisco), Linux server administrations, and basic programming concepts."
    }
  };

  const tabButtons = document.querySelectorAll(".journey-nav .nav-box");
  const journeyTitle = document.querySelector("#journey-title");
  const journeyDuration = document.querySelector("#journey-duration");
  const journeyDescription = document.querySelector("#journey-description");
  const journeyMain = document.querySelector("#journey-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      if (!journeyData[tab]) return;

      // Update active button class
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Transisi konten dengan fade-out & fade-in
      if (journeyMain) {
        journeyMain.style.opacity = "0";
        journeyMain.style.transform = "translateY(10px)";
        journeyMain.style.transition = "all 0.3s ease";

        setTimeout(() => {
          if (journeyTitle) journeyTitle.textContent = journeyData[tab].title;
          if (journeyDuration) journeyDuration.textContent = journeyData[tab].duration;
          if (journeyDescription) journeyDescription.textContent = journeyData[tab].description;

          journeyMain.style.opacity = "1";
          journeyMain.style.transform = "translateY(0)";
        }, 300);
      }
    });
  });

  // Projects Filter Interactivity
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Set active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          // Memicu reflow untuk efek transisi fade-in
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Animasi Scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target); // Hanya menembakkan animasi sekali saja
      }
    });
  }, observerOptions);

  // Ambil semua section dan card untuk di-observe
  const animateElements = document.querySelectorAll(
    "section, .cert-card, .project-card, .info-card, .contact-form"
  );
  
  animateElements.forEach((el) => {
    el.classList.add("fade-on-scroll");
    observer.observe(el);
  });
});

