import App from "../index.js";
import Players from "./players";
import Barba from "barba.js";
import { TweenMax, TimelineMax } from "gsap";

const Pjax = {
  menuTransition: 0.4,
  menuScaleTransition: 0.5,
  contentTranslateTransition: 0.8,
  contentFadeTransition: 0.4,
  init: function() {
    Barba.Pjax.getTransition = function() {
      return Pjax.hideShowTransition;
    };
    Barba.Dispatcher.on("linkClicked", function(el) {
      App.linkClicked = el;
    });
    Barba.Pjax.Dom.wrapperId = "main";
    Barba.Pjax.Dom.containerClass = "pjax";
    Barba.BaseCache.reset();
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

      TweenMax.set(_this.newContainer.querySelector("header"), {
        className: "+=disabled",
        scaleX: 0,
        force3D: true
      });
      const quickview = _this.oldContainer.querySelector("#project-quickview");
      if (quickview)
        TweenMax.set(quickview, {
          autoAlpha: 0
        });

      const tl = new TimelineMax({
        onComplete: _ => {
          _this.endTransition(_this, newContent);
        }
      });

      tl
        // .to(_this.oldContainer.querySelector('header'), Pjax.menuTransition, {
        //   className: '+=disabled'
        // })
        // .to(_this.oldContainer.querySelector('header'), Pjax.menuScaleTransition, {
        //   scaleX: 0,
        //   ease: Expo.easeOut
        // })
        .to(_this.oldContainer.querySelector("header"), 0.2, {
          autoAlpha: 0,
          yPercent: -300,
          ease: Cubic.easeIn
        })
        .to(
          _this.oldContainer.querySelectorAll("#page-content, footer"),
          Pjax.contentFadeTransition,
          {
            opacity: 0
            // y: -App.height/4,
            // force3D: true
          }
        );
    },
    endTransition: function(_this, newContent) {
      Players.destroy();
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

      const tl = new TimelineMax({
        onComplete: _ => {
          setTimeout(function() {
            document.body.classList.remove("is-loading");
          }, 150);
          setTimeout(function() {
            TweenMax.set("#page-content, header", {
              clearProps: "all"
            });
          }, 400);
        }
      });

      tl.fromTo(
        _this.newContainer.querySelector("#page-content"),
        Pjax.contentTranslateTransition,
        {
          y: window.innerHeight || document.documentElement.clientHeight
        },
        {
          y: 0,
          force3D: true,
          ease: Expo.easeOut,
          onComplete: _ => {
            App.pageType = App.nextPageType
            App.interact()
          }
        }
      )
        .to(
          _this.newContainer.querySelector("header"),
          Pjax.menuScaleTransition - 0.1,
          {
            pointerEvents: 'none',
            scaleX: 1,
            force3D: true,
            ease: Expo.easeOut
          },
          "+=0.5"
        )
        .to(_this.newContainer.querySelector("header"), 0, {
          className: "-=disabled"
        });

      if (window.ga) window.ga("send", "pageview");
    }
  })
};

export default Pjax;
