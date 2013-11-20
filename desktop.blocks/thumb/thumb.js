modules.define('i-bem__dom', function(provide, DOM) {

	DOM.decl('thumb',
		{
			_onClick: function(e) {
				e.preventDefault();
				this.emit('click');
			}
		},
		{
			live: function() {
				this.liveBindTo('click', function(e) {
					this._onClick(e);
				});
			}
		});
	
	provide(DOM);
});