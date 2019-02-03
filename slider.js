class ImageSlider {
  constructor(config) {
    this.config = config;
    this.currentIndex = 1;
    this.slider = document.querySelector('.slider-component');
    this.viewport = this.slider.querySelector('.images-container');
    this.sliderWidth = this.viewport.clientWidth;
    this.images = this.slider.querySelectorAll('img');
    this.nextBtn = this.slider.querySelector('.slider-control-next');
    this.prevBtn = this.slider.querySelector('.slider-control-prev');
    this.initEventListeners();
    this.cloneFirstAndLast();
    this.transitionSlide();
  }
  initEventListeners() {
    this.nextBtn.addEventListener('click', () => this.showNext());
    this.prevBtn.addEventListener('click', () => this.showPrev());
    this.viewport.addEventListener('transitionend', () =>
      this.completeTransition()
    );
    window.addEventListener('resize', () => this.reset());
  }
  cloneFirstAndLast() {
    const first = this.images[0].cloneNode();
    const last = this.images[this.images.length - 1].cloneNode();
    first.id = 'first-clone';
    last.id = 'last-clone';
    this.viewport.prepend(last);
    this.viewport.append(first);
    this.images = this.slider.querySelectorAll('img');
  }
  transitionSlide() {
    this.viewport.style.transform = `translateX(${-this.sliderWidth *
      this.currentIndex}px)`;
  }
  showNext() {
    if (this.currentIndex >= this.images.length - 1) return;
    this.viewport.classList.add('slide-transition');
    this.currentIndex++;
    this.transitionSlide();
  }
  showPrev() {
    if (this.currentIndex <= 0) return;
    this.viewport.classList.add('slide-transition');
    this.currentIndex--;
    this.transitionSlide();
  }
  completeTransition() {
    const slideId = this.images[this.currentIndex].id || null;
    if (slideId === 'last-clone' || slideId === 'first-clone') {
      const offset = slideId === 'last-clone' ? 2 : this.currentIndex;
      this.viewport.classList.remove('slide-transition');
      this.currentIndex = this.images.length - offset;
      this.transitionSlide();
    }
  }
  reset() {
    this.sliderWidth = this.viewport.clientWidth;
    this.transitionSlide();
    console.log('reseting');
  }
}

// new up and pass a config object
const carousel = new ImageSlider({});
