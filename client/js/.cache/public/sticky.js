/*TMODJS:{"version":1,"md5":"8a77dfd287e62fce72d397d9b005e4ca"}*/
template('public/sticky',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,catagories=$data.catagories,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="sticky"> <ul> ';
$each(catagories,function($value,$index){
$out+=' <li> <span>';
$out+=$escape($value.name);
$out+='</span> <span class="tag">';
$out+=$escape($value.count);
$out+='</span> </li> ';
});
$out+=' </ul> </div>';
return new String($out);
});