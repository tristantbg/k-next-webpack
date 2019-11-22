import App from '../../index';
import Component from 'gia/Component';
import Flickity from 'flickity-hash'
import '../../../../node_modules/flickity/dist/flickity.css'

export default class Slider extends Component {
  constructor(element) {
    super(element);
    this.ref = {
      slider: null
    };
    this.flickityOptions = {
      cellSelector: 'section',
      hash: true,
      imagesLoaded: true,
      autoPlay: false,
      pauseAutoPlayOnHover: false,
      lazyLoad: false,
      cellAlign: 'left',
      contain: false,
      setGallerySize: false,
      adaptiveHeight: false,
      percentPosition: true,
      accessibility: true,
      wrapAround: true,
      prevNextButtons: true,
      pageDots: false,
      draggable: '>1',
      selectedAttraction: 1,
      friction: 0,
      freeScroll: false
    }
  }
  mount() {
    this.createIDs()
    this.flickityInstance = this.flickity(this.element, this.flickityOptions);
  }
  createIDs() {
    // if (App.isMobile) return
    const slides = this.element.querySelectorAll('section')
    slides.forEach((slide, index) => {
      slide.id = `${this.element.dataset.id}-${(index+1)}`
    })
  }
  flickity(element, options) {
    const flickityInstance = new Flickity(element, options);
    if (flickityInstance.slides.length < 1) return; // Stop if no slides
    flickityInstance.on('select', function() {
      this.lazyloadImages(flickityInstance)
    }.bind(this));
    flickityInstance.on('staticClick', function(event, pointer, cellElement, cellIndex) {
      if (!cellElement) {
        return;
      } else {
        if (event.clientX > App.width / 2) {
          this.next()
        } else {
          this.previous()
        }
      }
    });
    const arrows = flickityInstance.element.querySelectorAll('.flickity-prev-next-button:not(.loaded)')
    arrows.forEach(arrow => {

      const text = document.createElement('span');
      text.style.display = 'none'
      text.className = 'text'
      arrow.append(text)
      arrow.addEventListener('mousemove', event => {
        const parentOffset = event.currentTarget.getBoundingClientRect();
        text.style.display = 'block';
        text.style.top = event.pageY - parentOffset.top - window.scrollY + "px";
        text.style.left = event.pageX - parentOffset.left + "px";
        event.currentTarget.classList.add('loaded')
      })
    })
    this.lazyloadImages(flickityInstance)
    return flickityInstance
  }
  lazyloadImages(flickityInstance) {
    const adjCellElems = flickityInstance.getAdjacentCellElements(1);
    for (let i = 0; i < adjCellElems.length; i++) {
      const adjCellImgs = adjCellElems[i].querySelectorAll('.lazy:not(.lazyloaded):not(.lazypreload)')
      for (let j = 0; j < adjCellImgs.length; j++) {
        adjCellImgs[j].classList.add('lazyload')
        adjCellImgs[j].classList.add('lazypreload')
      }
    }
  }
}
