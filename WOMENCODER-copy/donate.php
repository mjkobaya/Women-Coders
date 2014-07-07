<?php
require 'lib/Stripe.php';
 
if ($_POST) {
Stripe::setApiKey("sk_test_4DdntERtMdzABC2b2mqLyVEr");
$error = '';
$success = '';
try {
	if (!isset($_POST['stripeToken']))
	throw new Exception("The Stripe Token was not generated correctly");
	
	$amount = $_POST['amount']*100;
	Stripe_Charge::create(array(
		"amount" => $amount,
		"currency" => "usd",
		"card" => $_POST['stripeToken']));
	
	$success = 'Your payment was successful.';
}
catch (Exception $e) {
	$error = $e->getMessage();
}
}
?>
 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Donate</title>
    <meta name="viewport" content="width=device-width,  minimum-scale=1,  maximum-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

<!-- Favicon 
	================================================== -->
	<link rel="shortcut icon" href="favicon.ico"/>
	
<!--Bootstrap-->
	<link href="css/bootstrap.min.css" rel="stylesheet"/>
	

<!--font-awesome-->
	<link rel="stylesheet" href="css/font-awesome.css"/>

<!-- Theme Specific CSS -->
	<link href="css/animate.css" rel="stylesheet" media="screen"/>	
	<link rel="stylesheet" href="css/owl.carousel.css"/>	
	<link href="css/venobox/venobox.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" media="screen"/>
	<link href="css/responsive.css" rel="stylesheet" media="screen"/>
	<link href="css/style-apply.css" rel="stylesheet" media="screen">  
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen"> 
	
<!-- Scripts -->

	<script type="text/javascript" src="https://js.stripe.com/v1/"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script type="text/javascript">
	// this identifies your website in the createToken call below
	Stripe.setPublishableKey('pk_test_8nGUirWnlV2wDty3TbNUc8eA');
 
	function stripeResponseHandler(status, response) {
		if (response.error) {
		// re-enable the submit button
		$('.submit-button').removeAttr("disabled");
		// show the errors on the form
		$(".payment-errors").html(response.error.message);
		} else {
		var form$ = $("#payment-form");
		// token contains id, last4, and card type
		var token = response['id'];
		// insert the token into the form so it gets submitted to the server
		form$.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
		// and submit
		form$.get(0).submit();
		}
		}
 
		$(document).ready(function() {
			$("#payment-form").submit(function(event) {
			// disable the submit button to prevent repeated clicks
			$('.submit-button').attr("disabled", "disabled");
 
			// createToken returns immediately - the supplied callback submits the form if there are no errors
			Stripe.createToken({
				number: $('.card-number').val(),
				cvc: $('.card-cvc').val(),
				exp_month: $('.card-expiry-month').val(),
				exp_year: $('.card-expiry-year').val()
			}, stripeResponseHandler);
			return false; // submit from callback
		});
	});
</script>
</head>

<body>
			<h1>Pay with Stripe</h1>
			<!-- to display errors returned by createToken -->
			<span class="payment-errors"><?= $error ?></span>
			<span class="payment-success"><?= $success ?></span>
			
			<form action="" method="POST" id="payment-form" class="form-contact">
				<div class="form-row">
					<label>Payment Amount</label>
					<input name="amount"type="text" size="20" autocomplete="off"/>
					<br/>
				</div>
				<div class="form-row">
					<label>Card Number</label>
					<input type="text" size="20" autocomplete="off" class="card-number" />
				</div>
				<div class="form-row">
					<label>CVC</label>
					<input type="text" size="4" autocomplete="off" class="card-cvc" />
				</div>
				<div class="form-row">
					<label>Expiration (MM/YYYY)</label>
					<input type="text" size="2" class="card-expiry-month"/>
					<span> / </span>
					<input type="text" size="4" class="card-expiry-year"/>
				</div>
				<button type="submit" class="btn btn-default js-contact-submit" style="color:#4a4a4a">Submit Payment <i class="fa fa-paper-plane"></i></button>
			</form>
</body>
</html>