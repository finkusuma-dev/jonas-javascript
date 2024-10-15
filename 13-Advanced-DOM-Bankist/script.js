const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// const nav = document.querySelector('.nav');
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log('s1coords', s1coords);

  console.log('e.target', e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling;
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////
// Tab scroll

/// Attach onClick event handler on each of the tab button
///
// document.querySelectorAll('.nav__link').forEach(function (navLink) {
//   console.log('nav__link', navLink);
/// Get the string of section id
// const sectionId = navLink.getAttribute('href'); // ex: '#section--1'
// console.log('href', sectionId);

// if (!!sectionId.replace('#', '').trim()) {
//   /// Add click event listener
//   navLink.addEventListener('click', function (e) {
//     /// Prevent default behaviour of clicking: href=#section--1
//     e.preventDefault();

//     /// Scroll to section
//     document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
//   });
// }
// });

/// Using Event Delegation. Add event handler on the parent.
/// 1. Add event handler to the common parent element.
/// 2. Determine what element originated the event.
///
document.querySelector('.nav__links').addEventListener('click', function (e) {
  /// e.currentTarget is the element who has the event handler (nav_links)
  //
  // console.log('e.currentTarget', e.currentTarget);

  /// e.target is the nav_link
  console.log('e.target', e.target);

  /// Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href'); // ex: '#section--1'
    console.log('sectionId', sectionId);
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////
// DOM Traversing

/// ## Going Down
/* const h1 = document.querySelector('h1');

/// Selecting elements inside some element
console.log('.highlight', h1.querySelectorAll('.highlight'));

/// Selecting all child Nodes
console.log('child nodes', h1.childNodes);

/// first child node
console.log('firstChild', h1.firstChild);
console.log('lastChild', h1.lastChild);

/// Selecting direct children elements (live)
console.log('children', h1.children);

/// first element in the children
console.log('firstElementChild', h1.firstElementChild);
console.log('lastElementChild', h1.lastElementChild);

/// ## Going Up
console.log('parentNode', h1.parentNode);
console.log('parentElement', h1.parentElement);

/// Closest parent element
console.log('closest header', h1.closest('.header'));
/// The closest parent element of is itself
console.log('closest header', h1.closest('h1'));

/// ## Going Sideways
console.log('previousElementSibling', h1.previousElementSibling);
console.log('nextElementSibling', h1.nextElementSibling);

/// Previous & next sibling of parent child nodes
/// This is not too useful
console.log('previousSibling', h1.previousSibling);
console.log('nextSibling', h1.nextSibling);
console.log('parentElement.childNodes', h1.parentElement.childNodes);

/// To get all the siblings (including itself)
console.log('all siblings', h1.parentElement.children);

/// To get all the siblings except itself
console.log(
  'all siblings except itself',
  [...h1.parentElement.children].filter(el => el != h1)
);
 */
///////////////////////////////
// Tab Components
//
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // console.log('click', e.target);

  /// if span is clicked
  // const tabClicked = e.target.classList.contains('operations__tab')
  //   ? e.target
  //   : undefined;

  /// get the closest (parent) tab  of clicked target
  const tabClicked = e.target.closest('.operations__tab');
  console.log('tabClicked', tabClicked, 'target', e.target);

  if (!tabClicked) return;

  const tabNumber = tabClicked.dataset.tab;

  /// Remove active class
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // Set active tab
  tabClicked.classList.add('operations__tab--active');
  /// Set active content
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add('operations__content--active');
});

///////////////////////////////
// Fade Nav
///////////////////////////////

const nav = document.querySelector('.nav');

/// Cannot use mouseenter, because it's not bubble
// nav.addEventListener('mouseenter', e => {
//   console.log('mouseenter', e);
// });

function handleMouse(e, opacity) {
  if (this) {
    opacity = this;
  }

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const linkSiblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    linkSiblings.forEach(l => {
      if (l != link) {
        l.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
}

/// `bind` below set this to the opacity value, and return `function(e, opacity){}`
/// We pass the returned function as callback. So we will call the function
/// (e) => fn(e, opacity). We don't pass the opacity value, because
/// inside the function `this` will be assigned to opacity param
///
nav.addEventListener('mouseover', handleMouse.bind(0.5));
nav.addEventListener('mouseout', handleMouse.bind(1));

///////////////////////////////
// Sticky Nav
///////////////////////////////

/// Using scroll event
// const stickyPosY = section1.getBoundingClientRect().top;
// console.log('stickyPosY', stickyPosY);
// window.addEventListener('scroll', e => {
//   // console.log('scroll', e);

//   if (window.scrollY > stickyPosY && !nav.classList.contains('sticky')) {
//     nav.classList.add('sticky');
//   } else if (window.scrollY <= stickyPosY && nav.classList.contains('sticky')) {
//     nav.classList.remove('sticky');
//   }
// });

/// Using Intersection Observer

const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  // console.log('entry', entries);

  if (entries[0].isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////
// Reveal Sections
///////////////////////////////

const sections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  // console.log('revealAnimation', entries[0], observer);
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.11,
});

sections.forEach(section => {
  console.log('section', section);
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////
// Lazy Loading Images
///////////////////////////////

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoadingImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  console.log(`${entry.target.alt} intersecting`);
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imagesObserver = new IntersectionObserver(lazyLoadingImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(img => {
  imagesObserver.observe(img);
});

///////////////////////////////
// Slider
///////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  let curSlide = 0;
  const slider = document.querySelector('.slider');
  const dotsContainer = document.querySelector('.dots');

  init();

  function init() {
    gotoSlide(curSlide);
    createDots();
  }

  function gotoSlide(num) {
    if (num < 0 || num > slides.length - 1) return;

    curSlide = num;

    /// Transform slides based on curSlide value
    slides.forEach((slide, i) => {
      // console.log('slider ', i, slide);
      slide.style.transform = `translateX(${(i - num) * 100}%)`;
    });

    /// Update active dot
    document.querySelectorAll('.dots__dot').forEach((dot, i) => {
      // console.log('update active dot', i, num);
      dot.classList.remove('dots__dot--active');
      if (i === num) dot.classList.add('dots__dot--active');
    });
  }

  function performSlide(direction) {
    /// Update `curSlide` based on `direction`
    ///
    if (direction === 'right') {
      curSlide++;
    } else {
      curSlide--;
    }
    /// first slide with the direction left, will make it last slide.
    /// last slide with the direction right, will make it first slide.
    curSlide = (slides.length + curSlide) % slides.length;

    gotoSlide(curSlide);
  }

  /// Slider buttons click event
  document
    .querySelector('.slider__btn--right')
    .addEventListener('click', () => performSlide('right'));
  document
    .querySelector('.slider__btn--left')
    .addEventListener('click', () => performSlide('left'));

  /// Keyboard arrows event
  document.addEventListener('keydown', e => {
    if (e.code === 'ArrowRight') performSlide('right');
    else if (e.code === 'ArrowLeft') performSlide('lefft');
  });

  /// Create dots
  function createDots() {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.dataset.slide = i;
      dot.classList.add('dots__dot');
      if (i === curSlide) dot.classList.add('dots__dot--active');
      dotsContainer.append(dot);
    });
  }

  /// Dots click event
  dotsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('dots__dot')) return;

    gotoSlide(Number(e.target.dataset.slide));
  });
};

slider();

document.addEventListener('DOMContentLoaded', e => {
  console.log('DOMContentLoaded event', e);
});

window.addEventListener('load', e => {
  console.log('Load event', e);
});

// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log('beforeonload', e);
//   // e.returnValue = '';
// });
