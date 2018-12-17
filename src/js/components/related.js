import Custom from './smooth-scrolling/smooth-scrolling.custom'

const preventHistoryBack = e => {
  e.preventDefault();
}

const Related = {
  init: _ => {
    Related.element = document.getElementById('related')
    if(!Related.element) return
    Related.elementContainer = Related.element.querySelector('.related-pages')
    Related.items = document.querySelectorAll('.related-page')
    // Related.items.forEach(i => {
    //   i.addEventListener('mouseenter', Related.playVideo);
    //   i.addEventListener('mouseleave', Related.stopVideo)
    // })

    Related.element.addEventListener('wheel', preventHistoryBack, {
      passive: false
    });
    Related.scrollInstance = new Custom({
      preload: false,
      native: false,
      ease: 0.1,
      direction: 'horizontal',
      section: Related.elementContainer,
      divs: Related.items
    })
    Related.scrollInstance.init()
    Related.scrollInstance.off()
    Related.element.addEventListener('mouseenter', () => {
      Related.scrollInstance.on()
    })
    Related.element.addEventListener('mouseleave', () => {
      Related.scrollInstance.off()
    })
  },
  playVideo: e => {
    Related.currentElement = e.currentTarget
    const video = e.currentTarget.querySelector('video')
    if (!video) return
    video.play()
  },
  stopVideo: _ => {
    const video = Related.currentElement.querySelector('video')
    if (!video) return
    video.pause()
    video.currentTime = 0
  }
};

export default Related;
