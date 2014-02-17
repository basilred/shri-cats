modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('slider', {

	onSetMod: {
		'js' : {
			'inited' : function() {

				DOM.blocks['gallery'].on(
					'prevPressed',
					this.onPrevPressed,
					this);

				DOM.blocks['gallery'].on(
					'nextPressed',
					this.onNextPressed,
					this);

				DOM.blocks['gallery'].on(
					'append',
					this.onAppend,
					this);
			
			}
		}
	},

	onElemSetMod: {
		'item' : {
			'current' : function(elem) {
				this.delMod(this._current, 'current');
				this._current = elem;
				this.emit('click', elem.attr('big'));
			}
		}
	},

	onPrevPressed: function() {
		this.setMod(this._current.prev(), 'current');
	},

	onNextPressed: function() {
		this.setMod(this._current.next(), 'current');
	},

	onAppend: function() {
		this._current = this.findElem('item', 'current', true);
		this.emit('click', this._current.attr('big'))
	}

},
{
	live: function() {
		this.liveBindTo('item', 'click', function(e) {
			this.setMod(e.currentTarget, 'current');
		});
		return false;
	}
});

provide(DOM);

});