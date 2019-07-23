<?php

return function () {
    $html       = '';
    $categories = $this->categories();
    $sections   = $this->sections()->toBuilderBlocks();

    if ($categories->isNotEmpty()) {

        $items = $categories->split(',');

        foreach ($categories->split(',') as $key => $tag) {
            $html .= Html::tag('span', $tag);
        }

    }

    if ($sections->count() > 0) {
        $images = 0;
        $videos = 0;
        $gifs   = 0;

        foreach ($sections as $key => $section) {
            if ($section->_key() == 'vimeo') {
                $videos++;
            } elseif ($section->_key() == 'images') {
                foreach ($section->files()->toFiles() as $key => $f) {
                    if ($f->mime() == "image/gif") {
                        $gifs++;
                    } else {
                        $images++;
                    }
                }
            }
        }

        if ($images > 0) {
            $title = $images > 1 ? 'Images' : 'Image';
            $html .= Html::tag('span', strval($images) . ' ' . $title);
        }

        if ($videos > 0) {
            $title = $videos > 1 ? 'Videos' : 'Video';
            $html .= Html::tag('span', strval($videos) . ' ' . $title);
        }

        if ($gifs > 0) {
            $title = $gifs > 1 ? 'Gifs' : 'Gif';
            $html .= Html::tag('span', strval($gifs) . ' ' . $title);
        }

    }

    return $html != '' ? '<span class="button">' . $html . '</span>' : null;

};
