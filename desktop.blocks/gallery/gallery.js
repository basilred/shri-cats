modules.define(
	'i-bem__dom',
	['jquery', 'BEMHTML', 'mousewheel'],
	function(provide, $, BEMHTML, mousewheel, DOM) {
	
	var album = 'http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json',
		lastScrollPosition = 0,
		preloader = '/preloader.gif',
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
					_this = this;
					$('.slider').mousewheel(function(event) {
					    this.scrollLeft -= event.deltaY;
					    event.preventDefault();
					    if ((this.scrollLeft > 0) 
					    	&& (this.scrollLeft === lastScrollPosition) 
					    	&& (currentPage != nextPage)) {
					    	_this.getPage(nextPage);
					    }
					    lastScrollPosition = this.scrollLeft;
					});

					// Подписка на событие click элемента prev
					this.bindTo('prev', 'click', function() {
						this.onPrevClick();
					});
				}
			}
		},

		_onThumbClick: function(e) {
			// Показать большую картинку
			var bigPictureSrc = e.target.domElem.attr('href');
			this.showPreloader();
			this.showBigPicture( bigPictureSrc );
		},

		onPrevClick: function() {
			// Если тумба первая в слайдере,
			console.log('Prev pressed');
			// sliderInner.thumb.hasMod('active').prev
		},

		showBigPicture: function(picture) {
			var img = BEMHTML.apply({
				block: 'gallery',
				elem: 'image',
				url: picture
			});

			var $img = $(img);
			_this = this;

			$img.on('load', function() {
				DOM.replace(_this.findElem('image'), $img);
				_this.centrateImage($img);
				$(_this.findElem('image')).hide().fadeIn();
			});

			$(window).bind('resize.gallery__image', function() {
				_this.centrateImage($img);
			})
			.trigger('resize');
		},

		showPreloader: function() {
			$(this.findElem('image')).attr({'src': preloader});
		},

		centrateImage: function($img) {
			$img.css({
				'margin-left': $img.width() / -2,
				'margin-top': $img.height() / -2
			});
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
});
