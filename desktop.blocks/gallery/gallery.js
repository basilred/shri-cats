modules.define(
	'i-bem__dom',
	['jquery', 'BEMHTML'],
	function(provide, $, BEMHTML, DOM) {
	
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json",
		currentPage,
		nextPage,
		firstRun;

	DOM.decl('gallery',
	{
		onSetMod: {
			'js': {
				'inited': function() {
					firstRun = true;
					this.getPage( album );
					
					// Подписка на BEM-событие click блока thumb
					DOM.blocks['thumb'].on(
						$('.sliderInner'),
						'click',
						this._onThumbClick,
						this);

					// Вешаем на слайдер обработчик колесика мыши
					// $('.slider').mousewheel(function(event) {
					//     console.log(event.deltaX, event.deltaY, event.deltaFactor);
					// });
				}
			}
		},

		_onThumbClick: function(e) {
			// Показать большую картинку
			var bigPictureSrc = e.target.domElem.attr('href');
			this.showBigPicture( bigPictureSrc );
		},

		showBigPicture: function(picture) {
			DOM.update(
				this.domElem,
				BEMHTML.apply({block: 'gallery', elem: 'image', url: picture})
				);
		},

		// Получаем коллекцию фотографий из альбома
		getPage: function(collection_url) {
			currentPage = collection_url;
			_this = this;
			$.ajax({
				url: collection_url,
				dataType: "jsonp",
				success: function (data) {
					nextPage = data.links.next;
					_this.addTiles(data);
				}
			});
		},

		addTiles: function(collection) {
			// Поскольку картинки не всегда есть в большом размере (orig)
			// деградируем постепенно от размера XXXL до L.
			// Если картинка имеет размер меньше L, то в слайдере её не будет.
			for (var i = 0; i < collection.entries.length; i++) {
				var bigImg;
				if (collection.entries[i].img.orig) {
					bigImg = collection.entries[i].img.orig.href;
				} else if (collection.entries[i].img.XXXL) {
					bigImg = collection.entries[i].img.XXXL.href;
				} else if (collection.entries[i].img.XXL) {
					bigImg = collection.entries[i].img.XXL.href;
				} else if (collection.entries[i].img.XL) {
					bigImg = collection.entries[i].img.XL.href;
				} else if (collection.entries[i].img.L) {
					bigImg = collection.entries[i].img.L.href;
				}
				
				var thumb = {
					block: 'thumb',
					url: bigImg,
					content: {
						elem: 'item',
						attrs: { src: collection.entries[i].img.XXS.href }
					}
				};

				DOM.append( $('.sliderInner'), BEMHTML.apply(thumb));

				if (firstRun) {
					this.showBigPicture(bigImg);
					firstRun = false;
				};
			};
		}
	});

	provide(DOM);
})