import App from '../index'
import Footer from './footer'
import throttle from 'lodash.throttle'

const Projects = {
  init: _ => {
    window.addEventListener('scroll', throttle(Projects.toggleFooter, 128), false);
  },
  toggleFooter: _ => {
    if (App.isMobile || App.pageType !== 'home') return
    if ((window.scrollY + App.height - document.body.offsetHeight + 100) >= 0) {
      Footer.show(true)
    } else {
      Footer.hide(true)
    }
  }
};

export default Projects;
