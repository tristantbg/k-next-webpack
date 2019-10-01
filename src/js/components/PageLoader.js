import App from '../index';
import Swup from 'swup';
import JsPlugin from '@swup/js-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
// import SwupGtmPlugin from '@swup/gtm-plugin';
// import SwupGaPlugin from '@swup/ga-plugin';
// import DebugPlugin from '@swup/debug-plugin';
// import {
//     TweenMax
// } from 'gsap';
import GiaComponents from './GiaComponents';
const PageLoader = {
    init: _ => {
        if (App.isMobile) return
        PageLoader.swup = new Swup({
            containers: ["main"],
            linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
            cache: false,
            plugins: [
                new JsPlugin([{
                    from: '(.*)',
                    to: '(.*)',
                    in : (next) => {
                        // document.querySelector('main').style.opacity = 0;
                        window.scroll(0, 0)
                        next()
                    },
                    out: (next) => {
                        // document.querySelector('main').style.opacity = 1;
                        next()
                    },
                }, ]),
                new SwupPreloadPlugin(),
                // new SwupGtmPlugin(),
                // new SwupGaPlugin(),
                // new DebugPlugin()
            ]
        });
        // reload components for each container after transition
        PageLoader.swup.on('transitionStart', function() {
            document.body.classList.add("is-loading");
        });
        PageLoader.swup.on('contentReplaced', function() {
            App.pageType = document.querySelector('#page-content').getAttribute("page-type");
            document.body.setAttribute('page-type', App.pageType)
            document.querySelectorAll('[data-swup]').forEach(function(container) {
                GiaComponents.load(container);
                App.interact();
            });
            document.body.classList.remove("is-loading");
            PageLoader.updateGTM()
        });
        // PageLoader.swup.on('transitionStart', function() {
        //     App.pageType = document.querySelector('#page-content').getAttribute("page-type");
        // });
    },
    updateGTM: _ => {
        if (typeof window.dataLayer === 'object') {
            gtag('config', window.dataLayer[1][1], {
                'page_title': document.title,
                'page_path': window.location.pathname + window.location.search
            });
        }
    }
};
export default PageLoader;
