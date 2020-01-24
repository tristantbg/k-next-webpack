<?php

return function ($field, $options = []) {

    if($field->isNotEmpty()) {

      $videoContainerArgs = ['class' => 'player-container'];
      $videoSources       = [];
      $videoArgs          = [
          'class'   => 'video-player',
          'width'   => '100%',
          'height'  => 'auto',
          'preload' => 'auto',
      ];

      if (!empty($options['placeholderWidth']) && !empty($options['placeholderHeight'])) {
        $videoArgs['poster'] = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '. $options['placeholderWidth'] .' '. $options['placeholderHeight'] .'"%3E%3C/svg%3E';
      }
      if (!empty($options['poster'])) {
          $videoArgs['poster'] = $options['poster'];
      }

      if (!empty($options['data-poster'])) {
          $videoArgs['data-poster'] = $options['data-poster'];
      }

      if (!empty($options['class'])) {
          $videoArgs['class'] .= ' ' . $options['class'];
      }

      if (!empty($options['controls']) && $options['controls']) {
          $videoArgs['class'] .= ' controls';
      }

      if (!empty($options['controls']) && $options['controls']) {
          $videoArgs['controls'] = true;
      }

      if (!empty($options['loop']) && $options['loop']) {
          $videoArgs['loop'] = 'loop';
      }

      if (!empty($options['muted']) && $options['muted']) {
          $videoArgs['muted'] = 'muted';
      }

      if (!empty($options['playsinline']) && $options['playsinline']) {
          $videoArgs['playsinline'] = 1;
      }

      if (!empty($options['autoplay']) && $options['autoplay']) {
          $videoArgs['autoplay'] = true;
          $videoArgs['data-autoplay'] = '';
      }

      if (!empty($options['preload'])) {
          $videoArgs['preload'] = $options['preload'];
      }

      if (!empty($options['sd'])) {
          $videoArgs['data-sd'] = $options['sd'];
      }

      $hd                   = $field;
      $videoArgs['data-hd'] = $hd;

      if (!empty($options['lazyload'])) {
        $videoArgs['data-src']     = $hd;
      } else {
        $videoSources[]       = Html::tag('source', null, ['src' => $hd, 'type' => 'video/mp4']);
      }

      $video          = Html::tag('video', [implode('', $videoSources)], $videoArgs);
      $videoContainer = Html::tag('div', [$video], $videoContainerArgs);

      return $videoContainer;

    }

};
