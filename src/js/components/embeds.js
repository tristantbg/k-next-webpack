const Embeds = {
  init: () => {
    const thumbs = document.querySelectorAll(".embed__thumb");
    [...thumbs].forEach(t => {
      t.addEventListener("click", Embeds.apply, false);
    });
  },
  apply: e => {
    const wrapper = e.target.parentNode;
    const embed = wrapper.children[0];
    const script = wrapper.querySelector("script");
    embed.src = script
      ? `${script.getAttribute("data-src")}&autoplay=1`
      : `${embed.getAttribute("data-src")}&autoplay=1`;
    wrapper.removeChild(e.target);
  }
};

export default Embeds;