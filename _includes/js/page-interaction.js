// Sets up events for page interaction

$(function($) {
	
	// Smooth scrolling to each section when navigation is clicked
	

	
	// Fade out "Share this" helper text after initial page scroll
	// Fade helper text back in when mouse is over share buttons
	
	$(window).one("scroll", function () {
	  	$('.share-this').delay(1000).fadeOut();
	  	$(".share a").on("mouseenter mouseleave", function () {
	  	  $('.share-this').fadeToggle("fast");
	  	});
	});
	
	// Set default size and position for share window
	    
	window.openShareWindow = function(url) {
     var width  = 640,
         height = 352,
         left   = ($(window).width()  - width)  / 2,
         top    = ($(window).height() - height) / 2,
         opts   = 'status=1' +
                  ',width='  + width  +
                  ',height=' + height +
                  ',top='    + top    +
                  ',left='   + left;

     window.open(url, 'twitter', opts);
     return false;
   	};
      
	// Add video loading graphic and hide play button when pressed

	$('.play').click(function(e){
		$(".video iframe").addClass("loading")
		$('.play').hide();
	});
	
	// Set up scrollspy to highlight navigation as use scrolls through document
	
   	$('body').scrollspy( { target: '.topbar', offset: 20} );
	
	// Set a cookie to remember when a user chooses to change the language
   
   	$('.lang a').click(function(e) {
	   $.cookie('site_language', this.text.replace(/^\[|\]$/g, ''), { path: '/' });
   	});
	
});

