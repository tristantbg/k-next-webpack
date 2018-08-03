<div id="share-buttons">
		Share&nbsp;
		<ul>
			<li>
				<a href="http://www.facebook.com/sharer.php?u=<?= rawurlencode ($p->url()); ?>" target="blank" title="Share on Facebook">
					Fb.
				</a>
			</li>
			<li>
				<a href="https://pinterest.com/pin/create/button/?url=<?= rawurlencode ($p->url()); ?>&media=&description=<?= rawurlencode ($site->title().' | '.$p->title()); ?>" target="blank" title="Share on Pinterest">
					Pin.
				</a>
			</li>
			<li>
				<a href="https://twitter.com/intent/tweet?source=webclient&text=<?= rawurlencode($site->title().' | '.$p->title()); ?>%20<?= rawurlencode($p->url()); ?>" target="blank" title="Tweet this">Tw.</a>
			</li>
		</ul>

</div>