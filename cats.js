(function($, undefined) {
	// Альбом, с которым будем работать
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

	var nextPage; // ссылка на следующую страницу коллекции
	var currentPage;
	var pics = [],
		picsGlobalCount = 0;
	var PICS_FOR_PRELOAD = 3; // количество предзагружаемых картинок

	var scroller = {position:0}; //скроллер для слайдера

	var firstRun = true; // Показ картинки при первом запуске

	function scrollerInit () {
		var elem;
		
		scroller.width = $('.gallery-rule').width();
		scroller.window = $('.gallery').width();
		// console.log('gallery-rule:' + scroller.width);
		// console.log('gallery:' + scroller.window);
		
		elem = document.getElementById('gallery');
		elem.addEventListener('mousewheel', scrollWheel, false);
		
		// scroller.position=0;
  		scroller.step=5;
  		scroller.timer=null;
	}

	// Обработчик колесика мыши 
	function scrollWheel(e) {
		e = e ? e : window.event;
		var wheelElem = e.target ? e.target : e.srcElement;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
  
		// В движке WebKit возвращается значение в 100 раз больше 
		if (Math.abs(wheelData)>100) { wheelData=Math.round(wheelData/100); }
		if (wheelData<0) {
			doScroll('right',10*Math.abs(wheelData));
		}
		else {
			doScroll('left',10*Math.abs(wheelData));
		}
		// Подавление события колесика мыши, чтобы оно не передавалось дальше
		if (window.event) {
			e.cancelBubble = true;
			e.returnValue = false; 
			e.cancel = true; 
		} 
		if (e.stopPropagation && e.preventDefault) { 
			e.stopPropagation(); 
			e.preventDefault(); 
		} 
		return false; 
	}

	// Функция скроллера 
	function doScroll(dir,step) { 
		var elem = document.getElementById('gallery-row');
		var current_collection = nextPage;
		// Прокрутка влево       
		if (dir == 'left') { 
			scroller.position += step; 
			// Если скроллер вышел за левую границу, то установить позицию в 0 
			if (scroller.position > 0) { 
				scroller.position = 0; 
			}     
		} 
		// Прокрутка вправо 
		else { 
			scroller.position -= step; 
			// Если скроллер вышел за правую границу, то установить позицию в край 
			if (scroller.position < (scroller.window - scroller.width)) { 
				scroller.position = scroller.window - scroller.width;
				
				// и начать загрузку следующей коллекции
				if (nextPage) {
					// вызыватся столько раз, сколько крутится колёсико
					// FIX: нужно дождаться загрузки предыдущей.
					// FIXED: решено введением доп.переменной currentPage
					if (currentPage != nextPage) {
						getPage(nextPage);
					}
				}
			}     
		} 
		// Установить позицию полосы скроллера 
		elem.style.left = scroller.position + 'px'; 
	}

	// Предзагрузка следующих count картинок к текущей выбранной
	function preloadNextTo (img, count) {
		// 
	}

	// Загрузка картинки по урлу
	// Возвращаем, когда полностью загружена
	function loadPicture (url) {
		var dfd = $.Deferred();

		var $container = $('<div/>').load(url, function() {
			var $img = $container.find('img');

			$img.bind('load', function() {
				dfd.resolve($img);
			});
		});

		return dfd.promise();
	}

	function showBigPicture (picture) {
		$('.current-picture .big-image').empty();
		$('.current-picture .big-image')
		.append('<img/>').find('img').hide().fadeIn().attr('src', picture);
	}

	// Получаем коллекцию фотографий из альбома
	function getPage (collection_url) {
		// var dfd = $.Deferred();
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
		// dfd.resolve(nextPage);
		// return dfd.promise();
	}

	function addTiles (collection) {
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
			$('.gallery-rule')
			.append('<a href="' + bigImg + 
				'"><img src="' + collection.entries[i].img.XXS.href + '"\/></a>');
			if (firstRun) {
				showBigPicture(bigImg);
				firstRun = false;
			};
		};
		// Нет полностью загруженных превью первой страницы, поэтому ширина 
		// скроллера не будет соответствовать нужной.
		// FIX: решить с помощью promise!
		// FIXED: решено в css заданием фиксированной ширины для контейнера.
		scrollerInit();
	}

	function prepare () {
		// Вешаем на все ссылки страницы обработчик
		$(document).delegate('a', 'click', function (event) {
			// Ищем .selected элемент, снимаем у него этот класс
			// и присваиваем его текущему элементу галереи.
			$('.gallery').find('.selected').toggleClass('selected');
			$(this).toggleClass('selected');
			showBigPicture($(this).attr('href'));
			// loadPicture($(this).attr('href')).then(console.log('LOADED'));
			return false;
		});

		// Показ и скрытие галереи при наведении мышкой
		$('.gallery')
		.mouseenter(function() {
			$(this).animate({opacity: 1}, 500);
		})
		.mouseleave(function() {
			$(this).animate({opacity: 0}, 500);
		});
	}

	$(function() {
		prepare();
		getPage(album);
	});
})(jQuery);