<?php

return function ($field) {

	if ($field == false) {
		return false;
	} else {
		$numbers = explode("/",$field);
		return round($numbers[0]/$numbers[1],6);
	}

};
