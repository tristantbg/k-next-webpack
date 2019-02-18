<?php snippet('header') ?>

<div id="project">
  <div id="project-header">
    <h1 class="italic"><?= $page->title()->html() ?></h1>
    <?php if ($page->caption()->isNotEmpty()): ?>
    <span>, <?= $page->caption()->html() ?></span>
    <?php endif ?>
    <?php if ($page->date()->isNotEmpty()): ?>
    <span>, <?= $page->date()->toDate('Y') ?></span>
    <?php endif ?>
    <span class="caption"></span>
    <span>.</span>
  </div>
  <div class="medias" data-id="<?= $page->uid() ?>">
    <?php foreach($page->sections()->toStructure() as $block): ?>
      <?php snippet('blocks/' . $block->_key(), array('block' => $block)) ?>
    <?php endforeach ?>
  </div>
</div>

<?php snippet('footer') ?>
