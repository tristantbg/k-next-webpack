<?php if (!isset($size)) { $size = 'w_100'; } ?>
<?php if ($block->file()->isNotEmpty() && $field = $block->file()->toStructure()->first()): ?>
<section class="block block--image <?= $size ?> <?= $block->position() ?>">
	<?php snippet('responsive-image', ['field' => $page->file($field->filename())]) ?>
</section>
<?php endif ?>
