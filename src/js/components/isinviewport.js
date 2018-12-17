import App from '../index'

const isInViewport = (elem, options = {
  center: false
}) => {
  const bounding = elem.getBoundingClientRect()
  const topInView = bounding.top <= App.height && bounding.top >= 0
  const bottomInView = bounding.bottom <= App.height && bounding.bottom >= 0
  const middleInView = bounding.top - bounding.height / 2 <= App.height / 2 && bounding.top + bounding.height / 2 >= 0
  if (options.center) {
    return bounding.top >= 0 && topInView ||
      bottomInView && topInView && middleInView ||
      bounding.top < 0 && bounding.bottom > App.height && middleInView ||
      bounding.top < 0 && bottomInView && middleInView
  } else {
    return (
      bounding.top >= 0 && topInView ||
      bottomInView && topInView ||
      bounding.top < 0 && bounding.bottom > App.height ||
      bounding.top < 0 && bottomInView
    )
  }
};

export default isInViewport;
