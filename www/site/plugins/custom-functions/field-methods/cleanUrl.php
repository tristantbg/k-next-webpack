<?php

return function ($field) {

    $url        = $field;
    $disallowed = array('http://', 'https://');
    foreach ($disallowed as $d) {
        if (strpos($url, $d) === 0) {
            return str_replace($d, '', $url);
        }
    }
    return $url;

};
