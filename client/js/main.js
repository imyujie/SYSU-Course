var tpl = require('./template.js');
var $ = require('jquery');

var data = {
    title: 'LOVESYSU',
    subtitle: 'Course',
    placeholder: '搜索课程名、老师',
    res: [
    {
        name: '数据结构与算法分析',
        teacher: '吴向军',
        catagory: '专必'
    },
    {
        name: '大学生体质健康及个人运动处方实施',
        teacher: '吴向军',
        catagory: '专必'
    },
    {
        name: '个人健康的自我管理能力发展',
        teacher: '吴向军',
        catagory: '专必'
    }]
};

$('body').append(tpl('public/header', data));

$('.fake-form').on('click', function() {
    $(this).parent().addClass('active');
    $('.search-form input').focus();
});

$('.search-form input').on('blur', function() {
    $(this).nextAll('.dropdown').removeClass('active');
    $(this).parent().removeClass('active');
});

$('.search-form input').on('keyup', function() {
    if (!$(this).val()) {
        $(this).nextAll('.dropdown').removeClass('active');
        return;
    }
    $(this).nextAll('.dropdown').addClass('active');
});

$('#container').append(tpl('public/rating', {rating: [0,0,0,0,0]}));

var iconFill = 'icon-star';
var iconStroke = 'icon-star-empty';

var Rating = function($ele) {
    this.rating = $ele;
    this.stars = Array.prototype.slice.call($ele.find('i'), 0);
    this.stat = 0;
};

Rating.prototype = {
    init: function() {
        for (var item in this.stars) {
            $(this.stars[item]).on('mouseover', this.lightStar()).on('click', this.confi());
        }
        this.rating.on('mouseout', this.dimStars());
        return this;
    },
    lightStar: function() {
        var self = this;
        return function() {
            if (!self.stat) {
                self.reset();
                $(this).removeClass(iconStroke).
                        addClass(iconFill).
                        prevAll().
                        removeClass(iconStroke).
                        addClass(iconFill);
            }
    
        };
    },
    reset: function() {
        $(this.stars).removeClass(iconFill).addClass(iconStroke);
        return this;
    },
    dimStars: function() {
        var self = this;
        return function() {
            if (!self.stat) {
                self.reset();
            }
        };
    },
    confi: function() {
        var self = this;
        return function() {
            self.stat = 1;
        } 
    },
    set: function(rate) {
        this.reset();
        for (var i = 0; i < rate; i++) {
            $(this.stars[i]).removeClass(iconStroke).addClass(iconFill);
            this.stat = 1;
        }
        return this;
    }
}

var ra = new Rating($('.rating'));
ra.init().set(4);


var sideData = {
    catagories: [
        {
            name: '公选',
            count: 10,
        },
        {
            name: '专选',
            count: 20
        }
    ]
};

$('#side').append(tpl('public/sticky', sideData));

var Sticky = function($ele, callback) {
    this.sticky = $ele;
    this.callback = callback;
    this.items = Array.prototype.slice.call($ele.find('li'), 0);
};

Sticky.prototype = {
    constructor: Sticky,
    init: function() {
        for (var item in this.items) {
            $(this.items[item]).on('click', this.handler());
        }
    },
    handler: function() {
        var self = this;
        return function() {
            $(this).toggleClass('fade');
            self.callback(self.getValue());
        };
    },
    getValue: function() {
        var res = [];
        for (var item in this.items) {
            if (!$(this.items[item]).hasClass('fade')) {
                res.push(item);
            }
        }
        return res;
    }
};

var st = new Sticky($('.sticky'), function(val){});
st.init();

$('#container').append(tpl('public/card', {
    name: '美学漫步 —— 从赫西俄德开始',
    teacher: '吴向军',
    comments: 7,
    catagory: '公选',
    rating: [0,0,0,0,0]
}));
$('#container').append(tpl('public/card', {
    name: '大学生体质健康及个人运动处方实施',
    teacher: '吴向军',
    comments: 7,
    catagory: '公选',
    rating: [1,1,1,0,0]
}));

$('#container').append(tpl('public/comment', {
    rating: [0,0,0,0,0]
}));

var ra = new Rating($('.rating'));
ra.init();

$('#like').append(tpl('public/like', {
    like: 10
}));

$('#container').append(tpl('public/quote', {
    content: '1负边距  margin-left为负值，且两个元素不在一行的时候（可以用元素float:left,width:100%实现）margin-left可以吃掉兄弟元素的margin.想像一下，假设width:99%，右边留一条缝隙，当margin-left为负值，即可让右边的这条缝隙向左走',
    like: 20,
    author: 'Tommy'
}));

$('#container').append(tpl('public/quote', {
    content: '新浪评论,中国最有影响力的新闻评论与观点咨询平台,收集各媒体社评',
    like: 10,
    author: 'Lawrance Li'
}));