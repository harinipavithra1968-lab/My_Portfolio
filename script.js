const header = document.querySelector(".header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");
const year = document.getElementById("year");

// Mobile navigation
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Header + back-to-top button
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  topBtn.classList.toggle("show", window.scrollY > 500);
});

// Back to top
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Current year
year.textContent = new Date().getFullYear();

// Project filtering
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const selected = filter.dataset.filter;

    projects.forEach(project => {
      const category = project.dataset.category;
      const shouldShow = selected === "all" || category === selected;
      project.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Reveal animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Highlight navigation link according to current section
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => link.classList.remove("active"));
        const current = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (current) current.classList.add("active");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach(section => sectionObserver.observe(section));
