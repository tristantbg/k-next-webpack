<?php if (!isset($size)) { $size = 'w_100'; } ?>
<?php if ($block->text()->isNotEmpty()): ?>
<section class="block block--text <?= 'text--size-'.$block->fontsize() ?> <?= 'text--position-'.$block->position() ?>">
  <div class="block--content"><?= $block->text()->kt() ?></div>
</section>
<?php endif ?>
