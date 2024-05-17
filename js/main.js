const PUBLIC_KEY = 'Your public key here';
const SERVICE_ID = 'Your service id here';
const TEMPLATE_ID = 'Your template id here';

const getAuthUser = ()=>{
    const data = localStorage.getItem('user');
    const user = data? JSON.parse(data): null;
    return user;
}

const submitForm=(event)=> {
    event.preventDefault();
    const user = getAuthUser();
    const name = document.getElementById('name').value;
    const email = user? user.email : document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const selectedOption = document.getElementById('doctor-select');
    const doctor = selectedOption.options[selectedOption.selectedIndex].innerText;

        const templateParams = {
            to_name: 'MedLife',
            from_name: name,
            from: email,
            phone,
            message: message,
            doctor
          };
         
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Email sent successfully!');
        }, function(error) {
          console.log('FAILED...', error);
          alert('Failed to send email. Please try again.');
        });
        document.getElementById('contactForm').reset();
}


(function ($) {
    "use strict";   
     emailjs.init(PUBLIC_KEY);

    if (!!getAuthUser()){

        $("#login-btn").hide();
        $("#email").hide();
    } else {
        $("#logout-btn").hide();
    }


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        animateOut: 'fadeOutLeft',
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);

