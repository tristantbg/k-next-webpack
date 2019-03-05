<!DOCTYPE html>
<html lang="en" class="no-js">
<head>

  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <link rel="canonical" href="<?php echo html($page->url()) ?>" />
  <?php if($page->isHomepage()): ?>
    <title><?= $site->title()->html() ?></title>
  <?php else: ?>
    <title><?= $page->title()->html() ?> | <?= $site->title()->html() ?></title>
  <?php endif ?>
  <?php if($page->isHomepage()): ?>
    <meta name="description" content="<?= $site->description()->html() ?>">
  <?php else: ?>
    <meta name="DC.Title" content="<?= $page->title()->html() ?>" />
    <?php if($page->text()->isNotEmpty()): ?>
      <meta name="description" content="<?= $page->text()->excerpt(250) ?>">
      <meta name="DC.Description" content="<?= $page->text()->excerpt(250) ?>"/ >
      <meta property="og:description" content="<?= $page->text()->excerpt(250) ?>" />
    <?php else: ?>
      <meta name="description" content="">
      <meta name="DC.Description" content=""/ >
      <meta property="og:description" content="" />
    <?php endif ?>
  <?php endif ?>
  <meta name="robots" content="index,follow" />
  <meta name="keywords" content="<?= $site->keywords()->html() ?>">
  <?php if($page->isHomepage()): ?>
    <meta itemprop="name" content="<?= $site->title()->html() ?>">
    <meta property="og:title" content="<?= $site->title()->html() ?>" />
  <?php else: ?>
    <meta itemprop="name" content="<?= $page->title()->html() ?> | <?= $site->title()->html() ?>">
    <meta property="og:title" content="<?= $page->title()->html() ?> | <?= $site->title()->html() ?>" />
  <?php endif ?>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="<?= html($page->url()) ?>" />
  <?php if($page->featured()->isNotEmpty() && $ogimage = $page->featured()->toFile()): ?>
    <?php $ogimage = $ogimage->resize(1200) ?>
    <meta property="og:image" content="<?= $ogimage->url() ?>"/>
    <meta property="og:image:width" content="<?= $ogimage->width() ?>"/>
    <meta property="og:image:height" content="<?= $ogimage->height() ?>"/>
  <?php else: ?>
    <?php if($site->ogimage()->isNotEmpty() && $ogimage = $site->ogimage()->toFile()): ?>
      <?php $ogimage = $ogimage->resize(1200) ?>
      <meta property="og:image" content="<?= $ogimage->url() ?>"/>
      <meta property="og:image:width" content="<?= $ogimage->width() ?>"/>
      <meta property="og:image:height" content="<?= $ogimage->height() ?>"/>
    <?php endif ?>
  <?php endif ?>

  <meta itemprop="description" content="<?= $site->description()->html() ?>">

  <?php if($kirby->option('environnement') == 'dev'): ?>
    <link rel="stylesheet" media="all" href="http://localhost:8080/assets/index.css" />
    <script src="http://localhost:8080/assets/vendor/modernizr-bundle.js"></script>
  <?php else: ?>
    <?= Bnomei\Fingerprint::css('/assets/build/index.css') ?>
    <?= Bnomei\Fingerprint::js('/assets/build/vendor/modernizr-bundle.js') ?>
  <?php endif ?>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

  <?php if($site->customcss()->isNotEmpty()): ?>
    <style type="text/css">
      <?php echo $site->customcss()->html() ?>
    </style>
  <?php endif ?>

</head>

<body<?php e($page->isHomepage(), ' class="with-intro"') ?> page-type="<?= $page->intendedTemplate() ?>">

<div id="loader"></div>

<div id="main">

  <div class="pjax">

  <?php snippet('partials/header-menu') ?>

  <div id="container">

    <div id="page-content" page-type="<?= $page->intendedTemplate() ?>">
