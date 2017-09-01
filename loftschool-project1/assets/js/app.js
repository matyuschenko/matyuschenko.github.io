
// БЛОГ
$(window).on('load', function() {

    var blog_menu = (function () {

        var tabletWidth = 768,
            init = function () {
            var blog_nav = $('.blog-navigation'),
                blog_nav_scroll_pos = blog_nav.offset().top,
                blog_nav_left_offset = blog_nav.offset().left,
                blog_nav_w = blog_nav.width(),
                blog_sidebar = $('.blog-sidebar'),
                article_offsets = {},
                fixed_nav_top_margin = 30;

            $('.blog-post').each(function (i, t) {
                article_offsets[$(t).offset().top] = $(t).attr('id');
            });


            $(window).on('scroll', function () {
                var y_scroll_pos = window.pageYOffset;
                
                if ($(window).width() > tabletWidth) {
                    if (y_scroll_pos > blog_nav_scroll_pos - fixed_nav_top_margin) {
                        blog_nav.css({
                            position: 'fixed',
                            top: fixed_nav_top_margin,
                            left: blog_nav_left_offset,
                            width: blog_nav_w
                        });
                    } else {
                        blog_nav.css({
                            position: 'static',
                            width: 'auto'
                        });


                    }
                } else {
                    if (y_scroll_pos < $(window).height()) {
                        console.log('hide!');
                        blog_sidebar.hide();
                    } else {
                        blog_sidebar.show();
                    }
                }

                for (var o in article_offsets) {
                    if (y_scroll_pos < o && (y_scroll_pos + $(window).height()) > o) {
                        $('.blog-navigation__item').removeClass('blog-navigation__item_selected');
                        var rel_link = $('a[href*=#' + article_offsets[o] + ']');
                        rel_link.addClass('blog-navigation__item_selected');
                        break;
                    }
                }
            });

            if ($(window).width() <= tabletWidth) {
                _addSmallMenuBehavior();
            }

        },
        _addSmallMenuBehavior = function () {
            $('.blog-navigation').css({
                position: 'static',
                width: 'auto'
            });
            $('.small-screen-button').on('click', function () {
                if ($('.blog-sidebar').hasClass('shown')) {
                    _hideSmallMenu();
                } else {
                    _showSmallMenu();
                }
            });
            $('.blog-content').on('click', _hideSmallMenu);
        },
        _showSmallMenu = function () {
            var blog_sidebar = $('.blog-sidebar');
            blog_sidebar.animate({
                left: 0
            }, 150, 'swing', function () {
                blog_sidebar.addClass('shown');
            })
        },
        _hideSmallMenu = function () {
            var blog_sidebar = $('.blog-sidebar');
            blog_sidebar.animate({
                left: '-33.3%'
            }, 150, 'swing', function () {
                blog_sidebar.removeClass('shown');
            })
        };
        return {init: init};
    }());

    if (document.getElementsByClassName('blog-navigation').length) {
        blog_menu.init();
        $(window).on('resize', blog_menu.init);
    }

});
// ФЛИППЕР
$(window).on('load', function () {
    var flipper = (function () {

        var init = function () {

            var flipper = $('.flipper');

            $('.authorize-button').on('click', function () {
                flipper.toggleClass('flipper_state_back');
            });

            $('.desert-wrapper').on('click', function () {
                flipper.removeClass('flipper_state_back');
            })
        };

        return {init: init};
    }());

    if (document.getElementsByClassName('flipper').length) {
        flipper.init();
    }
});
// ГЛАВНОЕ МЕНЮ
$(window).on('load', function() {
    var mainMenu = (function () {
        var init = function () {
            var $hamburger = $('.hamburger'),
                $main_menu = $('.main-menu');

            $hamburger.on('click', show_main_menu);
            $main_menu.on('click', hide_main_menu);

            function show_main_menu() {
                $main_menu.show();
                $hamburger.on('click', hide_main_menu);
            }

            function hide_main_menu() {
                $main_menu.hide();
                $hamburger.on('click', show_main_menu);
            }

        };

        return {init: init};
    }());

    if (document.getElementsByClassName('hamburger').length) {
        mainMenu.init();
    }
});
// КАРТА
$(window).on('load', function() {
    var map_styles = {
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d5aa3e"
                    }
                ]
            }
        ]
    },
    makeMap = (function () {
        var init = function () {

            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD7ECKASqNjr2kdFY1xJotto6NKcwsZqwI", function () {
                window.initMap = function () {
                    // Create a map object and specify the DOM element for display.
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 55.751244, lng: 37.618423},
                        scrollwheel: false,
                        zoom: 13
                    })
                        .setOptions(map_styles);
                };
                initMap();
            });

        };

        return {init: init};
    }());

    if (document.getElementById('map')) {
        makeMap.init();
    }
});
//ПРЕЛОАДЕР
$(document).ready(function() {
    var preloader = (function () {
        var init = function () {

            $('.preloader').show();

            $(window).on('load', function() {
                $('.preloader').hide()
            })

        };

        return {init: init};
    }());

    preloader.init();
});
// КНОПКИ ДЛЯ СКРОЛЛА СТРАНИЦЫ
$(window).on('load', function() {
    var scrollButtons = (function () {

        var init = function () {

            var button_down = $('.arrow-button_bottom'),
                button_up = $('.arrow-button_top');

            button_down.on('click', function() {
                $('html, body').animate({
                    scrollTop: $(window).height()
                }, 'slow');
            });

            button_up.on('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
            });
        };

        return {init: init};
    }());

    if (document.getElementsByClassName('arrow-button').length) {
        scrollButtons.init();
    }
});
// НАВЫКИ
$(window).on('load', function() {
    var makeSkills = (function () {
        var init = function () {

            var foreground_color = 'rgb(230,172,65)',
                background_color = 'rgb(223,220,213)',
                font_color = 'rgb(205,137,32)',
                skills_data = {
                    'skills__chart_type_html': {
                        'label': 'HTML5',
                        'percent': 95
                    },
                    'skills__chart_type_css': {
                        'label': 'CSS3',
                        'percent': 80
                    },
                    'skills__chart_type_js': {
                        'label': 'JS',
                        'percent': 80
                    },
                    'skills__chart_type_php': {
                        'label': 'PHP',
                        'percent': 10
                    },
                    'skills__chart_type_mysql': {
                        'label': 'mySQL',
                        'percent': 75
                    },
                    'skills__chart_type_node': {
                        'label': 'NodeJS',
                        'percent': 50
                    },
                    'skills__chart_type_mongo': {
                        'label': 'mongoDB',
                        'percent': 5
                    },
                    'skills__chart_type_git': {
                        'label': 'Git',
                        'percent': 75
                    },
                    'skills__chart_type_gulp': {
                        'label': 'Gulp',
                        'percent': 75
                    },
                    'skills__chart_type_bower': {
                        'label': 'Bower',
                        'percent': 25
                    }
                };

            for (var skill in skills_data) {
                $("."+skill).circliful({
                    animation: 0,
                    backgroundColor: background_color,
                    foregroundColor: foreground_color,
                    foregroundBorderWidth: 20,
                    backgroundBorderWidth: 20,
                    percent:skills_data[skill].percent,

                    noPercentageSign: true,
                    replacePercentageByText: skills_data[skill].label,
                    percentageTextSize: 20,
                    fontColor: font_color
                });
            }

            $('.timer').attr('dy', '.5em').attr('x', 70);
            $('.border').attr('cy', 70);
            $('.circle').attr('cy', 70);

        };

        return {init: init};
    }());

    if (document.getElementsByClassName('skills__charts').length) {
        makeSkills.init();
    }
});
// PORTFOLIO SLIDER
$(window).on('load', function () {

    var portfolio_data = {
        '0': {
            pic_url: 'assets/img/work-1.png',
            site_name: 'Сайт школы онлайн образования'
        },
        '1': {
            pic_url: 'assets/img/work-2.png',
            site_name: 'Сайт IT Loft'
        },
        '2': {
            pic_url: 'assets/img/work-3.png',
            site_name: 'Портал видеоуроков'
        },
        '3': {
            pic_url: 'assets/img/work-4.png',
            site_name: 'Сайт центра йоги'
        }
    };

    var slider = (function () {
        var init = function () {
                var buttons = $('.portfolio-arrow-button-wrapper'),
                    slider_circles = $('.slider-nav-circles__circle');

                buttons.on('click', function() {
                    var cur_project = $('.portfolio__project'),
                        cur_index = +cur_project.attr('id'),
                        direction = $(this).data()['direction'];

                    if (direction === 'left') {
                        cur_index-=1;
                    } else {
                        cur_index+=1;
                    }
                    if (cur_index < 0 || cur_index > 3) { return; }
                    $('.screenshot').attr('src', portfolio_data[cur_index].pic_url);
                    $('.work-details__h2').text(portfolio_data[cur_index].site_name);
                    cur_project.attr('id', cur_index);

                    slider_circles.removeClass('slider-nav-circles__circle_active');
                    $(slider_circles[cur_index]).addClass('slider-nav-circles__circle_active');

                })
            }
            ;


        return {
            init: init
        }
    })();

    if (document.getElementsByClassName('portfolio__slider').length) {
        slider.init();
    }
});
// VALIDATE AND SEND FORM
$(window).on('load', function () {
    var validation = (function () {
        var init = function () {
                _setupEventListeners();
            },
            _setupEventListeners = function () {
                $form = $('form');
                $form.find('input, textarea').on('focus', function () {
                    if (['Логин', 'Пароль', 'Имя', 'Почта', 'Сообщение'].indexOf(this.value) != -1) {
                        this.value = '';
                    }
                });
                $form.on('submit', _validateForm);
            },
            _validateForm = function (e) {
                e.preventDefault();
                var $form = $(this),
                    valid = true;
                $form.find('input, textarea').each(function () {
                    if (
                        this.value.length === 0 ||
                        ['Логин', 'Пароль', 'Имя', 'Почта', 'Сообщение'].indexOf(this.value) != -1
                    ) {
                        valid = false;
                    }
                });
                if (valid) {
                    _submitForm($form);
                } else {
                    alert('Вы заполнили не все поля формы!');
                }
            },
            _submitForm = function (form) {
                var data = {content: {}};
                $form.find('input, textarea').each(function () {
                    if (this.classList.contains('contact-me-form__button') || this.classList.contains('welcome-button)')) {
                        return;
                    }
                    if (this.type == 'radio' || this.type == 'checkbox') {
                        data.content[$(this).data('name')] = $(this).is(':checked');
                    } else {
                        data.content[$(this).data('name')] = this.value;
                    }
                });
                data.content.datetime = new Date();
                $.get('/submitform', data, function() {
                    alert('Сообщение отправлено!');
                    document.querySelector('form').reset();
                });
            }
            ;


        return {
            init: init
        }
    })();

    if (document.querySelector('form')) {
        validation.init();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJsb2dtZW51LmpzIiwiZmxpcHBlci5qcyIsIm1haW5tZW51LmpzIiwibWFwLmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLWJ1dHRvbnMuanMiLCJza2lsbHMuanMiLCJzbGlkZXIuanMiLCJ2YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsIi8vINCR0JvQntCTXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBibG9nX21lbnUgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciB0YWJsZXRXaWR0aCA9IDc2OCxcbiAgICAgICAgICAgIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYmxvZ19uYXYgPSAkKCcuYmxvZy1uYXZpZ2F0aW9uJyksXG4gICAgICAgICAgICAgICAgYmxvZ19uYXZfc2Nyb2xsX3BvcyA9IGJsb2dfbmF2Lm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICBibG9nX25hdl9sZWZ0X29mZnNldCA9IGJsb2dfbmF2Lm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgYmxvZ19uYXZfdyA9IGJsb2dfbmF2LndpZHRoKCksXG4gICAgICAgICAgICAgICAgYmxvZ19zaWRlYmFyID0gJCgnLmJsb2ctc2lkZWJhcicpLFxuICAgICAgICAgICAgICAgIGFydGljbGVfb2Zmc2V0cyA9IHt9LFxuICAgICAgICAgICAgICAgIGZpeGVkX25hdl90b3BfbWFyZ2luID0gMzA7XG5cbiAgICAgICAgICAgICQoJy5ibG9nLXBvc3QnKS5lYWNoKGZ1bmN0aW9uIChpLCB0KSB7XG4gICAgICAgICAgICAgICAgYXJ0aWNsZV9vZmZzZXRzWyQodCkub2Zmc2V0KCkudG9wXSA9ICQodCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB5X3Njcm9sbF9wb3MgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gdGFibGV0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHlfc2Nyb2xsX3BvcyA+IGJsb2dfbmF2X3Njcm9sbF9wb3MgLSBmaXhlZF9uYXZfdG9wX21hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ19uYXYuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGZpeGVkX25hdl90b3BfbWFyZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGJsb2dfbmF2X2xlZnRfb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBibG9nX25hdl93XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2dfbmF2LmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdzdGF0aWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh5X3Njcm9sbF9wb3MgPCAkKHdpbmRvdykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaWRlIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ19zaWRlYmFyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2dfc2lkZWJhci5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvIGluIGFydGljbGVfb2Zmc2V0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeV9zY3JvbGxfcG9zIDwgbyAmJiAoeV9zY3JvbGxfcG9zICsgJCh3aW5kb3cpLmhlaWdodCgpKSA+IG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5ibG9nLW5hdmlnYXRpb25fX2l0ZW0nKS5yZW1vdmVDbGFzcygnYmxvZy1uYXZpZ2F0aW9uX19pdGVtX3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVsX2xpbmsgPSAkKCdhW2hyZWYqPSMnICsgYXJ0aWNsZV9vZmZzZXRzW29dICsgJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbF9saW5rLmFkZENsYXNzKCdibG9nLW5hdmlnYXRpb25fX2l0ZW1fc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSB0YWJsZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgIF9hZGRTbWFsbE1lbnVCZWhhdmlvcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIF9hZGRTbWFsbE1lbnVCZWhhdmlvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5ibG9nLW5hdmlnYXRpb24nKS5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5zbWFsbC1zY3JlZW4tYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKCcuYmxvZy1zaWRlYmFyJykuaGFzQ2xhc3MoJ3Nob3duJykpIHtcbiAgICAgICAgICAgICAgICAgICAgX2hpZGVTbWFsbE1lbnUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfc2hvd1NtYWxsTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLmJsb2ctY29udGVudCcpLm9uKCdjbGljaycsIF9oaWRlU21hbGxNZW51KTtcbiAgICAgICAgfSxcbiAgICAgICAgX3Nob3dTbWFsbE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYmxvZ19zaWRlYmFyID0gJCgnLmJsb2ctc2lkZWJhcicpO1xuICAgICAgICAgICAgYmxvZ19zaWRlYmFyLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0sIDE1MCwgJ3N3aW5nJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJsb2dfc2lkZWJhci5hZGRDbGFzcygnc2hvd24nKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIF9oaWRlU21hbGxNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGJsb2dfc2lkZWJhciA9ICQoJy5ibG9nLXNpZGViYXInKTtcbiAgICAgICAgICAgIGJsb2dfc2lkZWJhci5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAnLTMzLjMlJ1xuICAgICAgICAgICAgfSwgMTUwLCAnc3dpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYmxvZ19zaWRlYmFyLnJlbW92ZUNsYXNzKCdzaG93bicpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtpbml0OiBpbml0fTtcbiAgICB9KCkpO1xuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2ctbmF2aWdhdGlvbicpLmxlbmd0aCkge1xuICAgICAgICBibG9nX21lbnUuaW5pdCgpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGJsb2dfbWVudS5pbml0KTtcbiAgICB9XG5cbn0pOyIsIi8vINCk0JvQmNCf0J/QldCgXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZsaXBwZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZmxpcHBlciA9ICQoJy5mbGlwcGVyJyk7XG5cbiAgICAgICAgICAgICQoJy5hdXRob3JpemUtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZsaXBwZXIudG9nZ2xlQ2xhc3MoJ2ZsaXBwZXJfc3RhdGVfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJy5kZXNlcnQtd3JhcHBlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmbGlwcGVyLnJlbW92ZUNsYXNzKCdmbGlwcGVyX3N0YXRlX2JhY2snKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtpbml0OiBpbml0fTtcbiAgICB9KCkpO1xuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZsaXBwZXInKS5sZW5ndGgpIHtcbiAgICAgICAgZmxpcHBlci5pbml0KCk7XG4gICAgfVxufSk7IiwiLy8g0JPQm9CQ0JLQndCe0JUg0JzQldCd0K5cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYWluTWVudSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRoYW1idXJnZXIgPSAkKCcuaGFtYnVyZ2VyJyksXG4gICAgICAgICAgICAgICAgJG1haW5fbWVudSA9ICQoJy5tYWluLW1lbnUnKTtcblxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2snLCBzaG93X21haW5fbWVudSk7XG4gICAgICAgICAgICAkbWFpbl9tZW51Lm9uKCdjbGljaycsIGhpZGVfbWFpbl9tZW51KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2hvd19tYWluX21lbnUoKSB7XG4gICAgICAgICAgICAgICAgJG1haW5fbWVudS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2snLCBoaWRlX21haW5fbWVudSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhpZGVfbWFpbl9tZW51KCkge1xuICAgICAgICAgICAgICAgICRtYWluX21lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrJywgc2hvd19tYWluX21lbnUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtpbml0OiBpbml0fTtcbiAgICB9KCkpO1xuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hhbWJ1cmdlcicpLmxlbmd0aCkge1xuICAgICAgICBtYWluTWVudS5pbml0KCk7XG4gICAgfVxufSk7IiwiLy8g0JrQkNCg0KLQkFxuJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcF9zdHlsZXMgPSB7XG4gICAgICAgIHN0eWxlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM0NDQ0NDRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubG9jYWxpdHlcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubmVpZ2hib3Job29kXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM0NmJjZWNcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkNWFhM2VcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICBtYWtlTWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICQuZ2V0U2NyaXB0KFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lEN0VDS0FTcU5qcjJrZEZZMXhKb3R0bzZOS2N3c1pxd0lcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5pbml0TWFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBtYXAgb2JqZWN0IGFuZCBzcGVjaWZ5IHRoZSBET00gZWxlbWVudCBmb3IgZGlzcGxheS5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IHtsYXQ6IDU1Ljc1MTI0NCwgbG5nOiAzNy42MTg0MjN9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbTogMTNcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRPcHRpb25zKG1hcF9zdHlsZXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaW5pdE1hcCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge2luaXQ6IGluaXR9O1xuICAgIH0oKSk7XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpKSB7XG4gICAgICAgIG1ha2VNYXAuaW5pdCgpO1xuICAgIH1cbn0pOyIsIi8v0J/QoNCV0JvQntCQ0JTQldCgXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5zaG93KCk7XG5cbiAgICAgICAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5oaWRlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge2luaXQ6IGluaXR9O1xuICAgIH0oKSk7XG5cbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xufSk7IiwiLy8g0JrQndCe0J/QmtCYINCU0JvQryDQodCa0KDQntCb0JvQkCDQodCi0KDQkNCd0JjQptCrXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsQnV0dG9ucyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBidXR0b25fZG93biA9ICQoJy5hcnJvdy1idXR0b25fYm90dG9tJyksXG4gICAgICAgICAgICAgICAgYnV0dG9uX3VwID0gJCgnLmFycm93LWJ1dHRvbl90b3AnKTtcblxuICAgICAgICAgICAgYnV0dG9uX2Rvd24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQod2luZG93KS5oZWlnaHQoKVxuICAgICAgICAgICAgICAgIH0sICdzbG93Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnV0dG9uX3VwLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICAgICAgfSwgJ3Nsb3cnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7aW5pdDogaW5pdH07XG4gICAgfSgpKTtcblxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcnJvdy1idXR0b24nKS5sZW5ndGgpIHtcbiAgICAgICAgc2Nyb2xsQnV0dG9ucy5pbml0KCk7XG4gICAgfVxufSk7IiwiLy8g0J3QkNCS0KvQmtCYXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFrZVNraWxscyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZm9yZWdyb3VuZF9jb2xvciA9ICdyZ2IoMjMwLDE3Miw2NSknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRfY29sb3IgPSAncmdiKDIyMywyMjAsMjEzKScsXG4gICAgICAgICAgICAgICAgZm9udF9jb2xvciA9ICdyZ2IoMjA1LDEzNywzMiknLFxuICAgICAgICAgICAgICAgIHNraWxsc19kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAnc2tpbGxzX19jaGFydF90eXBlX2h0bWwnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnSFRNTDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BlcmNlbnQnOiA5NVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2tpbGxzX19jaGFydF90eXBlX2Nzcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdDU1MzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwZXJjZW50JzogODBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3NraWxsc19fY2hhcnRfdHlwZV9qcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdKUycsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGVyY2VudCc6IDgwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdza2lsbHNfX2NoYXJ0X3R5cGVfcGhwJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogJ1BIUCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGVyY2VudCc6IDEwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdza2lsbHNfX2NoYXJ0X3R5cGVfbXlzcWwnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnbXlTUUwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BlcmNlbnQnOiA3NVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2tpbGxzX19jaGFydF90eXBlX25vZGUnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnTm9kZUpTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwZXJjZW50JzogNTBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3NraWxsc19fY2hhcnRfdHlwZV9tb25nbyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdtb25nb0RCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwZXJjZW50JzogNVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2tpbGxzX19jaGFydF90eXBlX2dpdCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdHaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BlcmNlbnQnOiA3NVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2tpbGxzX19jaGFydF90eXBlX2d1bHAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnR3VscCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGVyY2VudCc6IDc1XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdza2lsbHNfX2NoYXJ0X3R5cGVfYm93ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiAnQm93ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BlcmNlbnQnOiAyNVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgc2tpbGwgaW4gc2tpbGxzX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAkKFwiLlwiK3NraWxsKS5jaXJjbGlmdWwoe1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZF9jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZENvbG9yOiBmb3JlZ3JvdW5kX2NvbG9yLFxuICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kQm9yZGVyV2lkdGg6IDIwLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQm9yZGVyV2lkdGg6IDIwLFxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50OnNraWxsc19kYXRhW3NraWxsXS5wZXJjZW50LFxuXG4gICAgICAgICAgICAgICAgICAgIG5vUGVyY2VudGFnZVNpZ246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VQZXJjZW50YWdlQnlUZXh0OiBza2lsbHNfZGF0YVtza2lsbF0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2VUZXh0U2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogZm9udF9jb2xvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcudGltZXInKS5hdHRyKCdkeScsICcuNWVtJykuYXR0cigneCcsIDcwKTtcbiAgICAgICAgICAgICQoJy5ib3JkZXInKS5hdHRyKCdjeScsIDcwKTtcbiAgICAgICAgICAgICQoJy5jaXJjbGUnKS5hdHRyKCdjeScsIDcwKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7aW5pdDogaW5pdH07XG4gICAgfSgpKTtcblxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdza2lsbHNfX2NoYXJ0cycpLmxlbmd0aCkge1xuICAgICAgICBtYWtlU2tpbGxzLmluaXQoKTtcbiAgICB9XG59KTsiLCIvLyBQT1JURk9MSU8gU0xJREVSXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcG9ydGZvbGlvX2RhdGEgPSB7XG4gICAgICAgICcwJzoge1xuICAgICAgICAgICAgcGljX3VybDogJ2Fzc2V0cy9pbWcvd29yay0xLnBuZycsXG4gICAgICAgICAgICBzaXRlX25hbWU6ICfQodCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPJ1xuICAgICAgICB9LFxuICAgICAgICAnMSc6IHtcbiAgICAgICAgICAgIHBpY191cmw6ICdhc3NldHMvaW1nL3dvcmstMi5wbmcnLFxuICAgICAgICAgICAgc2l0ZV9uYW1lOiAn0KHQsNC50YIgSVQgTG9mdCdcbiAgICAgICAgfSxcbiAgICAgICAgJzInOiB7XG4gICAgICAgICAgICBwaWNfdXJsOiAnYXNzZXRzL2ltZy93b3JrLTMucG5nJyxcbiAgICAgICAgICAgIHNpdGVfbmFtZTogJ9Cf0L7RgNGC0LDQuyDQstC40LTQtdC+0YPRgNC+0LrQvtCyJ1xuICAgICAgICB9LFxuICAgICAgICAnMyc6IHtcbiAgICAgICAgICAgIHBpY191cmw6ICdhc3NldHMvaW1nL3dvcmstNC5wbmcnLFxuICAgICAgICAgICAgc2l0ZV9uYW1lOiAn0KHQsNC50YIg0YbQtdC90YLRgNCwINC50L7Qs9C4J1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9ucyA9ICQoJy5wb3J0Zm9saW8tYXJyb3ctYnV0dG9uLXdyYXBwZXInKSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyX2NpcmNsZXMgPSAkKCcuc2xpZGVyLW5hdi1jaXJjbGVzX19jaXJjbGUnKTtcblxuICAgICAgICAgICAgICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJfcHJvamVjdCA9ICQoJy5wb3J0Zm9saW9fX3Byb2plY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cl9pbmRleCA9ICtjdXJfcHJvamVjdC5hdHRyKCdpZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJCh0aGlzKS5kYXRhKClbJ2RpcmVjdGlvbiddO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyX2luZGV4LT0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyX2luZGV4Kz0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJfaW5kZXggPCAwIHx8IGN1cl9pbmRleCA+IDMpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgICAgICQoJy5zY3JlZW5zaG90JykuYXR0cignc3JjJywgcG9ydGZvbGlvX2RhdGFbY3VyX2luZGV4XS5waWNfdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLndvcmstZGV0YWlsc19faDInKS50ZXh0KHBvcnRmb2xpb19kYXRhW2N1cl9pbmRleF0uc2l0ZV9uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyX3Byb2plY3QuYXR0cignaWQnLCBjdXJfaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcl9jaXJjbGVzLnJlbW92ZUNsYXNzKCdzbGlkZXItbmF2LWNpcmNsZXNfX2NpcmNsZV9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChzbGlkZXJfY2lyY2xlc1tjdXJfaW5kZXhdKS5hZGRDbGFzcygnc2xpZGVyLW5hdi1jaXJjbGVzX19jaXJjbGVfYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGluaXRcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9ydGZvbGlvX19zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9XG59KTsiLCIvLyBWQUxJREFURSBBTkQgU0VORCBGT1JNXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRmb3JtID0gJCgnZm9ybScpO1xuICAgICAgICAgICAgICAgICRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFsn0JvQvtCz0LjQvScsICfQn9Cw0YDQvtC70YwnLCAn0JjQvNGPJywgJ9Cf0L7Rh9GC0LAnLCAn0KHQvtC+0LHRidC10L3QuNC1J10uaW5kZXhPZih0aGlzLnZhbHVlKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJGZvcm0ub24oJ3N1Ym1pdCcsIF92YWxpZGF0ZUZvcm0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF92YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgJGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBbJ9Cb0L7Qs9C40L0nLCAn0J/QsNGA0L7Qu9GMJywgJ9CY0LzRjycsICfQn9C+0YfRgtCwJywgJ9Ch0L7QvtCx0YnQtdC90LjQtSddLmluZGV4T2YodGhpcy52YWx1ZSkgIT0gLTFcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zdWJtaXRGb3JtKCRmb3JtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0JLRiyDQt9Cw0L/QvtC70L3QuNC70Lgg0L3QtSDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3N1Ym1pdEZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge2NvbnRlbnQ6IHt9fTtcbiAgICAgICAgICAgICAgICAkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LW1lLWZvcm1fX2J1dHRvbicpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd3ZWxjb21lLWJ1dHRvbiknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3JhZGlvJyB8fCB0aGlzLnR5cGUgPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZW50WyQodGhpcykuZGF0YSgnbmFtZScpXSA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRlbnRbJCh0aGlzKS5kYXRhKCduYW1lJyldID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGVudC5kYXRldGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgJC5nZXQoJy9zdWJtaXRmb3JtJywgZGF0YSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfQodC+0L7QsdGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4hJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGluaXRcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uaW5pdCgpO1xuICAgIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
