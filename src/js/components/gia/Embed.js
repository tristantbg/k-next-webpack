import Component from 'gia/Component';
export default class Embed extends Component {
    constructor(element) {
        super(element);
        this.loaded = false
        this.played = false
        this.ref = {
            media: null,
            image: null
        };
        this.options = {};
    }
    mount() {
        this.ref.image.src = this.placeholderSrc(this.element.dataset.width, this.element.dataset.height)
        this.ref.iframe = this.element.querySelector('iframe')
        this.ref.media.addEventListener('click', this.playEmbed.bind(this))
        this.loaded = true
        console.log(this.ref.media)
    }
    playEmbed() {
        this.ref.media.dataset.played = true
        this.ref.iframe.src = this.ref.iframe.dataset.src + '&autoplay=1'
        this.played = true
    }
    placeholderSrc(w, h) {
        return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"%3E%3C/svg%3E`
    }
}
