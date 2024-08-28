$(document).ready(function() {

  // add scroll on menu item click
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if(target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

});
