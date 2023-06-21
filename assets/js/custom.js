function openFullscreen(elem) {
  if(elem.webkitEnterFullscreen){/*ios*/
    elem.webkitEnterFullscreen();
  } else if (elem.webkitRequestFullscreen) {/* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

$( document ).ready(function() {

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 500, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('body').removeClass('sidebar-show');
  });

  $('body').on('click','.menu-icon,.sidebar-overlay', function(){
    $('body').toggleClass('sidebar-show');
  })

  if($('.text-typed').length){
    $( ".text-typed" ).each(function( index ) {
      var _type_text = $( this ).data('text');
      var typed = new Typed('.text-typed', {
        strings: [_type_text],
        typeSpeed: 50,
        loop: true,backDelay: 1500,
        startDelay: 1000,
        cursorChar:'',
      });
    });
  }

  /*Scroll - start*/
  var lastScrollTop = 0;
  var didScroll;
  $(window).scroll(function(event){
    didScroll = true;
  });
  setInterval(function() {
    if (didScroll) {
      var st = $(this).scrollTop();
      if(st > 55){
        if (st > lastScrollTop){
          $('body').addClass('minimize-header');
        } else {
          $('body').removeClass('minimize-header');
        }
      }else{
        $('body').removeClass('minimize-header');
      }
      lastScrollTop = st;
      didScroll = false;
    }
  }, 100);
  /*Scroll - end*/

  $(window).bind("load resize scroll",function(e) {
      var y = $(window).scrollTop();
      /*$('.section-bg-1,.section-bg-2').css('background-position', '0% ' + parseInt(-y / 6) + 'px');*/
      $(".section-bg-1,.section-bg-2").filter(function() {
          return $(this).offset().top < (y + $(window).height()) &&
                 $(this).offset().top + $(this).height() > y;
      }).css('background-position', '0px ' + parseInt(-y / 6) + 'px');

      /*dynamic height for full width video section*/
      if($(window).width() >= 992){
        if($('.add-full-vh').length && $('.video-full-width-fixed').length && $('.video-block').length){
          $('.add-full-vh').css('margin-top',parseInt($('.video-block').find('video').height()-88)+'px');
        }
      }
  });

  var main_swiper = new Swiper(".main-slider", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 2000,disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  var icons_carousel = new Swiper(".icons-carousel", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 1000,disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      // when window width is >= 480px
      520: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      756: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      // when window width is >= 640px
      1500: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
      1800: {
        slidesPerView: 6,
        spaceBetween: 0,
      }
    }
  });

  var models_carousel = new Swiper(".models-carousel", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2000,disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      // when window width is >= 480px
      520: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      756: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      // when window width is >= 640px
      1500: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 0,
      }
    }
  });

  /*Video pause play action - start*/
  var _teaser_video = document.getElementById('teaser_video');
  $('body').on('click','#videoPlayPause', function(){
    if($(this).hasClass('pause')){
      $(this).removeClass('pause');
      _teaser_video.play();
    }else{
      $(this).addClass('pause');
      _teaser_video.pause();
    }
  })
  $('body').on('click','#videoMute', function(){
    $('#teaser_video').prop("muted", !$('#teaser_video').prop("muted"));
    if($('#teaser_video').prop("muted")){
      $(this).addClass('mute');
    }else{
      $(this).removeClass('mute');
    }
  })
  $('body').on('click','#videoExpand', function(){
    openFullscreen(_teaser_video);
  })
  if(_teaser_video){
    setTimeout(function () {_teaser_video.play();$('#videoPlayPause').removeClass('pause');}, 3000);
  }
  /*Video pause play action - end*/

  setTimeout(function () {
    $('.preloader').fadeOut();
  }, 2000);

});

/*Form validation - start*/
(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
/*Form validation - end*/
