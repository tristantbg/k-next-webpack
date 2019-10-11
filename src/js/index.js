import LazySizes from './components/LazySizes';
import Loader from './components/Loader';
import Links from './components/Links';
// import Shop from './components/Shop';
// import GridFit from './components/GridFit';
// import ReadMore from './components/ReadMore';
// import RangeTime from './components/RangeTime';
// import Pagination from './components/Pagination';
import PageLoader from './components/PageLoader';
import GiaComponents from './components/GiaComponents';
import debounce from 'lodash/debounce'
const App = {
    root: window.location.hostname == 'localhost' ? '/???/www' : '',
    init: async _ => {
        App.pageType = document.body.getAttribute('page-type')
        await Loader.init();
        await App.sizeSet();
        await App.interact();
        await GiaComponents.init();
        await PageLoader.init();
        window.addEventListener('resize', debounce(App.sizeSet, 300), false)
        await LazySizes.init();
        await Loader.loaded();
        // await App.animate()
    },
    sizeSet: () => {
        App.width = (window.innerWidth || document.documentElement.clientWidth)
        App.height = (window.innerHeight || document.documentElement.clientHeight)
        App.isMobile = App.width <= 1023
    },
    addListener: (target, eventType, func = () => {}) => {
        const targets = document.querySelectorAll('[event-target="' + target + '"]');
        [...targets].forEach(elem => {
            elem.addEventListener(eventType, func)
        })
    },
    eventTargets: _ => {
        App.addListener("back", "click", e => {
            if (history && history.length > 0) {
                e.preventDefault();
                history.go(-1);
            }
        });
    },
    interact: async _ => {
        await Links.init();
        // await Shop.init();
    },
    animate: _ => {
        document.body.classList.add('animate')
    },
    simulateClick(elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    }
};
export default App;
