import App from '../index'

const Links = {
  init: _ => {
    const links = document.querySelectorAll("a");
    [...links].forEach(lnk => {
      if (lnk.classList.contains('download-pdf') && App.isMobile) {
        lnk.href = 'https://docs.google.com/viewer?url=' + lnk.href
      }
      if (lnk.getAttribute("target")) {
        return
      }
      else if (lnk.host !== window.location.host) {
        lnk.setAttribute("target", "_blank");
        lnk.setAttribute("rel", "noopener");
        const img = lnk.querySelector('.responsive-image')
        if(img) img.setAttribute("data-origin", lnk.host.replace('www.', ''));
      } else {
        lnk.setAttribute("target", "_self");
      }
    });
  }
};

export default Links;
