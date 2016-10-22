var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
if(w<650){
	var platform = 'mobile';
	var eventType = 'touchend'
}else{
	var platform = 'desktop';
	var eventType = 'click';
}
var cache = {
	full_name:$('#full_name').val(),
	move_date: $('#datepicker').val(),
	from_zip: $('#from_zip').val(),
	to_zip: $('#to_zip').val(),
	address:$('#from_address2').val(),
	email:$('#email').val(),
	card_type:'',
	last_four:'',
	trailer_length:$('#trailer_feet').val(),
	billing_name: '',
	billing_address: ''
}

//Preload images

/////////////// FORM VALIDATION /////////////////
var today = new Date();
//can only use letters
$('.letters-only').on('focus', function(){
	$(this).on('keydown', function(e){
		if(e.which < 65 || e.which > 90){
			if(e.which != 8 && e.which != 46 && e.which !=110 && e.which !=9 && e.which !=32 && e.which !=37 && e.which !=39)//keep delete keys!
				e.preventDefault();
		}
	});
}).on('focusout', function(){
	$(this).off('keydown');
});
//can only enter numbers
$('.numbers-only').on('focus', function(){
	$(this).on('keydown', function(e){
		if(e.which < 48 || e.which > 57){
			if(e.which < 96 || e.which >105){
				if(e.which != 8 && e.which != 46 && e.which !=110 && e.which !=9 && e.which !=37 && e.which !=39)//keep delete keys!
					e.preventDefault();
			}
		}
	});
}).on('focusout', function(){
	$(this).off('keydown');
});

var move_zipValidated = true;
var move_addressValidated =false;
var move_cityValidated = true;
var move_stateValidated =true;
function checkMovingForm(){
	if(move_zipValidated & move_cityValidated & move_addressValidated & move_stateValidated){
		$('#step-box-2 .step-button').removeClass('disabled');
	}else{
		$('#step-box-2 .step-button').addClass('disabled');
	}
}
var addressRegEx = /[A-Za-z0-9]{2,} [A-Za-z0-9]{2,}/;
$('#move-from input').on('focus', function(){
	$this = $(this);
	$this.removeClass('error').next().hide();
	
	if($this.hasClass('address')){
		$(this).on('keyup focusout',function(){
			var value = $(this).val();
			if(addressRegEx.test(value)){
				move_addressValidated=true;
				
			}else{
				move_addressValidated=false;
			}
			checkMovingForm();
		});
	}else if($this.hasClass('city')){
		$(this).on('keydown',function(e){
			
		}).on('keyup focusout',function(){
			var value = $(this).val();
			if(value.length >1){
				move_cityValidated=true;
				checkMovingForm();
			}else{
				move_cityValidated=false;
			}
			checkMovingForm();
		});
	}else if($this.hasClass('state')){
		$(this).on('keyup focusout',function(){
			var value = $(this).val();
			if(value.length==2){
				move_stateValidated = true;
				checkMovingForm();			
			}else{
				move_stateValidated=false;
			}
			checkMovingForm();
		});
	}else if($this.hasClass('zip')){
		$(this).on('keyup focusout',function(){
			var value = $(this).val();
			if(value.length==5){
				move_zipValidated = true;
				cache.move_from = value;
				checkMovingForm();		
			}else{
				move_zipValidated=false;
			}
			checkMovingForm();
		});
	}

}).on('focusout',function(e){
	$this = $(this);
	if($this.attr('required')){
		if($this.val()==''){
			console.log('test')
			$(this).addClass('error');
		}
	}
	checkMovingForm();
	$this.off('keyup keydown');
});
var verify_nameValidated = true;
var verify_phoneValidated = true;
var verify_emailValidated = true;
var verify_addressValidated = true;
var verify_moveToAddress = true;
var verify_dateValidated = true;
var verify_trailerValidated = true;

