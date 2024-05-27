
$(window).scrollTop(0);

// Hide Header on on scroll down
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
var scrollThreshold = 300;
var ticking = false;

$(window).scroll(function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      hasScrolled();
      ticking = false;
    });
    ticking = true;
  }
});

function hasScrolled() {
  var st = $(this).scrollTop();

  var otherStickyHeaderAtTop = $('.tablinkwrapper').length > 0 && $('.tablinkwrapper').offset().top <= st;

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  if (st > scrollThreshold && !otherStickyHeaderAtTop) {
    $('header').addClass('header-white');
  } else {
    $('header').removeClass('header-white');
  }

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('header').removeClass('header-down').addClass('header-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height() && !otherStickyHeaderAtTop) {
      $('header').removeClass('header-up').addClass('header-down');
    }
  }

  lastScrollTop = st;
}

// End of header sticky


// vertical tab content

// Hide all tab content initially
$(".tab-content").hide();

// Show the first tab content of each section by default
$(".tab-section").each(function () {
  $(this).find(".tab-content:first").show();
  $(this).find(".tabs button:first").addClass("active");
  $(this).find(".tab_drawer_heading:first").addClass("d_active");
});

// Function to show tab content
function showTabContent(section, tabId) {
  section.find(".tab-content").hide();
  section.find("#" + tabId).fadeIn();
}

// Function to activate tab
function activateTab(tab) {
  var section = tab.closest('.tab-section');
  section.find(".tabs button").removeClass("active");
  tab.addClass("active");

  var activeTabId = tab.attr("data-tab");
  showTabContent(section, activeTabId);
  section.find(".tab_drawer_heading").removeClass("d_active");
  section.find(".tab_drawer_heading[data-tab='" + activeTabId + "']").addClass("d_active");
}

// Function to activate drawer heading
function activateDrawer(drawer) {
  var section = drawer.closest('.tab-section');
  section.find(".tab_drawer_heading").removeClass("d_active");
  drawer.addClass("d_active");

  var activeTabId = drawer.attr("data-tab");
  showTabContent(section, activeTabId);
  section.find(".tabs button").removeClass("active");
  section.find(".tabs button[data-tab='" + activeTabId + "']").addClass("active");
}

// Tab click event
$(".tabs button").click(function () {
  activateTab($(this));
});

// Drawer heading click event
$(".tab_drawer_heading").click(function () {
  activateDrawer($(this));
});

// Set minimum height of tab container
$(".tab-section").each(function () {
  var tabHeight = $(this).find(".tabs").outerHeight();
  $(this).find(".tab-content").css("min-height", tabHeight + 50);
});

// end of vertical tab

$(".mega-menu-menu-items > a, .mega-menu").hover(function () {
  $("body").append("<div class='blur-effect'></div>");
}, function () {
  $(".blur-effect").remove();
});

// end of blur effect

// scroll to bottom link


$(function () {
  $('a[href*=\\#]').on('click', function (e) {
    e.preventDefault(); // Prevent the default action of the anchor click

    var target = $(this).attr('href'); // Get the target element's ID
    var $target = $(target); // Select the target element

    if ($target.length) { // Check if the target element exists
      $('html, body').animate(
        {
          scrollTop: $target.offset().top // Animate the scrollTop property
        },
        500, // Duration of the animation in milliseconds
        'swing' // Easing function for smooth scrolling
      );
    }
  });
});

// end of scroll link

// counter

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateCounters() {
  $('.count').each(function () {
    var $this = $(this);
    if ($this.data('animated')) return; // Skip if already animated
    if (isElementInViewport(this)) {
      $this.data('animated', true); // Mark as animated
      var originalText = $this.text();
      var isPercentage = originalText.includes('%');
      var hasSign = originalText.startsWith('+') || originalText.startsWith('-');

      // Extract the numeric value from the text
      var numericValue = parseFloat(originalText.replace(/[^\d.-]/g, ''));

      // Initialize the Counter property to 0
      $this.prop('Counter', 0).animate({
        Counter: numericValue
      }, {
        // Duration of the animation in milliseconds
        duration: 2000,
        // Function to be called on each step of the animation
        step: function (now) {
          // Round up the current step value
          var displayValue = Math.ceil(now);

          // Re-append the original non-numeric characters
          if (isPercentage) {
            displayValue += '%';
          } else if (hasSign) {
            displayValue = (originalText.startsWith('-') ? '-' : '+') + displayValue;
          }

          // Update the text of the element
          $this.text(displayValue);
        }
      });
    }
  });
}

// Listen for scroll events
$(window).on('scroll', animateCounters);

// Initial check in case elements are already in viewport
animateCounters();

// end of counter

// testimonial slider

$(".testimonialslider").slick({
  arrows: false,
  autoplay: false,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '16px',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
      },
    },
  ],
});

// end of testimonial slider


$(".reviewslider").slick({
  arrows: true,
  autoplay: false,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendArrows: $('.reviewSlider__arrows'),
  prevArrow: '<button class="flex items-center justify-center h-8 w-8 rounded-full bg-primary opacity-50 text-white hover:opacity-100 transition ease-linear duration-100"><span class="icon-arrow-left"><span></button>',
  nextArrow: '<button class="flex items-center justify-center h-8 w-8 rounded-full bg-primary opacity-50 text-white hover:opacity-100 transition ease-linear duration-100"><span class="icon-arrow-right"><span></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
      },
    },
  ],
});

