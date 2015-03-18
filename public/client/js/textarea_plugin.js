var $ = require('jquery');

$.fn.css2 = $.fn.css;
$.fn.css = function() {
    if (arguments.length) return $.fn.css2.apply(this, arguments);
    var attr = ['font-family','font-size','font-weight','font-style','color',
        'text-transform','text-decoration','letter-spacing', 'box-shadow',
        'line-height','text-align','vertical-align','direction','background-color',
        'background-image','background-repeat','background-position',
        'background-attachment','opacity','width','height','top','right','bottom',
        'left','margin-top','margin-right','margin-bottom','margin-left',
        'padding-top','padding-right','padding-bottom','padding-left',
        'border-top-width','border-right-width','border-bottom-width',
        'border-left-width','border-top-color','border-right-color',
        'border-bottom-color','border-left-color','border-top-style',
        'border-right-style','border-bottom-style','border-left-style','position',
        'display','visibility','z-index','overflow-x','overflow-y','white-space',
        'clip','float','clear','cursor','list-style-image','list-style-position',
        'list-style-type','marker-offset'];
    var len = attr.length, obj = {};
    for (var i = 0; i < len; i++) 
        obj[attr[i]] = $.fn.css2.call(this, attr[i]);
    return obj;
};

module.exports = function() {
    $('textarea').keyup(function () {
        var t = $(this);
        
        if (!this.justifyDoc) {
            this.justifyDoc = $(document.createElement('div'));
            // copy css
            this.justifyDoc.css(t.css()).css({
                'display'   :   'none',
                'word-wrap' :   'break-word',
                'min-height':   t.height(),
                'height'    :   'auto'
            }).insertAfter(t.css('overflow-y', 'hidden'));
        }

        var html = t.val().replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#039;')
            .replace(/"/g, '&quot;')
            .replace(/ /g, '&nbsp;')
            .replace(/((&nbsp;)*)&nbsp;/g, '$1 ')
            .replace(/\n/g, '<br />')
            .replace(/<br \/>[ ]*$/, '<br />-')
            .replace(/<br \/> /g, '<br />&nbsp;');

        this.justifyDoc.html(html);
        t.height(this.justifyDoc.height());
    });
};