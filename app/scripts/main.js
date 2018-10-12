(function() {
  'use strict';

  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      registration.onupdatefound = function() {
        if (navigator.serviceWorker.controller) {
          var installingWorker = registration.installing;
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:

            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  jQuery(document).ready(function($) {
    $('.thumbnail').on('click', function() {
      var clicked = $(this);
      var newSelection = clicked.data('big');
      var $img = $('.primary').css("background-image","url(" + newSelection + ")");
      clicked.parent().find('.thumbnail').removeClass('selected');
      clicked.addClass('selected');
      $('.primary').empty().append($img.hide().fadeIn('slow'));
      return false;
    });

    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);


    if ($('.nav-pills').length) {
      $('.nav-pills').scrollingTabs({
        ignoreTabPanes: true,
        scrollToTabEdge: true,
        enableSwiping: true,
        cssClassLeftArrow: 'fas fa-chevron-left',
        cssClassRightArrow: 'fas fa-chevron-right'
      });
    }

    var navbar = $('#sticky-nav'),
        y_pos = navbar.offset().top,
        height = navbar.height();

    $(document).scroll(function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > y_pos) {
            navbar.addClass('fixed-top');
            var shiftContent = navbar.height();
            $('#block-2').css('margin-top', shiftContent + 'px');
        } else if (scrollTop <= y_pos) {
            navbar.removeClass('fixed-top');
            $('#block-2').css('margin-top', '0px');
        }
    });

  })

})();
