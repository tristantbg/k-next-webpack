<header>
  <a href="<?= $site->url() ?>"><?= $site->title()->html() ?></a>
  <?php foreach ($site->pages() as $key => $p): ?>
    <a href="<?= $p->url() ?>" class="<?= e($page->is($p), ' active') ?>"><?= $p->title()->html() ?></a>
  <?php endforeach ?>
</header>
