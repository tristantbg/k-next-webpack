<?php

return [
    'panel'         => [
        'slug' => 'adminpanel',
    ],
    'debug'         => true,
    'environnement' => 'dev',
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
