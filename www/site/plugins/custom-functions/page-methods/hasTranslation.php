<?php

return function($lang) {
   return $this->translation($lang)->exists();
};
