<?php
  if (isset($file)){
    $image = $file;
  }
  elseif(isset($field)){
    $image = $page->file($field->filename());
  }
?>

<?php if(isset($image) && $image): ?>

	<div class="responsive-image">
		<?php
		if(!isset($maxWidth)) $maxWidth = 2720;
		if (isset($ratio)) {
			$placeholder = $image->crop(200, floor(200/$ratio))->url();
			$src = $image->crop(1000, floor(1000/$ratio))->url();
			$srcset = $image->crop(340, floor(340/$ratio))->url() . ' 340w,';
			for ($i = 680; $i <= $maxWidth; $i += 340) $srcset .= $image->crop($i, floor($i/$ratio))->url() . ' ' . $i . 'w,';
		} else {
			$placeholder = $image->resize(1020)->url();
			$src = $image->resize(1000)->url();
			$srcset = $image->resize(340)->url() . ' 340w,';
			for ($i = 680; $i <= $maxWidth; $i += 340) $srcset .= $image->resize($i)->url() . ' ' . $i . 'w,';
		}
		?>
    <?php if (isset($ratio)): ?>
    <div class="ph" style="padding-bottom: <?= number_format(100 / $ratio, 5, '.', '') ?>%"></div>
    <?php else: ?>
    <div class="ph" style="padding-bottom: <?= number_format(100 / $image->ratio(), 5, '.', '') ?>%"></div>
    <?php endif ?>
		<img
		class="lazyload<?php if(isset($preload)) echo ' lazypreload' ?>"
		src="<?= $placeholder ?>"
		data-src="<?= $src ?>"
		data-srcset="<?= $srcset ?>"
		data-sizes="auto"
		data-optimumx="1.5"
		<?php if (isset($caption) && $caption): ?>
		alt="<?= $caption.' - © '.$site->title()->html() ?>"
		<?php elseif ($image->caption()->isNotEmpty()): ?>
		alt="<?= $image->caption().' - © '.$site->title()->html() ?>"
		<?php else: ?>
		alt="<?= $image->page()->title()->html().' - © '.site()->title()->html() ?>"
		<?php endif ?>
		width="100%" height="auto" />
		<noscript>
			<img src="<?= $src ?>"
			<?php if (isset($caption) && $caption): ?>
			alt="<?= $caption.' - © '.$site->title()->html() ?>"
			<?php elseif ($image->caption()->isNotEmpty()): ?>
			alt="<?= $image->caption().' - © '.$site->title()->html() ?>"
			<?php else: ?>
			alt="<?= $image->page()->title()->html().' - © '.site()->title()->html() ?>"
			<?php endif ?>
			width="100%" height="auto" />
		</noscript>
  </div>

	<?php if (isset($withCaption) && $image->caption()->isNotEmpty()): ?>
		<div class="row caption"><?= $image->caption()->kt() ?></div>
	<?php endif ?>

<?php endif ?>

