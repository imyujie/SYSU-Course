var $ = require('jquery');
var Rating = require('./rating');
var SearchTips = require('./search_tips');
var Sticky = require('./sticky');
var handlerTextarea = require('./textarea_plugin');

$('.js-index-search-form, .js-header-search-form').on('submit', function(event) {
    event.preventDefault();
    var keyword = $(this).find('[name="keyword"]').val();
    window.location = '/search/'+keyword;
});

$('.fake-form').on('click', function() {
    $(this).parent().addClass('active');
    $('.search-form input').focus();
    console.log('Ed');
});

$(document).mouseup(function(e){
  var _con = $('header form');   // 设置目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0) {
    $('.search-form input').nextAll('.dropdown').removeClass('active');
    $('.search-form input').parent().removeClass('active');
  }
});

var $allRating = $('.result-body .rating, .table .rating');
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

var cardTpl = function(item) {
    var res = ''
    +'<div class="card">'
    +'    <a href="/' +item.category+ '/' +item.teacher+ '/' +item.name+ '">'
    +'        <div class="row">'
    +'            <h2>'+ item.name+'</h2>'
    +'              <div class="rating" data-allow="False" data-rate="{{ ' + item.rating + ' }}">';

    for (var i = 0; i < +item.rating; i++) {
        res += '<i class="icon-star"></i>';
    }
    for (var i = 0; i < 5-(+item.rating); i++) {
        res += '<i class="icon-star-empty"></i>';
    }
    res += ''
    +'              </div>'
    +'        </div>'
    +'        <div class="row">'
    +'            <div class="subtitle">'
    +'                <span>' +item.teacher + '</span>'
    +'                <span> '+ item.category +' </span>'
    +'            </div>'
    +'            <span>'
    +'                '+ item.comments +' 条评论'
    +'            </span>'
    +'        </div>'
    +'    </a>'
    +'</div>';
    return res;
};

var addTips = function(str) {
    $('.form-tips p').text(str);
};


var Modal = function(options) {
    this.options = options;
};

Modal.prototype = {
    init: function() {
        this.modal = this.options.modal;
        this.mask = this.options.mask;
        this.title = this.options.modal.find('.title');
        this.body = this.options.modal.find('.modal-body');
        this.footer = this.options.modal.find('.modal-footer');
        this.closeBtn = this.options.modal.find('.close-btn, #cancel');
        var self = this;
        self.mask.on('mouseup', function(e) {
            var _con = self.modal;   // 设置目标区域
            if(!_con.is(e.target) && _con.has(e.target).length === 0) {
                self.close();
             }
        });
        self.closeBtn.on('click', function(e) {
            self.close();
        });
    },
    close: function() {
        this.reinit();
        this.mask.fadeOut();
    },
    setTitle: function(str) {
        this.title.text(str);
    },
    setBody: function(str) {
        this.reset();
        this.body.html(str);
    },
    open: function() {
        this.mask.fadeIn();
    },
    hideFooter: function() {
        this.footer.addClass('hidden');
    },
    reset: function() {
        this.footer.removeClass('hidden');
    },
    reinit: function() {
        this.modal.find('#confirm').removeClass('js-force').addClass('js-normal');
    }
};

var mdd = new Modal({
    modal: $('.modal'),
    mask: $('.background-mask')
});

mdd.init();



var formRat = new Rating($('.js-add-course-form .rating'));
formRat.init();

