;(function($) {

    "use strict";

    var titleanim = function() {
       if(jQuery(".ht-split-text").length) {
 Splitting();
            var themeht_animation_text = function (container, item) {
                jQuery(window).scroll(function () {
                    var windowBottom = jQuery(this).scrollTop() + jQuery(this).innerHeight();
                    jQuery(container).each(function (index, value) {
                        var objectBottom = jQuery(this).offset().top + jQuery(this).outerHeight() * 0.1;
                        
                        if (objectBottom < windowBottom) { 
                            var seat = jQuery(this).find(item);
                            for (var i = 0; i < seat.length; i++) {
                                (function (index) {
                                    setTimeout(function () {
                                        seat.eq(index).addClass('ht-animated');
                                    }, 200 * index);
                                })(i);
                            }
                        }
                    });
                }).scroll();
            };
        
            jQuery(function() {
                themeht_animation_text(".theme-title", ".splitting");
            });
        }

    }
    jQuery(function() {
                titleanim();
            });
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/title.default', titleanim );
    });

})(jQuery);