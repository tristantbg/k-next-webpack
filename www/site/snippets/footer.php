<?php snippet('partials/footer-menu') ?>

</div>

</div>

</div>

</div>

<?php snippet('partials/outdated') ?>

<?php snippet('partials/analytics') ?>

<?php if($kirby->option('environnement') == 'dev'): ?>
  <script src="http://localhost:8080/assets/bundle.js"></script>
<?php else: ?>
  <?= Bnomei\Fingerprint::js('assets/build/bundle.js') ?>
<?php endif ?>

</body>
</html>
