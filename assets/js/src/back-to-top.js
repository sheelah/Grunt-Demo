$(document).ready(function(){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 800,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.to-top');

	// hide or show the "back to top" link
	$(window).scroll(function(){
		if ( $(this).scrollTop() > offset ) {
			$back_to_top.addClass('to-top-is-visible');
		} else {
			 $back_to_top.removeClass('to-top-is-visible to-top-fade-out');
		}
		if ( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('to-top-fade-out');
		}
	});

	// smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0
		 	}, scroll_top_duration
		);
	});

});
