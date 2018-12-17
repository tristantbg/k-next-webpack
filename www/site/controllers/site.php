<?php

return function ($site, $page) {

  $projects = new Collection();

  return [
    'projects' => $projects,
    'categories' => $site->index()->listed()->filterBy('intendedTemplate', 'project.category')
  ];
};
