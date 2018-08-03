  <header>
    <div id="site-title">
      <?php if ($page->isHomepage()): ?>
        <h1><?= $site->title()->html() ?></h1>
      <?php else: ?>
        <h1 class="hidden"><?= $page->title()->html() ?></h1>
        <a href="<?= $site->url() ?>"><?= $site->title()->html() ?></a>
      <?php endif ?>
    </div>

    <?php
      $menuProjects = $site->index()->filterBy('intendedTemplate', 'project')->visible();
      $menuPages = $pages->filterBy('intendedTemplate', '!=', 'projects')->visible();
    ?>
    <nav id="menu">
      <?php foreach ($menuProjects as $key => $item): ?>
        <a class="project<?php e($item->is($page),' active') ?>" href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
      <?php endforeach ?>
      <?php foreach ($menuPages as $key => $item): ?>
        <a<?php e($item->is($page),' class="active"') ?> href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
      <?php endforeach ?>
    </nav>

  </header>
