// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/favorites', function(favorites) {
    favorites.forEach(function(fav) {
		$li = $('<li/>', {
			'class': 'favorite-row'
		});
		$li.append(
			$('<a/>', {
				'class': 'favorite-link',
				'href': fav[1],
				'target': '_blank',
				text: fav[0]
			})
		);
		$('ul#favorites').append($li);
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var broadcaster = $('input#broadcaster').val();
    var hls = $('input#hls').val();
    $.post('/favorites?' + $.param({broadcaster:broadcaster, hls:hls}), function() {
      $('<li></li>').text(broadcaster + " " + hls).appendTo('ul#favorites');
      $('input#broadcaster').val('');
      $('input#hls').val('');
      $('input').focus();
    });
  });
});
