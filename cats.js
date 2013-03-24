(function($, undefined) {
	$(function() {
		// Альбом, с которым будем работать
		var album = "http://api-fotki.yandex.ru/api/users/aig1001/";

		// Получаем коллекцию фотографий из альбома
		function getPage (argument) {
			return $.ajax({
				url: argument,
				dataType: "jsonp",
			});
			// console.log(data);
		}

		col = getPage(album);
		
	});
})(jQuery);