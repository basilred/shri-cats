(function($, undefined) {
	// Альбом, с которым будем работать
	var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

	var nextPage; // ссылка на следующую страницу коллекции
	var pics = [];

	function showBigPicture (picture) {
		$('.current-picture').append('<img src="' + picture.big.href + '" />');
	}

	// Получаем коллекции фотографий из альбома
	function getPage (argument) {
		var currentImg = {};
		$.ajax({
			url: argument,
			dataType: "jsonp",
			success: function (data) {
				for (var i = 0; i < data.entries.length; i++) {
					currentImg.thumb = data.entries[i].img.XXS.href;
					currentImg.big = data.entries[i].img.orig;
					pics.push(currentImg);
						
					$('.gallery')
						.append('<img src="' + data.entries[i].img.XXS.href + '"\/>')
							.on("click", function (event) {
								showBigPicture(pics[i]);
							});
				};
					
				if (data.links.next) {
					console.log("Go to page: " + data.links.next);
					getPage(data.links.next);
				} else {
					console.log(pics);
					showBigPicture(pics[0]);
				}
			}
		});
	}

	$(function() {
		getPage(album);
		console.log(pics);
	});
})(jQuery);