$('.js-add-course-form').on('submit', function(event) {
    event.preventDefault();
    var title = $('#title').val();
    var teacher = $('#teacher').val();
    var comment = $('#comment').val();
    var author = $('#author').val();
    if (!title) {
        addTips('貌似还没填写课程名称');
        return;
    }
    if (!teacher) {
        addTips('貌似还没填写教师名字');
        return;
    }
    if (!comment) {
        addTips('貌似还没填写你的评论');
        return;
    }
    if (!formRat.get()) {
        addTips('貌似还没填写你的评分');
        return;
    }
    if (!author) {
        addTips('貌似还没填写你的名字');
        return;
    }
    if (comment.length < 15) {
        addTips('评论需要大于15个字哦');
        return;
    }
    var postData = $(this).serialize();
    postData += '&rating='+formRat.get()+'&step=1';
    console.log(postData);
    var $that = $(this);
    $.ajax({
        url: '/add/course',
        type: 'POST',
        data: postData,
    })
    .done(function(data) {
        console.log(data);
        if (data === '1') {
            mdd.setBody('<h3>添加成功</h3>');
            mdd.hideFooter();
            mdd.open();
            $that.trigger('reset');
            console.log("success");
        } else if (data === '0') {
            alert('fail');
        } else if (data === '2') {
            mdd.setBody('<h3>该课程已存在，是否确定添加为一条新评论？</h3>');
            $('.modal #confirm').removeClass('js-normal').addClass('js-force');
            mdd.open();
        } else {
            var resList = $.parseJSON(data);
            resList = resList["all"];
            var htm = '<h3>以下课程已存在，是否确定添加？</h3>';
            for (var item in resList) {
                htm += cardTpl(resList[item]);
            }
            mdd.setBody(htm);
            mdd.open();
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    $('body').on('click', '#confirm.js-normal', function(event) {
        postData = postData.replace('&step=1', '&step=2');
        $.ajax({
            url: '/add/course',
            type: 'POST',
            data: postData,
        })
        .done(function(data) {
            if (data === '1') {
                mdd.close();
                $that.trigger('reset');
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
    $('body').on('click', '#confirm.js-force', function(event) {
        postData = postData.replace('&step=1', '&step=2&force=1');
        $.ajax({
            url: '/add/course',
            type: 'POST',
            data: postData,
        })
        .done(function(data) {
            if (data === '1') {
                mdd.close();
                $that.trigger('reset');
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
});


$('.js-add-course-form').on('reset', function(event) {
    formRat.reinit();
});

var cmtRat = new Rating($('.comment-write .rating'));
cmtRat.init();

var quoteTpl = function(comment) {
    return ''
    +'<div class="quote">'
    +'    <div class="quote-body">'
    +'        <div class="right">'
    +'            <p>' + comment.comment +'</p>'
    +'            <div class="row">'
    +'                <span>—— '+ comment.author +'</span>'
    +'            </div>'
    +'        </div>'
    +'        <div class="left">'
    +'            <div class="like">'
    +'                <button class="like-btn" data-comment="' + comment.cmtid +'">'
    +'                    <span><i class="icon-up-open"></i></span>'
    +'                    <span class="js-count">' + comment.like +'</span>'
    +'                </button>'
    +'                <button class="unlike-btn" data-comment="' + comment.cmtid +'">'
    +'                    <span><i class="icon-down-open"></i></span>'
    +'                </button>'
    +'            </div>'
    +'        </div>'
    +'    </div>'
    +'    <div class="divider"></div>'
    +'</div>';
};

function html_encode(str) {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&gt;");   
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  s = s.replace(/ /g, "&nbsp;");   
  s = s.replace(/\'/g, "&#39;");   
  s = s.replace(/\"/g, "&quot;");   
  s = s.replace(/\n/g, "<br>");   
  return s;   
}   
 
function html_decode(str) {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&gt;/g, "&");   
  s = s.replace(/&lt;/g, "<");   
  s = s.replace(/&gt;/g, ">");   
  s = s.replace(/&nbsp;/g, " ");   
  s = s.replace(/&#39;/g, "\'");   
  s = s.replace(/&quot;/g, "\"");   
  s = s.replace(/<br>/g, "\n");   
  return s;   
}

$('.js-detail-comment-form').on('submit', function(event){
    event.preventDefault();
    var postData = $(this).serialize();
    var course = $(this).attr('data-course');
    var rating = cmtRat.get();
    var content = $('#content').val();
    var author = $('#author').val();
    var $that = $(this);
    if (!rating) {
        addTips('貌似还没填写评分');
        return;
    }
    if (!content) {
        addTips('貌似还没填写内容');
        return;
    }
    if (!author) {
        addTips('貌似还没填写你的名字');
        return;
    }
    if (content.length < 15) {
        addTips('评论内容要 15 个字以上哦');
        return;
    }
    postData += '&rating='+rating;
    postData += '&cid='+course;
    $.ajax({
        url: '/add/comment',
        type: 'POST',
        data: postData,
    })
    .done(function(data) {
        console.log(data);
        if (+data > -1) {
            var res = quoteTpl({comment: html_encode(content), cmtid: +data, like: 0, author: html_encode(author)});
            $('.cross-row').append(res);
            $that.trigger('reset');
            console.log("success");
        } else {
            alert('fail');
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
});

$('.js-detail-comment-form').on('reset', function() {
    cmtRat.reinit();
});

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$('body').on('click', '.like-btn', function(event) {
    event.preventDefault();
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

$('body').on('click', '.unlike-btn', function(event) {
    event.preventDefault();
    event.preventDefault();
    var $like = $(this);
    var $count = $like.find('.js-count');
    var postData = $like.attr('data-comment');
    var args = {"cmtid": postData};
    args._xsrf = getCookie("_xsrf");
    $.ajax({
        url: '/add/unlike',
        type: 'POST',
        data: $.param(args),
    })
    .done(function(data) {
        console.log(data);
        if (data === '1') {
            console.log('success');
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


var Sender = function(options) {
    this.options = options;
    this.func = {};
};

Sender.prototype = {
    fire: function(type) {
        if (typeof(this.func[type]) === 'function')
            this.func[type](this.options.items);
    },
    on: function(type, f) {
        this.func[type] = f;
    }
};


var sd = [];
for (var i = 1; i < 6; i++) {
    sd[i] = new Sender({
        items: $('[data-category="'+ i +'"]')
    });
    sd[i].on('change', function(items) {
        items.toggleClass('hidden');
    });
};


var st = new Sticky($('.sticky'), function(val){}, sd);
st.init();
