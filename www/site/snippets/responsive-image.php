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
        $thumb = array('width' => 1000, 'height' => floor(1000/$ratio));
        if (option('kirby-cloudinary') === true) {
          $src = $image->cl_crop(1000, floor(1000/$ratio));
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_crop($value, floor($value/$ratio)) . ' ' . $value . 'w,';
          }
        }
        elseif (option('kirby-imgix') === true) {
          $src = $image->imgixUrl(['w' => $bp[1], 'h' => floor($bp[1]/$ratio)]);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->imgixUrl(['w' => $value, 'h' => floor($value/$ratio)]) . ' ' . $value . 'w,';
          }
        }
        else {
          $src = $image->crop($bp[1], floor($bp[1]/$ratio))->url();
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->crop($value, floor($value/$ratio))->url() . ' ' . $value . 'w,';
          }
        }
      } else {
        $thumb = array('width' => 1000, 'height' => floor(1000/$image->ratio()));
        if (option('kirby-cloudinary') === true) {
          $src = $image->cl_resize(1000);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->cl_resize($value) . ' ' . $value . 'w,';
          }
        }
        elseif (option('kirby-imgix') === true) {
          $src = $image->imgixUrl(['w' => 1024]);
          $srcset = '';
          foreach ($bp as $value) {
            if($value <= $maxWidth) $srcset .= $image->imgixUrl(['w' => $value]) . ' ' . $value . 'w,';
          }
        }
        else {
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
    src='<?= 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '. $thumb['width'] .' '. $thumb['height'] .'"%3E%3C/svg%3E' ?>'
    data-src="<?= $src ?>"
    data-srcset="<?= $srcset ?>"
    data-sizes="auto"
    data-optimumx="1.5"
    data-width="<?= $thumb['width'] ?>"
    data-height="<?= $thumb['height'] ?>"
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
