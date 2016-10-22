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
/*! jQuery UI - v1.12.1 - 2016-10-04
* http://jqueryui.com
* Includes: keycode.js, widgets/datepicker.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=s(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout",i,function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,n)}function n(){t.datepicker._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function o(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}t.ui=t.ui||{},t.ui.version="1.12.1",t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.extend(t.ui,{datepicker:{version:"1.12.1"}});var a;t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return o(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var n=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,n,a){var r,l,h,c,u,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),o(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(l=document.documentElement.clientWidth,h=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+c,h/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),a===n&&(a=null))},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,s){var n,a,r,l,h=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):h?"all"===i?t.extend({},h.settings):this._get(h,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),h&&(this._curInst===h&&this._hideDatepicker(),a=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(h,"min"),l=this._getMinMaxDate(h,"max"),o(h.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(h.settings.minDate=this._formatDate(h,r)),null!==l&&void 0!==n.dateFormat&&void 0===n.maxDate&&(h.settings.maxDate=this._formatDate(h,l)),"disabled"in n&&(n.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),h),this._autoSize(h),this._setDate(h,a),this._updateAlternate(h),this._updateDatepicker(h)),void 0)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,s,n=t.datepicker._getInst(e.target);return t.datepicker._get(n,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(i){if(i=i.target||i,"input"!==i.nodeName.toLowerCase()&&(i=t("input",i.parentNode)[0]),!t.datepicker._isDisabledDatepicker(i)&&t.datepicker._lastInput!==i){var s,n,a,r,l,h,c;s=t.datepicker._getInst(i),t.datepicker._curInst&&t.datepicker._curInst!==s&&(t.datepicker._curInst.dpDiv.stop(!0,!0),s&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),n=t.datepicker._get(s,"beforeShow"),a=n?n.apply(i,[i,s]):{},a!==!1&&(o(s.settings,a),s.lastVal=null,t.datepicker._lastInput=i,t.datepicker._setDateFromField(s),t.datepicker._inDialog&&(i.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(i),t.datepicker._pos[1]+=i.offsetHeight),r=!1,t(i).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),l={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(s),l=t.datepicker._checkOffset(s,l,r),s.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),s.inline||(h=t.datepicker._get(s,"showAnim"),c=t.datepicker._get(s,"duration"),s.dpDiv.css("z-index",e(t(i))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?s.dpDiv.show(h,t.datepicker._get(s,"showOptions"),c):s.dpDiv[h||"show"](h?c:null),t.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),t.datepicker._curInst=s))}},_updateDatepicker:function(e){this.maxRows=4,a=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,s=this._getNumberOfMonths(e),o=s[1],r=17,l=e.dpDiv.find("."+this._dayOverClass+" a");l.length>0&&n.apply(l.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),o>1&&e.dpDiv.addClass("ui-datepicker-multi-"+o).css("width",r*o+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.trigger("focus"),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,l=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),h=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>l&&l>n?Math.abs(i.left+n-l):0),i.top-=Math.min(i.top,i.top+o>h&&h>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),s=this._get(a,"duration"),n=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),s,n):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).val(n))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,s){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,o,a,r,l=0,h=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,g=-1,m=-1,_=-1,v=-1,b=!1,y=function(t){var i=e.length>n+1&&e.charAt(n+1)===t;return i&&n++,i},w=function(t){var e=y(t),s="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n="y"===t?s:1,o=RegExp("^\\d{"+n+","+s+"}"),a=i.substring(l).match(o);if(!a)throw"Missing number at position "+l;return l+=a[0].length,parseInt(a[0],10)},k=function(e,s,n){var o=-1,a=t.map(y(e)?n:s,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var s=e[1];return i.substr(l,s.length).toLowerCase()===s.toLowerCase()?(o=e[0],l+=s.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+l},x=function(){if(i.charAt(l)!==e.charAt(n))throw"Unexpected literal at position "+l;l++};for(n=0;e.length>n;n++)if(b)"'"!==e.charAt(n)||y("'")?x():b=!1;else switch(e.charAt(n)){case"d":_=w("d");break;case"D":k("D",u,d);break;case"o":v=w("o");break;case"m":m=w("m");break;case"M":m=k("M",p,f);break;case"y":g=w("y");break;case"@":r=new Date(w("@")),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"'":y("'")?x():b=!0;break;default:x()}if(i.length>l&&(a=i.substr(l),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=g?0:-100)),v>-1)for(m=1,_=v;;){if(o=this._getDaysInMonth(g,m-1),o>=_)break;m++,_-=o}if(r=this._daylightSavingAdjust(new Date(g,m-1,_)),r.getFullYear()!==g||r.getMonth()+1!==m||r.getDate()!==_)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,l=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},h=function(t,e,i){var s=""+e;if(l(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return l(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||l("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=h("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=h("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=h("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=l("y")?e.getFullYear():(10>e.getFullYear()%100?"0":"")+e.getFullYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":l("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),l=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,h=l.exec(i);h;){switch(h[2]||"d"){case"d":case"D":r+=parseInt(h[1],10);break;case"w":case"W":r+=7*parseInt(h[1],10);break;case"m":case"M":a+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}h=l.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).on(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,l,h,c,u,d,p,f,g,m,_,v,b,y,w,k,x,C,D,T,I,M,P,S,N,H,A,z,O,E,W,F,L,R=new Date,Y=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),B=this._get(t,"isRTL"),j=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),X=this._get(t,"stepMonths"),$=1!==U[0]||1!==U[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),J=this._getMinMaxDate(t,"min"),Q=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),Q)for(e=this._daylightSavingAdjust(new Date(Q.getFullYear(),Q.getMonth()-U[0]*U[1]+1,Q.getDate())),e=J&&J>e?J:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-X,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+X,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:Y,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",h=j?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(B?l:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(B?"":l)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),_=this._get(t,"showOtherMonths"),v=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,C=0;U[1]>C;C++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),T=" ui-corner-all",I="",$){if(I+="<div class='ui-datepicker-group",U[1]>1)switch(C){case 0:I+=" ui-datepicker-group-first",T=" ui-corner-"+(B?"right":"left");break;case U[1]-1:I+=" ui-datepicker-group-last",T=" ui-corner-"+(B?"left":"right");break;default:I+=" ui-datepicker-group-middle",T=""}I+="'>"}for(I+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===k?B?o:s:"")+(/all|right/.test(T)&&0===k?B?s:o:"")+this._generateMonthYearHeader(t,Z,te,J,Q,k>0||C>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",M=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)P=(w+c)%7,M+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[P]+"'>"+p[P]+"</span></th>";for(I+=M+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),N=(this._getFirstDayOfMonth(te,Z)-c+7)%7,H=Math.ceil((N+S)/7),A=$?this.maxRows>H?this.maxRows:H:H,this.maxRows=A,z=this._daylightSavingAdjust(new Date(te,Z,1-N)),O=0;A>O;O++){for(I+="<tr>",E=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(z)+"</td>":"",w=0;7>w;w++)W=m?m.apply(t.input?t.input[0]:null,[z]):[!0,""],F=z.getMonth()!==Z,L=F&&!v||!W[0]||J&&J>z||Q&&z>Q,E+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(z.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===z.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!_?"":" "+W[1]+(z.getTime()===G.getTime()?" "+this._currentClass:"")+(z.getTime()===Y.getTime()?" ui-datepicker-today":""))+"'"+(F&&!_||!W[2]?"":" title='"+W[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(F&&!_?"&#xa0;":L?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===Y.getTime()?" ui-state-highlight":"")+(z.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);I+=E+"</tr>"}Z++,Z>11&&(Z=0,te++),I+="</tbody></table>"+($?"</div>"+(U[0]>0&&C===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=I}y+=x}return y+=h,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var l,h,c,u,d,p,f,g,m=this._get(t,"changeMonth"),_=this._get(t,"changeYear"),v=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";
if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(l=s&&s.getFullYear()===i,h=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!l||c>=s.getMonth())&&(!h||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(v||(b+=y+(!o&&m&&_?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!_)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),v&&(b+=(!o&&m&&_?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).on("mousedown",t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.12.1",t.datepicker});
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
