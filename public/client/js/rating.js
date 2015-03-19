var $ = require('jquery');

module.exports = function($ele) {
    this.rating = $ele;
    this.stars = Array.prototype.slice.call($ele.find('i'), 0);
    this.stat = 0;
    this.iconFill = 'icon-star';
    this.iconStroke = 'icon-star-empty';
};

module.exports.prototype = {
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
                $(this).removeClass(self.iconStroke).
                        addClass(self.iconFill).
                        prevAll().
                        removeClass(self.iconStroke).
                        addClass(self.iconFill);
            }
    
        };
    },
    reset: function() {
        $(this.stars).removeClass(this.iconFill).addClass(this.iconStroke);
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
            $(this.stars[i]).removeClass(this.iconStroke).addClass(this.iconFill);
        }
        this.stat = 1;
        return this;
    },
    reinit: function() {
        this.reset();
        this.stat = 0;
        return this;
    },
    get: function() {
        var res = this.rating.find('.icon-star');
        return res.length;
    }
};