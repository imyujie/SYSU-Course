/*TMODJS:{"version":3,"md5":"e4fcded701cc4373295d7b4bb425cb49"}*/
template('page',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./public/header');
$out+=' <h2>Hello</h2>';
return new String($out);
});