// end of testimonial slider



// Homepage main slider
$(".mainslider").slick({
  arrows: false,
  autoplay: false,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
      },
    },
  ],
});

$(".gallerySlider").slick({
  arrows: true,
  autoplay: false,
  dots: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  // centerMode: true,
  // initialSlide: 0,
  // centerPadding: '120px',
  appendArrows: $('.gallerySlider__arrows'),
  prevArrow: '<button class="flex items-center justify-center h-8 w-8 rounded-full bg-primary opacity-50 text-white hover:opacity-100 transition ease-linear duration-100"><span class="icon-arrow-left"><span></button>',
  nextArrow: '<button class="flex items-center justify-center h-8 w-8 rounded-full bg-primary opacity-50 text-white hover:opacity-100 transition ease-linear duration-100"><span class="icon-arrow-right"><span></button>',
  responsive: [
    {
      breakpoint: 639,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
      },
    },
  ],
});

// Add the 'prev-slide' class to the previous slide of the centered slide
// function updatePrevSlideClass() {
//   $('.gallerySlider .slick-slide').removeClass('bigger-slide');
//   var centerSlide = $('.gallerySlider .slick-center');
//   centerSlide.prev().addClass('bigger-slide');
// }

// Initial call
// updatePrevSlideClass();

// Update on after change
// $('.gallerySlider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//   updatePrevSlideClass();
// });

// popup

$(document).on('click', '.openmodelbtn', function (event) {
  event.preventDefault();
  var target = $(this).data('target');
  openPopup(target);
});

// Close popup when the close button inside it is clicked
$(document).on('click', '.close-popup', function (event) {
  event.preventDefault();
  var popup = $(this).closest('.popup');
  closePopup(popup);
});

// Close popup when clicking outside of it
$(document).on('click', '.popup', function (event) {
  if ($(event.target).hasClass('popup')) {
    var popup = $(event.target);
    closePopup(popup);
  }
});

function openPopup(target) {
  $('body').css('overflow', 'hidden');
  $(target).removeClass('hidden').hide().fadeIn(function () {
    $(this).find('.search').focus();
  });
}

function closePopup(popup) {
  popup.fadeOut(function () {
    $(this).addClass('hidden');
    $('body').css('overflow', ''); // Restore overflow
  });
}

// horizontal tab

$(document).on("scroll", onScroll);

//smoothscroll
$('.tablinks a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  $(document).off("scroll");

  $('.tablinks li a').each(function () {
    $(this).removeClass('active');
  })
  $(this).addClass('active');

  var target = $(this).attr('href');
  var $target = $(target);

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 500, 'swing', function () {
    window.location.hash = target;
    $(document).on("scroll", onScroll);
    $(target).parent().addClass('tab-content-sticky');
    $('.tablinks').not($(target).parent()).removeClass('tab-content-sticky');
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('.tablinks a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.tablinks ul li a').removeClass("active");
      currLink.addClass("active");
    }
    else {
      currLink.removeClass("active");
    }
  });
}

// read more

$(".readalloverview").click(function () {
  var text = $(".overview_description");
  var btnText = $(this);

  text.toggleClass('expanded');

  if (text.hasClass('expanded')) {
    btnText.text("Read Less");
  } else {
    btnText.text("Read More");
  }
});

// toggle 
function handleToggle($button, $paragraph) {
  $button.click(function () {
    $paragraph.toggleClass('show');
    $button.toggleClass('icon-chevron-down icon-chevron-up');
  });
}

function checkScreenWidth() {
  if (window.innerWidth < 768) {
    $('.itinerary-description').each(function () {
      var $button = $(this).find('.itinerarybtn');
      var $paragraph = $(this).find('.itineraryparaph');
      handleToggle($button, $paragraph);
    });
  } else {
    $('.itinerarybtn').off('click');
    $('.itineraryparaph').removeClass('show');
    $('.itinerarybtn').removeClass('icon-chevron-up').addClass('icon-chevron-down');
  }
}

checkScreenWidth();
$(window).resize(function () {
  checkScreenWidth();
});

// expansion panel

$(".expansionlist > a").on("click", function (e) {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).siblings(".expansioncontent").slideUp(200);
    $(".expansionlist > a .icon-box")
      .removeClass("icon-minus")
      .addClass("icon-plus");
  } else {
    $(".expansionlist > a .icon-box")
      .removeClass("icon-minus")
      .addClass("icon-plus");
    $(this).find(".icon-box").removeClass("icon-plus").addClass("icon-minus");
    $(".expansionlist > a").removeClass("active");
    $(this).addClass("active");
    $(".expansioncontent").slideUp(200);
    $(this).siblings(".expansioncontent").slideDown(200);
  }
  e.preventDefault();
});

// pagination

var itemsPerPage = 4;
var items = $(".bloglist");
var totalPages = Math.ceil(items.length / itemsPerPage);

function showPage(page) {
  items.hide();
  var start = (page - 1) * itemsPerPage;
  var end = start + itemsPerPage;
  items.slice(start, end).show();
}

function createPagination() {
  for (var i = 1; i <= totalPages; i++) {
    $(".pagination").append("<button class='page-btn'>" + i + "</button>");
  }
  $(".page-btn").on("click", function () {
    var page = $(this).text();
    showPage(page);
  });
}

// Initialize the pagination
createPagination();
showPage(1); // Show the first page initially
