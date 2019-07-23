<?php

return function ($field = false) {

  if ($field) {
    return autoidToPages($field->split(','));
  } else {
    return false;
  }

};
