/*TMODJS:{"version":4,"md5":"cbe73bb2e4dbe3d851bfac870ea24c60"}*/
template('public/comment',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<form action=""> <div class="comment-write"> <div class="row"> <textarea name="" id="" cols="30" rows="10" placeholder="说点什么"></textarea> </div> <div class="row"> <input type="text" placeholder="你的名字"> ';
include('./rating');
$out+=' </div> </div> <div class="btn-group"> <button type="reset">取消</button> <button type="submit">提交</button> </div> </form>';
return new String($out);
});