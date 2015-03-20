$(function() {
	function html_encode(str) {   
	  var s = "";   
	  if (str.length == 0) return "";   
	  s = str.replace(/&/g, "&gt;");   
	  s = s.replace(/</g, "&lt;");   
	  s = s.replace(/>/g, "&gt;");   
	  s = s.replace(/ /g, "&nbsp;");   
	  s = s.replace(/\'/g, "&#39;");   
	  s = s.replace(/\"/g, "&quot;");   
	  s = s.replace(/\n/g, "<br>");   
	  return s;   
	}   
	 
	function html_decode(str) {   
	  var s = "";   
	  if (str.length == 0) return "";   
	  s = str.replace(/&gt;/g, "&");   
	  s = s.replace(/&lt;/g, "<");   
	  s = s.replace(/&gt;/g, ">");   
	  s = s.replace(/&nbsp;/g, " ");   
	  s = s.replace(/&#39;/g, "\'");   
	  s = s.replace(/&quot;/g, "\"");   
	  s = s.replace(/<br>/g, "\n");   
	  return s;   
	}

	var tpl = function(i) {
		console.log(i);
		var res =  ''
		+'<tr>'
		+'	<td>' + i.cmtid + '</td>'
		+'	<td>' + html_encode(i.author) + '</td>'
		+'	<td>' + i.status + '</td>'
		+'	<td>' + i.like + '</td>'
		+'	<td>' + i.unlike + '</td>'
		+'	<td>' + html_encode(i.comment) + '</td>'
		+'	<td>';
		
		if (+i.status === 1) {
			res += '		<button type="button" class="btn btn-info js-delete" data-comment="'+i['cmtid']+'">删除</button>';
		} else {
			res += '		<button type="button" class="btn btn-info js-undo" data-comment="'+i['cmtid']+'">恢复</button>';
		};
		
		res += ''
		+'		<button type="button" class="btn btn-info" data-comment="{{ i.cmtid }}" onclick="window.location=\'/update/comment?cmtid='+ i['cmtid'] +'\'">修改</button>'
		+'	</td>'
		+'</tr>';
		return res;
	};

	$("body").on('click', '.js-delete', function(event) {
		event.preventDefault();
		var cmtid = $(this).attr('data-comment');
		var $that = $(this);
		$.ajax({
			url: 'delete/comment',
			data: {cmtid: cmtid},
		})
		.done(function() {
			$that.replaceWith('<button type="button" class="btn btn-info js-undo" data-comment="'+cmtid+'">恢复</button>');
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});

	$("body").on('click', '.js-comment', function(event) {
		event.preventDefault();
		var cid = $(this).attr('data-course');
		console.log(cid);
		$.ajax({
			url: '/get/comments',
			data: {cid: cid},
		})
		.done(function(data) {
			var coursedata = $.parseJSON(data);
			coursedata = coursedata["all"];
			console.log(coursedata);
			res = '';
			for (var it in coursedata) {
				res += tpl(coursedata[it]);
			}
			$(".modal tbody").html(res);
			$("#myModal").modal();
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	$("body").on('click', '.js-undo', function(event) {
		event.preventDefault();
		var cmtid = $(this).attr('data-comment');
		var $that = $(this);
		$.ajax({
			url: 'undo/comment',
			data: {cmtid: cmtid},
		})
		.done(function() {
			$that.replaceWith('<button type="button" class="btn btn-info js-delete" data-comment="'+cmtid+'">删除</button>')
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
});