/*TMODJS:{"version":1,"md5":"c59fbc6811c0df7c9e67f15b9f00e5b5"}*/
template('public/card',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},teacher=$data.teacher,catagory=$data.catagory,comments=$data.comments,$out='';$out+='<div class="card"> <a href="#"> <div class="row"> <h2>';
$out+=$escape(name);
$out+='</h2> ';
include('./rating');
$out+=' </div> <div class="row"> <div class="subtitle"> <span> ';
$out+=$escape(teacher);
$out+=' </span> <span> ';
$out+=$escape(catagory);
$out+=' </span> </div> <span> ';
$out+=$escape(comments);
$out+=' 条评论 </span> </div> </a> </div>';
return new String($out);
});