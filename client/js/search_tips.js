var $ = require('jquery');

var dd = require('./data.js');

var ALLDATA = dd['all'];

module.exports = function(options) {
    this.options = options;
};

module.exports.prototype = {
    constructor: module.exports,
    init: function() {
        this.ul = this.options.dropdown.find('ul');
        this.options.input.on('keyup', this.handler());
    },
    handler: function() {
        var self = this;
        return function() {
            if (!$(this).val()) {
                self.options.dropdown.removeClass('active');
            } else {
                var keyword = $(this).val();
                self.handleData(keyword);
            }
        }
    },
    handleData: function(keyword) {
        var res = '';
        for (var i = 0, len = ALLDATA.length; i < len; i++) {
            if (ALLDATA[i].teacher.indexOf(keyword) > -1 ||
                ALLDATA[i].name.indexOf(keyword) > -1) {
                res += this.template(ALLDATA[i]);
            }
        }
        if (res.length === 0) {
            res = this.template();
        }
        this.ul.empty().append(res);
        this.options.dropdown.addClass('active');
    },
    template: function() {
        arguments = Array.prototype.slice.call(arguments, 0);
        console.log(arguments);
        if (!arguments[0]) {
            return ''
            + '<li>'
            + '    <a href="#">'
            + '        <h4>' + this.options.notFoundText + '</h4>'
            + '        <div class="row">'
            + '            <p>' + this.options.addText + '</p>'
            + '        </div>'
            + '    </a>'
            + '</li>';
        } else {
            return ''
            + '<li>'
            + '    <a href="#">'
            + '        <h3>' + arguments[0].name + '</h3>'
            + '        <div class="row">'
            + '            <span>' + arguments[0].teacher + '</span>'
            + '            <span>' + arguments[0].category + '</span>'
            + '        </div>'
            + '    </a>'
            + '</li>';
        }
    }
};