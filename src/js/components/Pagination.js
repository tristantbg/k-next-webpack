import App from '../index'
import GiaComponents from './GiaComponents';
import RangeTime from './range-time';
import InfiniteScroll from 'infinite-scroll'
import Links from './links'

const Pagination = {
  init: _ => {
    const container = document.querySelector('.section--blocks-items .items.grid-items')
    const pagination = document.getElementById('pagination')

    if (container && pagination) {
      Pagination.infiniteScroll = new InfiniteScroll(container, {
        path: '#pagination .next',
        append: '.block.grid-item',
        history: false,
        // history: ['news', 'exhibitions'].includes(App.pageType) ? 'replace' : false,
        hideNav: "#pagination",
        prefill: false,
        scrollThreshold: App.height*3,
        // status: '.ajax-loading',
        debug: false
      })
      Pagination.infiniteScroll.on('append', function(response, path, items) {
        RangeTime.init()
        Links.init()
        GiaComponents.load(container)
      });
    } else {
      Pagination.infiniteScroll = null
    }
  },
  destroy: _ => {
    if(Pagination.infiniteScroll) {
      Pagination.infiniteScroll.destroy()
      Pagination.infiniteScroll = null
    }
  }
}

export default Pagination;
