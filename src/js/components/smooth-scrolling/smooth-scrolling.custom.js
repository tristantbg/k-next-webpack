import Smooth from './smooth-scrolling'

class Parallax extends Smooth {

  constructor(opt) {

    super(opt)

    this.createExtraBound()

    this.resizing = false
    this.cache = null
    this.dom.divs = Array.prototype.slice.call(opt.divs, 0)
  }

  createExtraBound() {

    ['getCache', 'inViewport']
    .forEach((fn) => this[fn] = this[fn].bind(this))
  }

  resize() {

    this.resizing = true

    this.getCache()
    super.resize()

    this.resizing = false
  }

  getCache() {

    this.cache = []

    this.vars.bounding = 0

    this.dom.divs.forEach((el, index) => {

      // el.style.display = 'inline-block'
      // el.style.transform = 'none'
      // el.style.width = `${unit}px`

      const scrollX = this.vars.target
      const bounding = el.getBoundingClientRect()
      const bounds = {
        el: el,
        state: true,
        left: bounding.left + scrollX,
        right: bounding.right + scrollX,
        center: bounding.width / 2
      }

      this.vars.bounding += bounding.width

      if(index == 0) this.vars.bounding += bounding.width

      this.cache.push(bounds)
    })

    // this.dom.section.style.width = `${this.vars.width}px`
    this.vars.bounding = this.vars.bounding - this.vars.width
  }

  run() {

    this.dom.divs.forEach(this.inViewport);

    this.dom.section.style[this.prefix] = this.getTransform(this.vars.current * -1)

    super.run()
  }

  inViewport(el, index) {

    if (!this.cache || this.resizing) return

    const cache = this.cache[index]
    const current = this.vars.current
    const left = Math.round(cache.left - current)
    const right = Math.round(cache.right - current)
    const inview = right > 0 && left < this.vars.width

    if (inview) {

      if (!el.state) {
        // el.innerHTML = '<span>in viewport</span>'
        el.classList.add('in-viewport')
        el.state = true
      }

    } else {

      el.state = false
      el.classList.remove('in-viewport')
      // el.innerHTML = ''
    }
  }
}

export default Parallax
