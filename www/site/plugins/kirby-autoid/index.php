<?php

@include_once __DIR__ . '/vendor/autoload.php';

if (!class_exists('Bnomei\AutoID')) {
    require_once __DIR__ . '/classes/AutoID.php';
}

if (!function_exists('autoid')) {
    function autoid($obj = \Bnomei\AutoID::GENERATE)
    {
        \Bnomei\AutoID::index();

        if ($obj === \Bnomei\AutoID::GENERATE) {
            return \Bnomei\AutoID::generate();
        } elseif (is_string($obj) ||
            is_a($obj, 'Kirby\Cms\Field')) {
            return \Bnomei\AutoID::find($obj);
        } elseif (is_a($obj, 'Kirby\Cms\Page') ||
            is_a($obj, 'Kirby\Cms\File')) {
            $find = \Bnomei\AutoID::find(
                $obj->{\Bnomei\AutoID::FIELDNAME}()
            );
            if (!$find) {
                \Bnomei\AutoID::push($obj);
                $find = \Bnomei\AutoID::findByID($obj->id());
            }
            return $find;
        }
        return null;
    }

    function modified($autoid): ?int
    {
        \Bnomei\AutoID::index();
        return \Bnomei\AutoID::modified($autoid);
    }
}

Kirby::plugin('bnomei/autoid', [
    'options' => [
        'cache' => true,
        'generator' => function (string $seed = null) {
            // override with custom callback if needed
            return (new \Bnomei\TokenGenerator($seed))->generate();
        // return (new \Bnomei\IncrementingGenerator(0))->generate();
            // return (new \Bnomei\UUIDGenerator(site()->url()))->generate();
        },
        'generator.break' => 42, // generator loops for uniqueness
        'tinyurl.url' => function () {
            return kirby()->url('index');
        },
        'tinyurl.folder' => 'x',
    ],
    'pageMethods' => [ // PAGE
        'tinyurl' => function () {
            $url = \Bnomei\AutoID::tinyurl(
                $this->{\Bnomei\AutoID::FIELDNAME}()
            );
            if ($url) {
                return $url;
            }
            return site()->errorPage()->url();
        },
        'tinyUrl' => function () {
            $url = \Bnomei\AutoID::tinyurl(
                $this->{\Bnomei\AutoID::FIELDNAME}()
            );
            if ($url) {
                return $url;
            }
            return site()->errorPage()->url();
        },
    ],
    'pagesMethods' => [ // PAGES not PAGE
        'autoid' => function ($autoid) {
            return autoid($autoid);
        },
    ],
    'fieldMethods' => [
        'fromAutoID' => function ($field) {
            return autoid($field);
        },
    ],
    'fields' => [
        'autoid' => [
            'props' => [
                'value' => function (string $value = null) {
                    return $value;
                },
            ],
        ],
    ],
    'routes' => function ($kirby) {
        $folder = $kirby->option('bnomei.autoid.tinyurl.folder');
        return [
            [
                'pattern' => $folder . '/(:any)',
                'method' => 'GET',
                'action' => function ($autoid) {
                    $page = autoid($autoid);
                    if ($page) {
                        return \go($page->url(), 302);
                    } else {
                        return \go(site()->errorPage()->url(), 404);
                    }
                },
            ],
        ];
    },
    'hooks' => [
        'page.create:after' => function ($page) {
            \Bnomei\AutoID::push($page);
        },
        'page.update:after' => function ($newPage, $oldPage) {
            \Bnomei\AutoID::push($newPage);
        },
        'page.duplicate:after' => function ($newPage) {
            \Bnomei\AutoID::push($newPage, true);
        },
        'page.changeSlug:after' => function ($newPage, $oldPage) {
            \Bnomei\AutoID::push($newPage);
        },
        'page.delete:before' => function ($page) {
            \Bnomei\AutoID::remove($page);
        },
        'file.create:after' => function ($file) {
            \Bnomei\AutoID::push($file);
        },
        'file.update:after' => function ($newFile, $oldFile) {
            \Bnomei\AutoID::push($newFile);
        },
        'file.changeName:after' => function ($newFile, $oldFile) {
            \Bnomei\AutoID::push($newFile);
        },
        'file.delete:before' => function ($file) {
            \Bnomei\AutoID::remove($file);
        },
    ],
]);
