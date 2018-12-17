<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit54f1e3b07af199d5ea5e9af2164e876f
{
    public static $files = array (
        'c417d56f84766727c19c8c673404dc74' => __DIR__ . '/../..' . '/config.php',
    );

    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Flokosiol\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Flokosiol\\' => 
        array (
            0 => __DIR__ . '/../..' . '/core',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit54f1e3b07af199d5ea5e9af2164e876f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit54f1e3b07af199d5ea5e9af2164e876f::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}