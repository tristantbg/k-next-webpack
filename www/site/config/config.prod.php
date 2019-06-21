<?php

return [
    'panel'         => [
        'slug' => 'adminpanel',
        'css' => 'assets/panel.css'
    ],
    'debug'         => false,
    'environnement' => 'prod',
    'thumbs'        => [
        'driver' => 'im',
        'srcsets' => [
            'default' => [200, 400, 600, 1024, 1600, 1920],
            'cover'   => [800, 1024, 2048, 4000],
        ],
    ],
    'hooks'         => [
        'page.create:after' => function ($page) {
            $page->changeStatus('listed');
        },
    ],
    'cache'         => [
        'pages' => [
            'active' => false,
        ],
    ],
];
