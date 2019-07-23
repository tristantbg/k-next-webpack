<?php

return function() {
  return $this->featured()->toFile() ? true : false;
};
