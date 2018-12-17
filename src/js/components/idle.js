import App from '../index'

const Idle = {
  timer: 3500,
  init: _ => {
    Idle.off()
    const projectContainer = document.querySelector('#page-content[page-type=project]')
    if (projectContainer) {
      projectContainer.addEventListener('mousemove', Idle.mousemove)
      Idle.timeout = setTimeout(Idle.on, Idle.timer)
    }
  },
  on: _ => {
    document.body.classList.add('idle')
    Idle.isActive = true
  },
  off: _ => {
    document.body.classList.remove('idle')
    Idle.isActive = false
  },
  reset: _ => {
    Idle.on()
    window.clearTimeout(Idle.timeout)
    Idle.isActive = false
  },
  mousemove: e => {
    if (!App.isMobile && Idle.isActive) {
      window.clearTimeout(Idle.timeout)
      Idle.off()
      Idle.timeout = setTimeout(Idle.on, Idle.timer)
    }
  }
};

export default Idle;
