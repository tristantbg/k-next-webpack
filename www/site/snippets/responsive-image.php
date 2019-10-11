<?php
  $bp = option('thumbs')['srcsets']['default'] ?? [200, 400, 600, 1024, 1600, 1920];
  if(isset($srcSet)) $bp = option('thumbs')['srcsets'][$srcSet];
  if (isset($file)){
    $image = $file;
  }
  elseif(isset($field)){
    $image = $field->toFile();
  }
  $ghostPlaceholder = isset($ghostPlaceholder) && $ghostPlaceholder;
?>

<?php if(isset($image) && $image && $image->type() == 'image'): ?>

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
    $alt = Escape::html($alt);
  ?>

  <div
  class="responsive-image"
  <?php if ($ghostPlaceholder): ?>
  g-component="LazyLoad"
  <?php endif ?>
  >
    <?php
      if(!isset($maxWidth)) $maxWidth = 3000;
      if (isset($ratio)) {
        $thumb = $image->crop($bp[1], floor($bp[1]/$ratio));
        if (option('kirby-cloudinary') === true) {
          // $placeholder = $image->cl_crop($bp[0], floor($bp[1]/$ratio), ['quality' => 90, 'effect' => 'blur:300']);
          $src = $image->cl_crop(1000, floor(1000/$ratio));
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_crop($value, floor($value/$ratio)) . ' ' . $value . 'w,';
          }
        }
        elseif (option('kirby-imgx') === true) {
          // $placeholder = $ghostPlaceholder ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : $image->imgxUrl(['w' => 50, 'h' => floor(50/$ratio), 'q' => 70, 'blur' => '50']);
          $src = $image->imgxUrl(['w' => $bp[1], 'h' => floor($bp[1]/$ratio)]);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->imgxUrl(['w' => $value, 'h' => floor($value/$ratio)]) . ' ' . $value . 'w,';
          }
        }
        else {
          // $placeholder = $ghostPlaceholder ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : $image->crop(50, floor(50/$ratio), ['quality' => 90, 'blur' => null])->dataURI();
          $src = $image->crop($bp[1], floor($bp[1]/$ratio))->url();
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->crop($value, floor($value/$ratio))->url() . ' ' . $value . 'w,';
          }
        }
      } else {
        $thumb = $image->resize($bp[1]);
        if (option('kirby-cloudinary') === true) {
          // $placeholder = $image->cl_thumb(['width' => $bp[1], 'quality' => 90, 'effect' => 'blur:300']);
          $src = $image->cl_resize(1000);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_resize($value) . ' ' . $value . 'w,';
          }
        }
        elseif (option('kirby-imgx') === true) {
          // $placeholder = $ghostPlaceholder ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : $image->imgxUrl(['w' => 800, 'q' => 70, 'blur' => '50']);
          // $placeholder = $ghostPlaceholder ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : $image->thumb(['width' => 50, 'quality' => 90, 'blur' => false])->dataURI();
          $src = $image->imgxUrl(['w' => 1024]);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->imgxUrl(['w' => $value]) . ' ' . $value . 'w,';
          }
        }
        else {
          // $placeholder = $ghostPlaceholder ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : $image->thumb(['width' => 50, 'quality' => 90, 'blur' => null])->dataURI();
          $src = $image->resize($bp[1])->url();
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->resize($value)->url() . ' ' . $value . 'w,';
          }
        }
      }
    ?>
    <img
    class="lazy<?= r(isset($noFade) && $noFade, ' no-fade', '') ?><?= r(isset($noLazyload) && $noLazyload, '', ' lazyload') ?><?php if(isset($preload)) echo ' lazypreload' ?>"
    data-src="<?= $src ?>"
    data-srcset="<?= $srcset ?>"
    data-sizes="auto"
    data-optimumx="1.5"
    data-width="<?= $thumb->width() ?>"
    data-height="<?= $thumb->height() ?>"
    g-ref="image"
    alt="<?= $alt ?>"
    width="100%" height="auto"
    />
    <noscript>
      <img src="<?= $src ?>"
      alt="<?= $alt ?>"
      width="100%" height="auto" />
    </noscript>
  </div>

  <?php if (isset($withCaption) && $image->caption()->isNotEmpty()): ?>
    <div class="row block block--caption reading-text"><?= $image->caption()->kt() ?></div>
  <?php endif ?>

<?php endif ?>
