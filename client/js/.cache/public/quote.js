/*TMODJS:{"version":3,"md5":"8b9c3e9118ae86d7e6fdfa4ed9589d50"}*/
template('public/quote',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,author=$data.author,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="quote"> <div class="quote-body"> <div class="right"> <p>';
$out+=$escape(content);
$out+='</p> <div class="row"> <span>—— ';
$out+=$escape(author);
$out+='</span> </div> </div> <div class="left"> ';
include('./like');
$out+=' </div> </div> <div class="divider"></div> </div>';
return new String($out);
});