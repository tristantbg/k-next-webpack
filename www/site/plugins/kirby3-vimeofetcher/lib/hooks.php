<?php
$getVideoInfos = function ($file) {
    if ($file->template() == 'vimeo' && $file->vimeoID()->isNotEmpty()) {
        Tristantbg\VimeoFetcher::getVideoInfos($file);
    }
};
$getPageVideos = function ($page) {
    if ($page->vimeoIDs()->isNotEmpty()) {
        Tristantbg\VimeoFetcher::getPageVideos($page);
    }
    foreach ($page->files()->filterBy('template', 'vimeo') as $key => $file) {
      if ($file->vimeoData()->isEmpty() && $file->vimeoID()->isNotEmpty()) {
        Tristantbg\VimeoFetcher::getVideoInfos($file);
      }
    }
};
return array(
    'page.update:after' => $getPageVideos,
    'file.update:after' => $getVideoInfos,
);
