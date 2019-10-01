import App from '../../index';
import Menu from '../Menu';
import Component from 'gia/Component';
import TweenLite from "gsap/TweenLite";
import Scroll from '../Scroll'
export default class Accordion extends Component {
    constructor(element) {
        super(element);
        this.opened = false
        this.ref = {
            toggle: null,
            content: null,
        };
        this.options = {
            speed: 0.7,
            scroll: false,
            followScroll: false
        };
    }
    mount() {
        this.ref.toggle.addEventListener('click', this.toggle.bind(this))
        this.opened = this.element.classList.contains('opened')
        this.options.followScroll = typeof this.element.dataset.follow !== 'undefined'
        this.options.scroll = typeof this.element.dataset.scroll !== 'undefined'
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
        this.options.followScroll = this.ref.content.offsetHeight < App.height
        TweenLite.from(this.ref.content, this.options.speed, {
            height: 0,
            ease: Expo.easeOut,
            onUpdate: _ => {
                if (this.options.followScroll) window.scroll(0, document.documentElement.offsetHeight)
            },
            onStart: _ => {
                this.element.classList.add('opened')
                this.opened = true
            },
            onComplete: _ => {
                if (!this.options.followScroll && this.options.scroll) Scroll.to(this.element, {offset: -Menu.element.offsetHeight})
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
}
