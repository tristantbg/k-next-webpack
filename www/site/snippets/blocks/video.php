<?php if ($videoEmbed = $block->videourl()->toEmbed()): ?>

  <?php $videoURL = $videoEmbed->url(); ?>
  <?php $videoPlatform = $videoEmbed->providerName(); ?>
  <?php $videoImage = $videoEmbed->image(); ?>
  <?php $videoEmbedCode = $videoEmbed->code(); ?>
  <?php $aspectratio = str_replace(',', '.', $videoEmbed->aspectRatio()->value()); ?>

  <?php if (strtolower($videoPlatform) == 'youtube'): ?>
    <?php $videoImages = $videoEmbed->images(); ?>
    <?php foreach($videoImages->toStructure() as $image): ?>
        <?php $imageURL = $image->url() ?>
        <?php if(strpos($imageURL, 'maxres') !== false) {
            $videoImageNew = $imageURL;
        } ?>
    <?php endforeach ?>
  <?php endif; ?>

  <?php if (strtolower($videoPlatform) == 'vimeo'): ?>
    <?php
      $vimeoID = (int) substr(parse_url($videoURL, PHP_URL_PATH), 1);
      $hash = unserialize(file_get_contents("http://vimeo.com/api/v2/video/" . $vimeoID .".php"));
      $videoImage640 = $hash[0]['thumbnail_large'];
      $videoImage = str_replace("_640","", $videoImage640);
    ?>
  <?php endif; ?>

  <section class="block block-video-embed">
    <figure class="figure-width">
      <div class="video-embed js-video-embed" style="padding-bottom: <?= $aspectratio ?>%;" data-played="false">
        <div class="video-cover">
          <img src="<?= $videoImage; ?>">
          <div class="play"></div>
        </div>
        <div class="video-player js-video-player -hidden">
          <?= $videoEmbedCode; ?>
        </div>

      </div>
      <figcaption class="text-detail">
        <?php if($block->title()->isNotEmpty()): ?>
          <span class="image-title caps">
            <?= $block->title() ?>
          </span> &nbsp;
        <?php endif; ?>
        <a href="<?= $videoURL ?>" target="_blank" class="image-source">Source</a>
      </figcaption>
    </figure>
  </section>

<?php endif ?>