var phoneRegEx = /\(\d{3}\) *(\d{3} *- *\d{4})/;
var emailRegEx = /[a-zA-Z0-9.!#$%&'*+-\/=?^_`{|}~]+@[a-z0-9-]+.\w+/;
function checkVerifyForm(){
	console.log(verify_nameValidated, verify_phoneValidated, verify_emailValidated, verify_addressValidated, verify_moveToAddress, verify_dateValidated, verify_trailerValidated);
	if(verify_moveToAddress && verify_trailerValidated && verify_dateValidated && verify_addressValidated && verify_emailValidated && verify_phoneValidated && verify_nameValidated){
		$('#step-box-3 .step-button').removeClass('disabled');
	}else{
		$('#step-box-3 .step-button').addClass('disabled');
	}
}
$('#verify-form input').on('focus', function(){
	var input = $(this);
	var value = input.val();
	input.removeClass('error');
	if(input.hasClass('phone')){
		input.on('keyup', function(e){
			$(this).val($(this).val().replace(/^\(*(\d{3})\)*(\d{3})(\d{4})$/, "($1) $2 - $3"));
		});
	}
}).on('focusout keyup', function(e){
	var input = $(this);
	resizeInput(input);
	var value = input.val();
	if(e.which !== 8) {
		if(input.hasClass('name')) {
			if(value != ''){
				if(/[A-Za-z]{2,} [A-Za-z]{2,}/.test(value))
					verify_nameValidated = true;
			}else{
				verify_nameValidated = false;
			}
			checkVerifyForm();
		}else if(input.hasClass('phone')) {
			
			if(phoneRegEx.test(value)){
				verify_phoneValidated = true;
			}else{
				input.addClass('error');
				verify_phoneValidated = false;
			}
			checkVerifyForm();
		}else if(input.hasClass('email')){
			
			if(emailRegEx.test(value))
				verify_emailValidated = true;
			else{
				input.addClass('error');
				verify_emailValidated = false;
			}
			checkVerifyForm();
		}else if(input.hasClass('address')){
			if(value != ''){
				verify_addressValidated = true;
			}else{
				verify_addressValidated = false;
			}
			verify_addressValidated = true;
			checkVerifyForm();
		}else if(input.hasClass('move-address')){
			if(value != '')
				verify_moveToAddressValidated = true;
			else
				verify_moveToAddressValidated = false;
			checkVerifyForm();
		}else if(input.hasClass('drop-off-date')){
			var pattern = /\d{2}\/\d{2}\/\d{4}/;
			if(pattern.test(value))
				verify_dateValidated = true;
			else{
				verify_dateValidated = false;
				input.addClass('error');
			}
			checkVerifyForm();
		}else if(input.hasClass('trailer')){
			if(value !=''){
				if(parseInt(input.val()) > 56){
					input.val(56);
				}
				verify_trailerValidated = true;
			}else {
				verify_trailerValidated = false;
			}
			checkVerifyForm();
		}
	}
});
$('#terms').on(eventType, function(){
	if(cc_termsValidated){
		cc_termsValidated=false;
	}else{
		cc_termsValidated = true;
	}
	checkCCForm();
	//console.log(checkCCForm());
});
$('#credit-card').on('focus', function(){
	$(this).on('keyup',function(e){
		var value = $(this).val();
		var numVal = parseInt(value);
		if(value.length ==0){
			$('.credit-cards .active').removeClass('active');
		}else{
			//credit card formatting
			if(value.indexOf('4')==0){
				$('.credit-cards .visa').addClass('active');
				$(this).attr('maxlength',19);
				if(value.length==5 && value.charAt(4)!=' '){
					$(this).val(value.substring(0,4)+' '+(e.keyCode-48));
				}
				if(value.length==10 && value.charAt(9)!=' '){
					$(this).val(value.substring(0,9)+' '+(e.keyCode-48));
				}
				if(value.length==15 && value.charAt(14)!=' '){
					$(this).val(value.substring(0,14)+' '+(e.keyCode-48));
				}
				cache.card_type="visa";
			}else if(value.indexOf('34')==0 || value.indexOf('37')==0){
				$('.credit-cards .amex').addClass('active');
				$(this).attr('maxlength',17);
				if(value.length==5 && value.charAt(4)!=' '){
					$(this).val(value.substring(0,4)+' '+(e.keyCode-48));
				}
				if(value.length==12 && value.charAt(11)!=' '){
					$(this).val(value.substring(0,11)+' '+(e.keyCode-48));
				}
				cache.card_type="amex";
			}else if(value.indexOf('5')==0 && value.length>1){
				var firstTwo = parseInt(value.substring(0,2));
				if(firstTwo >=51 && firstTwo <=55){
					$('.credit-cards .mc').addClass('active');
					$(this).attr('maxlength',19);
					if(value.length==5 && value.charAt(4)!=' '){
						$(this).val(value.substring(0,4)+' '+(e.keyCode-48));
					}
					if(value.length==10 && value.charAt(9)!=' '){
						$(this).val(value.substring(0,9)+' '+(e.keyCode-48));
					}
					if(value.length==15 && value.charAt(14)!=' '){
						$(this).val(value.substring(0,14)+' '+(e.keyCode-48));
					}
					cache.card_type="mc";
				}else{
					$('.credit-cards .active').removeClass('active');
				}
			}else if(value.indexOf('6')==0){
				var firstSix = parseInt(value.substring(0,7));
				if(firstSix >=644 && firstSix <=649 || firstSix==65 || firstSix == 6011|| firstSix>=622126 && firstSix <= 622925){
					$('.credit-cards .disc').addClass('active');
					$(this).attr('maxlength',19);
					if(value.length==5 && value.charAt(4)!=' '){
						$(this).val(value.substring(0,4)+' '+(e.keyCode-48));
					}
					if(value.length==10 && value.charAt(9)!=' '){
						$(this).val(value.substring(0,9)+' '+(e.keyCode-48));
					}
					if(value.length==15 && value.charAt(14)!=' '){
						$(this).val(value.substring(0,14)+' '+(e.keyCode-48));
					}
					cache.card_type="disc";
				}else{
					$('.credit-cards .active').removeClass('active');
				}
			}else{
				cache.card_type="";
			}
		}
	});
}).on('focusout',function(){
	$(this).off('keyup');
});
cc_fnameValidated =false;
cc_lnameValidated = false;
cc_cardValidated = false;
cc_expValidated = false;
cc_cvvValidated = false;
cc_newAddressValidated = false;
cc_newCityValidated = false;
cc_newStateValidated = false;
cc_newZipValidated = false;
cc_termsValidated = false;
$('#cc-form input').on('focus',function(){
	$(this).removeClass('error');
}).on('focusout', function(){
	var value = $(this).val();
	if($(this).attr('id')=='fname'){
		if(value != ''){
			cc_fnameValidated=true;
		}else{
			cc_fnameValidated=false;
			$(this).addClass('error');
			$('.step-button.step-4').removeClass('disabled');
		}
	}else if($(this).attr('id')=='lname'){
		if(value != ''){
			cc_lnameValidated=true;
		}else{
			cc_lnameValidated=false;
			$(this).addClass('error');
			$('.step-button.step-4').removeClass('disabled');
		}
	}else if($(this).attr('id')=='credit-card'){
		if(value != ''){
			cc_cardValidated=true;
		}else{
			cc_cardValidated=false;
			$(this).addClass('error');
			$('.step-button.step-4').removeClass('disabled');
		}
	}else if($(this).attr('id')=='exp'){
		if(value != ''){
			cc_expValidated=true;
		}else{
			cc_expValidated=false;
			$(this).addClass('error');
			$('.step-button.step-4').removeClass('disabled');
		}
	}else if($(this).attr('id')=='cvv'){
		if(value != ''){
			cc_cvvValidated=true;
		}else{
			cc_cvvValidated=false;
			$(this).addClass('error');
			$('.step-button.step-4').removeClass('disabled');
		}
	}else if($(this).attr('id') == 'new-address'){
		if(value != '')
			cc_newAddressValidated = true;
		else
			cc_newAddressValidated = false;
	}else if($(this).attr('id') == 'new-city'){
		if(value != '')
			cc_newCityValidated = true;
		else
			cc_newCityValidated = false;
	}else if($(this).attr('id')=='new-state'){
		if(value != '')
			cc_newStateValidated = true;
		else
			cc_newStateValidated = false;
	}else if($(this).attr('id')=='new-zip'){
		if(value != '')
			cc_newZipValidated = true;
		else
			cc_newZipValidated = false;
	}
	//terms checkbox handled by other event.
	checkCCForm();
});

//// HELPER FUNCTIONS //////
function checkCCForm(){
	if(cc_fnameValidated && cc_lnameValidated && cc_cardValidated && cc_expValidated && cc_cvvValidated && cc_termsValidated){
		if(newAddress){
			if(cc_newAddressValidated && cc_newCityValidated & cc_newStateValidated && cc_newZipValidated){
				$('.step-button.step-4').removeClass('disabled');
				return true;
			}else{
				$('.step-button.step-4').addClass('disabled');
				return false;
			}
		}else{
			$('.step-button.step-4').removeClass('disabled');
			return true;
		}
	}else{
		$('.step-button.step-4').addClass('disabled');
		return false;
	}
}


function validate(input,type){
	var value = input.val();
	var pattern = /\d{2}\/\d{2}\/\d{4}/;
	if(type=='date'){
		var thisDate = new Date(Date.parse(value));
		if(pattern.test(value)){
			if(!isDateAfter(thisDate)){
				input.siblings('.error-msg-holder').show().children('.error-msg').html('Date can not be in the past.');
				input.parent().siblings('.step-button').addClass('disabled');
				return false;
			}else{
				input.siblings('.error-msg-holder').hide();
				input.removeClass('error');
				input.parent().siblings('.step-button').removeClass('disabled');
				return true;
			}
		}else {
			input.siblings('.error-msg-holder').show().children('.error-msg').html('Date format must be mm/dd/yyyy.');
			input.parent().siblings('.step-button').addClass('disabled');
			return false;
		}
	}
}
function isDateAfter(date){
	if(date.getFullYear() > today.getFullYear()){
		return true;
	}else if(date.getFullYear() == today.getFullYear()){
		if(date.getMonth()>today.getMonth()){
			return true;
		}else if(date.getMonth()==today.getMonth()){
			if(date.getDate()>=today.getDate()){
				return true;
			}
		}
	}
	return false;
}
function formatDate(date){
	//formats as mm/dd/yyyy
	var formatDate = date.split('/');
		if(formatDate[0].length<2){
			formatDate[0]= '0'+formatDate[0];
		}
		if(formatDate[1].length<2){
			formatDate[1]='0'+formatDate[1];
		}
		if(formatDate[2].length<4){
			formatDate[2]='20'+formatDate[2];
		}
		return formatDate[0]+'/'+formatDate[1]+'/'+formatDate[2];
}
///////////////// END VALIDATION ///////////////////