const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const target = document.querySelectorAll("[data-animate]");
const animationClass = "animate";

function animationScroll() {
  const windowTop = window.pageYOffset + (window.innerHeight * 4) / 4;
  target.forEach((element) => {
    if (windowTop > element.offsetTop) element.classList.add(animationClass);
  });
}

animationScroll();

if (target.length) {
  window.addEventListener(
    "scroll",
    debounce(() => {
      animationScroll();
    }, 200)
  );
}
