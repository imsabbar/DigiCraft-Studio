'use strict';


/** 
 * Helper function for adding events 
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


// Mobile menu toggle
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "";
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

addEventOnElem(navbarLinks, "click", closeNavbar);


// Header scroll effect
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);


/** 
 * Portfolio filtering logic 
 */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectCards = document.querySelectorAll(".project-card");

const filterProjects = function () {
  const filterValue = this.getAttribute("data-filter-btn");

  filterBtns.forEach(btn => btn.classList.remove("active"));
  this.classList.add("active");

  projectCards.forEach(card => {
    const category = card.getAttribute("data-category");
    
    if (filterValue === "all" || category === filterValue) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 10);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

projectCards.forEach(card => {
  card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

addEventOnElem(filterBtns, "click", filterProjects);


// Form handling
const contactForm = document.querySelector(".contact-form");
const newsletterForm = document.querySelector(".newsletter-form");

const handleFormSubmit = function (e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  /** 
   * Show success message 
   */
  const btn = this.querySelector(".btn");
  const originalText = btn.querySelector(".span").textContent;
  btn.querySelector(".span").textContent = "Sent!";
  btn.style.pointerEvents = "none";
  
  setTimeout(() => {
    btn.querySelector(".span").textContent = originalText;
    btn.style.pointerEvents = "";
    this.reset();
  }, 2000);
  
  console.log("Form submitted:", data);
}

if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", handleFormSubmit);
}


/** 
 * Scroll reveal animation observer 
 */
const revealElements = document.querySelectorAll('.service-card, .feature-card, .project-card, .contact-item');

const revealOnScroll = function () {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();