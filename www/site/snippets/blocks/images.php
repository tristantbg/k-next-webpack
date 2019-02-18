<?php if (isset($limit)): ?>
  <?php $idx = 0 ?>
  <?php foreach ($block->files()->toFiles() as $key => $file): ?>
    <?php if ($idx < $limit): ?>
      <section class="block block--image">
        <?php snippet('responsive-image', ['file' => $file, 'preload' => true]) ?>
      </section>
    <?php endif ?>
    <?php $idx++ ?>
  <?php endforeach ?>
<?php else: ?>
  <?php foreach ($block->files()->toFiles() as $key => $file): ?>
    <section class="block block--image" data-caption="<?= $file->caption()->escape() ?>">
      <?php snippet('responsive-image', ['file' => $file]) ?>
    </section>
  <?php endforeach ?>
<?php endif ?>
