<?php

if (!class_exists('Tristantbg\VimeoFetcher')) {
    require_once __DIR__ . '/lib/vimeofetcher.php';
}

Kirby::plugin('tristantbg/kirby3-vimeofetcher', [
    'blueprints' => [
        'files/vimeo' => __DIR__ . 'lib/blueprints/vimeo.yml',
    ],
    'hooks' => require_once __DIR__ . '/lib/hooks.php',
    'fileMethods' => [
      'vimeoSD' => function(){
        return $this->vimeofiles()->toStructure()->filterBy('quality', 'sd');
      },
      'vimeoHD' => function(){
        return $this->vimeofiles()->toStructure()->filterBy('quality', 'hd');
      },
      'vimeoHls' => function(){
        return $this->vimeofiles()->toStructure()->filterBy('quality', 'hls');
      }
    ]
]);
