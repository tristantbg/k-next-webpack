<?php

namespace Tristantbg;

use Kirby\Data\Yaml;
use Vimeo\Vimeo;

if (!option('plugin.vimeofetcher.disable') && option('plugin.vimeofetcher.client_id') && option('plugin.vimeofetcher.client_secret') && option('plugin.vimeofetcher.access_token')) {
} else {
    return;
}

class VimeoFetcher
{

    public static function getVideoInfos($file, $id = null)
    {

        $client_id     = option('plugin.vimeofetcher.client_id');
        $client_secret = option('plugin.vimeofetcher.client_secret');
        $access_token  = option('plugin.vimeofetcher.access_token');
        $lib           = new \Vimeo\Vimeo($client_id, $client_secret);
        $lib->setToken($access_token);

        if ($file == null && $id) {
            $vimeoID = $id;
        } else {
            $vimeoID = $file->vimeoID();
        }

        \Tristantbg\VimeoFetcher::writeInfos($file, $vimeoID, $lib);
    }

    public static function getPageVideos($page)
    {

        $client_id     = option('plugin.vimeofetcher.client_id');
        $client_secret = option('plugin.vimeofetcher.client_secret');
        $access_token  = option('plugin.vimeofetcher.access_token');
        $lib           = new \Vimeo\Vimeo($client_id, $client_secret);
        $lib->setToken($access_token);

        $ids = $page->vimeoIDs()->split(',');

        foreach ($ids as $key => $id) {
            \Tristantbg\VimeoFetcher::writeInfos(null, $id, $lib, $page);
        }

        $page->update(['vimeoIDs' => '']);

    }

    public static function writeInfos($file, $id, $lib, $page = null)
    {

        $response        = $lib->request('/videos/' . $id, ['per_page' => 1], 'GET');
        $body            = $response['body'];
        $vimeoThumbnails = isset($body['pictures']) ? $body['pictures']['sizes'] : [];
        $vimeoFiles      = isset($body['files']) ? $body['files'] : [];

        usort($vimeoThumbnails, function ($item1, $item2) {
            return $item1['width'] <=> $item2['width'];
        });

        usort($vimeoFiles, function ($item1, $item2) {
            return $item1['width'] <=> $item2['width'];
        });

        if (isset($body['error'])) {
            if ($file) {
                $file->update(array(
                    'vimeoData'        => '',
                    'vimeoName'        => 'Not found…',
                    'vimeoDescription' => '',
                    'vimeoURL'         => '',
                    'vimeoThumbnails'  => '',
                    'vimeoFiles'       => '',
                    'template'       => 'vimeo',
                ));
            }

        } else {

            if ($file == null && count($vimeoThumbnails) > 1) {
                $url       = end($vimeoThumbnails)['link'];
                $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION);
                $filename  = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_FILENAME);
                $imagedata = file_get_contents($url);
                $safename  = \Kirby\Toolkit\F::safeName('vimeo_' . $body['name'] . '_' . $filename);

                if ($file = $page->image($safename . '.' . $extension)) {
                    $file->update(array(
                        'template' => 'vimeo',
                        'vimeoID'  => $id,
                    ));
                } else {
                    file_put_contents($page->root() . DS . $safename . '-temp' . '.' . $extension, $imagedata);

                    $file = $page->createFile([
                        'filename' => $safename . '.' . $extension,
                        'source'   => $page->root() . DS . $safename . '-temp' . '.' . $extension,
                    ]);
                    unlink($page->root() . DS . $safename . '-temp' . '.' . $extension);

                    if ($file) {
                        $file->update(array(
                            'template' => 'vimeo',
                            'vimeoID'  => $id,
                        ));
                    } else {
                        file_put_contents($page->root() . DS . $safename . '.' . $extension . '.txt', 'Template: vimeo' . "\n\n----\n\n" . 'Vimeoid: ' . $id);
                    }
                }

            }

            if ($file) {

                $file->update(array(
                    'vimeoData'        => \Kirby\Data\Yaml::encode($body),
                    'vimeoName'        => $body['name'],
                    'vimeoDescription' => $body['description'],
                    'vimeoURL'         => $body['link'],
                    'vimeoThumbnails'  => \Kirby\Data\Yaml::encode($vimeoThumbnails),
                    'vimeoFiles'       => \Kirby\Data\Yaml::encode($vimeoFiles),
                    'template'         => 'vimeo'
                ));

            }

            if ($page) {
                $page->save();
            }

        }
    }

    // private static $cache = null;

    // private static function cache(): \Kirby\Cache\Cache
    // {
    //     if (!static::$cache) {
    //         static::$cache = kirby()->cache('plugin.vimeofetcher');
    //     }
    //     return static::$cache;
    // }

    // public static function getFilesIndex($force = false)
    // {
    //     $index = $force ? null : static::cache()->get('files.index');
    //     if (!$index) {
    //         $index = site()->index()->images();
    //         static::cache()->set('files.index', $index, 15);
    //     }
    //     return $index;
    // }

    // public static function absoluteThumbUrl()
    // {
    //     if (isset($_SERVER['HTTPS'])) {
    //         $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    //     } else {
    //         $protocol = 'http';
    //     }
    //     return $protocol . "://" . $_SERVER['HTTP_HOST'] . $url;
    // }

}
