(function () {
    var aside = document.getElementById('aside');
    var down = document.getElementById('down');
    var toggleNav = document.getElementsByClassName('close-nav')[0];
    var toggleMobMenu = document.getElementsByClassName('toggle-menu')[0];
    var main = document.getElementsByTagName('main')[0];
    var tooltip = document.getElementById('tooltip');
    var preload = document.getElementById('preload');
    var boDy = document.body;
    if (toggleNav) {
        toggleNav.onclick = function (e) {
            e.preventDefault();
            aside.classList.toggle('active');
            tooltip.classList.remove('active');
        }
    }
    if (toggleMobMenu) {
        toggleMobMenu.onclick = function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            aside.classList.toggle('active');
            main.classList.toggle('active');
        }
    }
    if (down) {
        down.onclick = function (e) {
            e.preventDefault();
            var html = document.getElementsByTagName('html')[0];
            html.classList.add('addScroll');
            boDy.classList.add('addScroll');
            main.classList.add('down');
            WOW.init();
            setTimeout(function () {
                if (window.innerWidth > 1024) {
                    aside.classList.remove('active');
                    tooltip.classList.add('active');
                }
            }, 2000);
        }
    }
    (window.onresize = function () {
        var widthDisplay = window.innerWidth;
        if (widthDisplay <= 1024) {
            aside.classList.remove('active');
            main.classList.remove('active');
            toggleMobMenu.classList.remove('active');
        }
    })();
    function adClass(url) {
        switch (url) {
            case "/" : {
                document.getElementsByClassName('conf')[0].classList.add('active');
                break
            }
            case "/views/restaurant.html" : {
                document.getElementsByClassName('res')[0].classList.add('active');
                break
            }
            case "/views/pizzeria.html" : {
                document.getElementsByClassName('pizza')[0].classList.add('active');
                break
            }
            case "/views/hotel.html" : {
                document.getElementsByClassName('hotel-link')[0].classList.add('active');
                break
            }
        }
    }
    adClass(window.location.pathname);
    var h1referral = document.querySelector('.juicer-feed h1.referral');
    if (h1referral) {
        h1referral.remove();
    }
    var scroll = document.getElementsByClassName('scroll'),
        len = scroll.length;
    for (var i = 0; i < len; i++) {
        scroll[i].onclick = function (event) {
            event.preventDefault();
            down.click();
            var anchor = this.hash;
            $('html, body').animate({
                scrollTop: $(anchor).offset().top - 0
            }, 600);
        };
    }
    var form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/libs/send.php");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        showPopup();
                        form.reset();
                    } else {
                        console.error('error');
                    }
                }
            };
            xhr.send(formData);
            event.preventDefault();
        });
    }
    window.onload = function() {
        preload.classList.add('hidden');
        function addJs(src) {
            var $src = document.createElement('script');
            $src.async = false;
            $src.src = src;
            boDy.appendChild($src);
        }
        addJs('../libs/fancybox-2.1.7/jquery.fancybox.js');
        addJs('../js/initmap.min.js');
        addJs('https://maps.googleapis.com/maps/api/js?key=AIzaSyD6-9owgqT1zv1W18KHR5cM7yg9Uz465fM&callback=initMap');

    };
    function addStyleSheets(href) {
        var $head = document.head,
            $link = document.createElement('link');
        $link.rel = 'stylesheet';
        $link.href = href;
        $head.appendChild($link);
    }
    addStyleSheets('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,300i,400,500');
    addStyleSheets('../css/style.css');
})();
$(".standard-apartments").on('click', function (e) {
    e.preventDefault();
    $.fancybox([
        {href: '../img/hotel/Photo-5-1.jpg'},
        {href: '../img/hotel/Photo-6-1.jpg'},
        {href: '../img/hotel/Photo-7-1.jpg'},
        {href: '../img/hotel/Photo-8-1.jpg'},
        {href: '../img/hotel/Photo-9-1.jpg'},
        {href: '../img/hotel/Photo-10-1.jpg'}
    ]);
});
$(".family-apartments").on('click', function (e) {
    e.preventDefault();
    $.fancybox([
        {href: '../img/hotel/Photo-5-1.jpg'},
        {href: '../img/hotel/Photo-6-1.jpg'},
        {href: '../img/hotel/Photo-7-1.jpg'},
        {href: '../img/hotel/Photo-8-1.jpg'},
        {href: '../img/hotel/Photo-9-1.jpg'},
        {href: '../img/hotel/Photo-10-1.jpg'}
    ]);
});
$(".lux-apartments").on('click', function (e) {
    e.preventDefault();
    $.fancybox([
        {href: '../img/hotel/Photo-5-1.jpg'},
        {href: '../img/hotel/Photo-6-1.jpg'},
        {href: '../img/hotel/Photo-7-1.jpg'},
        {href: '../img/hotel/Photo-8-1.jpg'},
        {href: '../img/hotel/Photo-9-1.jpg'},
        {href: '../img/hotel/Photo-10-1.jpg'}
    ]);
});
var WOW = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 300,
    mobile: false,
    live: true
});
