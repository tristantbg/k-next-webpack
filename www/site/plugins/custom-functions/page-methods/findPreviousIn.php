<?php

return function($collection) {
  $temp = $collection->toArray();
  $neighbors = array_neighbors($temp, $this->id());

  return page($neighbors[0]);
};
