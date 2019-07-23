<?php

return function() {
  return $this->sections()->toStructure()->count() > 1;
};
