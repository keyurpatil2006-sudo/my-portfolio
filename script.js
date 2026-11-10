
// ==========================================
// PROJECT DATA
// ==========================================

const projectData = {
  launchpad: {
    image: 'assets/launchpad.png',
    alt: 'LaunchPad project artwork',
    description: 'A demo job and internship platform where candidates find their next move and employers can open the door.',
    type: 'WEB PLATFORM',
    year: '2025',
    link: 'https://launchpad-job-portal-1.onrender.com/',
    linkText: 'Visit live project ↗'
  },

  ebusinessbazaar: {
    image: 'assets/ebusinessbazaar.png',
    alt: 'EbusinessBazaar project artwork',
    description: 'A cleaner ecommerce experience with sharper discovery, calmer product browsing, and a more confident visual system.',
    type: 'ECOMMERCE REDESIGN',
    year: '2025',
    link: '#contact',
    linkText: 'Discuss the redesign ↗'
  },

  wakeupskills: {
    image: 'assets/wakeupskills.png',
    alt: 'WakeupSkills project artwork',
    description: 'A focused learning space that helps people turn curiosity into a repeatable, practical skill-building habit.',
    type: 'LEARNING PLATFORM',
    year: '2025',
    link: '#contact',
    linkText: 'Discuss the platform ↗'
  }
};


// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}


// ==========================================
// SMOOTH BACK TO TOP
// ==========================================

document.querySelectorAll('a[href="#top"]').forEach(topLink => {

  topLink.addEventListener('click', event => {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    history.replaceState(null, '', '#top');

  });

});


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {

  menuToggle.addEventListener('click', () => {

    const open = nav.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', open);

  });

  nav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      nav.classList.remove('is-open');

      menuToggle.setAttribute('aria-expanded', 'false');

    });

  });

}


// ==========================================
// PROJECT SWITCHING
// ==========================================

const projectImage = document.querySelector('#project-image');
const projectDescription = document.querySelector('#project-description');
const projectType = document.querySelector('#project-type');
const projectYear = document.querySelector('#project-year');
const projectLink = document.querySelector('#project-link');

document.querySelectorAll('.project-row').forEach(row => {

  const activate = () => {

    const data = projectData[row.dataset.project];

    if (!data || row.classList.contains('is-active')) return;

    document.querySelectorAll('.project-row').forEach(item => {
      item.classList.remove('is-active');
    });

    row.classList.add('is-active');

    if (projectImage) {

      projectImage.style.opacity = '0';

      window.setTimeout(() => {

        projectImage.src = data.image;
        projectImage.alt = data.alt;

        if (projectDescription) {
          projectDescription.textContent = data.description;
        }

        if (projectType) {
          projectType.textContent = data.type;
        }

        if (projectYear) {
          projectYear.textContent = data.year;
        }

        if (projectLink) {
          projectLink.href = data.link;
          projectLink.textContent = data.linkText;
        }

        projectImage.style.opacity = '1';

      }, 180);

    }

  };

  row.addEventListener('mouseenter', activate);
  row.addEventListener('focus', activate);
  row.addEventListener('click', activate);

});


// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

const form = document.querySelector('#contact-form');

if (form) {

  form.addEventListener('submit', event => {

    event.preventDefault();

    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {

      const label = field.closest('label');

      const empty = !field.value.trim();

      const badEmail =
        field.type === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      const hasError = empty || badEmail;

      label.classList.toggle('has-error', hasError);

      label.querySelector('.error-message').textContent =
        empty ? 'Required' :
        badEmail ? 'Use a valid email' : '';

      if (hasError) valid = false;

    });

    const status = form.querySelector('.form-status');

    if (valid) {

      status.textContent =
        'Thanks — your message is ready to be sent. I’ll get back to you soon.';

      form.reset();

    }

  });

}


// ==========================================
// CUSTOM CURSOR
// ==========================================

const cursorSignal = document.querySelector('.cursor-signal');

if (
  cursorSignal &&
  window.matchMedia('(pointer: fine)').matches
) {

  window.addEventListener('pointermove', event => {

    cursorSignal.style.left = `${event.clientX}px`;
    cursorSignal.style.top = `${event.clientY}px`;

  }, { passive: true });

  document.querySelectorAll('a, button, input, textarea').forEach(element => {

    element.addEventListener('pointerenter', () => {
      cursorSignal.classList.add('is-hovering');
    });

    element.addEventListener('pointerleave', () => {
      cursorSignal.classList.remove('is-hovering');
    });

  });

}


// ==========================================
// CONTINUOUS CINEMATIC BACKGROUND ENGINE
// ==========================================

// Background image sequence.
// The first image (hero.png) remains in the HTML.
// about-bg.png will be visible behind the hero
// from the very beginning.

const journeyBackgrounds = {

  '.intro-section': [
    'assets/about-bg.png',
    'center 42%'
  ],

  '.skills-section': [
    'assets/toolkit-bg.png',
    'center 48%'
  ],

  '.projects-section': [
    'assets/projects-bg.png',
    'center 50%'
  ],

  '.making-section': [
    'assets/scene-05.png',
    'center 52%'
  ],

  '.studio-section': [
    'assets/scene-06.png',
    'center 48%'
  ],

  '.principles-section': [
    'assets/scene-07.png',
    'center 42%'
  ],

  '.quote-section': [
    'assets/scene-07.png',
    'center 55%'
  ],

  '.contact-section': [
    'assets/scene-07.png',
    'center 65%'
  ],

  '.form-section': [
    'assets/scene-07.png',
    'center 78%'
  ],

  '.site-footer': [
    'assets/scene-07.png',
    'center 90%'
  ]

};


