import loadComponents from 'gia/loadComponents';
// import Accordion from './gia/Accordion';
// import AccordionList from './gia/AccordionList';
// import SwipeNav from './gia/SwipeNav';
// import MainSearch from './gia/MainSearch';
import LazyLoad from './gia/LazyLoad';
// import Embed from './gia/Embed';
// import Search from './gia/Search';
import GiaConfig from 'gia/config';
const GiaComponents = {
    init: _ => {
        // enable components
        GiaConfig.set('log', false);
        GiaComponents.components = {
            // Accordion,
            // AccordionList,
            // SwipeNav,
            // MainSearch,
            // Search,
            LazyLoad,
            // Embed,
            // CardMove,
            // Subpage
        }
        GiaComponents.load()
    },
    load: (container = document.documentElement) => {
      loadComponents(GiaComponents.components, container);
    }
};
export default GiaComponents;
