import App from "../index.js";
import Scroll from "./Scroll";
import Barba from "barba.js";
import {
    TweenMax,
    TimelineMax
} from "gsap";
const Pjax = {
    contentTranslateTransition: 0.6,
    offsetTransition: 0.8,
    init: function() {
        Barba.Pjax.getTransition = function() {
            return Pjax.hideShowTransition;
        };
        Barba.Dispatcher.on("linkClicked", function(el) {
            App.linkClicked = el;
        });
        Barba.Pjax.Dom.wrapperId = "main";
        Barba.Pjax.Dom.containerClass = "pjax";
        Barba.Prefetch.ignoreClassLink = "no-prefetch"
        Barba.BaseCache.reset();
        Barba.Prefetch.init()
        // Barba.Pjax.cacheEnabled = false;
        Barba.Pjax.start();
    },
    hideShowTransition: Barba.BaseTransition.extend({
        start: function() {
            let _this = this;
            _this.newContainerLoading.then(_this.startTransition.bind(_this));
        },
        startTransition: function() {
            document.body.classList.add("is-loading");
            let _this = this;
            const newContent = _this.newContainer.querySelector("#page-content");
            App.nextPageType = newContent.getAttribute("page-type");
            Scroll.saver.set(_this.oldContainer.querySelector("#page-content").dataset.id)
            if (true || ['artist', 'artwork', 'artwork.exhibition'].includes(App.pageType) && ['artwork', 'artwork.exhibition'].includes(App.nextPageType)) {
                _this.done();
                window.scroll(0, 0);
                App.sizeSet();
                App.pageType = App.nextPageType
                document.body.setAttribute("page-type", App.nextPageType);
                App.interact()
                new TimelineMax().from(_this.newContainer.querySelectorAll("#page-content .offset-x"), Pjax.offsetTransition, {
              paddingLeft: 0,
              ease: Expo.easeOut
            }, '+=0.3')
                document.body.classList.remove("is-loading");
            } else {
                const tl = new TimelineMax({
                    onComplete: _ => {
                        _this.endTransition(_this, newContent);
                    }
                });
                tl.to(_this.oldContainer.querySelectorAll("#page-content"), Pjax.contentTranslateTransition, {
                    xPercent: 100,
                    force3D: true,
                    ease: Expo.easeIn
                });
            }
        },
        endTransition: function(_this, newContent) {
            window.scroll(0, 0);
            TweenMax.set(_this.newContainer, {
                visibility: "visible"
            });
            TweenMax.set(_this.oldContainer, {
                display: "none"
            });
            document.body.setAttribute("page-type", App.nextPageType);
            _this.finish(_this, newContent);
        },
        finish: function(_this, newContent) {
            _this.done();
            App.sizeSet();
            App.pageType = App.nextPageType
            App.interact()
            const tl = new TimelineMax({
                onComplete: _ => {
                    document.body.classList.remove("is-loading");
                    setTimeout(function() {
                        TweenMax.set("#page-content", {
                            clearProps: "all"
                        });
                    }, 400);
                }
            });
            tl.fromTo(_this.newContainer.querySelector("#page-content"), Pjax.contentTranslateTransition, {
                xPercent: -100
            }, {
                xPercent: 0,
                force3D: true,
                ease: Expo.easeOut,
                onComplete: _ => {
                    // App.pageType = App.nextPageType
                    // App.interact()
                }
            }).from(_this.newContainer.querySelectorAll("#page-content .offset-x"), Pjax.offsetTransition, {
              paddingLeft: 0,
              ease: Expo.easeOut
            }, '-=0.3')
        }
    })
};
export default Pjax;
