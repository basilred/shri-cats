modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {
	
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json",
		currentPage,
		nextPage,
		firstRun;

	
	function showBigPicture (picture) {
		$('.gallery__image').empty();
		$('.gallery__image').hide().fadeIn().attr('src', picture);
	}

	// Получаем коллекцию фотографий из альбома
	function getPage( collection_url ) {
		currentPage = collection_url;
		$.ajax({
			url: collection_url,
			dataType: "jsonp",
			success: function (data) {
				console.log(data);
				nextPage = data.links.next;
				addTiles(data);
			}
		});
	}

	function addTiles(collection) {
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
			.append('<a href="' + bigImg + 
				'"><img src="' + collection.entries[i].img.XXS.href + '"\/></a>');

			// DOM.append($('.scroller'), BEMHTML.apply({block: 'thumb'}));

			if (firstRun) {
				showBigPicture(bigImg);
				firstRun = false;
			};
		};
		// Нет полностью загруженных превью первой страницы, поэтому ширина 
		// скроллера не будет соответствовать нужной.
		// FIX: решить с помощью promise!
		// FIXED: решено в css заданием фиксированной ширины для контейнера.
		// scrollerInit();
	};

	DOM.decl('gallery',
	{
		onSetMod: {
			'js': {
				'inited': function() {
					// Подписка на BEM-событие click блока thumb
					DOM.blocks['thumb'].on(
						this.domElem,
						'click',
						this._onThumbClick,
						this);

					firstRun = true;
					getPage( album );
				}
			}
		},

		_onThumbClick: function(e) {
			// Показать большую картинку
			var bigPictureSrc = e.target.domElem.attr('href');
			showBigPicture( bigPictureSrc );
			
		},

	});

	provide(DOM);
})