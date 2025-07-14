// جمع معلومات الزائر
const visitorInfo = {
    ip: '', // سيتم تعبئته لاحقًا
    userAgent: navigator.userAgent, // معلومات المتصفح ونظام التشغيل
    page: window.location.href, // الصفحة التي تمت زيارتها
    timestamp: new Date().toISOString() // وقت الزيارة
};

// الحصول على عنوان IP باستخدام خدمة خارجية
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        visitorInfo.ip = data.ip; // تعبئة عنوان IP

        // إرسال البيانات إلى ملف PHP
        sendDataToEmail(visitorInfo);
    })
    .catch(error => console.error('Error fetching IP:', error));

// وظيفة لإرسال البيانات إلى ملف PHP
function sendDataToEmail(data) {
    console.log('Sending data:', data); // تحقق من البيانات المرسلة
    fetch('track.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Email sent successfully:', result);
        })
        .catch(error => console.error('Error sending email:', error));
}