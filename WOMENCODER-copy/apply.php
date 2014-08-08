<?php
if(isset($_POST['email'])) {
     
    // EDIT THE 2 LINES BELOW AS REQUIRED
	
    $email_to = 'womencoders@gmail.com';
	 $name = $_POST['name']; // required;
    $email_from = $_POST['email']; // required
	$phone = $_POST['phone']; // required
	$hear_about = $_POST['hear_about']; // required
	$education = $_POST['education']; // required
	$experience = $_POST['experience']; // required
	$employment = $_POST['employment']; // required
	$why = $_POST['why']; // required
	$misc = $_POST['misc']; // required

     
    $email_message = "Apply details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Phone: ".clean_string($phone)."\n";
	$email_message .= "Hear About: ".clean_string($hear_about)."\n";
	$email_message .= "Education: ".clean_string($education)."\n";
	$email_message .= "Employment: ".clean_string($employment)."\n";
	$email_message .= "Why: ".clean_string($why)."\n";
	$email_message .= "Misc: ".clean_string($misc)."\n";
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 

require_once('phpgmailer/class.phpgmailer.php');
$mail = new PHPGMailer();
$mail->Username = 'womencoders@gmail.com'; 
$mail->Password = 'Peoplespaceoc';
$mail->From = $email_from; // Like to set this address as the address of the person who filled the form
$mail->AddReplyTo($email, $name);
$mail->FromName = $name;
$mail->Subject = 'Bootcamp Applicant Form';
$mail->AddAddress('womencoders@gmail.com'); // To which address the mail to be delivered
$mail->Body = $email_message;
$mail->Send();
$msg = '<div class="alert alert-success" style="width:100%">Your message have been submitted.  If you do not get a response back within 48 hours please contact us at (888)-432-3387.</div>';
echo $msg;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Contact Us</title>
    <meta name="viewport" content="width=device-width,  minimum-scale=1,  maximum-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <!-- Your styles -->
    <link href="css/style-apply.css" rel="stylesheet" media="screen">  
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen"> 
  </head>
  <body>
<form class="form-contact" action="" method="post">

                          <div class="form_contact">
                            <input type="text" class="name form-control" placeholder="Full Name" required name="name" id="name" >
                            <input type="email" class="email form-control" placeholder="Email" required name="email" id="email">
                            <input type="text" class="phone form-control" placeholder="Phone" required name="phone" id="phone">
                            <input type="text" class="phone form-control" placeholder="How Did You Hear About Us?" required name="hear_about" id="hear_about">
                            <textarea class="form-control" rows="2" placeholder="Education: Highest education level, undergraduate school name, undergraduate major, any other education info related to technology" required name="education" id="education"></textarea>
                            
                            <textarea class="form-control" rows="2" placeholder="Employment status:  unemployed, self-employed, employed- currently occupation" required name="employment" id="employment"></textarea>
                            <textarea class="form-control" rows="2" placeholder="Please describe your prior experience and skills with technology (any coding or building website experience?)" required name="experience" id="experience"></textarea>
                            <textarea class="form-control" rows="2" placeholder="Why are you interested in the Bootcamp Full Stack Web Developer course?" required name="why" id="why"></textarea>
                            <textarea class="form-control" rows="2" placeholder="Misc (age, current city and state, special needs- child care, laptop, transportation, etc.)" required name="misc" id="misc"></textarea>
                            <div class="clearfix"></div>
                          </div>
                          <input type="submit" value="Send Message" name="subscribe" class=" btn btn-success">
                          <div class="result"></div>
</form>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
</body>
</html>