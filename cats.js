(function($, undefined) {
	// Альбом, с которым будем работать
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

	var nextPage; // ссылка на следующую страницу коллекции
	var pics = [],
		picsGlobalCount = 0;


	function showBigPicture (picture) {
		$('.current-picture').empty();
		$('.current-picture').append('<img/>').find('img').attr('src', picture);
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
			if (collection.entries[i].img.orig) {
				$('.gallery')
					.append('<a href="' + collection.entries[i].img.orig.href + 
						'"><img src="' + collection.entries[i].img.XXS.href + '"\/></a>');	
			}
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
		console.log(pics);
	});
})(jQuery);