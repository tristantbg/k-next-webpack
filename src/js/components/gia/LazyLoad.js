import Component from 'gia/Component';
export default class LazyLoad extends Component {
    constructor(element) {
        super(element);
        this.loaded = false
        this.ref = {
          image: null
        };
        this.options = {};
    }
    mount() {
        this.ref.image.src = this.placeholderSrc(this.ref.image.dataset.width, this.ref.image.dataset.height)
        this.createMask()
        this.loaded = true
    }
    createMask() {
      this.mask = document.createElement('div')
      this.mask.className = 'mask'
      this.element.append(this.mask)
    }
    placeholderSrc(w, h) {
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"%3E%3C/svg%3E`
    }
}
