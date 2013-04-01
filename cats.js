(function($, undefined) {
	// Альбом, с которым будем работать
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

	var nextPage; // ссылка на следующую страницу коллекции
	var pics = [],
		picsGlobalCount = 0;


	function showBigPicture (picture) {
		// $('.current-picture').append('<img src="' + pics[picture].big.href + '" />');
		$('.current-picture').empty();
		$('.current-picture').append('<img/>').find('img').attr('src', picture);
	}

	// Получаем коллекции фотографий из альбома
	function getPage (collection_url) {
		$.ajax({
			url: collection_url,
			dataType: "jsonp",
			success: function (data) {
				for (var i = 0; i < data.entries.length; i++) {
					var currentImg = {};
					currentImg.thumb = data.entries[i].img.XXS.href;
					currentImg.big = data.entries[i].img.orig;
					pics.push(currentImg);
						
					$('.gallery')
						// .append('<a href="' + currentImg.big.href + '"\/>')
						.append('<a href="' + currentImg.big.href + '"><img id="' + picsGlobalCount + '" src="' + data.entries[i].img.XXS.href + '"\/></a>');
						// .wrapInner('<a href="' + currentImg.big.href + '" />');
					picsGlobalCount++;
				};
					
				if (data.links.next) {
					console.log("Go to page: " + data.links.next);
					getPage(data.links.next);
				} else {
					console.log(pics);
					showBigPicture(0);
				}
			}
		});
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