import App from '../../index';
import Component from 'gia/Component';
import TweenLite from "gsap/TweenLite";
import Scroll from '../Scroll'
export default class AccordionList extends Component {
    constructor(element) {
        super(element);
        this.opened = false
        this.ref = {
            clear: null,
            search: null,
            toggle: null,
            content: null,
        };
        this.options = {
            speed: 0.7,
            singular: 'List',
            plural: 'Lists'
        };
    }
    mount() {
        this.headers()
        this.listElements = this.ref.content.querySelectorAll('.grid-item')
        this.ref.toggle.addEventListener('click', this.toggle.bind(this))
        this.opened = this.element.classList.contains('opened')
        this.ref.search.addEventListener('keyup', this.search.bind(this))
    }
    headers() {
        this.activeElement = this.ref.content.querySelector('.active')
        this.ref.toggle.innerHTML = this.options.plural
        if (this.activeElement) {
            this.ref.clear.innerHTML = this.activeElement.innerHTML
            this.ref.clear.addEventListener('click', _ => {
                App.simulateClick(this.activeElement)
            })
            this.ref.clear.style.display = "block"
            this.ref.toggle.style.display = "none"
        } else {
            this.ref.clear.style.display = "none"
        }
    }
    toggle() {
        if (this.opened) {
            this.close()
        } else {
            this.open()
        }
    }
    open() {
        TweenLite.set(this.ref.content, {
            height: 'auto'
        })
        TweenLite.from(this.ref.content, this.options.speed, {
            height: 0,
            ease: Expo.easeOut,
            onStart: _ => {
                this.element.classList.add('opened')
                this.opened = true
            }
        })
    }
    close() {
        TweenLite.to(this.ref.content, this.options.speed, {
            height: 0,
            ease: Expo.easeOut,
            onStart: _ => {
                this.element.classList.remove('opened')
                this.opened = false
            }
        })
    }
    search() {
        let founds = 0
        if (this.ref.search.value == '') {
            this.resetSearch()
        } else {
            this.listElements.forEach(s => {
                if (s.innerHTML.toLowerCase().indexOf(this.ref.search.value.toLowerCase()) >= 0) {
                    s.style.display = 'block'
                    founds++
                } else {
                    s.style.display = 'none'
                }
            })
            if (founds > 0) {
                this.element.classList.add('filtering')
                this.element.classList.remove('no-matches')
            } else {
                this.element.classList.remove('filtering')
                this.element.classList.add('filtering', 'no-matches')
            }
        }
    }
    resetSearch() {
        this.element.classList.remove('filtering', 'no-matches')
        this.ref.search.value = ''
        this.listElements.forEach(s => {
            s.style.display = 'block'
        })
    }
}
