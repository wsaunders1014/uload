var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
if(w<650){
	var platform = 'mobile';
	var eventType = 'touchend'
}else{
	var platform = 'desktop';
	var eventType = 'click';
}

$(document).ready(function(){
	mobilize();
	$( "#datepicker" ).datepicker({
		navigationAsDateFormat: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		minDate:0,
		dateFormat: "mm/dd/yy",
		onSelect:function(date, inst){
			$('.date.error-msg').addClass('hide');
			$(this).removeClass('error').siblings('.error-msg-holder').hide();
			$('#step-box-1 .step-button').removeClass('disabled').prev().children('.error-message').hide();
		}
	});
	$( "input.drop-off-date" ).datepicker({
		navigationAsDateFormat: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		minDate:0,
		dateFormat: "mm/dd/yy",
		onSelect:function(date, inst){
			$('.date.error-msg').addClass('hide');
			$(this).removeClass('error').siblings('.error-msg-holder').hide();
			$('#step-box-1 .step-button').removeClass('disabled');
		}
	});
	$('#main .step-button').on(eventType, function(){
		var $this = $(this);
		var disabled = $this.hasClass('disabled');
		//if(!$this.hasClass('disabled')){
			$this.parents('.step-box').hide().next().show();
		//}
		if($this.hasClass('step-1')){
			if(!disabled)
				$this.parents('.step-box').hide().next().show();
			else
				$this.prev().children('.error-message').show();
		}else if($this.hasClass('step-2')){
			if(!disabled)
				$this.parents('.step-box').hide().next().show();
			else
				$this.prev().children('.error-message').show();
		}else if($this.hasClass('step-3')){
			$this.parents('.step-box').hide().next().show();
			$('.current').addClass('completed').removeClass('current');
			$('.incomplete').addClass('current').removeClass('incomplete');
		}else if($this.hasClass('step-4')) {
			$this.parents('.step-box').hide().next().show();
		}else {
			$this.parents('.step-box').hide().next().show();
		}
	});
	var newAddress= false;
	$('#billing-address input[type="radio"]').eq(1).on(eventType, function(){
		if(newAddress==false){
			$('#new-address').show();
			newAddress=true;
			checkCCForm();
		}
	});
	$('#billing-address input[type="radio"]').eq(0).on(eventType,function(){
		newAddress=false;
		$('#new-address').hide();
		checkCCForm();
	});
	$('#overlay').on(eventType, function(){
		hideModal();
	});
	$('#overlay').on('touchmove',function(e){
		e.stopPropagation();
		e.preventDefault();
	});
	$('.modal-content').on('touchstart touchmove touchend',function(e){
		e.stopPropagation();
	});
	$('#close-btn').on(eventType, function(){
		hideModal();
	});
	$('#terms-box a').on(eventType, function(){
		$('#overlay').fadeIn(500);
		$.get('terms.html').done(function(data){
			$('#info .modal-content div').html(data);
			$('#info').fadeIn(500);
			var modalW = $('.modal#info').width();
			var modalH = $('.modal#info').height();
			$('.modal#info').css({left:((w-modalW)/2)+'px',top:((h-modalH)/2)+'px'});
			$('#wrapper').addClass('disable-scroll');
			$('body').addClass('fixed');
		});
	});
	$('#deposit-due').on(eventType, function(){
	});
	
	$('#charged-details .heading img').hover(function(){
		$('.popup').show();
	},function(){
		$('.popup').hide();
	});
	$('#charged-details .heading img').on('touchstart', function(){
		$('.popup').show();
		window.setTimeout(function(){
			$('.popup').hide();
		},1500);
	});

	function hideModal(){
		$('.modal').fadeOut(500);
		$('#overlay').fadeOut(500);
		$('#wrapper').removeClass();
		$('body').removeClass('fixed');
	}
	$(window).resize(function(){
		w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if(w<650){
			platform = 'mobile';
			eventType = 'touchstart'
		}else{
			platform = 'desktop';
			eventType = 'click';
		}
		mobilize();
	});
	function mobilize(){
		if(platform==='mobile'){
			$('.apt').attr('placeholder','Apt');
			$('#biz').html('BIZ');
		}else{
			$('.apt').attr('placeholder','Apt/Suite');
			$('#biz').html('BUSINESS');
		}
	}
});

