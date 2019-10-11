<?php
  if (isset($file)){
    $image = $file;
  }
  elseif(isset($field)){
    $image = $field->toFile();
  }
  $withPlaceholder = isset($withPlaceholder) && $withPlaceholder;
?>

<?php if(isset($image) && $image): ?>

  <?php
    if (isset($caption) && $caption) {
      $alt = $caption.' - © '.r($image->credits()->isNotEmpty(), $image->credits()->html().', ').$site->title()->html();
    }
    elseif ($image->alt()->isNotEmpty()) {
      $alt = $image->alt().' - © '.r($image->credits()->isNotEmpty(), $image->credits()->html().', ').$site->title()->html();
    }
    elseif ($image->caption()->isNotEmpty()) {
      $alt = $image->caption().' - © '.r($image->credits()->isNotEmpty(), $image->credits()->html().', ').$site->title()->html();
    }
    elseif($image->page()) {
      $alt = $image->page()->title()->html().' - © '.r($image->credits()->isNotEmpty(), $image->credits()->html().', ').site()->title()->html();
    } else {
      $alt = $site->title()->html().' - © '.r($image->credits()->isNotEmpty(), $image->credits()->html().', ').site()->title()->html();
    }
  ?>

    <?php
      if (isset($ratio)) {
        $placeholder = $image->crop(200, floor(200/$ratio));
        $thumb = $image->crop($width, floor($width/$ratio));
        if (option('kirby-cloudinary') === true) {
          $src = $image->cl_crop(1000, floor(1000/$ratio));
        }
        elseif (option('kirby-imgx') === true) {
          $src = $image->imgxUrl(['w' => $width, 'h' => floor($width/$ratio)]);
        }
        else {
          $src = $image->crop($width, floor($width/$ratio))->url();
        }
      } else {
        $placeholder = $image->resize(200);
        $thumb = $image->resize($width);
        if (option('kirby-cloudinary') === true) {
          $src = $image->cl_resize(1000);
        }
        elseif (option('kirby-imgx') === true) {
          $src = $image->imgxUrl(['w' => $width]);
        }
        else {
          $src = $image->resize($width)->url();
        }
      }
    ?>
    <div
    class="simple-image"
    <?php if ($withPlaceholder): ?>
    g-component="LazyLoad"
    <?php endif ?>
    >
      <img
      class="<?= r(isset($noLazyload) && $noLazyload, '', ' lazyload') ?><?php if(isset($preload)) echo ' lazypreload' ?>"
      src="<?= $placeholder->url() ?>"
      data-src="<?= $src ?>"
      data-width="<?= $thumb->width() ?>"
      data-height="<?= $thumb->height() ?>"
      g-ref="image"
      alt="<?= $alt ?>"
      width="100%" height="auto" />
    </div>

<?php endif ?>
