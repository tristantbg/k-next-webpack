<?php

return function ($field) {

	if ($field->isNotEmpty()) {
		$html = '';

    $items = $field->split(',');

    foreach ($field->split(',') as $key => $tag) {
      $html .= Html::tag('span', $tag);
    }

    return '<span class="button">' . $html . '</span>';
	}

};
