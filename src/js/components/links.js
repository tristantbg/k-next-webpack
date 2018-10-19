const Links = {
  init: () => {
    const links = document.querySelectorAll("a");
    [...links].forEach(lnk => {
      if (lnk.getAttribute("target")) {
        return
      }
      else if (lnk.host !== window.location.host) {
        lnk.setAttribute("target", "_blank");
        lnk.setAttribute("rel", "noopener");
      } else {
        lnk.setAttribute("target", "_self");
      }
    });
  }
};

export default Links;
