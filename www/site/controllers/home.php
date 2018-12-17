<?php

return function ($site, $page) {

  $projects = new Collection();

  foreach ($page->featuredProjects()->toStructure() as $key => $item) {
  	if ($project = page($item->project()->value())) {
  		$projects->data[] = $project;
  	}
  }

  return [
    'projects' => $projects,
    'categories' => $site->index()->listed()->filterBy('intendedTemplate', 'project.category')
  ];
};
