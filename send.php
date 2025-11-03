<?php
// Simple mail() sender for contact form
// NOTE: Для лучшей доставляемости используйте SMTP (PHPMailer). Этот файл делает отправку сразу без внешних сервисов.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method Not Allowed';
  exit;
}

function sanitize($value)
{
  return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

$honeypot = trim((string)($_POST['company'] ?? ''));
$name    = sanitize($_POST['name'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone   = sanitize($_POST['phone'] ?? '');
$country = sanitize($_POST['country'] ?? '');
$program = sanitize($_POST['program'] ?? '');
$message = sanitize($_POST['message'] ?? '');

// Simple anti-bot honeypot
if ($honeypot !== '') {
  http_response_code(400);
  echo 'Bad request';
  exit;
}

// Required fields
if (!$name || !$email) {
  http_response_code(400);
  echo 'Name and valid Email are required';
  exit;
}

$nameLen = strlen($name);
if ($nameLen < 2 || $nameLen > 100) {
  http_response_code(400);
  echo 'Invalid name length';
  exit;
}

if ($phone !== '' && !preg_match('/^[+0-9 ()-]{7,20}$/', $phone)) {
  http_response_code(400);
  echo 'Invalid phone';
  exit;
}

if (strlen($message) > 2000) {
  http_response_code(400);
  echo 'Message too long';
  exit;
}

$to       = 'bolushbek@studynz.org';
$subject  = 'New website application';

$lines = [
  'Name: ' . $name,
  'Email: ' . $email,
  'Phone: ' . $phone,
  'Country: ' . $country,
  'Program: ' . $program,
  'Message:',
  $message,
];
$body = implode("\n", $lines);

// Важно: From желательно ставить с домена сайта/почтового ящика на том же домене
$fromEmail = 'bolushbek@studynz.org';
$headers   = [];
$headers[] = 'From: Study NZ <' . $fromEmail . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if ($ok) {
  header('Location: /?sent=1');
  exit;
}

http_response_code(500);
echo 'Failed to send';
exit;
