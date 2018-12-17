import App from '../index.js'

const Loader = {
  isLoaded: false,
  node: null,
  init: () => {
    Loader.node = document.querySelector("#loader");
  },
  loading: () => {},
  loaded: () => {
    // if (Loader.node) Loader.node.style.display = 'none';
    if (Loader.node) Loader.node.remove();
    Loader.intro();
  },
  intro: _ => {
    if (document.body.classList.contains("with-intro")) {
      if (history) history.scrollRestoration = "manual";
      window.scroll(0, 0);

    } else {
      Loader.isLoaded = true
    }
  }
};

export default Loader;
