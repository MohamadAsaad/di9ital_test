<?php

// استيراد مكتبات PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

/ إضافة رأسية الرد الأمني
header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: no-referrer');
header('Content-Security-Policy: default-src \'self\';');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // التحقق من المدخلات وتطهيرها
  $name = htmlspecialchars(strip_tags($_POST['name']));
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $phone = htmlspecialchars(strip_tags($_POST['phone']));
  $subject = htmlspecialchars(strip_tags($_POST['subject']));
  $message = htmlspecialchars(strip_tags($_POST['message']));

  // التحقق من صحة البريد الإلكتروني
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("صيغة البريد الإلكتروني غير صحيحة.");
  }

  // إعدادات SMTP باستخدام المتغيرات البيئية
  $smtp_host = 'smtp.hostinger.com';
  $smtp_port = 465;
  $smtp_username = getenv('SMTP_USERNAME');
  $smtp_password = getenv('SMTP_PASSWORD');

  $mail = new PHPMailer;
  $mail->isSMTP();
  $mail->Host = $smtp_host;
  $mail->SMTPAuth = true;
  $mail->Username = $smtp_username;
  $mail->Password = $smtp_password;
  $mail->SMTPSecure = 'ssl';
  $mail->Port = $smtp_port;

  $mail->setFrom($smtp_username, $name);
  $mail->addAddress("info@mail.com");
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';

  $mail->Subject = "New Contact Form : $subject";
  $mail->Body    = "
  <h2>تفاصيل الرسالة</h2>
  <p><strong>الاسم:</strong> $name</p>
  <p><strong>البريد الإلكتروني:</strong> $email</p>
  <p><strong>الموضوع:</strong> $subject</p>
  <p><strong>الرسالة:</strong></p>
  <p>$message</p>";

  $mail->send();
  echo 'OK';
} catch (Exception $e) {
  echo 'حدث خطأ أثناء إرسال الرسالة: ' . $mail->ErrorInfo;
}
