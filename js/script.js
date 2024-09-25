$(document).ready(function() {

  // add scroll on menu item click
  $('a[href^="#"]').on('click', function(event) {
    var bodyHasClass = $('body').hasClass('-mobile_menu_opened');
    var target = $(this.getAttribute('href'));
    if(target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }

    if (bodyHasClass) {
      $('.navbar-toggler').click();
    }
  });

  $('.simple-bar').each((index, element) => new SimpleBar(element));

  $('.navbar-toggler').on( "click", function() {
    var bodyHasClass = $('body').hasClass('-mobile_menu_opened');
    if (bodyHasClass) {
      $('body').removeClass('-mobile_menu_opened');
    } else {
      $('body').addClass('-mobile_menu_opened');
    }
  });

});
