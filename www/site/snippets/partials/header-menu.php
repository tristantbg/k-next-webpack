<?php if ($page->intendedTemplate() == 'project'): ?>
	<?php snippet('partials/project-menu', ['project' => $page]) ?>
<?php else: ?>
	<?php snippet('partials/projects-menu', ['projects' => $projects]) ?>
<?php endif ?>