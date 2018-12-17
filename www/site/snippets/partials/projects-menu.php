<header class="projects-header">
  <div id="menu-categories">
    <a href="<?= $site->url() ?>" class="bullet<?= e($page->isHomepage(), ' active') ?>">Latest</a>
    <?php foreach ($categories as $key => $category): ?>
      <div class="bullet<?= e($page->is($category) || !$page->isHomepage() && $page->intendedTemplate() != 'project.category' && $categories->first()->is($category), ' active') ?>" data-category="<?= $category->uid() ?>" event-target="category"><?= $category->title()->html() ?></div>
    <?php endforeach ?>
  </div>
  <div id="menu-projects">
    <?php if ($page->isHomepage()): ?>
      <?php foreach ($projects as $key => $p): ?>
        <a
        href="<?= $p->url() ?>"
        class="bullet"
        data-id="<?= str_replace('/', '+', $p->id()) ?>"
        data-title="<?= $p->title()->escape() ?>"
        data-subtitle="<?= $p->subtitle()->escape() ?>"
        event-target="project-hover"><?= $p->title()->html() ?></a>
      <?php endforeach ?>
    <?php endif ?>
    <?php foreach ($categories as $key => $category): ?>
      <?php foreach ($category->children()->listed() as $key => $p): ?>
        <a
        href="<?= $p->url() ?>"
        class="bullet<?= e($page->is($category) || !$page->isHomepage() && $page->intendedTemplate() != 'project.category' && $categories->first()->is($category), '', ' hidden') ?>"
        data-id="<?= str_replace('/', '+', $p->id()) ?>"
        data-title="<?= $p->title()->escape() ?>"
        data-subtitle="<?= $p->subtitle()->escape() ?>"
        data-category="<?= $category->uid() ?>"
        event-target="project-hover"><?= $p->title()->html() ?></a>
      <?php endforeach ?>
    <?php endforeach ?>
  </div>
  <div id="current-project-category">
    <?php if ($projects->count() > 0): ?>
    <?php if ($page->isHomepage()): ?>
    <div class="bullet blink">Latest</div>
    <?php endif ?>
    <div><?= $projects->first()->parent()->title()->html() ?></div>
    <?php else: ?>
    <h1><?= $page->title() ?></h1>
    <?php endif ?>
  </div>
  <div id="current-project-title">
    <?php if ($projects->count() > 0): ?>
      <?= $projects->first()->title()->html() ?>
      <?php if ($projects->first()->subtitle()->isNotEmpty()): ?>
        <br><?= $projects->first()->subtitle()->html() ?>
      <?php endif ?>
    <?php endif ?>
  </div>
  <div event-target="explore"></div>
</header>
