(function($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06.Set Background & Mask Image
    07. Global Slider
    08. Custom Animaiton For Slider
    09. Ajax Contact Form
    10. Popup Sidemenu  
    11. Search Box Popup
    12. Magnific Popup
    13. Filter
    14. Date Time Picker
    15. Counter Up
    16. VS Tab
    17. Progress Bar Animation
    18. Section Position
    19. Shape Mockup
    20. Toggle Password
    00. Inspect Element Disable
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function() {
    $(".preloader").fadeOut();
  });

  /*---------- 03. Mobile Menu Active ----------*/

  $.fn.vsmobilemenu = function(options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".th-menu-toggle ",
        bodyToggleClass: "th-body-visible",
        subMenuClass: "th-submenu",
        subMenuParent: "th-item-has-children",
        subMenuParentToggle: "th-active",
        meanExpandClass: "th-mean-expand",
        appendElement: '<span class="th-mean-expand"></span>',
        subMenuToggleClass: "th-open",
        toggleSpeed: 400
      },
      options
    );

    return this.each(function() {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function() {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function() {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").prepend(opt.appendElement);
        submenu.next("a").prepend(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function() {
        $(this).on("click", function(e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function() {
        $(this).on("click", function() {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function(e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function(e) {
        e.stopPropagation();
      });
    });
  };

  $(".th-menu-wrapper").vsmobilemenu();

  $(".notification-button").on("click", function(event) {
    event.stopPropagation();
    $(".notification-dropdown").toggleClass("show");
  });

  // Close dropdown when clicking outside
  $(document).on("click", function(event) {
    if (
      $(event.target).closest(".notification-dropdown").length ||
      $(event.target).closest(".notification-button").length
    ) {
      return;
    }
    $(".notification-dropdown").removeClass("show");
  });

  /*---------- 04. Sticky fix ----------*/
  $(window).on("scroll", function() {
    var topPos = $(this).scrollTop();
    sticky();
    if (topPos > 150) {
      $(".sticky-wrapper").addClass("will-sticky");
      sticky();
    } else {
      $(".sticky-wrapper").removeClass("sticky");
      $(".sticky-wrapper").removeClass("will-sticky");
    }

    function sticky() {
      if (topPos > 400) {
        $(".sticky-wrapper").addClass("sticky");
        $(".sticky-wrapper").removeClass("will-sticky");
      }
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  if ($(".scroll-top").length > 0) {
    var scrollTopbtn = document.querySelector(".scroll-top");
    var progressPath = document.querySelector(".scroll-top path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function() {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - scroll * pathLength / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 750;
    jQuery(window).on("scroll", function() {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(scrollTopbtn).addClass("show");
      } else {
        jQuery(scrollTopbtn).removeClass("show");
      }
    });
    jQuery(scrollTopbtn).on("click", function(event) {
      event.preventDefault();
      jQuery("html, body").animate(
        {
          scrollTop: 0
        },
        duration
      );
      return false;
    });
  }

  /*---------- 06. Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function() {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*---------- 06.Set Background & Mask Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function() {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }
  // Mask Image
  if ($("[data-mask-src]").length > 0) {
    $("[data-mask-src]").each(function() {
      var mask = $(this).attr("data-mask-src");
      $(this).css({
        "mask-image": "url(" + mask + ")",
        "-webkit-mask-image": "url(" + mask + ")"
      });
      $(this).removeAttr("data-mask-src");
    });
  }

  /*----------- 07. Global Slider ----------*/
  $(".th-carousel").each(function() {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function() {
      $(this).on("click", function(e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function() {
      $(this).on("click", function(e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : true,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  });

  /*----------- 08. Custom Animaiton For Slider ----------*/
  $("[data-ani-duration]").each(function() {
    var durationTime = $(this).data("ani-duration");
    $(this).css("animation-duration", durationTime);
  });

  $("[data-ani-delay]").each(function() {
    var delayTime = $(this).data("ani-delay");
    $(this).css("animation-delay", delayTime);
  });

  $("[data-ani]").each(function() {
    var animaionName = $(this).data("ani");
    $(this).addClass(animaionName);
    $(".slick-current [data-ani]").addClass("th-animated");
  });

  $(".th-carousel").on("afterChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(slick.$slides).find("[data-ani]").removeClass("th-animated");
    $(slick.$slides[currentSlide]).find("[data-ani]").addClass("th-animated");
  });

  /*---------- 12. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function(e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function(e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function(e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 12. Popup Sidemenu ----------*/
  function popupSideMenu(
    $sideMenu2,
    $sideMunuOpen2,
    $sideMenuCls2,
    $toggleCls2
  ) {
    // Sidebar Popup
    $($sideMunuOpen2).on("click", function(e) {
      e.preventDefault();
      $($sideMenu2).addClass($toggleCls2);
    });
    $($sideMenu2).on("click", function(e) {
      e.stopPropagation();
      $($sideMenu2).removeClass($toggleCls2);
    });
    var sideMenuChild = $sideMenu2 + " > div";
    $(sideMenuChild).on("click", function(e) {
      e.stopPropagation();
      $($sideMenu2).addClass($toggleCls2);
    });
    $($sideMenuCls2).on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu2).removeClass($toggleCls2);
    });
  }
  popupSideMenu(".shopping-cart", ".sideMenuToggler2", ".sideMenuCls", "show");

  /*----------- 12. Magnific Popup ----------*/

  // Check if Magnific Popup function exists
  if ($.fn.magnificPopup) {
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
      type: "image",
      gallery: {
        enabled: true
      }
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
      type: "iframe"
    });

    /* magnificPopup content view */
    $(".popup-content").magnificPopup({
      type: "inline",
      midClick: true
    });
  } else {
    console.log("Magnific Popup plugin is not loaded.");
  }

  /*----------- 13. Filter ----------*/
  if ($.fn.imagesLoaded) {
    $(".filter-active").imagesLoaded(function() {
      var $filter = ".filter-active",
        $filterItem = ".filter-item",
        $filterMenu = ".filter-menu-active";

      if ($($filter).length > 0) {
        var $grid = $($filter).isotope({
          itemSelector: $filterItem,
          filter: "*"
          // masonry: {
          //   // use outer width of grid-sizer for columnWidth
          //   columnWidth: 1
          // }
        });

        // filter items on button click
        $($filterMenu).on("click", "button", function() {
          var filterValue = $(this).attr("data-filter");
          $grid.isotope({
            filter: filterValue
          });
        });

        // Menu Active Class
        $($filterMenu).on("click", "button", function(event) {
          event.preventDefault();
          $(this).addClass("active");
          $(this).siblings(".active").removeClass("active");
        });
      }
    });

    // Active specifix
    $(".filter-active-cat1").imagesLoaded(function() {
      var $filter = ".filter-active-cat1",
        $filterItem = ".filter-item",
        $filterMenu = ".filter-menu-active";

      if ($($filter).length > 0) {
        var $grid = $($filter).isotope({
          itemSelector: $filterItem,
          filter: ".cat1",
          masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: 1
          }
        });

        // filter items on button click
        $($filterMenu).on("click", "button", function() {
          var filterValue = $(this).attr("data-filter");
          $grid.isotope({
            filter: filterValue
          });
        });

        // Menu Active Class
        $($filterMenu).on("click", "button", function(event) {
          event.preventDefault();
          $(this).addClass("active");
          $(this).siblings(".active").removeClass("active");
        });
      }
    });
  }

  //======wow js=======
  if ($.fn.WOW) {
    new WOW().init();
  }

  /*----------- 15. Counter Up ----------*/
  if ($.fn.counterUp) {
    $(".counter-number").counterUp({
      delay: 10,
      time: 1000
    });
  }

  /*---------- 16. VS Tab ----------*/
  $.fn.vsTab = function(options) {
    var opt = $.extend(
      {
        sliderTab: false,
        tabButton: "button"
      },
      options
    );

    $(this).each(function() {
      var $menu = $(this);
      var $button = $menu.find(opt.tabButton);

      // Append indicator
      $menu.append('<span class="indicator"></span>');
      var $line = $menu.find(".indicator");

      // On Click Button Class Remove and indecator postion set
      $button.on("click", function(e) {
        e.preventDefault();
        var cBtn = $(this);
        cBtn.addClass("active").siblings().removeClass("active");
        if (opt.sliderTab) {
          $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
        } else {
          linePos();
        }
      });

      // Work With slider
      if (opt.sliderTab) {
        var slider = $menu.data("asnavfor"); // select slider

        // Select All button and set attribute
        var i = 0;
        $button.each(function() {
          var slideBtn = $(this);
          slideBtn.attr("data-slide-go-to", i);
          i++;

          // Active Slide On load > Actived Button
          if (slideBtn.hasClass("active")) {
            $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
          }

          // Change Indicator On slide Change
          $(slider).on("beforeChange", function(
            event,
            slick,
            currentSlide,
            nextSlide
          ) {
            $menu
              .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
              .addClass("active")
              .siblings()
              .removeClass("active");
            linePos();
          });
        });
      }

      // Indicator Position
      function linePos() {
        var $btnActive = $menu.find(opt.tabButton + ".active"),
          $height = $btnActive.css("height"),
          $width = $btnActive.css("width"),
          $top = $btnActive.position().top + "px",
          $left = $btnActive.position().left + "px";

        $line.get(0).style.setProperty("--height-set", $height);
        $line.get(0).style.setProperty("--width-set", $width);
        $line.get(0).style.setProperty("--pos-y", $top);
        $line.get(0).style.setProperty("--pos-x", $left);

        if ($($button).first().position().left == $btnActive.position().left) {
          $line.addClass("start").removeClass("center").removeClass("end");
        } else if (
          $($button).last().position().left == $btnActive.position().left
        ) {
          $line.addClass("end").removeClass("center").removeClass("start");
        } else {
          $line.addClass("center").removeClass("start").removeClass("end");
        }
      }
      linePos();
    });
  };

  // Call On Load
  if ($(".taxi-tab").length) {
    $(".taxi-tab").vsTab({
      sliderTab: true,
      tabButton: ".th-btn"
    });
  }

  /*----------- 17. Progress Bar Animation ----------*/
  if ($.fn.waypoint) {
    $(".progress-bar").waypoint(
      function() {
        $(".progress-bar").css({
          animation: "animate-positive 1.8s",
          opacity: "1"
        });
      },
      { offset: "75%" }
    );
  }

  /*---------- 18. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function(mainAttr, posAttr) {
    $(this).each(function() {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posData = section.attr(mainAttr), // where to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          topMark = "top-half", // Pos top
          bottomMark = "bottom-half", // Pos Bottom
          parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

        if (posData === topMark) {
          $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
          section.css("margin-top", "-" + sectionHeight + "px");
        } else if (posData === bottomMark) {
          $(posFor).css("padding-top", parentPT + sectionHeight + "px");
          section.css("margin-bottom", "-" + sectionHeight + "px");
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = "[data-sec-pos]";
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function() {
      $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
    });
  }

  /*----------- 19. Shape Mockup ----------*/
  $.fn.shapeMockup = function() {
    var $shape = $(this);
    $shape.each(function() {
      var $currentShape = $(this),
        shapeTop = $currentShape.data("top"),
        shapeRight = $currentShape.data("right"),
        shapeBottom = $currentShape.data("bottom"),
        shapeLeft = $currentShape.data("left");
      $currentShape
        .css({
          top: shapeTop,
          right: shapeRight,
          bottom: shapeBottom,
          left: shapeLeft
        })
        .removeAttr("data-top")
        .removeAttr("data-right")
        .removeAttr("data-bottom")
        .removeAttr("data-left")
        .parent()
        .addClass("shape-mockup-wrap");
    });
  };

  if ($(".shape-mockup")) {
    $(".shape-mockup").shapeMockup();
  }

  // Set position when click on bootstrap Tab
  $('[data-bs-toggle="tab"]').on("shown.bs.tab", function(e) {
    $(".th-carousel").slick("setPosition");
  });

  /*----------- 00. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function() {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function(e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function(e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function(e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function() {
    $(this).on("change", function() {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function() {
    $(this).on("click", function(e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  // Quantity Plus Minus ---------------------------

  $(".quantity-plus").each(function() {
    $(this).on("click", function(e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val(), 10);
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });
  });

  $(".quantity-minus").each(function() {
    $(this).on("click", function(e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val(), 10);
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  });

  // /*----------- 20. Toggle Password ----------*/
  $(".togglePassword").click(function() {
    // Find the password input related to this toggle button
    // Assuming the toggle button is in the same container as the password input
    const passwordInput = $(this).siblings(".passwordInp");
    const showIcon = $(this).children(".showIcon");
    const hideIcon = $(this).children(".hideIcon");

    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      showIcon.hide();
      hideIcon.show();
    } else {
      passwordInput.attr("type", "password");
      showIcon.show();
      hideIcon.hide();
    }
  });

  if ($.fn.flatpickr) {
    $(".flatpicker").flatpickr({
      mode: "range",
      dateFormat: "d/m/Y"
    });
    $("#date").flatpickr({
      dateFormat: "d/m/Y"
    });
  }
  if ($.fn.slider) {
    $("#price-slider-range").slider({
      range: true,
      min: 0,
      max: 10000,
      values: [ 0, 10000 ], // Set your default min and max values here
      slide: function(event, ui) {
        // Set the value of the price input during sliding
        $("#price").val(
          10000 - ui.values[1] + " ر.س - " + (10000 - ui.values[0]) + " ر.س "
        );
      }
    });
  }

  // Set the initial value of the price input
  if ($("#price").length > 0) {
    $("#price").val(
      10000 -
        $("#price-slider-range").slider("values", 1) +
        " ر.س - " +
        (10000 - $("#price-slider-range").slider("values", 0)) +
        " ر.س "
    );

    // Apply the RTL styles to the slider
    $("#price-slider-range").css({
      direction: "rtl",
      "unicode-bidi": "bidi-override"
    });
  }
  // Function to check if the screen width is less than or equal to 1024px
  function checkWidth() {
    return $(window).width() <= 1024;
  }

  // Attach a click event to the #filter-button
  $("#filter-button").click(function() {
    // Only show the sidebar if the width check passes
    if (checkWidth()) {
      $(".widget_search").addClass("show");
      $("html, body").css("overflow", "hidden");
    }
  });

  // Attach a click event to the #closeSidebar
  $("#closeSidebar").click(function() {
    $(".widget_search").removeClass("show");
    console.log("first");
  });

  // Optional: close the sidebar if the window is resized above 1024px
  $(window).resize(function() {
    if (!checkWidth()) {
      $(".widget_search").removeClass("show");
      $("html, body").css("overflow", "auto");
    }
  });

  const select2Select = $(".select-2-select");

  // Select 2
  if (select2Select.length > 0) {
    // Make sure to add "select-2-select" class to any select box
    select2Select.select2();
  }
  $("#location, #cartFilters").on("shown.bs.modal", function() {
    // Make sure to add "select-2-select" class to any select box
    $(".model-loction-select").select2();
  });

  // Function to start the countdown timer
  function startCountdown(duration) {
    let time = duration * 60; // Convert minutes to seconds

    const interval = setInterval(() => {
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");

      // Update the countdown display on the web page
      $(".cart-timer").text(`${minutes}:${seconds}`);

      // Decrement the time
      time--;

      // Check if the countdown is finished
      if (time < 0) {
        // Stop the countdown
        clearInterval(interval);

        // Execute any desired action after countdown ends
        alert("Time is up!");
      }
    }, 1000); // Update every 1000 milliseconds (1 second)
  }

  if ($(".cart-timer")) {
    // Start the countdown with 20 minutes
    startCountdown(20);
  }

  function initializeZoom() {
    $(".product-big-img").trigger("zoom.destroy"); // Destroy the existing zoom instance
    $(".product-big-img").zoom({
      on: "mouseover",
      magnify: 1.5,
      touch: true
    });
  }

  $(".thumbnail").on("click", (event) => {
    const clickedElement = $(event.currentTarget);
    const type = clickedElement.data("type");

    const mainImage = $("#main-media");
    const mainVideo = $("#main-video"); // Assuming you have a separate video element

    if (type === "image") {
      mainImage.show().attr("src", clickedElement.attr("src"));
      mainVideo.hide();
      if (mainVideo.length > 0) {
        mainVideo.get(0).pause();
      }
    } else if (type === "video") {
      mainImage.hide();
      mainVideo.show().attr("src", clickedElement.attr("src"));
      mainVideo.get(0).play();
    }

    $(".thumbnail").removeClass("active");
    clickedElement.addClass("active");

    if (type === "image") {
      initializeZoom();
    } else {
      $(".product-big-img").trigger("zoom.destroy");
    }
  });

  function initializeZoom() {
    $(".product-big-img").trigger("zoom.destroy"); // Destroy the existing zoom instance
    $(".product-big-img").zoom({
      on: "mouseover",
      magnify: 1.5,
      touch: true
    });
  }

  if ($(".product-big-img").length > 0) {
    initializeZoom();
  }
})(jQuery);

$.fn.modal.Constructor.prototype._enforceFocus = function() {
  $(document).on("focusin.bs.modal", (e) => {
    if (
      document !== e.target &&
      this._element !== e.target &&
      !this._element.contains(e.target) &&
      !$(e.target).closest(".select2-dropdown").length
    ) {
      this._element.focus();
    }
  });
};
