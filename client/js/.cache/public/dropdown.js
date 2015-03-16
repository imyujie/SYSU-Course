/*TMODJS:{"version":1,"md5":"4c95f0f82e6693774618f668721ad756"}*/
template('public/dropdown',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,res=$data.res,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="dropdown"> <ul> ';
$each(res,function($value,$index){
$out+=' <li> <a href="#"> <h3>';
$out+=$escape($value.name);
$out+='</h3> <div class="row"> <span>';
$out+=$escape($value.teacher);
$out+='</span> <span>';
$out+=$escape($value.catagory);
$out+='</span> </div> </a> </li> ';
});
$out+=' </ul> </div>';
return new String($out);
});