<?php

return function($text) {
  $params = [];
  if ($this->contactTitle()->isNotEmpty()) {
    $params['subject'] = $this->contactTitle();
  }
  if ($this->contactCCs()->isNotEmpty()) {
    $params['cc'] = A::join($this->contactCCs()->toStructure()->pluck('email'), ',');
  }
  return Html::email(A::join($this->contactEmails()->toStructure()->pluck('email'), ',').'?'.http_build_query($params), $text);
};
