modules.define('i-bem__dom', ['BEMHTML'], function(provide, BEMHTML, DOM) {

	DOM.decl('thumb',
		{
			_onClick: function(e) {
				e.preventDefault();
				this.emit('click');
			},

			// _onCreate: function() {
			// 	DOM.append(
			// 		this.domElem,
			// 		BEMHTML.apply({
			// 			block: 'thumb'
			// 		}));
			// }
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