<?php

return function ($site, $page) {
  return [
  	'projects' => $site->index()->listed()->filterBy('intendedTemplate', 'project')->filterBy('isPasswordProtected', false),
    'categories' => $site->index()->listed()->filterBy('intendedTemplate', 'project.category')
  ];
};