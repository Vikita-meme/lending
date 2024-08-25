$(document).ready(function() {
  $('.header_menu-search__icon_wrap').on("click", function () {
    $('.header_menu-search__form_wrap').toggleClass('opened');
  });

  // fancybox
  $(".fancybox").fancybox();

  // project swiper
  var swiper = new Swiper('.project_block-gallery__swiper .swiper-container', {
    slidesPerView: 2,
    slidesPerColumn: 2,
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // change project image
  $('.project_block-slide').on("click", function (e) {
    $('.project_block-slide').removeClass('-active');
    $(this).addClass('-active');

    var src = $(this).data('src');
    var fancy = $(this).data('fancy');
    var title = $(this).data('title');

    $('#mainGalleryImage').find('.project_block-gallery__link').attr('href', fancy);
    $('#mainGalleryImage').find('.project_block-gallery__img').attr('src', src);
    $('#mainGalleryImage').find('.project_block-gallery__title').text(title);

  });

  // get demo click
  $(document).on("click", "#sendResumeBtn", function(e) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('.vacancy_form').offset().top
    }, 500);
  });

  // submit upload input
  $('#fileInput').on("change", function() {
      var file = this.files[0];

      if (file) {
        $(this).parent().addClass('-loaded');
      }
  });

  // submit vacancy form
  $("form#vacancyForm").submit( function(event) {
    event.preventDefault();

    var form = this;
    var name = $(form).find('#vacancyForm_name');
    var email = $(form).find('#vacancyForm_email');
    var file = $(form).find('#fileInput');


    sendFormData(name, email, file, form);
  });

  // send Form Data
  function sendFormData(name, email, file, form) {

    var testVal = {
      name: {
          obj: name,
          val: !!name.val()
      },
      email: {
          obj: email,
          val: !!email.val()
      }
    };

    var hasError = false;

    Object.keys(testVal).forEach(function(row) {
        if (!testVal[row].val) {
            testVal[row].obj.parent().addClass('error');
            hasError = true;
        } else {
            testVal[row].obj.parent().removeClass('error');
        }
    });

    if (hasError) {
        return false
    }

    var data =  {
      name: name.val(),
      email: email.val(),
    };

    if (!!file[0].files.length) {
      var newFile = file[0].files[0];
      var form_data = new FormData();
      form_data.append('file', newFile);
      form_data.append('action', 'upload_file');

      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'post',
        data: form_data,
        contentType: false,
        processData: false,
        success: function(fileData) {
          data.file = fileData;

          $.post('/wp-admin/admin-ajax.php', data, function(response) {

            name.val('');
            email.val('');
            file.val('');

            mailsend();
         });
        }    
      });
    } else {
      $.post('/wp-admin/admin-ajax.php', data, function(response) {
        name.val('');
        email.val('');
        file.val('');
        mailsend();
     });
    }
  };

  // function on success fomr submit
  function mailsend() {

    bootbox.dialog({
      message: $("#seccessModal").html(),
      size: 'large',
      className: "mailsend_popup",
    });

    window.setTimeout(function(){
      bootbox.hideAll();
    }, 5000);
  };

});