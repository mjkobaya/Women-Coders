<?php
require './lib/Stripe.php';

$course = $_GET['course'];
$price = $_GET['price'];

if ($course == 'sob')
{
$price = '495';
$course_name = 'Start Your Online Business Workshop';
}
elseif ($course == 'pfe')
{
$price = '2950';
$course_name = 'Programming for Entrepreneurs Mini-Bootcamp';	
}
elseif ($course == 'fullstack' and $price == '')
{
$price = '10500';
$course_name = 'Full-stack Jr. Web Developer Bootcamp';	
}
elseif ($course == 'fullstack' and $price != '')
{
$price = $_GET['price'];
$course_name = 'First Payment for Full-stack Jr. Web Developer Bootcamp';	
}

$stripe_amount = 100 * $price; 
$display_amount = '$' . number_format($price, 2, '.', ''); 
$student = $_POST['student'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$description = $student." paid for ".$display_amount." ".$course_name." (".$email." - ".$phone.")";
 
if ($_POST) {
Stripe::setApiKey("sk_live_l3mQ3wtagvuKwqqI51xOQe62");
$error = '';
$success = '';
try {
if (!isset($_POST['stripeToken']))
throw new Exception("The Credit Card payment was not generated correctly");
Stripe_Charge::create(array("amount" => $stripe_amount,
"currency" => "usd",
"description" => $description,
"card" => $_POST['stripeToken']));
$success = 'Your registeration was submitted.  Thank you!';
$token = $_POST['stripeToken'];

}
catch (Exception $e) {
$error = $e->getMessage();
}
}
 
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register for Course</title>
<link href="https://www.schoolofdevs.com/css/bootstrap.css" rel="stylesheet" media="screen">
<link href='https://fonts.googleapis.com/css?family=Junge' rel='stylesheet' type='text/css'>
<script src="https://www.schoolofdevs.com/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://js.stripe.com/v1/"></script>
<!-- jQuery is used only for this example; it isn't required to use Stripe -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script type="text/javascript">
// this identifies your website in the createToken call below
Stripe.setPublishableKey('pk_live_6c2wwVnAMHQq8uROyLyaNl0r');
 
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
<!-- to display errors returned by createToken -->
<a href="https://www.schoolofdevs.com"><img src="https://www.schoolofdevs.com/assets/img/logo.png"></a>
<br>
<form action="" method="POST" id="payment-form" class="form-horizontal span6">
    <fieldset>
    <legend><b><?php echo $course_name; ?></b> for <b><?php echo $display_amount; ?></legend>
<div class="row-fluid">
<span class="payment-errors"><font color="#FF0000"><?= $error ?></font></span>
<span class="payment-success"><font color="#009900"><?= $success ?></font></span>
</div>
    <div class="control-group">
    <label class="control-label">Student Name:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span6">
    <input name="student" type="text" class="input-block-level" pattern="\w+ \w+.*" title="Fill your first and last name" required>
    </div>
    </div>
    </div>
    </div>
     <div class="control-group">
    <label class="control-label">Student Email:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span6">
    <input name="email" type="text" class="input-block-level" title="Your email address" required>
    </div>
    </div>
    </div>
    </div>
     <div class="control-group">
    <label class="control-label">Student Phone:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span6">
    <input name="phone" type="text" class="input-block-level" title="Your phone number" required>
    </div>
    </div>
    </div>
    </div>
    <div class="control-group">
    <label class="control-label">Card Number:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span6">
    <input type="text" class="input-block-level card-number" autocomplete="off" title="Credit Card Number" required>
    </div>
    
    </div>
    </div>
    </div>
    <div class="control-group">
    <label class="control-label">Card Expiry Date:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span3">
    <select class="input-block-level card-expiry-month">
    <option>01</option>
    <option>02</option>
    <option>03</option>
    <option>04</option>
    <option>05</option>
    <option>06</option>
    <option>07</option>
    <option>08</option>
    <option>09</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
    </select>
    </div>
    <div class="span4">
    <select class="input-block-level card-expiry-year">
    <option>2014</option>
    <option>2015</option>
    <option>2016</option>
    <option>2017</option>
    <option>2018</option>
    <option>2019</option>
    <option>2020</option>
    <option>2021</option>
    <option>2022</option>
    <option>2023</option>
    <option>2024</option>
    <option>2025</option>
    <option>2026</option>
    </select>
    </div>
    </div>
    </div>
    </div>
    <div class="control-group">
    <label class="control-label">Card CVV:</label>
    <div class="controls">
    <div class="row-fluid">
    <div class="span2">
    <input type="text" class="input-block-level card-cvc" autocomplete="off" maxlength="3" pattern="\d{3}" title="Three digits at back of your card" required>
    </div>
    </div>
    </div>
    </div>
    <div class="form-actions">
        <input name="course" type="hidden" value="<?php echo $course; ?>">
    <button type="submit" class="btn btn-primary">Submit Payment</button>
    </div>
    </fieldset>
</form>
</body>
</html>