/*TMODJS:{"version":2,"md5":"1ac3f4cd062e19a26e0e49842d2f80c1"}*/
template('public/search',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="search"> <form action=""> <input type="text"> <button><i class="icon-search"></i></button> </form> ';
include('./dropdown');
$out+=' </div>';
return new String($out);
});