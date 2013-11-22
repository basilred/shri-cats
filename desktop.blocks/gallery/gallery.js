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
		beforeSetMod: {
			'js': {
				'inited': function() {
					
				}
			}
		},

		onSetMod: {
			'js': {
				'inited': function() {
					firstRun = true;
					this.getPage( album );
					

				}
			}
		},

		_onThumbClick: function(e) {
			// Показать большую картинку
			var bigPictureSrc = e.target.domElem.attr('href');
			this.showBigPicture( bigPictureSrc );
			// DOM.update(
			// 	this.elem('image'),
			// 	BEMHTML.apply({block: 'gallery', elem: 'image', content: [{src: bigPictureSrc}]})
			// 	);
		},

		showBigPicture: function(picture) {
			$('.gallery__image').empty();
			$('.gallery__image').hide().fadeIn().attr('src', picture);
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
				
				$('.scroller')
				.append('<a class="thumb" href="' + bigImg + 
					'"><img src="' + collection.entries[i].img.XXS.href + '"\/></a>');

				// DOM.append(
				// 	this.findBlockInside('scroller'),
				// 	BEMHTML.apply({block: 'thumb'})
				// 	);

				if (firstRun) {
					// Подписка на BEM-событие click блока thumb
					DOM.blocks['thumb'].on(
						this.domElem,
						'click',
						this._onThumbClick,
						this);
					
					this.showBigPicture(bigImg);
					firstRun = false;
				};
			};
		}

	});

	provide(DOM);
})