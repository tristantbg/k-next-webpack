import App from '../index'
import Menu from './Menu'

const isInViewport = (elem, options = { center: false }) => {
  const menuHeight = Menu.element.offsetHeight
  const bounding = elem.getBoundingClientRect()
  const topInView = bounding.top <= App.height && bounding.top >= menuHeight
  const bottomInView = bounding.bottom <= App.height && bounding.bottom >= menuHeight
  const middleInView = bounding.top - bounding.height / 2 <= App.height / 2 && bounding.top + bounding.height / 2 >= 0
  if (options.center) {
    return bounding.top >= 0 && topInView ||
      bottomInView && topInView && middleInView ||
      bounding.top < 0 && bounding.bottom > App.height && middleInView ||
      bounding.top < 0 && bottomInView && middleInView
  } else {
    return (
      topInView ||
      bottomInView && topInView ||
      bounding.top < 0 && bounding.bottom > App.height ||
      bounding.top < 0 && bottomInView
    )
  }
};

export default isInViewport;
