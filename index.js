import 'babel-polyfill';
import 'nodelist-foreach-polyfill';
// import './node_modules/flickity/dist/flickity.css';
// import './src/css/plyr/sass/plyr.scss';
import './src/css/app.styl';
// require('viewport-units-buggyfill').init();
import App from './src/js';

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
