var newAddress= false;
$(document).ready(function(){
	initialize();
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
			cache.move_date = date;
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
	function step1Complete(){

	}
	$('#main .step-button').on(eventType, function(){
		var $this = $(this);
		var disabled = $this.hasClass('disabled');
		//if(!$this.hasClass('disabled')){
			//$this.parents('.step-box').hide().next().show();
		//}
		if($this.hasClass('step-1')){
			if(!disabled){
				$.post('/validate/validate/movedate',{move_date:cache.move_date})
				.success(function(res){
					if(res==='true')
						$this.parents('.step-box').hide().next().show();
						if(addressRegEx.test($('#from_address').val())){
							move_addressValidated = true;
							checkMovingForm();
						}
						checkMovingForm();
				});
			}else
				$this.prev().children('.error-message').show();
		}else if($this.hasClass('step-2')){
			if(!disabled)
				$.post('/validate/validate/from-zipcode',{from_zip:cache.from_zip})
				.success(function(res){
					if(res=='true'){
						var form_data = $('#move-from').serialize();
						$.post('/from-address', form_data).success(function(res){
							var res = $.parseJSON(res);
							if(res.from_building_type !='')
								cache.address= res.from_address + " "+res.from_building_type+", APT "+res.from_city+', '+res.from_state+' '+res.from_zip;
							else
								cache.address= res.from_address + ", "+res.from_city+', '+res.from_state+' '+res.from_zip;
							$('#from_address2').val(cache.address);
							resizeInput($('#from_address2'));
							$this.parents('.step-box').hide().next().show();
						});
					}else{
						console.log('validation failed')
						$this.prev().children('.error-message').show();
					}
				});
			else
				$this.prev().children('.error-message').show();
		}else if($this.hasClass('step-3')){
			if(!disabled){
				$.post('/save-move-info', $('#verify-form').serialize())
				.success(function(res){
					var res = $.parseJSON(res);
					if(res.result == 'success'){
						$this.parents('.step-box').hide().next().show();
						$('.current').addClass('completed').removeClass('current');
						$('.incomplete').addClass('current').removeClass('incomplete');
					}
				});
			}
		}else if($this.hasClass('step-4')) {
			if(!disabled){
				cache.billing_name = $('#fname').val() +' '+$('#lname').val();
				cache.billing_address = cache.address;
				if(newAddress){
					cache.billing_address = $('#new-address').val()+' '+$('#new-apt').val()+', '+$('#new-city').val()+', '+$('#new-state').val()+' '+$('#new-zip').val();
				}
				var cc =$('#credit-card').val();
				cache.last_four = cc.slice(cc.length-4,cc.length);
				console.log(cache);
				//if New Address is checked use that info, else use verify info;
				/* $.post('checkout', data).success(function(){
					$this.parents('.step-box').hide().next().show();
					$('.current').addClass('completed').removeClass('current');
				 });*/
				$('.receipt .name').html(cache.billing_name);
				$('.receipt .cc-card').html('**** **** **** '+cache.last_four).addClass(cache.card_type);
				$('.receipt .streetaddress').html(cache.billing_address);
				$('.receipt .email').html(cache.email);
				$('.receipt .feet').html(cache.trailer_length);
				$('.receipt .drop-off-date').html(cache.move_date);
				$('.receipt .drop-off-address').html(cache.address);
				$this.parents('.step-box').hide().next().show();
				$('.current').addClass('completed').removeClass('current');
			}
			
		}else {
			//$this.parents('.step-box').hide().next().show();
		}
	});
	$('.print-btn').on(eventType, function(){
		window.print();
	});

	$('#billing-address input[type="radio"]').eq(1).on(eventType, function(){
		if(newAddress==false){
			$('#new-address-container').show();
			newAddress=true;
			checkCCForm();
		}
	});
	$('#billing-address input[type="radio"]').eq(0).on(eventType,function(){
		newAddress=false;
		$('#new-address-container').hide();
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
	function initialize(){
		$('#phone').val(formatPhoneNumber($('#phone').val()));
		$('#verify-form input').not('input[type=hidden]').each(function(){
			resizeInput($(this));
		});
	}
	function formatPhoneNumber(number){
		number = number+'';
		number = number.split('');
		return '('+number[0]+number[1]+number[2]+') '+number[3]+number[4]+number[5]+' - '+number[6]+number[7]+number[8]+number[9];
	}
	
});
function resizeInput(input){
	var value = input.val();
	var id= input.attr('id');
	$('.hidden.'+id).html(value);
	var plus = (id=='email') ? 11:8;
	var inputW = $('.hidden.'+id).innerWidth()+plus;
	input.css({width:inputW});
}
