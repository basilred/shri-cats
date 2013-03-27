(function($, undefined) {
	$(function() {
		// Альбом, с которым будем работать
		var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/photos/?format=json";

		var nextPage; // ссылка на следующую страницу коллекции
		var pics = [];

		// Получаем коллекции фотографий из альбома
		function getPage (argument) {
			var currentImg = {};
			$.ajax({
				url: argument,
				dataType: "jsonp",
				success: function (data) {
					for (var i = 0; i < data.entries.length; i++) {
						$('.gallery').append('<img src="' + data.entries[i].img.XXS.href + '"\/>');
						// pics.push({'thumb': data.entries[i].img.XXS.href, 'img': data.entries[i].img.orig.href});
						currentImg.thumb = data.entries[i].img.XXS.href;
						currentImg.big = data.entries[i].img.orig;
						
						pics.push(currentImg);
					};
					if (data.links.next) {
						console.log("Go to page: " + data.links.next);
						getPage(data.links.next);
					} else {
						console.log(pics);
					}
				}
			});
		}

		getPage(album);
		console.log(pics);
				
	});
})(jQuery);