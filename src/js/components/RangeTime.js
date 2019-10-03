import Moment from 'moment';
import { extendMoment } from 'moment-range';

const RangeTime = {
  texts: {
    past: 'Past',
    present: 'Current',
    future: 'Upcoming',
  },
  init: _ => {
    RangeTime.items = document.querySelectorAll(".range-time");
    RangeTime.moment = extendMoment(Moment);
    RangeTime.now = RangeTime.moment()
    RangeTime.items.forEach(t => {
      RangeTime.apply(t);
    });
  },
  apply: el => {
    const dates = el.dataset.range.split('|')
    if (dates.length === 0 || el.status) {
      return
    } else if (dates.length > 1) {
      const start = RangeTime.moment(dates[0], 'YYYY-MM-DD HH:mm:ss');
      const end   = RangeTime.moment(dates[1], 'YYYY-MM-DD HH:mm:ss');
      const range = RangeTime.moment.range(start, end);

      if (range.contains(RangeTime.now)) {
        // Present
        el.status = 'present'
        el.innerHTML = [RangeTime.texts.present, el.dataset.title].join(' ')
      } else if(RangeTime.now < start) {
        // Future
        el.status = 'future'
        el.innerHTML = [RangeTime.texts.future, el.dataset.title].join(' ')
      } else if(RangeTime.now > end) {
        // Past
        el.status = 'past'
        el.innerHTML = [RangeTime.texts.past, el.dataset.title].join(' ')
      }
    } else {
      const start = RangeTime.moment(dates[0], 'YYYY-MM-DD HH:mm:ss');

      if (RangeTime.now.diff(start, 'days') === 0) {
        // Present
        el.status = 'present'
        el.innerHTML = [RangeTime.texts.present, el.dataset.title].join(' ')
      } else if(RangeTime.now.diff(start) < 0) {
        // Future
        el.status = 'future'
        el.innerHTML = [RangeTime.texts.future, el.dataset.title].join(' ')
      } else if(RangeTime.now.diff(start) > 0) {
        // Past
        el.status = 'past'
        el.innerHTML = [RangeTime.texts.past, el.dataset.title].join(' ')
      }
    }

    if (el.status !== 'future') {
      const opening = el.parentNode.querySelector('.opening')
      if (opening) opening.remove()
    }
  }
};

export default RangeTime;
