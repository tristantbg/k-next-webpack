const Loader = {
  node: null,
  init: () => {
    Loader.node = document.querySelector('#loader');
  },
  loading: () => {},
  loaded: () => {
    if(Loader.node) return Loader.node.style.display = 'none';
  }
}

export default Loader;