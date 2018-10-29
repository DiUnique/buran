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
    // Thumbnail on the product page
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
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          if ($(this).attr('id') !== 'cartForm') {
            event.preventDefault();

            var name = $(this).find('#name').val();
            var email = $(this).find('#email').val();
            var question = $(this).find('#question').val();

            if(name && email) {
              $.ajax({
                url: '/ajax/consult.php',
                type: "POST",
                data: ({name :  name,
                        email:  email,
                        question: question
                        }),
                success: function(data) {
                  console.log("Success");
                  $("#ModalCenter").modal('hide');
                  $("#successModalCenter").modal('show');
                },
                error: function() {
                  console.log('Error')
                }                  
              });
            }
          }

          form.classList.add('was-validated');
        }, false);
      });
    }, false);
    
    // Scroll Bootstrap tabs
    if ($('.nav-pills').length) {
      $('.nav-pills').scrollingTabs({
        ignoreTabPanes: true,
        scrollToTabEdge: true,
        enableSwiping: true,
        cssClassLeftArrow: 'fas fa-chevron-left',
        cssClassRightArrow: 'fas fa-chevron-right'
      });
    }

    // sticky nav
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
    
    // Increase and decrease amount of products
    $('#quant_up').click(function()
    {
      $('#quantity').val(parseInt($('#quantity').val()) + 1);
      $('#quantit').val(parseInt($('#quantit').val())+ 1);
    });

    $('#quant_down').click(function()
    {
      if ($('#quantity').val() == '1')
      {
        return false;
      }
      else
      {
        $('#quantity').val(parseInt($('#quantity').val()) - 1);
        $('#quantit').val(parseInt($('#quantit').val())- 1);
      }
    });

    // Footer to the bottom
    function autoHeight() {
      var body = $('body').innerHeight(),
          windowHeight = $(window).innerHeight(),
          footer = $('#footer');

      var footerMarginTop = windowHeight - body;
      if (footerMarginTop > 0) {
        footer.css('margin-top', footerMarginTop);
      } else {
        footer.css('margin-top', '0');
      }
    }

    $(document).ready(autoHeight);
    $(window).resize(autoHeight);

    if ($('#drop_zone').length) {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
          $('#drop_zone').on('dragover', function (e){
            $(this).addClass('drag');
          });

          $("#drop_zone").on('dragleave', function (e){
            $(this).removeClass('drag');
          });

          $('#add_cart, #add_cart_span').click(function() {
            $('#add_cart_input').trigger('click');
            return false;
          });

          function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; // FileList object.

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
              output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                          f.size, ' bytes, last modified: ',
                          f.lastModifiedDate.toLocaleDateString(), '</li>');
            }
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
            $('#drop_zone').removeClass('drag');
          }

          function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
          }

          // Setup the dnd listeners.
          var dropZone = document.getElementById('drop_zone');
          dropZone.addEventListener('dragover', handleDragOver, false);
          dropZone.addEventListener('drop', handleFileSelect, false);
      } else {
        console.log('The File APIs are not fully supported in this browser.');
      }
    }

  });
})();