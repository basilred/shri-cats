(function($, undefined) {
	// Альбом, с которым будем работать
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

	var nextPage; // ссылка на следующую страницу коллекции
	var pics = [],
		picsGlobalCount = 0;
	var PICS_FOR_PRELOAD = 3; // количество предзагружаемых картинок

	// Предзагрузка следующих count картинок к текущей выбранной
	function preloadNextTo (img, count) {
		// 
	}


	function showBigPicture (picture) {
		$('.current-picture .big-image').empty();
		$('.current-picture .big-image').append('<img/>').find('img').attr('src', picture);
	}

	// Получаем коллекцию фотографий из альбома
	function getPage (collection_url) {
		var dfd = $.Deferred();
		nextPage = $.ajax({
			url: collection_url,
			dataType: "jsonp",
			success: function (data) {
				console.log(data);
				addTiles(data);
			}
		});
		// dfd.resolve(nextPage);
		// return dfd.promise();
	}

	function addTiles (collection) {
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
			$('.gallery')
					.append('<a href="' + bigImg + 
						'"><img src="' + collection.entries[i].img.XXS.href + '"\/></a>');
		};
	}

	function prepare () {
		$(document).delegate('a', 'click', function (event) {
			showBigPicture($(this).attr('href'));
			return false;
		});
	}

	$(function() {
		prepare();
		getPage(album);
	});
})(jQuery);