modules.define('i-bem__dom', ['BEMHTML'], function(provide, BEMHTML, DOM) {

	DOM.decl('thumb',
		{
			onSetMod: {
				'js': {
					'inited': function() {
						console.log(this.big);
					}
				}
			}
		},
		{
			live: function() {
				
				this.liveBindTo('click', function(e) {
					e.preventDefault();
					this.emit('click');
				});

				return false;
			}
		});
	
	provide(DOM);
});