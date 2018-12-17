import App from '../index.js'

const Footer = {
  init: _ => {
    Footer.element = document.querySelector('footer')
    if (!Footer.element) return
    Footer.setSize()
    Footer.eventTargets()
    Footer.isLoaded = true
  },
  addListener: (target, eventType, func = () => {}) => {
    const targets = document.querySelectorAll('[event-target="' + target + '"]');
    [...targets].forEach(elem => {
      elem.addEventListener(eventType, func)
    })
  },
  setSize: _ => {
    const className = Footer.element.className
    Footer.element.classList.add('opened')
    Footer.element.removeAttribute('style')
    Footer.element.style.height = Footer.element.offsetHeight + 'px'
    Footer.element.className = className
  },
  eventTargets: _ => {
    if (App.pageType == 'project') {
      Footer.addListener('about', 'click', Footer.show)
      Footer.element.addEventListener('mouseleave', Footer.hide)
    } else {
      Footer.element.addEventListener('mouseenter', Footer.show)
      Footer.element.addEventListener('mouseleave', Footer.hide)
    }
  },
  show: (force = false) => {
    Footer.element.classList.add('opened')
    if(force === true) {
      Footer.element.classList.add('force-open')
      Footer.forceOpen = true
    }
  },
  hide: (force = false) => {
    if(Footer.forceOpen && force === true || !Footer.forceOpen) Footer.element.classList.remove('opened')
    if(force === true) {
      Footer.element.classList.remove('force-open')
      Footer.forceOpen = false
    }
  }
};

export default Footer;
