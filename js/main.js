// MOBILE NAVIGATION

const mobileBtn = document.querySelector('.mobile-toggle');
const mobileBtnInner = document.querySelector('.mobile-toggle_bars');
const navBar = document.querySelector('.mobile-nav');

//Event Listeners
mobileBtn.addEventListener('click', mobileToggle);

//Fuctions for closing mobile navigation bar

function mobileToggle() {
  window.addEventListener('click', outsideClick)
  if (mobileBtn.classList[1] === 'is-open' && navBar.classList[2] === 'is-open') {
    mobileBtn.classList.remove('is-open');
    navBar.classList.remove('is-open');
  } else {
    mobileBtn.classList.add('is-open');
    navBar.classList.add('is-open');
  }

  function outsideClick(e) {
    if (e.target != mobileBtn && e.target.tagName != 'A' && e.target.tagName != 'HEADER') {
      mobileBtn.classList.remove('is-open');
      navBar.classList.remove('is-open');
    }
  }
}

// FOOTER DATE

const footerDate = document.getElementsByClassName('footer-date')[0];
let date = new Date().getFullYear();
footerDate.innerText = date;

// NAVIGATION CURRENT LINK STYLES

//Set default where page links are highlighted based on page you are on

document.querySelectorAll(".navigation a[href='" + window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] + "']").forEach(current => {
  current.classList.add("nav-current");
})

// For production, when using shortened links without .html, use this selector here and bellow: 
/*
document.querySelectorAll(".navigation a[href='" + window.location.pathname + "']").forEach(current => {
  current.classList.add("nav-current");
})
*/

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  if (sections.length > 0) {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionTop = current.offsetTop - 50;
      const sectionHeight = current.offsetHeight;
      const sectionId = current.getAttribute("id");

      if (
        scrollY > sectionTop &&
        scrollY <= sectionHeight + sectionTop
        ) {
          document.querySelectorAll(".navigation a").forEach(current => {
            current.classList.remove("nav-current");
          });
          document.querySelectorAll(".navigation a[href*=" + sectionId + "]").forEach(current => {
            current.classList.add("nav-current");
          }); 
      } else {
          document.querySelectorAll(".navigation a[href*=" + sectionId + "]").forEach(current => {
          current.classList.remove("nav-current");
        });
      }
    });
    if (document.querySelectorAll(".nav-current").length < 1) {
    document.querySelectorAll(".navigation a[href='" + window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] + "']").forEach(current => {
      current.classList.add("nav-current");
      })
    }
  }
}

// PARALLAX EFFECTS

// Helper element query function
function pQuery(selector, context) {
  context = context || document;
  const elements = context.querySelectorAll(selector);
  return Array.from(elements);
}

window.addEventListener('scroll', runParallax);

// Parallax function init
function runParallax() {
  let scrollY = window.pageYOffset;

  // Main landing page text
  // Media Queries & if element is present on page
  if (
    window.innerWidth >= 960 &&
    window.innerHeight >= 520 &&
    pQuery('.main-textbox').length > 0
  ) {
    // Setting the pixel area of applicable effect (limit)
    let limit = pQuery('.main-textbox')[0].parentNode.offsetHeight + pQuery('.main-textbox')[0].parentNode.offsetTop;
    // Are we on the right part of page to start parallaxing
    if (
      scrollY > pQuery('.main-textbox')[0].parentNode.offsetTop &&
      scrollY <= limit
    ) {
      pQuery('.main-textbox')[0].style.transform = 'translate(0px, ' + scrollY * 0.09 + '%)';
    } else {
      pQuery('.main-textbox')[0].style.transform = 'translate(0, 0)';
    }
  }

  // Main page landing area background image
  if (
    window.innerWidth >= 1320 &&
    window.innerHeight >= 520 &&
    pQuery('.main-landing_page').length > 0
  ) {
    let limit = pQuery('.main-landing_page')[0].offsetHeight + pQuery('.main-landing_page')[0].offsetTop;
    if (
      scrollY > pQuery('.main-landing_page')[0].offsetTop &&
      scrollY <= limit
    ) {
      pQuery('.main-landing_page')[0].style.backgroundPositionY = 'calc(50% - ' + (scrollY * 0.007) + '%)';
    } else {
      pQuery('.main-landing_page')[0].style.backgroundPositionY = '50%';
    }
  }

  // Main page Values middle item rotation
  if (pQuery('.main-values_section figure img').length > 0) {
    let limit = pQuery('.main-values_section')[0].offsetHeight + pQuery('.main-values_section')[0].offsetTop;
    if (
      scrollY > pQuery('.main-values_section')[0].offsetTop - (pQuery('.main-values_section')[0].offsetTop * 0.3) &&
      scrollY <= limit
    ) {
      pQuery('.main-values_section figure img')[1].style.transform = 'rotate(calc(-' + pQuery('.main-values_section')[0].offsetTop * 0.085 + 'deg + ' + (scrollY * 0.12) + 'deg))'; //Positioning of the rotating element to start at 0, calculation of the first calc parameter is mostly eyeballed number which removes already scrolled pixels from scrollY variable
    } else {
      pQuery('.main-values_section figure img')[1].style.transform = 'rotate(0)';
    }
  }

  // Main page contact links background
  if (
    window.innerWidth >= 1320 &&
    window.innerHeight >= 520 &&
    pQuery('.main-contact_links a').length > 0
  ) {
    let limit = pQuery('.main-contact_section')[0].offsetHeight + pQuery('.main-contact_section')[0].offsetTop;
    if (
      scrollY > pQuery('.main-contact_section')[0].offsetTop - (pQuery('.main-contact_section')[0].offsetTop * 0.3) &&
      scrollY <= limit
    ) {
      pQuery('.main-contact_links a').forEach(function(current) {
        current.style.backgroundPositionY = 'calc(50% - ' + (scrollY * 0.007) + '%)';
      })
    } else {
      pQuery('.main-contact_links a').forEach(function(current){
        current.style.backgroundPositionY = '50%';
      })
    }
  }
}

// PRODUCTS PAGE PROMO BLOCK SLIDER

function promoSlider(){
  if (document.URL.includes("proizvodi")){

    let sliderBlocks = document.querySelectorAll('.promo-block');
    let currentBlock = 0;
    let time = 1000;
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');

    //Reset function (clear all blocks)
    function reset(){
      for(let i = 0; i < sliderBlocks.length; i++){
        sliderBlocks[i].style.display = 'none';
      }
    }

    //Init Slider
    function startSlide(){
      reset();
      sliderBlocks[0].style.display = 'block';
    }

    //Arrow buttons functions
    function slideLeft(){
      reset();
      sliderBlocks[currentBlock - 1].style.display = 'block';
      currentBlock--;
    }
    function slideRight(){
      reset();
      sliderBlocks[currentBlock + 1].style.display = 'block';
      currentBlock++;
    }
    arrowLeft.addEventListener('click',function(){
      if (currentBlock === 0) {
        currentBlock = sliderBlocks.length;
      }
      slideLeft()
    })
    arrowRight.addEventListener('click', function(){
      if (currentBlock === sliderBlocks.length -1) {
        currentBlock = -1;
      }
      slideRight();
    })

    startSlide();
  }
}
promoSlider();