<?php ?>
<!DOCTYPE html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
		<meta http-equiv="cache-control" content="max-age=0">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="pragma" content="no-cache">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title> </title>
		<meta name="description" content="">
		<meta name="robots" content="noindex,follow">
		<link rel="stylesheet" type="text/css" href="css/style.all.css" inline>
	</head>
	<body>
		<header>
			<div id="logo"></div>
			<div id="call-us">
				<span class="icon"></span>
				<span class="uload-number">(888) ULOAD-US</span>
				<a href="tel:888-856-2387"></a>
			</div>
		</header>
		<div id="wrapper">
			<div id="main">
				<div id="step-progress">
					<div class="step completed">
						<div class="circle">1</div>
						<div class="step-text">Move Requirements</div>
					</div>
					<div class="step current middle">
						<div class="circle">2</div>
						<div class="step-text">Move Information</div>
					</div>
					<div class="step incomplete">
						<div class="circle">3</div>
						<div class="step-text">Checkout</div>
					</div>
					<div class="clear"></div>
				</div>
				<div class="content">
					<img class="shadow" src="img/content-shadow.png" />
					<div class="shadow-wrapper">
						<div class="step-box on" id="step-box-1">
							<div class="instructions">Approximate Move Date</div>
							<div id="move-date">
								<div class="error-message">Please select a date first.</div>
								<input id="datepicker" class="date-format" type="text" name="move-date" value="" placeholder="Moving Date" required maxlength="10" readonly>
							</div>
							<div class="step-button step-1 disabled"><img src="img/cta-shadow.png" alt="cta-shadow"/><div class="inner">CONTINUE</div></div>
						</div>
						<div class="step-box off" id="step-box-2">
							<div class="instructions">Check Service Availability in <span>Santa Monica, CA</span></div>
							<form id="move-from">
								<div class="error-message">All Fields Required.</div>
								<div class="address-holder">
									<input type="text" class="address" name="address" placeholder="Address" required>
								</div>
								<div class="apt-holder">
									<input type="text" class="apt" name="apt" placeholder="Apt/Suite" maxlength="6">	
								</div>
								<div class="city-holder">
									<input type="text" class="city letters-only" name="city" placeholder="City" required maxlength="30">	
								</div>
								<div class="state-holder">
									<input type="text" class="state letters-only" name="state" class="letters-only" placeholder="State" maxlength="2" required>
								</div>
								<div class="zip-holder">
									<input type="text" class="zip numbers-only" name="zip" class="numbers-only" placeholder="Zip" maxlength='5' required>
								</div>
								<div class="clear"></div>
							</form>
							<div class="step-button step-2 disabled clear"><img src="img/cta-shadow.png" alt="cta-shadow"/><div class="inner">NEXT</div></div>
						</div>
						<div class="step-box off" id="step-box-3">
							<div class="wrapper">
								<div class="instructions">Verify your move info: <span id="reference-text">Reference #: <span class="reference">22518</span></span></div>
								<form id="verify-form">
									<span id="hidden"></span>
									<div class="form top-column">
										<input type="text" class="name" name="name" placeholder='Full Name' value="Benjamin Grossblatt"> <span class="separator">/</span>
										<input type="text" class="phone" maxlength="16" placeholder='Phone Number' name="phone" value="(999) 999 - 9999"> <span class="separator second">/</span>
										<input type="text" class="email" placeholder="Email Address" name="email" value="email@email.com" required>
									</div>
									<div class="form">
										<div class="label">Moving From: </div>
										<div class="input">
											<input type="text" class="from-address" name="from-address" value="123 Street Rd., Apt 201, Townville, CA 90401" placeholder="Address" required>
											<img class="arrow" src="img/arrow-icon.svg" alt="arrow-icon" />
											<input type="text" class="move-address" name="move-address" value="Portland, OR" required>
										</div>
										<div class="clear"></div>
									</div>
									<div class="form">
										Approx. Drop-off Date: <input type="text" maxlength="14" class="drop-off-date date-format" name="drop-off-date" value="12 / 30 / 2016" required readonly>
									</div>
									<div class="form">
										Trailer Space: <input type="text" class="trailer numbers-only" maxlength="2" name="trailer" value="7" required>' of Trailer Length <span id="trailer-span">- Only pay for the space you use!</span>
									</div>
								</form>
								<div class="nonform">
									Adjusted rate per foot: <span class="book">+/- $<span id="rate-per-foot">123</span>/ft</span>
								</div>
								<div class="nonform">
									Approx. Transit Time: <span id="transit-time" class="book">4 to 6 <span id="biz">BUSINESS</span> DAYS</span>
								</div>
								<div class="nonform">
									Driver, Taxes, & Fuel: <span class="heavy"><b>INCLUDED</b></span>
								</div>
								<div class="nonform">
									Door-to-Door Delivery: <span class="heavy"><b>INCLUDED</b></span>
								</div>
								<div class="divider"></div>
								<div id="total">
									<div id="sub-heading">TOTAL ESTIMATE</div>
									<div id="cost">$2,646.90</div>
									<div id="disclaimer">Price based on information provided and may be widthdrawn if not reserved.</div>
									<div class="step-button step-3"><img src="img/cta-shadow.png" alt="cta-shadow"/><div class="inner">VERIFY</div></div>
								</div>
							</div>
						</div>
						<div class="step-box off" id="step-box-4">
							<div class="instructions">Checkout <span id="reference-text">Reference #: <span class="reference">22518</span></span></div>
							<div class="divider"></div>
							<div id="cta" class="title">CARD INFORMATION</div>
							<form id="cc-form">
								<div class="form-wrapper">
									<input type="text" id="fname" name="fname" class="letters-only" placeholder="First Name" required>
									<input type="text" id="lname" name="lname" class="letters-only" placeholder="Last Name" required >
									<div class="clear">
									<input type="text" id="credit-card" name="card" maxlength="21" class="numbers-only" placeholder="Credit Card Number" required></div>
									<input type="text" id="exp" name="exp" maxlength='5' class="date-format" placeholder="Exp. Date" required>
									<input type="text" id="cvv" name="cvv" class="numbers-only" maxlength="4" placeholder="CVV/CVC Code" required>
									<div class="credit-cards">
										<div class="visa card"></div>
										<div class="mc card"></div>
										<div class="amex card"></div>
										<div class="disc card"></div>
										<div class="clear"></div>
									</div>
									<div id="billing-address">
										<span class="text">Billing Address same as </span>
										<span id="from-address-radio">
										<input type="radio" name="billing-address" value="From Address" checked/> From Address </span>
										<span id="new-address-radio">
										<input type="radio" name="billing-address" value="New Address"> New Address</span>
									</div>
									<div id="new-address">
										<div id="new-address-title" class="title">NEW ADDRESS</div>
										<input type="text" class="address" name="new-address" placeholder="Address">
										<input type="text" class="apt" name="new-apt" placeholder="Apt/Suite"><br/>
										<input type="text" class="city" name="new-city" placeholder="City">
										<input type="text" class="state" name="new-state" placeholder="State" >
										<input type="text" class="zip" name="new-zip" placeholder="Zip">
									</div>
								</div>
								<div class="divider two"></div>
								<div id="final">
									<div id="terms-box">
										<div class="checkbox">
											<div class="squaredTwo">
												<input type="checkbox" id="terms" name="terms" value="agree" required/><label for="terms"></label> 
											</div>
										</div>
										<div class="label">
											<span>I have read the <a href='#'>Terms & Conditions</a> of this estimate.</span>
										</div>
									</div>
									<div id="deposit">
										<div id="deposit-due"> DEPOSIT DUE TODAY <div class="icon"></div></div>
										<div id="deposit-total">
											$50.00
										</div>
										<div class="step-button step-4 disabled"><img src="img/cta-shadow.png" alt="cta-shadow"/><div class="inner">RESERVE NOW</div></div>

									</div>
									<div class="clear"></div>
								</div>
							</form>
						</div>
						<div class="step-box off receipt" id="step-box-5">
							<div class="instructions">Thank You!</div>
							<div class="print-btn"></div>
							<div class="message">
								Your trailer has been reserved. Your reference number is <span class="reference"><strong>22518</strong></span>. If you have any questions, give us a call at <strong>(888) 856 - 2387</strong>.
							</div>
							<div class="divider"></div>
							<div class="bottom">
								<div class="order-details">
									<div id="grey-box">
										<div class="title">Order Details</div>
										<div class="info-box" id="card-details">
											<div class="heading">Card Details</div>
											<div class="name">Benjamin Grossblatt</div>
											<div class="cc-card visa">**** **** **** 1234</div>	
										</div>
										<div class="info-box" id="billing-details">
											<div class="heading">Billing Details</div>
											<div class="streetaddress">829 Broadway, Apt 219<br/>Santa Monica, CA 90401</div>
										</div>
										<div class="divider"></div>
										<div class="info-box" id="email-details">
											<div class="heading">Email Address</div>
											<div class="email">ben@equatemedia.com</div>
										</div>
										<div class="info-box" id="charged-details">
											<div class="heading">Charged Today<img class="icon" src="img/info-icon.svg"/><div class="popup">Your $50 deposit is non-refundable.</div></div>
											<div class="deposit">$50.00</div>
											
										</div>
										<div class="clear"></div>
									</div>
									<div class="estimate-balance">Estimated Balance Due <span class="total">$2,596.90</span> </div>
								</div>
								<div class="service-details">
									<h2>SERVICE DETAILS</h2>
									<div id="trailer-space">
										<div class="title">Trailer Space</div>
										<div class="trailer"><span class="feet">7</span>' of Trailer Length</div>
										<div id="trailer-length">
											<div id="feet-container">
												<div class="foot"></div>
												<div class="foot"></div>
												<div class="foot"></div>
												<div class="foot"></div>
												<div class="foot"></div>
												<div class="foot"></div>
												<div class="foot"></div>
											</div>
										</div>
									</div>
									<div class="drop-off">
										<div id='drop-off-1'>
											<div class="title">Drop Off Location</div>
											<div class="drop-off-address">
												829 Broadway, Apt 219
												Santa Monica, CA 90401
											</div>
										</div>
										<div id="drop-off-2">
											<div class="title">Drop-off Date</div>
											<div class="drop-off-date">
												12/30/2016
											</div>
										</div>
									</div>
								</div>
								<div class="clear"></div>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div id="overlay"></div>
		<div class="modal" id="info">
			<div class="modal-title">Terms & Conditions</div>
			<div id="close-btn"><div class="pylon one"></div><div class="pylon two"></div></div>
			<div class="modal-content">
				<div></div>
			</div>
		</div>
		<footer>
			<div class="content">
				<div id="footer-top">
					<div id="footer-logo"></div>

					<div id="footer-menu">
						<div id="fb-link" class="footer-icons desktop"></div>
						<div id="twt-link" class="footer-icons desktop"></div>
						
						<ul>
							<li class="menu"><a href="#" target="_blank">Privacy Policy</a></li>
							<li class="menu"><span class="divider"></span> <a href="#" target="_blank">Terms of Use</a></li>
							<li class="menu"><span class="divider"></span> <a href="#" target="_blank">Contact Us</a></li>
							<li class="menu"><span class="divider"></span> <a href="#" target="_blank">FAQ</a></li>
							<div class="clear"></div>
						</ul>
						<div class="clear"></div>
					</div>
					<div id="twt-link" class="footer-icons mobile"></div>
					<div id="fb-link" class="footer-icons mobile"></div>
				</div>
				<div id="footer-bottom">
					<span id="copyright">&copy;2016 ULoad&trade;. All rights reserved. 631 N. Stephanie St., Ste 330 Henderson, NV 89014</span>
					<span class="uload-number"><a href="tel:888-856-2387">888-856-2387</a></span>
				</div>
			</div>
		</footer>
		<div id="datepick-container"></div>
		  	<!-- inject:js -->

			<!-- endinject -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="js/all.js"></script>
	</body>
</html>