// ==========================================
// BACKGROUND CONFIGURATION
// ==========================================

const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

const smoothStep = value => {

  const t = Math.max(0, Math.min(1, value));

  return t * t * (3 - 2 * t);

};


// ==========================================
// CREATE SHARED BACKGROUND CONTAINER
// ==========================================

const journeyWorld = document.createElement('div');

journeyWorld.className = 'journey-world';

journeyWorld.setAttribute('aria-hidden', 'true');

document.body.appendChild(journeyWorld);

document.body.classList.add('has-journey-world');


// ==========================================
// CREATE LANDSCAPE IMAGE LAYERS
// ==========================================

const journeyLayers = [];

Object.entries(journeyBackgrounds).forEach(
  ([selector, settings]) => {

    const section = document.querySelector(selector);

    if (!section) return;

    const [image, position] = settings;

    section.classList.add('journey-section');

    const layer = document.createElement('div');

    layer.className = 'journey-world__layer';

    layer.style.backgroundImage = `url("${image}")`;

    layer.style.backgroundPosition = position;

    layer.style.opacity = '0';

    journeyWorld.appendChild(layer);

    journeyLayers.push({
      section,
      layer,
      image,
      position
    });

  }
);


// ==========================================
// PRELOAD ALL LANDSCAPE IMAGES
// ==========================================

journeyLayers.forEach(({ image }) => {

  const preload = new Image();

  preload.src = image;

});


// ==========================================
// CONTINUOUS SCROLL CROSSFADE
// ==========================================

let journeyFrame = null;

const updateJourneyWorld = () => {

  journeyFrame = null;

  if (!journeyLayers.length) return;

  const viewportHeight = window.innerHeight;

  // Background transition timing

  const scenePoint =
    window.scrollY + viewportHeight * 0.35;

  const overlap = Math.min(
    280,
    viewportHeight * 0.30
  );


  // Calculate section positions

  const bounds = journeyLayers.map(({ section }) => {

    const rect = section.getBoundingClientRect();

    const top = rect.top + window.scrollY;

    return {
      top,
      bottom: top + rect.height
    };

  });


  // Update each landscape layer

  journeyLayers.forEach(({ layer }, index) => {

    const current = bounds[index];

    let fadeIn;

    /*
      IMPORTANT:
      The first background (about-bg.png)
      must remain visible from the very top.

      The hero image sits above it and its bottom
      mask gradually reveals this background.
    */

    if (index === 0) {

      fadeIn = 1;

    } else {

      fadeIn = smoothStep(
        (
          scenePoint -
          (current.top - overlap)
        ) /
        (overlap * 2)
      );

    }


    // Fade out when the following landscape arrives

    let fadeOut = 1;

    if (index < bounds.length - 1) {

      const next = bounds[index + 1];

      fadeOut = 1 - smoothStep(
        (
          scenePoint -
          (next.top - overlap)
        ) /
        (overlap * 2)
      );

    }


    // Final image opacity

    const opacity = fadeIn * fadeOut;

    layer.style.opacity = opacity.toFixed(3);


    // Subtle parallax

    const sectionCenter =
      (current.top + current.bottom) / 2;

    const distance =
      viewportHeight / 2 -
      (sectionCenter - window.scrollY);

    const parallax = reducedMotion.matches
      ? 0
      : Math.max(
          -22,
          Math.min(22, distance * 0.025)
        );

    const scale = reducedMotion.matches
      ? 1.02
      : 1.05;

    layer.style.transform =
      `translate3d(0, ${parallax.toFixed(2)}px, 0) scale(${scale})`;

  });


  // ========================================
  // KEEP THE SHARED BACKGROUND VISIBLE
  // FROM THE VERY BEGINNING
  // ========================================

  journeyWorld.style.opacity = '1';

};


// ==========================================
// OPTIMIZED SCROLL UPDATES
// ==========================================


const requestJourneyUpdate = () => {

  if (!journeyFrame) {

    journeyFrame = window.requestAnimationFrame(
      updateJourneyWorld
    );

  }

};

window.addEventListener(
  'scroll',
  requestJourneyUpdate,
  { passive: true }
);

window.addEventListener(
  'resize',
  requestJourneyUpdate,
  { passive: true }
);


// ==========================================
// INITIALIZE BACKGROUND
// ==========================================

window.addEventListener(
  'load',
  requestJourneyUpdate
);

// Initial render: both hero and second image
// are available immediately.

requestJourneyUpdate();



/* ==========================================
   CONTACT FORM SCROLL REVEAL
   ========================================== */

const contactSection = document.querySelector('.form-section');

if (contactSection) {
    if ('IntersectionObserver' in window) {
        const contactObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        contactSection.classList.add('is-visible');
                        observer.unobserve(contactSection);
                    }
                });
            },
            { threshold: 0.15 }
        );

        contactObserver.observe(contactSection);
    } else {
        contactSection.classList.add('is-visible');
    }
}
