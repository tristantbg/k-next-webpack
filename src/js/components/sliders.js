import App from '../index'
import Flickity from 'flickity-hash'

const Sliders = {
  flickitys: [],
  init: () => {
    Sliders.elements = document.querySelectorAll('.medias');
    Sliders.elements.forEach(element => {
        const slides = element.querySelectorAll('section')
        slides.forEach((s,i) => {
          s.id = `slide-${i+1}`
        })
        const slider = Sliders.flickity(element, {
          cellSelector: 'section',
          hash: true,
          imagesLoaded: true,
          autoPlay: false,
          pauseAutoPlayOnHover: false,
          lazyLoad: false,
          cellAlign: 'left',
          setGallerySize: false,
          adaptiveHeight: false,
          percentPosition: true,
          accessibility: true,
          wrapAround: true,
          prevNextButtons: true,
          pageDots: false,
          draggable: '>1',
          selectedAttraction: 0.15,
          friction: 0.8
        });
        Sliders.flickitys.push(slider)
    })
    // Sliders.accessibility()
  },
  flickity: (element, options) => {
    const flickityInstance = new Flickity(element, options);
    flickityInstance.caption = flickityInstance.element.parentNode.querySelector('.caption');
    flickityInstance.slideNumber = flickityInstance.element.parentNode.querySelector('.slide-number');
    Sliders.flickitys.push(flickityInstance);
    if (flickityInstance.slides.length < 1) return; // Stop if no slides

    flickityInstance.on('change', function() {
      if (this.selectedElement) {
        const caption = this.element.parentNode.querySelector('.caption');
        if (caption)
          caption.innerHTML = this.selectedElement.getAttribute('data-caption');
      }
      const adjCellElems = this.getAdjacentCellElements(1);
      for (let i = 0; i < adjCellElems.length; i++) {
        const adjCellImgs = adjCellElems[i].querySelectorAll('.lazy:not(.lazyloaded):not(.lazypreload)')
        for (let j = 0; j < adjCellImgs.length; j++) {
          adjCellImgs[j].classList.add('lazyload')
          adjCellImgs[j].classList.add('lazypreload')
        }
      }
    });
    flickityInstance.on('select', function() {
      if (this.selectedElement) {
        if (flickityInstance.caption)
          flickityInstance.caption.innerHTML = this.selectedElement.getAttribute('data-caption');
        if (flickityInstance.slideNumber)
          flickityInstance.slideNumber.innerHTML = `${this.selectedIndex + 1}/${this.cells.length}`;
      }
    });
    flickityInstance.on('staticClick', function(event, pointer, cellElement, cellIndex) {
      if (!cellElement) {
        return;
      } else {
        this.next();
      }
    });
    if (flickityInstance.caption)
      flickityInstance.caption.innerHTML = flickityInstance.selectedElement.getAttribute('data-caption');
    if (flickityInstance.slideNumber)
      flickityInstance.slideNumber.innerHTML = `${flickityInstance.selectedIndex + 1}/${flickityInstance.cells.length}`;
    return flickityInstance
  },
  accessibility: () => {
    const arrowLeft = document.querySelectorAll('[event-target=slider-previous]')
    for (let i = 0; i < arrowLeft.length; i++) {
      arrowLeft[i].addEventListener('click', () => {
        const flkty = Flickity.data(arrowLeft[i].closest('section').querySelector('.slider'))
        flkty.previous()
      })
    }
    const arrowRight = document.querySelectorAll('[event-target=slider-next]')
    for (let i = 0; i < arrowRight.length; i++) {
      arrowRight[i].addEventListener('click', () => {
        const flkty = Flickity.data(arrowRight[i].closest('section').querySelector('.slider'))
        flkty.next()
      })
    }
  }
};

export default Sliders;
