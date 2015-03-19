var $ = require('jquery');

var dd = require('./data.js');

var ALLDATA = dd['all'];

module.exports = function(options) {
    this.options = options;
};

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

module.exports.prototype = {
    constructor: module.exports,
    init: function() {
        this.ul = this.options.dropdown.find('ul');
        this.options.input.on('keyup', this.handler());
    },
    handler: function() {
        var self = this;
        return function(event) {
            if (!$(this).val()) {
                self.options.dropdown.removeClass('active');
            } else {
                var keyword = $(this).val();
                self.handleData(keyword, event);
            }
        }
    },
    handleData: function(keyword, event) {
        var self = this;
        var res = '';
        self.lastTime = event.timeStamp;
        setTimeout(function(){ 
            //如果时间差为0，也就是你停止输入0.5s之内都没有其它的keyup事件产生，这个时候就可以去请求服务器了
            if(self.lastTime - event.timeStamp == 0) {
                var args = {"keyword": keyword};
                args._xsrf = getCookie("_xsrf");
                $.ajax({
                    url: self.options.url,
                    type: 'POST',
                    data: $.param(args),
                })
                .done(function(data) {
                    console.log(data);
                    if (data === '0') {
                        //alert('fail');
                    } else if (data === '2') {
                        res = self.template();
                        self.ul.empty().append(res);
                        self.options.dropdown.addClass('active');
                    } else {
                        var response = $.parseJSON(data);
                        response = response["all"];
                        for (var course in response) {
                            res += self.template(response[course]);
                        }
                        self.ul.empty().append(res);
                        self.options.dropdown.addClass('active');
                    }
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });  
                var $val = $("#search").val();
                $("#tip").html($val);                   
            }
        }, 500);
        
    },
    template: function() {
        arguments = Array.prototype.slice.call(arguments, 0);
        console.log(arguments);
        var categories = ["公选", "专选", "公必", "专必", "体育"];
        if (!arguments[0]) {
            return ''
            + '<li>'
            + '    <a href="/add/course">'
            + '        <h4>' + this.options.notFoundText + '</h4>'
            + '        <div class="row">'
            + '            <p>' + this.options.addText + '</p>'
            + '        </div>'
            + '    </a>'
            + '</li>';
        } else {
            return ''
            + '<li>'
            + '    <a href="/'+ categories[+arguments[0].category-1] +'/'+ arguments[0].teacher +'/'+ arguments[0].name +'">'
            + '        <h3>' + arguments[0].name  + '</h3>'
            + '        <div class="row">'
            + '            <span>' + arguments[0].teacher + '</span>'
            + '            <span>' + categories[+arguments[0].category-1] + '</span>'
            + '        </div>'
            + '    </a>'
            + '</li>';
        }
    }
};