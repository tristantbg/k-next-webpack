<?php if($site->googleanalytics()->isNotEmpty()): ?>
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', '<?= $site->googleanalytics() ?>', 'auto');
  ga('require', 'autotrack');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>
  <script async src='
  https://cdnjs.cloudflare.com/ajax/libs/autotrack/2.4.1/autotrack.js'></script>
<?php endif ?>
