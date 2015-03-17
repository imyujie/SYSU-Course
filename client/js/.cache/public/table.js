/*TMODJS:{"version":4,"md5":"1f60e7946a84e19b0b6d0d1dfd202e2c"}*/
template('public/table',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,teacher=$data.teacher,catagory=$data.catagory,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$each=$utils.$each,quotelist=$data.quotelist,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="table-header"> <i class="icon-graduation-cap"></i> <h2>';
$out+=$escape(name);
$out+='</h2> </div> <div class="table"> <div class="table-row"> <span class="value">';
$out+=$escape(teacher);
$out+='</span> <span class="label">教师</span> </div> <div class="table-row"> <span class="value">';
$out+=$escape(catagory);
$out+='</span> <span class="label">类别</span> </div> <div class="table-row"> <div class="value">';
include('./rating');
$out+='</div> <span class="label">评分</span> </div> <div class="cross-row"> ';
$each(quotelist,function($value,$index){
$out+=' ';
include('./quote',$value);
$out+=' ';
});
$out+=' </div> </div>';
return new String($out);
});