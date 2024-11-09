$(document).ready(function(){
  var slidesToShow, responsiveTablet;
  var totalSlides = $('.customer-logos .slide').length;
  if ($('.slidesToShowFixed').length && $('.slidesToShowFixed').data('slides-to-show')) {
    slidesToShow = parseInt($('.slidesToShowFixed').data('slides-to-show'), 10);
    responsiveTablet = slidesToShow;
    
  } else {
    slidesToShow = totalSlides < 3 ? totalSlides : 3;
    responsiveTablet = totalSlides < 2 ? totalSlides : 2;
  }

  $('.customer-logos').slick({
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      infinite: (totalSlides > 1),
      autoplaySpeed: 1500,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [{
          breakpoint: 900,
          settings: {
              slidesToShow: responsiveTablet
          }
      }, {
          breakpoint: 745,
          settings: {
              slidesToShow: 1
          }
      }]
  });

    function setEqualHeight() {
        var maxHeight = 0;
        $('.slide').each(function() {
          var thisHeight = $(this).outerHeight();
          if (thisHeight > maxHeight) {
            maxHeight = thisHeight;
          }
        });
        $('.slide').css('height', maxHeight + 'px');
    }
    
    // Set height on page load
    setEqualHeight();
    
    // Set height on window resize (for responsiveness)
    $(window).on('resize orientationchange', function() {
      $('.slide').css('height', 'auto');  // Reset height to auto first
      setEqualHeight();  // Recalculate and set new heights
    });
    
    // Recalculate height after each Slick slide change (important for breakpoints)
    $('.customer-logos').on('setPosition', function() {
      $('.slide').css('height', 'auto');  // Reset height to auto first
      setEqualHeight();  // Recalculate and set new heights
    });
});


