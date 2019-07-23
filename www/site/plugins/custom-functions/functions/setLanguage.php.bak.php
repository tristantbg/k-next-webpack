<?php

function setLanguage()
{
    if (kirby()->language() == 'fr') {
      if (option('environnement') == 'dev') {
        setlocale(LC_ALL, 'fr_FR.ISO8859-1');
      } else {
        setlocale(LC_ALL, 'fr_FR.utf8');
      }
    } else {
      if (option('environnement') == 'dev') {
        setlocale(LC_ALL, 'en_US');
      } else {
        setlocale(LC_ALL, 'en_US.utf8');
      }
    }
}
