(function(){
	$(function(){
    carousel();
  });

  function carousel(){
		$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    responsive:{
        0:{
          items:1
        },
        600:{
          items:3
        },
        1000:{
          items:5
        }
	    }
		});
  }

}) (jQuery);
