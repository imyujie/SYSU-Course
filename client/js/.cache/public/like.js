/*TMODJS:{"version":1,"md5":"e4c26c487017ee26b86cc209418c22b9"}*/
template('public/like',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,like=$data.like,$out='';$out+='<div class="like"> <button> <span><i class="icon-up-open"></i></span> <span>';
$out+=$escape(like);
$out+='</span> </button> <button> <span><i class="icon-down-open"></i></span> </button> </div>';
return new String($out);
});