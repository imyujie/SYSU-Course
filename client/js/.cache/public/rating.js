/*TMODJS:{"version":2,"md5":"84183ee8d0a29bb84a3625c2f1cf1596"}*/
template('public/rating',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,rating=$data.rating,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="rating"> ';
$each(rating,function($value,$index){
$out+=' ';
if($value == 1 ){
$out+=' <i class="icon-star"></i> ';
}else{
$out+=' <i class="icon-star-empty"></i> ';
}
$out+=' ';
});
$out+=' </div>';
return new String($out);
});