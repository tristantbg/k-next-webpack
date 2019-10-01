import App from '../index'
import jump from '../../../node_modules/jump.js/src/jump.js'
const Scroll = {
    init: _ => {},
    easeInOutExpo: (t, b, c, d) => {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    to: (element, options = {
        offset: 0,
        duration: 1000
    }) => {
        if (!App.isScrolling) {
            App.isScrolling = true;
            if (typeof element === 'string') element = document.querySelector(element)
            if (!element) return
            jump(element, {
                offset: options.offset,
                duration: options.duration,
                easing: Scroll.easeInOutExpo,
                callback: options.callback ? _ => {
                    App.isScrolling = false;
                    options.callback();
                } : _ => App.isScrolling = false
            });
        }
    },
    saver: {
        set: id => {
            if (window.sessionstorage) {
                sessionStorage.setItem(id, window.scrollY);
            }
        },
        get: id => {
            if (window.sessionstorage) {
                return scrollTop = sessionStorage.getItem(id) || 0;
            } else {
                return false
            }
        },
        getAndScroll: id => {
            const scrollTop = Scroll.get(id)
            if (scrollTop) {
                window.scroll(0, scrollTop);
            } else {
                window.scroll(0, 0);
            }
        }
    },
};
export default Scroll;
