const Expandables = {
  init: () => {
    const expandables = document.querySelectorAll(".expand-toggle");
    [...expandables].forEach(toggle => {
      toggle.addEventListener('click', Expandables.toggleState)
    });
  },
  toggleState: e => {
    e.currentTarget.classList.toggle('active')
  }
};

export default Expandables;
