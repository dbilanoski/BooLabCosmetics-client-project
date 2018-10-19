// MOBILE NAVIGATION

const mobileBtn = document.querySelector('.mobile-toggle');
const navBar = document.querySelector('.mobile-nav');

//Event Listeners
mobileBtn.addEventListener('click', mobileToggle);
window.addEventListener('click', outsideClick)


//Fuctions for closing mobile navigation bar
function mobileToggle() {
  if (mobileBtn.classList[1] === 'is-open' && navBar.classList[1] === 'is-open') {
    mobileBtn.classList.remove('is-open');
    navBar.classList.remove('is-open');
  } else {
    mobileBtn.classList.add('is-open');
    navBar.classList.add('is-open');
  }
}

function outsideClick(e) {
    if (e.target != mobileBtn && e.target.tagName != 'A') {
      mobileBtn.classList.remove('is-open');
      navBar.classList.remove('is-open');
    }
  }
