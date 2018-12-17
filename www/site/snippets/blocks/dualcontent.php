<section class="block block--dualcontent w_100">
  <?php foreach ($block->blocks()->toStructure() as $key => $blockItem): ?>
    <?php snippet('blocks/' . $blockItem->_key(), array('block' => $blockItem, 'size' => 'w_50')) ?>
  <?php endforeach ?>
</section>
