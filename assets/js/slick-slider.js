$(document).ready(function(){
    var totalSlides = $('.customer-logos .slide').length;

    $('.customer-logos').slick({
        slidesToShow: (totalSlides < 4 ? totalSlides : 4),
        slidesToScroll: 1,
        autoplay: true,
        infinite: (totalSlides > 1),
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: totalSlides < 3 ? totalSlides : 3
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});