<header class="project-header expanded">
	<div id="menu-categories">
    <a href="<?= $site->url() ?>" class="bullet">Latest</a>
		<?php foreach ($categories as $key => $category): ?>
			<a href="<?= $category->url() ?>" class="bullet<?= e($project->parent()->is($category), ' active') ?>"><?= $category->title()->html() ?></a>
		<?php endforeach ?>
	</div>
	<div id="project-title">
		<h1><?= $project->title()->html() ?></h1>
		<?php if ($project->subtitle()->isNotEmpty()): ?>
			<h2><?= $project->subtitle()->html() ?></h2>
		<?php endif ?>
	</div>
	<div id="project-description">
	<?php if ($project->text()->isNotEmpty()): ?>
		<div class="expand-toggle bullet">Description</div>
		<div class="expand-content"><?= $project->text()->kt() ?></div>
	<?php endif ?>
	</div>
	<div id="project-credits">
	<?php if ($project->credits()->isNotEmpty()): ?>
		<div class="expand-toggle bullet">Credits</div>
		<div class="expand-content"><?= $project->credits()->kt() ?></div>
	<?php endif ?>
	</div>
	<div class="nav-page">
		<a href="<?= $site->url() ?>" class="close-page">back</a>
		<a href="<?= $project->findPreviousIn($projects)->url() ?>" class="previous-page">previous</a>
		<a href="<?= $project->findNextIn($projects)->url() ?>" class="next-page">next</a>
	</div>
</header>
