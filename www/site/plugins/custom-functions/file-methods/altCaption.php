<?php

return function () {

    $alt = '';

    if ($this->alt()->isNotEmpty()) {
      $alt = $this->alt().' - © '.r($this->credits()->isNotEmpty(), $this->credits()->html().', ').site()->title()->html();
    }
    elseif ($this->caption()->isNotEmpty()) {
      $alt = $this->caption().' - © '.r($this->credits()->isNotEmpty(), $this->credits()->html().', ').site()->title()->html();
    }
    else {
      $alt = $this->page()->title()->html().' - © '.r($this->credits()->isNotEmpty(), $this->credits()->html().', ').site()->title()->html();
    }

    return $alt;

};
