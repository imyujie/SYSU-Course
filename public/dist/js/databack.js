$(function() {
	var tpl = function(i) {
		var res =  ''
		+'<tr>'
		+'	<td>' + i.cid + '</td>'
		+'	<td>' + i.name + '</td>'
		+'	<td>' + i.category + '</td>'
		+'	<td>' + i.status + '</td>'
		+'	<td>' + i.sums + '</td>'
		+'	<td>' + i.count + '</td>'
		+'	<td>' + i.teacher + '</td>'
		+'	<td><button type="button" class="btn btn-info js-comment" data-toggle="modal" data-target="#myModal" data-course={{ i.cid }}>评论</button></td>'
		+'	<td>';
		if (+i.status === 0) {
			res += '		<button type="button" class="btn btn-info" data-course="'+i.cid+'" onclick="window.location=\'/delete/course?cid='+i.cid+'\'">删除</button>';
		} else {
			res += '		<button type="button" class="btn btn-info" data-course="'+i.cid+'" onclick="window.location=\'/undo/course?cid='+i.cid+'\'">恢复</button>';
		};
		res += ''
		+'		<button type="button" class="btn btn-info" data-course="{{ i.cid }}" onclick="window.location='/update/course?cid={{ i.cid }}'">修改</button>'
		+'	</td>'
		+'</tr>';
		return res;
	}

	$("body").on('click', '.js-delete', function(event) {
		event.preventDefault();
		var cmtid = $(this).attr('data-comment');
		$.ajax({
			url: 'delete/comment',
			data: {cmtid: cmtid},
		})
		.done(function() {
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
		$.ajax({
			url: '/getcomments',
			data: {cid: cid},
		})
		.done(function(data) {
			var coursedata = $.parseJSON(data);
			$(".modal tbody").html(tpl(coursedata));
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
});