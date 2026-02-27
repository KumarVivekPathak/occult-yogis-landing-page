(function ($) {
  "use strict";

  var sticky_img = function () {
    // Only kill your own ScrollTriggers to avoid interfering with others
    ScrollTrigger.getAll().forEach(trigger => {
      if (
        trigger.vars.id === "ht-img-split-scroller-pin" ||
        trigger.vars.id === "img-fade"
      ) {
        trigger.kill();
      }
    });

    var jQueryStickySec = $('.split_texts').length;

    if (jQueryStickySec) {
      const split_texts = document.querySelector(".split_texts");

      ScrollTrigger.matchMedia({
        // Desktop only
        "(min-width: 992px)": function () {
          if (split_texts) {
            // Pin the split image block
            gsap.to(".split_images", {
              scrollTrigger: {
                trigger: ".ht-img-split-scroller",
                pin: ".split_images",
                scrub: 0.5,
                start: "top top",
                end: () => "+=" + (split_texts.offsetHeight - window.innerHeight),
                id: "ht-img-split-scroller-pin"
              }
            });

            // Timeline for fade transitions between image blocks
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".ht-img-split-scroller",
                start: "top top",
                end: "bottom",
                pin: false,
                scrub: true,
                id: "img-fade"
              }
            });

            const split_images_blk = gsap.utils.toArray(".split-img-block");
            split_images_blk.forEach((img, i) => {
              if (split_images_blk[i + 1]) {
                tl.to(img, { opacity: 0 }, "+=0.2").to(
                  split_images_blk[i + 1],
                  { opacity: 1 },
                  "<"
                );
              }
            });

            tl.to({}, {}, "+=0.2"); // padding at the end
          }
        },

        // On screens < 992px, just kill related triggers
        "(max-width: 991px)": function () {
          ScrollTrigger.getAll().forEach(trigger => {
            if (
              trigger.vars.id === "ht-img-split-scroller-pin" ||
              trigger.vars.id === "img-fade"
            ) {
              trigger.kill();
            }
          });
        },

        "all": function () {
          // Optional: global ScrollTrigger cleanup or logging
        }
      });
    }
  };

  // Run on page load
  $(function () {
    sticky_img();
  });

  // Re-run when Elementor initializes the widget
  jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction(
      'frontend/element_ready/ht-split-img.default',
      sticky_img
    );
  });

})(jQuery);