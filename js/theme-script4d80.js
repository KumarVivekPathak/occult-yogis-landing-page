(function($) {



"use strict";



/*------------------------------------

  HT Predefined Variables

--------------------------------------*/

var jQuerywindow = jQuery(window),

    jQuerydocument = jQuery(document),

    jQuerybody = jQuery('body');



//Check if function exists

jQuery.fn.exists = function () {

  return this.length > 0;

};





/*------------------------------------

  HT PreLoader

--------------------------------------*/

function preloader() {

   jQuery('#ht-preloader').fadeOut();

};





/*------------------------------------

  HT Menu

--------------------------------------*/

jQuery.fn.themeht_is_bound = function(type) {

	if (this.data('events') !== undefined) {

		if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {

			return false;

		}

		return (-1 !== $.inArray(fn, this.data('events')[type]));

	} else {

		return false;

	}

};


function ht_navbar() {
	if (!jQuery('ul#menu-main-menu > li > a[href="#"]').themeht_is_bound('click')) {
		jQuery('ul#menu-main-menu > li > a[href="#"]').on(function() { return false; });
	}
	jQuery('.main-nav > ul li:has(ul)').append("<span class='sub-menu-toggle'><i class='bi bi-chevron-right'></i></span>");
	jQuery('.main-nav li').on(function() {
		if (jQuery(this).children("ul").length == 1) {
			var parent = jQuery(this);
			var child_menu = jQuery(this).children("ul");
			if (jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width()) {
				jQuery(child_menu).addClass('themeht-nav-left');
			} else {
				jQuery(child_menu).removeClass('themeht-nav-left');
			}
		}
	});
	jQuery(".nav-menu-toggle").on("click tap", function() {

	});
	jQuery('.sub-menu-toggle').on('click', function() {
		if (jQuery(this).siblings('.sub-menu, .children').hasClass('show')) {
			jQuery(this).siblings('.sub-menu, .children').removeClass('show');
			jQuery('i', jQuery(this)).removeClass('bi bi-chevron-up').addClass('bi bi-chevron-right');
		} else {
			jQuery(this).siblings('.sub-menu, .children').addClass('show');
			jQuery('i', jQuery(this)).removeClass('bi bi-chevron-right').addClass('bi bi-chevron-up');
		}
		return false;
	});
	jQuery('.nav-menu-toggle').on('click', function() {
		jQuery('.main-nav ul.menu > li > a').on('click', function() {
			if (jQuery(this).attr('href') == '#' && jQuery(this).siblings('ul.sub-menu, ul.children').length > 0) {
				jQuery(this).siblings('.sub-menu-toggle').trigger('click');
				return false;
			}
		});
	})
	
jQuery('#menu-toggle').on('click', function() {
		jQuery(".main-nav, body").toggleClass("menu-active");
	})
	if (jQuery('.main-nav > .closepanel').length == 0) {
		jQuery('.main-nav').append('<span class="closepanel"><i class="bi bi-x"></i></span>');

		jQuery('.main-nav > .closepanel').on('click', function() {
			jQuery(".main-nav, body").toggleClass("menu-active");
		});

		return false;
	}
}


/*------------------------------------

  HT Counter

--------------------------------------*/

function counter() {  

  var elementSelector = jQuery('.count-number');

    elementSelector.each(function(){

        elementSelector.appear(function(e) {

            var el = this;

            var updateData = jQuery(el).attr("data-count");

            var od = new Odometer({

                el: el,

                format: 'd',

                duration: 2000

            });

            od.update(updateData);

        });

    });

};







/*------------------------------------

  HT Scroll to top

--------------------------------------*/

function scrolltop() {

  var $backtotop = $('.scroll-top').length;

		if($backtotop != ''){

		var progressPath = document.querySelector('.scroll-top path');

		var pathLength = progressPath.getTotalLength();

		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';

		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;

		progressPath.style.strokeDashoffset = pathLength;

		progressPath.getBoundingClientRect();

		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		

		var updateProgress = function () {

			var scroll = jQuery(window).scrollTop();

			var height = jQuery(document).height() - jQuery(window).height();

			var progress = pathLength - (scroll * pathLength / height);

			progressPath.style.strokeDashoffset = progress;

		}

		updateProgress();

		jQuery(window).scroll(updateProgress);	

		var offset = 50;

		var duration = 550;

		jQuery(window).on('scroll', function() {

			if (jQuery(this).scrollTop() > offset) {

				jQuery('.scroll-top').addClass('active-progress');

			} else {

				jQuery('.scroll-top').removeClass('active-progress');

			}

		});				

		jQuery('.scroll-top').on('click', function(event) {

			event.preventDefault();

			jQuery('html, body').animate({scrollTop: 0}, duration);

			return false;

		})

    };

};





/*------------------------------------

  HT Fixed Header

--------------------------------------*/

function fxheader() {    

    jQuery(window).on('scroll', function () {

  var sticky = jQuery('#header-wrap'),

    scroll = jQuery(window).scrollTop();



  if (scroll >= 300) sticky.addClass('fixed-header');

  else sticky.removeClass('fixed-header');

});

};





/*------------------------------------

  HT Search

--------------------------------------*/

function search() { 

  // Search Toggle

  jQuery("#search-input-box").hide();

  jQuery("#search, #search-sticky").on("click", function () {

    jQuery("#search-input-box").slideToggle();

    jQuery("#search-input").focus();

  });

  jQuery("#close-search").on("click", function () {

    jQuery('#search-input-box').slideUp(500);

  });

};



/*------------------------------------------

  HT Text Color, Background Color And Image

---------------------------------------------*/

function databgcolor() {

    jQuery('[data-bg-color]').each(function(index, el) {

     jQuery(el).css('background-color', jQuery(el).data('bg-color'));  

    });

    jQuery('[data-text-color]').each(function(index, el) {

     jQuery(el).css('color', jQuery(el).data('text-color'));  

    });

    jQuery('[data-bg-img]').each(function() {

     jQuery(this).css('background-image', 'url(' + jQuery(this).data("bg-img") + ')');

    });

};





/*------------------------------------

  HT Magnific Popup

--------------------------------------*/

function magnificpopup() {

jQuery('.popup-gallery').magnificPopup({

    delegate: 'a.popup-img',

    type: 'image',

    tLoading: 'Loading image #%curr%...',

    mainClass: 'mfp-img-mobile',

    gallery: {

      enabled: true,

      navigateByImgClick: true,

      preload: [0,1] // Will preload 0 - before current, and 1 after the current image

    },

    image: {

      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',

      titleSrc: function(item) {

        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';

      }

    }

  });

if (jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {

     jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({

          disableOn: 700,

          type: 'iframe',

          mainClass: 'mfp-fade',

          removalDelay: 160,

          preloader: false,

          fixedContentPos: false

    });

  }



};





/*------------------------------------

  HT Accordion

--------------------------------------*/

function accordion() {

  jQuery( document ).on( 'click', '.elementor-accordion .elementor-accordion-item', function ( jQuerythis) {			

  	jQuery( '.elementor-accordion').find( '.elementor-tab-content' ).removeAttr( "hidden" );		 

  });        

};





/*------------------------------------

  HT Side Menu

--------------------------------------*/

function sidenav() {

  jQuery('.ht-nav-toggle').on('click', function(event) {

    event.preventDefault();

    var jQuerythis = jQuery(this);

    if( jQuery('body').hasClass('menu-show') ) {

      jQuery('body').removeClass('menu-show');

      jQuery('#ht-main-nav > .ht-nav-toggle').removeClass('show');

    } else {

      jQuery('body').addClass('menu-show');

      setTimeout(function(){

        jQuery('#ht-main-nav > .ht-nav-toggle').addClass('show');

      }, 900);

    }

  })

  

};





/*------------------------------------

  HT Sticky

--------------------------------------*/

var jQuerystickysec = jQuery('.js-sticky-widget').length;

function sticky() {

    if(jQuerystickysec != ''){

        const sticky_sec = document.querySelector(".js-sticky-widget");

    var stickyEl = new Sticksy('.js-sticky-widget', {

                topSpacing: 140,

            })

            stickyEl.onStateChanged = function (state) {

                if (state === 'fixed') stickyEl.nodeRef.classList.add('sticky-item')

                else stickyEl.nodeRef.classList.remove('sticky-item')

            }

             };

};





function htimganim() {

const boxes = gsap.utils.toArray(".ht-image-left");



boxes.forEach((box, i) => {

  gsap.to(box, {

    scrollTrigger: {

      trigger: box,

      start: "top bottom", 

				end: "bottom top", 

				scrub: 1,

				ease: "none",

    },

    x: 50

  });

});



const boxestwo = gsap.utils.toArray(".ht-image-right");



boxestwo.forEach((box, i) => {

  gsap.to(box, {

    scrollTrigger: {

      trigger: box,

      start: "top bottom", 

				end: "bottom top", 

				scrub: 1,

				ease: "none",

    },

    x: -50

  });

});



}



ScrollTrigger.matchMedia({

    "(max-width: 1200px)": function() {

        ScrollTrigger.getAll().forEach(t => t.kill())

    }

});



/*------------------------------------

  HT Window load and functions

--------------------------------------*/

jQuery(document).ready(function() {    

    ht_navbar(),

    counter(),

    scrolltop(),

    fxheader(),  

    search(),

    databgcolor(),

    magnificpopup(),

    accordion(),

    sidenav(),

    sticky();

    

});



jQuery(window).on('load', function() {

    preloader(),

    htimganim();

});



jQuery(window).on('elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/service-grid.default', databgcolor );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/image.default', htimganim );

    });



})(jQuery);