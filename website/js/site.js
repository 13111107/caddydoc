$(document).ready(function () {
    $("img.lazy").unveil();
    $(".projects .thumbnail").matchHeight({
        byRow: !0,
        property: "height",
        target: null,
        remove: !1
    });
    $.scrollUp({
        scrollName: "scrollUp",
        topDistance: "300",
        topSpeed: 300,
        animation: "fade",
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: '<i class="fa fa-angle-up"></i>',
        activeOverlay: !1
    });
    $("#toc").toc({
        listType: '<ul class="nav"></ul>',
        selectors: "h2",
        container: ".post-content",
        smoothScrolling: !0,
        prefix: "toc",
        onHighlight: function () {
        },
        highlightOnScroll: !0,
        highlightOffset: 100,
        anchorName: function (a, b, c) {
            return c + a
        }
    });
    $.get("me", function (data) {
        data&&$("#loginbar").html("你好，<a class='navbar-link' href='#'>" + decodeURI(data.name) + "</a> <a class='navbar-link' href='/logout'>登出</a>");
    });
});
