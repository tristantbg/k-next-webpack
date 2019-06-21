<?php
  $bp = option('thumbs')['srcsets']['default'] ?? [200, 400, 600, 1024, 1600, 1920];
  if (isset($file)){
    $image = $file;
  }
  elseif(isset($field)){
    $image = $field->toFile();
  }
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

  <div class="responsive-image">
    <?php
    if(isset($srcSet)){
      $src = $image->resize($bp[1])->url();
      $srcset = $image->srcset($srcSet);
    } else {
      if(!isset($maxWidth)) $maxWidth = 3000;
      if (isset($ratio)) {
        if (option('plugin.cloudinary.fetch_id')) {
          $placeholder = $image->cl_crop($bp[0], floor($bp[1]/$ratio), ['quality' => 90, 'effect' => 'blur:300']);
          $src = $image->cl_crop(1000, floor(1000/$ratio));
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_crop($value, floor($value/$ratio)) . ' ' . $value . 'w,';
          }
        } else {
          $placeholder = $image->crop(50, floor(50/$ratio), ['quality' => 90, 'blur' => null])->dataURI();
          $src = $image->crop($bp[1], floor($bp[1]/$ratio))->url();
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->crop($value, floor($value/$ratio))->url() . ' ' . $value . 'w,';
          }
        }
      } else {
        if (option('plugin.cloudinary.fetch_id')) {
          $placeholder = $image->cl_thumb(['width' => $bp[1], 'quality' => 90, 'effect' => 'blur:300']);
          $src = $image->cl_resize(1000);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_resize($value) . ' ' . $value . 'w,';
          }
        }
        else {
          $placeholder = $image->thumb(['width' => 50, 'quality' => 90, 'blur' => null])->dataURI();
          $src = $image->resize($bp[1])->url();
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->resize($value)->url() . ' ' . $value . 'w,';
          }
        }
      }
    }
    ?>
    <img
    class="lazy lazyload<?php if(isset($preload)) echo ' lazypreload' ?>"
    src="<?= $placeholder ?>"
    data-src="<?= $src ?>"
    data-srcset="<?= $srcset ?>"
    data-sizes="auto"
    data-optimumx="1.5"
    alt="<?= $alt ?>"
    width="100%" height="auto" />
    <noscript>
      <img src="<?= $src ?>"
      alt="<?= $alt ?>"
      width="100%" height="auto" />
    </noscript>
  </div>

  <?php if (isset($withCaption) && $image->caption()->isNotEmpty()): ?>
    <div class="row caption"><?= $image->caption()->kt() ?></div>
  <?php endif ?>

<?php endif ?>
