import ls from 'lazysizes';
import optimumx from 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit.js';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.js';

// lazysizes.cfg.init = false;

const LazySizes = {
  init: _ => {
    ls.init()
  }
};

export default LazySizes;
