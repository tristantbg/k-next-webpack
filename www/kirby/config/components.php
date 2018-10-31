<?php

use Kirby\Cms\App;
use Kirby\Cms\Model;
use Kirby\Cms\Filename;
use Kirby\Cms\Response;
use Kirby\Cms\Template;
use Kirby\Data\Data;
use Kirby\Image\Darkroom;
use Kirby\Text\SmartyPants;
use Kirby\Toolkit\F;
use Kirby\Toolkit\Tpl as Snippet;

return [
    'file::url' => function (App $kirby, Model $file, array $options = []) {

        if (empty($options) === true) {
            return $file->mediaUrl();
        }

        if ($file->isResizable() === false) {
            return $file->mediaUrl();
        }

        // thumb driver config
        $config = $kirby->option('thumbs', []);

        // pre-calculate all thumb attributes
        $darkroom   = Darkroom::factory($config['driver'] ?? 'gd', $config);
        $attributes = $darkroom->preprocess($file->root(), $options);

        // create url and root
        $parent    = $file->parent();
        $mediaRoot = $parent->mediaRoot() . '/' . $file->mediaHash();
        $dst       = $mediaRoot . '/{{ name }}{{ attributes }}.{{ extension }}';
        $thumb     = (new Filename($file->root(), $dst, $attributes))->toString();
        $thumbName = basename($thumb);
        $job       = $mediaRoot . '/.jobs/' . $thumbName . '.json';

        if (file_exists($thumb) === false) {
            try {
                Data::write($job, array_merge($attributes, [
                    'filename' => $file->filename()
                ]));
            } catch (Throwable $e) {
                // the thumb job file cannot be created
            }
        }

        return $parent->mediaUrl() . '/' . $file->mediaHash() . '/' . $thumbName;

    },
    'markdown' => function (App $kirby, string $text = null, array $options = []): string {
        static $markdown;

        if (isset($markdown) === false) {
            $parser   = ($options['extra'] ?? false) === true ? 'ParsedownExtra' : 'Parsedown';
            $markdown = new $parser;
            $markdown->setBreaksEnabled($options['breaks'] ?? true);
        }

        // we need the @ here, because parsedown has some notice issues :(
        return @$markdown->text($text);
    },
    'response' => function (App $kirby, $input) {
        return Response::for($input);
    },
    'smartypants' => function (App $kirby, string $text = null, array $options = []): string {
        static $smartypants;

        $smartypants = $smartypants ?? new Smartypants($options);

        return $smartypants->parse($text);
    },
    'snippet' => function (App $kirby, string $name, array $data = []) {
        $file = $kirby->root('snippets') . '/' . $name . '.php';

        if (file_exists($file) === false) {
            $file = $kirby->extensions('snippets')[$name] ?? null;
        }

        return Snippet::load($file, $data);
    },
    'template' => function (App $kirby, string $name, string $type = 'html') {
        return new Template($name, $type);
    },
    'thumb' => function (App $kirby, string $src, string $dst, array $options) {

        $config   = $kirby->option('thumbs', []);
        $darkroom = Darkroom::factory($config['driver'] ?? 'gd', $config);
        $options  = $darkroom->preprocess($src, $options);
        $root     = (new Filename($src, $dst, $options))->toString();

        F::copy($src, $root);
        $darkroom->process($root, $options);

        return $root;

    },
];
