<?php snippet('partials/footer-menu') ?>

</div>

</div>

</main>

<?php snippet('partials/outdated') ?>

<?php snippet('partials/analytics') ?>

<script>
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.init = false;
</script>

<?php if($kirby->option('environnement') == 'dev'): ?>
  <script src="http://localhost:8080/assets/bundle.js"></script>
<?php else: ?>
  <?= Bnomei\Fingerprint::js('assets/build/bundle.js') ?>
<?php endif ?>

</body>
</html>
