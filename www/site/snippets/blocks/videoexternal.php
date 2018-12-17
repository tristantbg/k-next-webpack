<?php if (!isset($size)) { $size = 'w_100'; } ?>

<?php if ($block->file()->isNotEmpty() && $block->file()->toStructure()->first() && $file = $page->file($block->file()->toStructure()->first()->filename())): ?>
<section class="block block--external-video player-container video-is-muted <?= $size ?>">
	<div class="block--content"
  <?php if ($block->padding()->isNotEmpty() && $block->padding()->int() != 0): ?>
  style="padding: <?= $block->padding()->int().'rem' ?>"
  <?php endif ?>
  >
		<video
		class="video-player silent play-on-scroll<?php e($block->controls()->bool() == false, '', ' controls') ?><?php e($block->muted()->bool() == false, '', ' force-mute') ?>"
		poster="<?= $file->resize(2040)->url() ?>" 
		<?php if ($Hls = $file->vimeoHls()->first()): ?>
		data-stream="<?= $Hls->link() ?>" 
		<?php endif ?>
		<?php if ($file->vimeofiles()->isNotEmpty() && $file->vimeoHD()->last()): ?>
		data-hd="<?= $file->vimeoHD()->last()->link() ?>"
		<?php endif ?>
		<?php if ($file->vimeofiles()->isNotEmpty() && $file->vimeoSD()->last()): ?>
		data-sd="<?= $file->vimeoSD()->last()->link() ?>"
		<?php endif ?>
		width="100%"
		preload="none"
		muted="1"
		loop
		playsinline="1">
			<?php if ($file->vimeofiles()->isNotEmpty() && $file->vimeoHD()->last()): ?>
			<source src="<?= $file->vimeoHD()->last()->link() ?>" type="video/mp4">
      <?php elseif ($file->vimeofiles()->isNotEmpty() && $file->vimeoSD()->last()): ?>
      <source src="<?= $file->vimeoSD()->last()->link() ?>" type="video/mp4">
			<?php endif ?>
			<?php if ($file->webm()->isNotEmpty()): ?>
			<source src="<?= $file->webm() ?>" type="video/webm">
			<?php endif ?>
		</video>
		<?php if ($file->vimeofiles()->isNotEmpty() && $file->externalLink()->isNotEmpty() && $linkedPage = $file->externalLink()): ?>
			<a href="<?= $linkedPage->url() ?>" class="block--link"></a>
		<?php elseif ($file->pageLink()->isNotEmpty() && $linkedPage = $file->pageLink()->toPage()): ?>
			<a href="<?= $linkedPage->url() ?>" class="block--link"></a>
		<?php endif ?>
	</div>
	<?php if (false): ?>
	<div class="block--footer">
		<div class="video-player--controls">
			<div class="video-player-play" event-target="playpause">
				<svg><use xlink:href="<?= url('build/assets/images/icons.svg') ?>#play" /></svg>
			</div>
			<div class="video-player-pause" event-target="playpause">
				<svg><use xlink:href="<?= url('build/assets/images/icons.svg') ?>#pause" /></svg>
			</div>
			<div class="video-player-mute" event-target="mute">
				<svg><use xlink:href="<?= url('build/assets/images/icons.svg') ?>#mute" /></svg>
			</div>
			<div class="video-player-unmute" event-target="unmute">
				<svg><use xlink:href="<?= url('build/assets/images/icons.svg') ?>#unmute" /></svg>
			</div>
		</div>
	</div>
	<?php endif ?>
</section>
<?php endif ?>
