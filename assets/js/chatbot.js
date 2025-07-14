// تحديد لغة الصفحة
const pageLang = document.documentElement.lang;

// نصوص عربية
const arabicText = {
    title: "الدردشة المساعدة",
    welcome: "مرحبًا! كيف يمكنني مساعدتك؟ اختر سؤالًا من الأسئلة أدناه:",
    questions: [
        "ما هي الخدمات التي تقدمونها؟",
        "كيف يمكنني التواصل معكم؟",
        "ما هي أسعار خدماتكم؟"
    ],
    placeholder: "اكتب سؤالك هنا...",
    responses: {
        services: "نقدم خدمات تصميم الويب، التسويق الرقمي، وتطوير المواقع الإلكترونية .",
        contact: "يمكنك التواصل معنا عبر البريد الإلكتروني: info@digital-art.website",
        pricing: "الأسعار تختلف حسب الخدمة المطلوبة. يرجى التواصل معنا للحصول على عرض سعر.",
        default: "شكرًا على سؤالك! سنرد عليك قريبًا."
    },
    confirmationMessage: "سيتم تحويلك إلى واتساب للرد على سؤالك. هل توافق؟",
    confirmButton: "نعم",
    cancelButton: "إلغاء"
};

// نصوص إنجليزية
const englishText = {
    title: "Help Chat",
    welcome: "Hello! How can I assist you? Choose a question from below:",
    questions: [
        "What services do you offer?",
        "How can I contact you?",
        "What are your prices?"
    ],
    placeholder: "Type your question here...",
    responses: {
        services: "We offer web design, digital marketing, and web development services.",
        contact: "You can contact us via email: info@digital-art.website",
        pricing: "Prices vary depending on the required service. Please contact us for a quote.",
        default: "Thank you for your question! We will get back to you soon."
    },
    confirmationMessage: "You will be redirected to WhatsApp to answer your question. Do you agree?",
    confirmButton: "Yes",
    cancelButton: "Cancel"
};

// تحديد النصوص بناءً على لغة الصفحة
const texts = pageLang === "ar" ? arabicText : englishText;

// تعيين النصوص في الواجهة
document.getElementById("chatbot-title").textContent = texts.title;
document.getElementById("welcome-message").textContent = texts.welcome;
document.getElementById("messageInput").placeholder = texts.placeholder;

const questions = document.querySelectorAll(".question span");
questions.forEach((question, index) => {
    question.textContent = texts.questions[index];
});

// متغير لتخزين السؤال الجديد
let newQuestion = "";

// دالة لفتح/إغلاق Chatbot
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.classList.toggle('active');
}

// دالة لإرسال الأسئلة المحددة مسبقًا
function sendQuestion(questionKey) {
    const chatBox = document.getElementById('chatbot-body');
    const questionText = texts.questions[questionKey === 'services' ? 0 : questionKey === 'contact' ? 1 : 2];

    // إضافة سؤال المستخدم
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<p>${questionText}</p>`;
    chatBox.appendChild(userMessage);

    // إجابة الروبوت
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.innerHTML = `<p>${texts.responses[questionKey]}</p>`;
        chatBox.appendChild(botMessage);

        // التمرير لأسفل لعرض الرسالة الجديدة
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// دالة لإرسال أسئلة مخصصة
function sendCustomQuestion() {
    const messageInput = document.getElementById('messageInput');
    const question = messageInput.value.trim();

    if (question !== '') {
        newQuestion = question; // حفظ السؤال الجديد
        showConfirmationMessage(); // عرض رسالة التأكيد
    }
}

// دالة لعرض رسالة التأكيد
function showConfirmationMessage() {
    const chatBox = document.getElementById('chatbot-body');

    // إنشاء رسالة التأكيد
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('message', 'bot-message', 'confirmation-message');
    confirmationMessage.innerHTML = `
        <p>${texts.confirmationMessage}</p>
        <div class="confirmation-buttons">
            <button id="confirm-button" onclick="confirmSend()">${texts.confirmButton}</button>
            <button id="cancel-button" onclick="cancelSend()">${texts.cancelButton}</button>
        </div>
    `;
    chatBox.appendChild(confirmationMessage);

    // التمرير لأسفل لعرض الرسالة الجديدة
    chatBox.scrollTop = chatBox.scrollHeight;
}

// دالة لتأكيد الإرسال
function confirmSend() {
    const chatBox = document.getElementById('chatbot-body');

    // إضافة سؤال المستخدم
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<p>${newQuestion}</p>`;
    chatBox.appendChild(userMessage);

    // مسح حقل الإدخال
    document.getElementById('messageInput').value = '';

    // إرسال تنبيه عبر واتساب
    sendWhatsAppAlert(newQuestion);

    // إضافة رد تلقائي
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.innerHTML = `<p>${texts.responses.default}</p>`;
    chatBox.appendChild(botMessage);

    // التمرير لأسفل لعرض الرسالة الجديدة
    chatBox.scrollTop = chatBox.scrollHeight;
}

// دالة لإلغاء الإرسال
function cancelSend() {
    const chatBox = document.getElementById('chatbot-body');

    // إزالة رسالة التأكيد
    const confirmationMessage = chatBox.querySelector('.confirmation-message');
    if (confirmationMessage) {
        chatBox.removeChild(confirmationMessage);
    }
}

// دالة لإرسال تنبيه عبر واتساب
function sendWhatsAppAlert(question) {
    const phoneNumber = "00905398847282"; // استبدل برقم هاتفك
    const message = `سؤال جديد: ${question}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}