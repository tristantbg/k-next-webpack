<?php

function autoidToPages($array)
{
    $pages = new Collection();

  if ($array && is_array($array)) {

    $temp = array_filter($array);

    foreach ($temp as $key => $autoid) {
      if($p = autoid($autoid)) $pages->append($p);
    }

  }

  return $pages;

};
