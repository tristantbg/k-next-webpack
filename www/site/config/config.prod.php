<?php

return [
    'panel'         => [
        'slug' => 'adminpanel',
    ],
    'debug'         => false,
    'environnement' => 'prod',
    'thumbs'        => [
        'driver' => 'im',
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
