(function($) {
  /*=================================
      JS Index Here
  ==================================*/

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
  // Sticky fix
  let lastTopPos = 0; // Store the last scroll position

  $(window).on("scroll", () => {
    const currentTopPos = $(window).scrollTop();

    // Determine scroll direction and apply classes accordingly
    if (currentTopPos > lastTopPos) {
      // Scrolling down
      $(".sticky-wrapper").removeClass("sticky");
    } else {
      // Scrolling up
      if (currentTopPos > 150) {
        $(".sticky-wrapper").addClass("sticky");
      } else {
        $(".sticky-wrapper").removeClass("sticky");
      }
    }

    lastTopPos = currentTopPos; // Update the last scroll position
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

  /*---------- 06.Set Background & Mask Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function() {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
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
    $("#birth").flatpickr();
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
  if ($(".model-loction-select").length > 0) {
    $("#location, #cartFilters").on("shown.bs.modal", function() {
      // Make sure to add "select-2-select" class to any select box
      $(".model-loction-select").select2();
    });
  }

  if ($(".filters-select2").length > 0) {
    $(".filter-model").on("shown.bs.modal", function() {
      // Make sure to add "select-2-select" class to any select box
      $(".filters-select2").select2();
    });
  }

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

  if ($(".cart-timer").length > 0) {
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

  $("#backArrow").on("click", () => {
    window.history.back();
  });

  // Add click event listener to the profile image
  $("#profile-image").click(() => {
    // Trigger the click event on the hidden file input
    // This opens the file dialog when the image is clicked
    $("#profile-image-upload").trigger("click");
  });

  // Add change event listener to the file input
  $("#profile-image-upload").change(function() {
    // Check if any file is selected
    if (this.files && this.files[0]) {
      // Create a FileReader object to read the file
      let reader = new FileReader();

      // Define what happens once the FileReader reads the file
      reader.onload = (e) => {
        // Update the src attribute of the profile image with the new file data
        $("#profile-image").attr("src", e.target.result);
      };

      // Read the file as a data URL (base64)
      // This is necessary to display the image in the <img> tag
      reader.readAsDataURL(this.files[0]);
    }
  });

  // Function to remove filters
  $(".clearFilters").on("click", function() {
    // Find the parent form of the clicked button
    const form = $(this).closest("form");

    // Check if the price filter exists
    const priceFilter = form.find(".price-filter");
    if (priceFilter.length) {
      // Get the default min and max values
      const defaultMin = 0;
      const defaultMax = 10000;

      // Reset min and max price inputs
      form.find("input#min-price").val(defaultMin);
      form.find("input#max-price").val(defaultMax);
    }

    // Reset all other input elements within the form
    form.find("input:not(#min-price, #max-price), textarea").val("");

    // Reset all Select2 elements to the first option
    form.find("select").each(function() {
      $(this).val($(this).find("option:first").val()).trigger("change");
    });

    // Select the first radio button in each group
    form.find('input[type="radio"]').each(function() {
      let name = $(this).attr("name");
      form.find(`input[name="${name}"]:first`).prop("checked", true);
    });

    // Reset all checkboxes
    form.find('input[type="checkbox"]').prop("checked", false);

    // Prevent the default action of the button
    return false;
  });
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
