document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm'); // تحديد النموذج
  const loading = form.querySelector('.loading'); // رسالة التحميل
  const errorMessage = form.querySelector('.error-message'); // رسالة الخطأ
  const sentMessage = form.querySelector('.sent-message'); // رسالة النجاح

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // منع الإرسال التقليدي

    // إظهار رسالة التحميل وإخفاء الرسائل الأخرى
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    sentMessage.style.display = 'none';

    // إرسال النموذج عبر Fetch API
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        loading.style.display = 'none'; // إخفاء رسالة التحميل

        if (data.status === 'success') {
          sentMessage.style.display = 'block'; // إظهار رسالة النجاح
          form.reset(); // إعادة تعيين النموذج
        } else {
          errorMessage.textContent = data.message || 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';
          errorMessage.style.display = 'block'; // إظهار رسالة الخطأ
        }
      })
      .catch(() => {
        loading.style.display = 'none'; // إخفاء رسالة التحميل
        errorMessage.textContent = 'حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.';
        errorMessage.style.display = 'block'; // إظهار رسالة الخطأ
      });
  });
});