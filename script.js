document.addEventListener("DOMContentLoaded", () => {
// Select elements
const toggleBtn = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// 1. Toggle menu
toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// 2. Close menu when clicking any link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const links = document.querySelectorAll(".nav-menu a");

// Get current page file name
const currentPage = window.location.pathname.split("/").pop();

links.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

  // 4. Reveal Animation Logic (for all sections)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        entry.target.style.filter = "blur(0px)";
      }
    });
  }, observerOptions);

  // Apply reveal to sections
  document.querySelectorAll("section:not(.hero)").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px) scale(0.98)";
    section.style.filter = "blur(4px)";
    section.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(section);
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
});
