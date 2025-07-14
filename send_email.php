<?php

// استيراد مكتبات PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// إضافة رأسية الرد الأمني
header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'self';");

// التحقق من طريقة الطلب
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  try {
    // التحقق من المدخلات وتطهيرها
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // التحقق من صحة البيانات
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
      die("يرجى ملء جميع الحقول المطلوبة.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      die("صيغة البريد الإلكتروني غير صحيحة.");
    }

    // إعدادات SMTP
    $smtp_host = 'smtp.hostinger.com';
    $smtp_port = 465;
    $smtp_username = getenv('SMTP_USERNAME');
    $smtp_password = getenv('SMTP_PASSWORD');

    // إنشاء كائن PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtp_port;

    // إعدادات البريد
    $mail->setFrom($smtp_username, 'Digital Art'); // المرسل
    $mail->addAddress("info@digital-art.website"); // المستلم
    $mail->addReplyTo($email, $name); // إذا أراد المستلم الرد، يتم توجيه الرد إلى المرسل
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    $mail->Subject = " New Contact Form : $subject";
    $mail->Body = "
            <h2>تفاصيل الرسالة</h2>
            <p><strong>الاسم:</strong> $name</p>
            <p><strong>البريد الإلكتروني:</strong> $email</p>
            <p><strong>الموضوع:</strong> $subject</p>
            <p><strong>الرسالة:</strong></p>
            <p>$message</p>
        ";

    // إرسال البريد
    if ($mail->send()) {
      echo 'OK';
    } else {
      echo 'حدث خطأ أثناء إرسال الرسالة.';
    }
  } catch (Exception $e) {
    echo 'حدث خطأ أثناء إرسال الرسالة: ' . $mail->ErrorInfo;
  }
} else {
  echo 'طريقة الطلب غير صحيحة.';
}
