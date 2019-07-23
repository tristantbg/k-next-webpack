<?php

return function($collection) {
   return $collection->findByUri($this->id());
};
