import App from '../index'
import Flickity from 'flickity'
const Sliders = {
    flickitys: [],
    init: _ => {
        Sliders.elements = document.querySelectorAll('.slider');
        Sliders.elements.forEach(element => {
            const slides = element.querySelectorAll('.slide')
            slides.forEach((s, i) => {
                s.id = `slide-${i+1}`
            })
            const slider = Sliders.flickity(element, {
                cellSelector: '.slide',
                imagesLoaded: false,
                autoPlay: 4000,
                rightToLeft: true,
                pauseAutoPlayOnHover: false,
                lazyLoad: false,
                cellAlign: 'left',
                setGallerySize: false,
                adaptiveHeight: false,
                percentPosition: true,
                accessibility: false,
                wrapAround: true,
                prevNextButtons: true,
                pageDots: false,
                draggable: '>1',
                selectedAttraction: 0.08,
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
        flickityInstance.videoControls = flickityInstance.element.parentNode.querySelector('.video-controls');
        if (flickityInstance.slides.length < 1) return; // Stop if no slides
        flickityInstance.on('change', function() {
            Sliders.lazyloadImages(flickityInstance)
            Sliders.changeCaption(flickityInstance)
        });
        flickityInstance.on('staticClick', function(event, pointer, cellElement, cellIndex) {
            if (!cellElement) {
                return;
            } else {
                this.next();
            }
        });
        Sliders.lazyloadImages(flickityInstance)
        Sliders.changeCaption(flickityInstance)
        return flickityInstance
    },
    changeCaption: flickityInstance => {
        if (flickityInstance.selectedElement) {
            if (flickityInstance.caption) flickityInstance.caption.innerHTML = flickityInstance.selectedElement.getAttribute('data-caption');
            if (flickityInstance.slideNumber) flickityInstance.slideNumber.innerHTML = `${flickityInstance.selectedIndex + 1}/${flickityInstance.cells.length}`;
        }
    },
    playCurrentVideo: flickityInstance => {
        const video = flickityInstance.selectedElement.querySelector('video')
        if (Sliders.currentVideo) {
            Sliders.currentVideo.pause()
            Sliders.currentVideo.currentTime = 0
        }
        if (video) {
            Players.playWithSound({
                element: video,
                container: flickityInstance.element.parentNode
            });
            Sliders.currentVideo = video
        } else {
            Sliders.currentVideo = null
        }
    },
    lazyloadImages: flickityInstance => {
        const adjCellElems = flickityInstance.getAdjacentCellElements(1);
        for (let i = 0; i < adjCellElems.length; i++) {
            const adjCellImgs = adjCellElems[i].querySelectorAll('.lazy:not(.lazyloaded):not(.lazypreload)')
            for (let j = 0; j < adjCellImgs.length; j++) {
                adjCellImgs[j].classList.add('lazyload')
                adjCellImgs[j].classList.add('lazypreload')
            }
        }
    },
    accessibility: _ => {
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
