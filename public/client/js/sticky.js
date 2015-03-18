var $ = require('jquery');

module.exports = function($ele, callback, sd) {
    this.sticky = $ele;
    this.callback = callback;
    this.items = Array.prototype.slice.call($ele.find('li'), 0);
    this.sd = sd;
};

module.exports.prototype = {
    constructor: module.exports,
    init: function() {
        for (var item in this.items) {
            $(this.items[item]).on('click', this.handler());
        }
    },
    handler: function() {
        var self = this;
        return function() {
            $(this).toggleClass('fade');
            var idx = +$(this).attr('data-catecode');
            self.sd[idx].fire('change');
            //self.callback(self.getValue());
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