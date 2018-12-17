import Projects from "./projects";
import isInViewport from "./isinviewport";
import throttle from "lodash.throttle";

const Menu = {
  options: {
    blinkActiveProject: false
  },
  init: () => {
    Menu.element = document.querySelector("header");
    if (!Menu.element) return;
    Menu.categories = Menu.element.querySelectorAll("#menu-categories > *");
    Menu.projects = Menu.element.querySelectorAll("#menu-projects > *");
    Menu.currentTitle = document.getElementById("current-project-title");
    if (Menu.currentTitle)
      Menu.currentTitle.initialText = Menu.currentTitle.innerHTML;
    Menu.currentCategory = document.getElementById("current-project-category");
    if (Menu.currentCategory)
      Menu.currentCategory.initialText = Menu.currentCategory.innerHTML;
    Menu.projectQuickview.init();
    Menu.eventTargets();

    Menu.scrollSections = document.querySelectorAll("section[data-scroll]");
    window.addEventListener("scroll", throttle(Menu.projectInView, 128), false);
    Menu.projectInView();
  },
  addListener: (target, eventType, func = () => {}) => {
    const targets = document.querySelectorAll(
      '[event-target="' + target + '"]'
    );
    [...targets].forEach(elem => {
      elem.addEventListener(eventType, func);
    });
  },
  eventTargets: _ => {
    Menu.addListener("back", "click", e => {
      if (history && history.length > 0) {
        e.preventDefault();
        history.go(-1);
      }
    });

    Menu.addListener("explore", "click", e => {
      Menu.element.classList.toggle("expanded");
    });

    Menu.addListener("category", "click", Menu.selectCategory);
    Menu.addListener(
      "project-hover",
      "mouseenter",
      Menu.projectQuickview.display
    );
    Menu.addListener(
      "project-hover",
      "mouseleave",
      Menu.projectQuickview.clear
    );
  },
  projectQuickview: {
    init: _ => {
      Menu.projectQuickview.element = document.getElementById(
        "project-quickview"
      );
      Menu.projectQuickview.items = document.querySelectorAll(".project-hover");
    },
    playVideo: _ => {
      const video = Menu.projectQuickview.currentElement.querySelector("video");
      if (!video) return;
      video.play();
    },
    stopVideo: _ => {
      const video = Menu.projectQuickview.currentElement.querySelector("video");
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    },
    display: e => {
      const id = e.currentTarget.dataset.id;

      for (var i = 0; i < Menu.projectQuickview.items.length; i++) {
        const elem = Menu.projectQuickview.items[i];
        if (elem.dataset.id === id) {
          elem.classList.add("visible");
          Menu.projectQuickview.currentElement = elem;
        } else {
          elem.classList.remove("visible");
        }
      }
      Menu.projectQuickview.playVideo();
      Menu.projectQuickview.element.classList.add("visible");
      Menu.changeTitle(e.currentTarget, {
        title: false,
        subtitle: true
      });
    },
    clear: _ => {
      if (Menu.projectQuickview.element) {
        Menu.projectQuickview.currentElement.classList.remove("visible");
        Menu.projectQuickview.element.classList.remove("visible");
        Menu.projectQuickview.stopVideo();
        Menu.resetTitle();
      }
    }
    // create: _ => {
    //   Menu.projectQuickview.element = document.createElement('div')
    //   Menu.projectQuickview.element.className = 'project-quickview'
    //   document.getElementById('container').append(Menu.projectQuickview.element)
    // },
    // display: e => {
    //   if (!Menu.projectHover.element) Menu.projectHover.create()
    //   const id = e.currentTarget.dataset.id

    //   Projects.getThumbnail(id, Menu.projectHover.element)
    // },
    // clear: _ => {
    //   if (Menu.projectHover.element) {
    //     Menu.projectHover.element.innerHTML = ''
    //     Menu.projectHover.element.style.display = 'none'
    //   }
    // }
  },
  selectCategory: e => {
    const category = e.currentTarget.dataset.category;
    Menu.categories.forEach(c => {
      if (c.dataset.category === category) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });
    Menu.projects.forEach(p => {
      if (p.dataset.category === category) {
        p.classList.remove("hidden");
      } else {
        p.classList.add("hidden");
      }
    });
  },
  setCurrentMenu: _ => {
    if (Menu.currentProjectMenu)
      Menu.currentProjectMenu.forEach(m => {
        m.classList.remove("blink");
      });
    Menu.currentProjectMenu = document.querySelectorAll(
      '#menu-projects [data-id="' + Menu.currentProjectID + '"]'
    );
    if (Menu.currentProjectMenu.length)
      Menu.currentProjectMenu.forEach(m => {
        m.classList.add("blink");
      });
  },
  changeTitle: (
    elem,
    options = {
      title: true,
      subtitle: true
    }
  ) => {
    Menu.currentProjectID = elem.dataset.id;

    let html = "",
      title,
      subtitle;

    if (options.title) {
      title = elem.dataset.title;
      html += title;
    }

    if (options.subtitle) {
      subtitle = elem.dataset.subtitle;
      if (title && title !== "" && options.title) {
        html += "<br>";
      }
      html += `<span class="subtitle">${subtitle}</span>`;
    }

    Menu.currentTitle.innerHTML = html;
    Menu.currentCategory.innerHTML = elem.dataset.category;
  },
  resetTitle: _ => {
    Menu.currentTitle.innerHTML = Menu.currentTitle.initialText;
    Menu.currentCategory.innerHTML = Menu.currentCategory.initialText;
  },
  projectInView: () => {
    let inViewport = [];
    Menu.scrollSections.forEach(section => {
      if (
        isInViewport(section, {
          center: true
        })
      )
        inViewport.push(section);
    });

    if (
      inViewport.length > 0 &&
      inViewport[0].dataset.id !== Menu.currentProjectID
    ) {
      Menu.changeTitle(inViewport[0]);
      if (Menu.options.blinkActiveProject) Menu.setCurrentMenu();
      Menu.currentTitle.initialText = Menu.currentTitle.innerHTML;
      Menu.currentCategory.initialText = Menu.currentCategory.innerHTML;
    }
  }
};

export default Menu;
