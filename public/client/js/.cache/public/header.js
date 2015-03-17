/*TMODJS:{"version":9,"md5":"7139232eec88e386e9197679537b44ed"}*/
template('public/header',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,subtitle=$data.subtitle,placeholder=$data.placeholder,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<header> <div class="wrapper"> <div class="logo"> <h1>';
$out+=$escape(title);
$out+='</h1> <h2>';
$out+=$escape(subtitle);
$out+='</h2> </div> <div class="controller"> <form action="" class="search-form"> <div class="fake-form"></div> <input type="text" placeholder="';
$out+=$escape(placeholder);
$out+='"> <button type="submit" class="search-btn"> <i class="icon-search"></i> </button> ';
include('./dropdown');
$out+=' </form> <i class="icon-plus"></i> </div> </div> </header>';
return new String($out);
});