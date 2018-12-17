<?php

return function ($site, $page) {
  return [
    'projects' => $page->children()->listed(),
    'categories' => $site->index()->listed()->filterBy('intendedTemplate', 'project.category')
  ];
};
