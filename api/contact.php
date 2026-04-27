<?php
// api/contact.php
header('Content-Type: application/json');

// SECURITY: Sanitize inputs
$data = json_decode(file_get_contents("php://input"), true);
$name = strip_tags(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject_raw = strip_tags(trim($data['subject'] ?? 'General Inquiry'));
$message = strip_tags(trim($data['message'] ?? ''));

// Validate
if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all fields correctly.']);
    exit;
}

$to = "mohammadqaddes77@gmail.com";
$email_subject = "New Contact Inquiry: $subject_raw";

// Email body
$email_body = "You have received a new message from your website contact form.\n\n".
              "Here are the details:\n".
              "Name: $name\n".
              "Email: $email\n".
              "Subject: $subject_raw\n\n".
              "Message:\n$message";

// SECURITY: Prevent header injection by sanitizing headers
$headers = "From: BioBoost AI <noreply@bioboost.example.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => 'Thank you for your inquiry. We will get back to you soon.']);
} else {
    // SECURITY: Don't leak exact mail error but provide a hint
    http_response_code(500);
    echo json_encode(['error' => 'Unable to send email. If you are on localhost, please ensure an SMTP server is configured.']);
}
?>
