// Select sub-nav links
const subNavLinks = document.querySelectorAll('.sub-nav li a'); 
const sections = document.querySelectorAll('main section');

function updateActiveLink() {
    let currentSection = '';

    // --- Scrollspy logic (in-page sections) ---
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    subNavLinks.forEach(link => {
        link.classList.remove('active');

        // Case 1: in-page scrollspy highlight
        if (currentSection && link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });

    // --- Parent highlighting for Hotel Ops ---
    const currentPath = window.location.pathname.split('/').pop().split('?')[0];
    if (currentPath === 'debit.html') {
        const parentLi = document.querySelector('.side-nav a[href="debit.html"]')?.closest('li');
        if (parentLi) {
            const parentAnchor = parentLi.querySelector(':scope > a');
            parentAnchor?.classList.add('active-parent');
        }

        // If no section yet (top of page), default to first sub-nav
        if (!currentSection && subNavLinks.length > 0) {
            subNavLinks[0].classList.add('active');
        }
    }
}

// Run on scroll + on load
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('DOMContentLoaded', updateActiveLink);










// Sticky scroll text updater
const items = document.querySelectorAll(".scroll-item");
const headingEl = document.getElementById("case-heading");
const textEl = document.getElementById("case-text");
const nextProject = document.querySelector(".next-project");

// Observer just for heading/text
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const { heading, text } = entry.target.dataset;
      items.forEach((item) => item.classList.remove("active"));
      entry.target.classList.add("active");

      if (headingEl) headingEl.textContent = heading;
      if (textEl) textEl.textContent = text;
    });
  },
  {
    threshold: window.innerWidth < 768 ? 0.3 : 0.7
  }
);
items.forEach((item) => observer.observe(item));

// --- Handle Next Project button ---
const pdfItem = Array.from(items).find(i => i.querySelector('img')?.alt === 'Debit Note PDF');
const impactItem = document.querySelector('.scroll-item.impact');

if (pdfItem && impactItem && nextProject) {
  function updateNextProjectVisibility() {
    const pdfRect = pdfItem.getBoundingClientRect();
    const impactRect = impactItem.getBoundingClientRect();

    // Button shows if we've scrolled past the Debit Note PDF
    // AND have not scrolled past Impact
    const passedPDF = pdfRect.top <= window.innerHeight * 0.6;
    const beforeImpactEnd = impactRect.bottom > window.innerHeight * 0.2;

    if (passedPDF && beforeImpactEnd) {
      nextProject.classList.add('show');
    } else {
      nextProject.classList.remove('show');
    }
  }

  // Run once + on scroll/resize
  updateNextProjectVisibility();
  window.addEventListener('scroll', updateNextProjectVisibility, { passive: true });
  window.addEventListener('resize', updateNextProjectVisibility);
  window.addEventListener('orientationchange', () =>
    setTimeout(updateNextProjectVisibility, 200)
  );
}













 const menuBtn = document.querySelector('.menu-toggle');
  const sideNav = document.querySelector('.side-nav');

  menuBtn.addEventListener('click', () => {
    sideNav.classList.toggle('open');
  });

  document.querySelectorAll('.side-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (sideNav.classList.contains('open')) {
      sideNav.classList.remove('open');
    }
  });
});













// For mobile devices, inject heading/text inside each scroll-item
// Inject heading + text into each .scroll-item for mobile (robust)
function injectMobileText() {
  if (window.innerWidth >= 768) return; // only on mobile

  document.querySelectorAll(".scroll-item").forEach(item => {
    // don't inject twice
    if (item.dataset.mobileInjected === "1") return;

    const headingEl = document.createElement("h2");
    const textEl = document.createElement("p");

    headingEl.className = "mobile-heading";
    textEl.className = "mobile-text";

    headingEl.textContent = item.dataset.heading || "";
    textEl.textContent = item.dataset.text || "";

    // Prepend so heading -> text -> (existing image/video...) order is guaranteed
    item.prepend(textEl);
    item.prepend(headingEl);

    // mark injected
    item.dataset.mobileInjected = "1";

    // debug (remove if not needed)
    // console.log("Injected mobile text for:", item.querySelector("img")?.alt || item);
  });

  // hide sticky panel on mobile
  const stickyPanel = document.querySelector(".sticky-explanation");
  if (stickyPanel) stickyPanel.style.display = "none";
}

// run on load (ensures images/layout exist) and on resize/orientation
window.addEventListener("load", injectMobileText);
window.addEventListener("orientationchange", () => setTimeout(injectMobileText, 300));
window.addEventListener("resize", () => {
  // small debounce
  clearTimeout(window.__mobileInjectTimer);
  window.__mobileInjectTimer = setTimeout(injectMobileText, 150);
});



document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});


document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", e => {
    // Only handle internal links
    if (link.target === "_blank" || link.href.includes("#")) return;

    e.preventDefault();
    document.body.classList.remove("fade-in"); // triggers fade-out
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = link.href;
    }, 200); // match transition duration
  });
});
