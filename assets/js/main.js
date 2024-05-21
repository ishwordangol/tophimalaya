
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

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  if (st > scrollThreshold) {
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
    if (st + $(window).height() < $(document).height()) {
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


// popup

const $openModalButton = $("#openModal");
const $closeModalButton = $("#closeModal");
const $modal = $("#modal");

$openModalButton.click(function () {
  $modal.removeClass("hidden");
});

$closeModalButton.click(function () {
  $modal.addClass("hidden");
});

$modal.find(".modal-overlay").click(function () {
  $modal.addClass("hidden");
});

