<?php if($site->googleanalytics()->isNotEmpty()): ?>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?= $site->googleanalytics() ?>"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '<?= $site->googleanalytics() ?>');
  </script>
<?php endif ?>
