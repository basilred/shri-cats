modules.define('i-bem__dom', ['BEMHTML'], function(provide, BEMHTML, DOM) {

	DOM.decl('thumb',
		{
			
		},
		{
			live: function() {
				
				this.liveBindTo('click', function(e) {
					e.preventDefault();
					
					// Если картинка не имеет модификатора active, то находим
					// блок с таким модификатором, снимаем его и устанавливаем
					// active для текущего блока.
					if (!this.hasMod('active')) {
						
						// Убираем предыдущий active
						// TODO: следующий блок кода необходимо заменить более элегантным решением.
						// Возможно, пересмотреть взаимодействие блоков sliderInner и thumb.
						var parent = this.findBlockOutside('sliderInner'),
							thumbsArray = parent.findBlocksInside('thumb');
						
						for (var i = 0; i < thumbsArray.length; i++) {
							if (thumbsArray[i].hasMod('active')) thumbsArray[i].delMod('active');
						};

						// Устанавливаем active на текущий блок
						this.setMod('active');
						this.emit('click');
					}
				});

				return false;
			}
		});
	
	provide(DOM);
});
