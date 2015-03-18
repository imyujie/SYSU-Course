var tpl = require('./template.js');
var $ = require('jquery');
var dd = require('./data.js');
var Rating = require('./rating');
var SearchTips = require('./search_tips');
var Sticky = require('./sticky');
var handlerTextarea = require('./textarea_plugin');

var ALLDATA = dd['all'];


$('.js-index-search-form, .js-header-search-form').on('submit', function(event) {
    event.preventDefault();
    var keyword = $(this).find('[name="keyword"]').val();
    window.location = '/search/'+keyword;
});

$('.fake-form').on('click', function() {
    $(this).parent().addClass('active');
    $('.search-form input').focus();
});

$('.search-form input').on('blur', function() {
    $(this).nextAll('.dropdown').removeClass('active');
    $(this).parent().removeClass('active');
});

var $allRating = $('.rating');
for (var i = 0, len = $allRating.length; i < len; i++) {
    var rt = new Rating($($allRating[i]));
    if ($($allRating[i]).attr('data-allow') === 'True') {
        rt.init();
    } else {
        var rate = +($($allRating[i]).attr('data-rate'));
        console.log(rate);
        rt.init().set(rate);
    }
}

var st = new Sticky($('.sticky'), function(val){});
st.init();

$('.js-add-course-form').on('submit', function(event) {
    event.preventDefault();
    var postData = $(this).serialize();
    postData += '&step=1';
    $.ajax({
        url: '/add/course',
        type: 'POST',
        data: postData,
    })
    .done(function(data) {
        console.log(data);
        if (data === '1') {
            alert('success');
            console.log("success");
        } else if (data === '0') {
            alert('fail');
        } else {
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
});

$('.js-detail-comment-form').on('submit', function(event){
    event.preventDefault();
    var postData = $(this).serialize();
    var course = $(this).attr('data-course');
    var $stars = $(this).find('.icon-star');
    var rating = $stars.length;
    postData += '&rating='+rating;
    postData += '&cid='+course;
    $.ajax({
        url: '/add/comment',
        type: 'POST',
        data: postData,
    })
    .done(function(data) {
        console.log(data);
        if (data === '1') {
            alert('success');
            console.log("success");
        } else if (data === '0') {
            alert('fail');
        } else {
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
});

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$('.like-btn').on('click', function(event){
    event.preventDefault();
    var $like = $(this);
    var $count = $like.find('.js-count');
    var postData = $like.attr('data-comment');
    var args = {"cmtid": postData};
    args._xsrf = getCookie("_xsrf");
    $.ajax({
        url: '/add/like',
        type: 'POST',
        data: $.param(args),
    })
    .done(function(data) {
        console.log(data);
        if (data === '1') {
            $count.text(1 + (+$count.text()));
        } else if (data === '0') {
            alert('fail');
        } else {
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
});
$('input, textarea').on('focus', function() {
    $(this).nextAll('.label').addClass('active');
});
$('input, textarea').on('blur', function() {
    $(this).nextAll('.label').removeClass('active');
});


handlerTextarea();

var st = new SearchTips({
    url: '/search',
    notFoundText: '没有找到相关数据',
    addText: '想添加一门新的课程？',
    dropdown: $('.search .dropdown'),
    input: $('.search input')
});

st.init();


var h = new SearchTips({
    url: '/search',
    notFoundText: '没有找到相关数据',
    addText: '想添加一门新的课程？',
    dropdown: $('.search-form .dropdown'),
    input: $('.search-form input')
});

h.init();