$(function(){
	function rightDiv(part1){
		$('.family li').eq(part1).mouseenter(function(e){
			var liWidth = $(this).width();
			var divLeft = liWidth + 15;
			var divHeight = $('.family li div').height();
			var emTop = divHeight/2-10;
			$(this).children('div').stop().show(300).css({'left': divLeft + 'px'});
			$(this).children('div').children('em').css({'border-style' : 'dashed solid dashed dashed', 'border-color': 'transparent orange transparent transparent', 'left' : '-20px', 'top': emTop + 'px'});
		}).mouseleave(function(e) {
			$(this).children('div').hide(300);
		});
	}
	rightDiv(0);
	rightDiv(1);
	rightDiv(2);
	rightDiv(3);
	
	function leftDiv(part1){
		$('.family li').eq(part1).mouseenter(function(e){
			var liWidth = $(this).width();
			var divLeft = liWidth + 15;
			var divHeight = $(this).children('div').height();
			var emTop = divHeight/2-10;
			$(this).children('div').show(300).css({'right': divLeft + 'px'});
			$(this).children('div').children('em').css({'border-style' : 'dashed dashed dashed solid', 'border-color': 'transparent transparent transparent orange', 'right' : '-20px', 'top': emTop + 'px'});
		}).mouseleave(function(e) {
			$(this).children('div').hide(300);
		});
	}
	leftDiv(4);
	leftDiv(5);
});

$('.aboutMain1230 li').mouseenter(function(e){
	var numer = $('.aboutMain1230 li').index(this);
	var divLeft = $(this).width() + 15;
	if(numer < 4){	
		$(this).children('div').stop().show().css({'left': divLeft + 'px'});
	}
	if(numer > 3){
		$(this).children('div').stop().show().css({'right': divLeft + 'px'});
	}
}).mouseleave(function(e) {
	$(this).children('div').hide();
});

function rightBox(part1){
	$('.aboutMain1230 li').eq(part1).mouseenter(function(e){
		var liWidth = $(this).width();
		var divLeft = liWidth + 15;
		$(this).children('div').stop().show().css({'left': divLeft + 'px'});
	}).mouseleave(function(e) {
		$(this).children('div').hide();
	});
}
function leftBox(part1){
	$('.aboutMain1230 li').eq(part1).mouseenter(function(e){
		var liWidth = $(this).width();
		var divLeft = liWidth + 15;
		$(this).children('div').stop().show().css({'right': divLeft + 'px'});
	}).mouseleave(function(e) {
		$(this).children('div').hide();
	});
}
rightBox(0);
rightBox(1);
rightBox(2);
rightBox(3);
leftBox(4);
leftBox(5);