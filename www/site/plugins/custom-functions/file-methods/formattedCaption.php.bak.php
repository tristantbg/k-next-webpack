<?php

return function () {

    $caption = '';

    if ($this->fileTitle()->isNotEmpty()) {
        $caption .= Html::tag('span', $this->fileTitle()->html(), ['class' => 'title']);
    }

    if ($this->caption()->isNotEmpty()) {
        $caption .= Html::tag('span', $this->caption()->kirbytextinline(), ['class' => 'caption']);
    }

    if ($this->credits()->isNotEmpty()) {
        $caption .= Html::tag('span', $this->credits()->kirbytextinline(), ['class' => 'credits']);
    }

    return html_entity_decode($caption);

};
