import LazySizes from './components/lazysizes';
import Loader from './components/loader';
import Links from './components/links';
// import Menu from './components/menu';
// import Footer from './components/footer';
// import Expandables from './components/expandables';
// import Embeds from './components/embeds';
// import Players from './components/players';
// import Projects from './components/projects';
// import Related from './components/related';
// import Idle from './components/idle';
// import Pjax from './components/pjax';
import debounce from 'lodash.debounce'

const App = {
  root: window.location.hostname == 'localhost' ? '/kairos/www' : '',
  init: async _ => {
    App.pageType = document.body.getAttribute('page-type')
    await Loader.init();
    await App.sizeSet();
    if(Loader.isLoaded) await App.interact();
    // await Pjax.init();
    window.addEventListener('resize', debounce(App.sizeSet, 300), false)
    Loader.loaded();
  },
  sizeSet: () => {
    App.width = (window.innerWidth || document.documentElement.clientWidth)
    App.height = (window.innerHeight || document.documentElement.clientHeight)
    App.isMobile = App.width <= 767
  },
  interact: async _ => {
    await Links.init();
    // await Menu.init();
    // await Footer.init();
    // await Expandables.init();
    // await Players.init();
    // await Projects.init();
    // await Related.init();
    // await Idle.init();
  }
};

export default App;
