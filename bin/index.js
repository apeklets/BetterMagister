var main = function() {
	$('.jumbotron').children().hide()
	$('.jumbotron h1').fadeIn('slow', function() {
		$('.jumbotron h3').fadeIn('slow', function() {
			$('.jumbotron p').fadeIn(100)
		});
	});
};

$(document).ready(main)