(function($, undefined) {
	$(function() {
		// Альбом, с которым будем работать
		var album = "http://api-fotki.yandex.ru/api/users/aig1001/album/63684/";

		// Парсинг ответа сервера
		function parsePage (data) {
			var entries = data.entries;
			
			for (var i = 0; i < entries.length; i++) {
				console.log( entries[i].imageCount );
			};
		}

		// Получаем коллекцию фотографий из альбома
		function getPage (argument) {
			argument += "?format=json";
			return $.ajax({
				url: argument,
				dataType: "jsonp",
				jsonpCallback: "parsePage"
			});
			// console.log(data);
		}

		col = getPage(album);
		
	});
})(jQuery);