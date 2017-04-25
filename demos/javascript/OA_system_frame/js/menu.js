$(function(){
	$('.tabL li').click(function(e) {
		var myThis = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
		$('.tabR').eq(myThis).removeClass('dn').siblings('.tabR').addClass('dn');
		$('.tabR').eq(myThis).find('dd').removeClass('current');
		$('.tabR').eq(myThis).find('dd').eq(0).addClass('current');
    });
	$('.tabR dd').click(function(e) {
        $(this).closest('.tabR').find('dd').removeClass('current');
		$(this).addClass('current');
    });
});