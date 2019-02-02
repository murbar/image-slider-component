class ImageSlider {}

const slider = document.querySelector('.slider-component');
const viewport = slider.querySelector('.images-container');
const sliderWidth = slider.querySelector('img').clientWidth;
const nextBtn = slider.querySelector('.slider-control-next');
const prevBtn = slider.querySelector('.slider-control-prev');

let currentIndex = 1;

function cloneFirstAndLast() {
  const images = slider.querySelectorAll('img');
  const first = images[0].cloneNode();
  const last = images[images.length - 1].cloneNode();
  first.id = 'first-clone';
  last.id = 'last-clone';
  viewport.prepend(last);
  viewport.append(first);
}
cloneFirstAndLast();

const images = slider.querySelectorAll('img');

function changeSlide() {
  viewport.style.transform = `translateX(${-sliderWidth * currentIndex}px)`;
}

changeSlide();

nextBtn.addEventListener('click', () => {
  if (currentIndex >= images.length - 1) return;
  viewport.classList.add('slide-transition');
  currentIndex++;
  changeSlide();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  viewport.classList.add('slide-transition');
  currentIndex--;
  changeSlide();
});

viewport.addEventListener('transitionend', () => {
  const slideId = images[currentIndex].id || null;
  if (slideId === 'last-clone' || slideId === 'first-clone') {
    const offset = slideId === 'last-clone' ? 2 : currentIndex;
    viewport.classList.remove('slide-transition');
    currentIndex = images.length - offset;
    changeSlide();
  }
});
