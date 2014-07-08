<?php
if(isset($_POST['email'])) {
     
    // EDIT THE 2 LINES BELOW AS REQUIRED
	
    $email_to = 'womencoders@gmail.com';
    $subject = $_POST['class']; // required
	
	 $name = $_POST['name']; // required;
    $email_from = $_POST['email']; // required
	$message = $_POST['message']; // required

     
    $email_message = "Contact details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Message: ".clean_string($message)."\n";
     
     
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
$mail->Subject = 'Women Coders Contact Form';
$mail->AddAddress('womencoders@gmail.com'); // To which address the mail to be delivered
$mail->Body = $email_message;
$mail->Send();
$msg = 'Your message have been submitted.  If you do not get a response back within 48 hours please contact us at (888)-432-3387.';
echo $msg;
}

?>

