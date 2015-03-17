var tpl = require('./template.js');
var $ = require('jquery');
var dd = require('./data.js');
var Rating = require('./rating');
var SearchTips = require('./search_tips');
var Sticky = require('./sticky');
var handlerTextarea = require('./textarea_plugin');

var ALLDATA = dd['all'];

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



$('#container').append(tpl('public/rating', {rating: [0,0,0,0,0]}));

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

$('#container').append(tpl('public/form', { head: '增加一门新课程'}));

$('input, textarea').on('focus', function() {
    $(this).nextAll('.label').addClass('active');
});
$('input, textarea').on('blur', function() {
    $(this).nextAll('.label').removeClass('active');
});


$('#container').append(tpl('public/table', {
    name: '大学生体质健康及个人运动处方实施',
    teacher: '吴向军',
    catagory: '公选',
    rating: [1,1,1,0,0],
    quotelist: [
        {
            content: '1负边距  margin-left为负值，且两个元素不在一行的时候（可以用元素float:left,width:100%实现）margin-left可以吃掉兄弟元素的margin.想像一下，假设width:99%，右边留一条缝隙，当margin-left为负值，即可让右边的这条缝隙向左走',
            like: 20,
            author: 'Tommy'
        }
    ]
}));

$('#container').append(tpl('public/search', {
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
}));

$('#container').append(tpl('public/paginator', {}));

handlerTextarea();

var st = new SearchTips({
    notFoundText: '没有找到相关数据',
    addText: '想添加一门新的课程？',
    dropdown: $('.search .dropdown'),
    input: $('.search input')
});

st.init();


var h = new SearchTips({
    notFoundText: '没有找到相关数据',
    addText: '想添加一门新的课程？',
    dropdown: $('.search-form .dropdown'),
    input: $('.search-form input')
});

h.init();