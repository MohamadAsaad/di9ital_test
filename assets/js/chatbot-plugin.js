// تحديد لغة الصفحة تلقائياً
const pageLang = document.documentElement.lang || 'ar';

// قواعد الروبوت مع كلمات رئيسية وردود
const rules = [
    // === القسم 1: الترحيب والتحية ===
    {
        keywords: pageLang === "ar" ? ["مرحبًا", "كيف الحال", "كيفك", "مرحبا", "اهلا", "اهلاً"] : ["hello", "hi", "hey"],
        response: pageLang === "ar" ? "مرحبًا بك في Digital Art! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Digital Art! How can I assist you today?"
    },
    {
        keywords: pageLang === "ar" ? ["السلام عليكم", "السلام", "سلام", "سلام عليكم", "السلام عليكم ورحمة الله"] : ["salam", "alsalam", "peace"],
        response: pageLang === "ar" ? "وعليكم السلام ورحمة الله وبركاته! أهلًا بك في Digital Art. كيف يمكنني مساعدتك اليوم؟" : "Peace be upon you! Welcome to Digital Art. How can I assist you today?"
    },

    // === القسم 2: تعريف بالشركة ===
    {
        keywords: pageLang === "ar" ? ["من أنت", "من انتم", "من انت", "ما اسمك", "تعريف", "ما هي Digital Art", "عن الشركة", "نبذة عنكم"] : ["who are you", "who are you guys", "what's your name", "about digital art", "about your company", "tell me about you"],
        response: pageLang === "ar" ?
            "أنا روبوت دردشة تابع لشركة Digital Art. نحن متخصصون في تصميم وتطوير المواقع الإلكترونية والتسويق الرقمي بخبرة تزيد عن 5 سنوات. نسعد بخدمتك!" :
            "I am a chatbot from Digital Art. We specialize in web design, development, and digital marketing with over 5 years of experience. We're happy to assist you!"
    },
    {
        keywords: pageLang === "ar" ? ["فريق العمل", "المبرمجين", "المصممين", "خبرتكم", "عدد الموظفين"] : ["your team", "developers", "designers", "your experience", "number of employees"],
        response: pageLang === "ar" ?
            "فريقنا يتكون من 10 مصممين ومبرمجين ومسوقين محترفين بخبرة تزيد عن 5 سنوات في المجال. لدينا أكثر من 100 مشروع ناجح." :
            "Our team consists of 10 professional designers, developers and marketers with 5+ years of experience. We've completed 100+ successful projects."
    },

    // === القسم 3: الخدمات الرئيسية ===
    {
        keywords: pageLang === "ar" ? ["خدمات", "ماذا تقدمون", "عروض", "خدماتكم"] : ["services", "what do you offer", "offers", "your services"],
        response: pageLang === "ar" ?
            "نقدم خدمات متكاملة تشمل:\n- تصميم وتطوير المواقع الإلكترونية\n- تطبيقات الجوال\n- التسويق الرقمي (SEO، إعلانات)\n- إدارة الحملات الإعلانية\n- استضافة المواقع\nأي من هذه الخدمات تهمك؟" :
            "We offer comprehensive services including:\n- Web design & development\n- Mobile applications\n- Digital marketing (SEO, ads)\n- Ad campaigns management\n- Web hosting\nWhich of these interests you?"
    },
    {
        keywords: pageLang === "ar" ? ["تصميم المواقع", "ويب", "موقع ويب", "مواقع الويب", "موقع إلكتروني", "موقع شركة"] : ["web design", "website", "websites", "company website"],
        response: pageLang === "ar" ?
            "نقوم بتصميم مواقع احترافية بتقنيات حديثة تضمن:\n- تجربة مستخدم رائعة\n- استجابة على جميع الأجهزة\n- سرعة عالية\n- أمان متكامل\nهل لديك فكرة محددة عن موقعك؟" :
            "We create professional websites with modern technologies ensuring:\n- Great user experience\n- Full responsiveness\n- High speed\n- Complete security\nDo you have a specific idea for your site?"
    },
    {
        keywords: pageLang === "ar" ? ["متجر إلكتروني", "ecommerce", "متجر على الإنترنت", "موقع بيع", "موقع تسوق"] : ["ecommerce", "online store", "shop website", "selling online", "shopping site"],
        response: pageLang === "ar" ?
            "نصمم متاجر إلكترونية متكاملة مع:\n- أنظمة الدفع الإلكتروني\n- إدارة المخزون\n- شهادات أمان SSL\n- تكامل مع شركات الشحن\nهل لديك منتجات محددة تريد بيعها؟" :
            "We build complete e-stores with:\n- Online payment systems\n- Inventory management\n- SSL certificates\n- Shipping companies integration\nDo you have specific products to sell?"
    },
    {
        keywords: pageLang === "ar" ? ["تطوير المواقع", "برمجة", "تطوير", "برمجة مواقع"] : ["web development", "programming", "development", "website coding"],
        response: pageLang === "ar" ?
            "نطور حلول مخصصة باستخدام أحدث التقنيات مثل:\n- HTML5, CSS3, JavaScript\n- PHP, Python, Node.js\n- WordPress, Laravel\nما هي التقنية التي تفضلها؟" :
            "We develop custom solutions using latest technologies like:\n- HTML5, CSS3, JavaScript\n- PHP, Python, Node.js\n- WordPress, Laravel\nWhich technology do you prefer?"
    },

    // === القسم 4: التسويق الرقمي ===
    {
        keywords: pageLang === "ar" ? ["التسويق الرقمي", "اعلانات", "إعلانات", "تسويق", "تسويق الكتروني"] : ["digital marketing", "ads", "advertising", "marketing", "online marketing"],
        response: pageLang === "ar" ?
            "نوفر خدمات تسويقية شاملة:\n1. تحسين محركات البحث (SEO)\n2. إعلانات جوجل\n3. حملات وسائل التواصل\n4. التسويق بالمحتوى\nما هي خدمة التسويق التي تحتاجها؟" :
            "We offer comprehensive marketing services:\n1. Search Engine Optimization (SEO)\n2. Google Ads\n3. Social Media Campaigns\n4. Content Marketing\nWhich marketing service do you need?"
    },
    {
        keywords: pageLang === "ar" ? ["زيادة زوار", "ترتيب جوجل", "ظهور في البحث", "زيادة عملاء", "عملاء جدد"] : ["more traffic", "Google ranking", "search visibility", "get more customers", "new clients"],
        response: pageLang === "ar" ?
            "لزيادة زوار موقعك نقدم:\n- تحسين SEO لظهور أفضل في البحث\n- إعلانات مدفوعة مستهدفة\n- محتوى تسويقي جذاب\nهل لديك موقع حالي تريد تحسينه؟" :
            "To increase your website traffic we offer:\n- SEO optimization for better search visibility\n- Targeted paid ads\n- Attractive marketing content\nDo you have an existing website to optimize?"
    },
    {
        keywords: pageLang === "ar" ? ["إعلانات فيسبوك", "إعلانات انستجرام", "إعلانات سوشيال ميديا", "إعلانات تواصل اجتماعي"] : ["Facebook ads", "Instagram ads", "social media ads", "social network ads"],
        response: pageLang === "ar" ?
            "حملاتنا الإعلانية على السوشيال ميديا تشمل:\n- تحديد الجمهور المستهدف بدقة\n- تصميم إعلانات جذابة\n- تحليل النتائج وتحسين الأداء\nما هي الفئة المستهدفة التي تريد الوصول إليها؟" :
            "Our social media ad campaigns include:\n- Precise audience targeting\n- Attractive ad designs\n- Results analysis and optimization\nWhat's your target demographic?"
    },

    // === القسم 5: الدعم الفني والصيانة ===
    {
        keywords: pageLang === "ar" ? ["دعم فني", "صيانة", "مشاكل تقنية", "تحديث", "دعم", "مساعدة فنية"] : ["technical support", "maintenance", "technical issues", "updates", "support", "tech help"],
        response: pageLang === "ar" ?
            "نقدم حزم صيانة شاملة تشمل:\n- دعم فني 24/7\n- تحديثات دورية\n- نسخ احتياطي يومي\n- مراقبة أداء الموقع\nهل تواجه مشكلة محددة تحتاج مساعدة فيها؟" :
            "We offer comprehensive maintenance packages including:\n- 24/7 technical support\n- Regular updates\n- Daily backups\n- Performance monitoring\nAre you facing a specific issue?"
    },
    {
        keywords: pageLang === "ar" ? ["مشكلة في الموقع", "الموقع لا يعمل", "خطأ", "عطل", "تصليح موقع", "إصلاح"] : ["website problem", "site not working", "error", "fix", "broken website", "website issue"],
        response: pageLang === "ar" ?
            "لحل المشكلات الفنية يرجى:\n1. وصف المشكلة بالتفصيل\n2. ذكر متى بدأت المشكلة\n3. إرسال لقطة شاشة إن أمكن\nسنساعدك في حلها بأسرع وقت!" :
            "For technical issues please:\n1. Describe the problem in detail\n2. Mention when it started\n3. Send screenshot if possible\nWe'll help resolve it quickly!"
    },
    {
        keywords: pageLang === "ar" ? ["اختراق", "موقع معطل", "حالة طارئة", "مشكلة عاجلة", "هاك"] : ["hacked", "site down", "emergency", "urgent issue", "hack"],
        response: pageLang === "ar" ?
            "🚨 لحالات الطوارئ الفورية:\n- اتصل بالدعم الفوري على: 00905398847282 (24/7)\n- أو أرسل رسالة عاجلة على الواتساب\nسنعالج المشكلة فوراً!" :
            "🚨 For urgent technical emergencies:\n- Call immediate support: 00905398847282 (24/7)\n- Or send WhatsApp message\nWe'll fix it immediately!"
    },

    // === القسم 6: الأسعار والدفع ===
    {
        keywords: pageLang === "ar" ? ["تكلفة", "اسعار", "أسعار", "كم", "السعر", "التكلفة"] : ["pricing", "how much", "cost", "price", "what's the cost"],
        response: pageLang === "ar" ?
            "أسعارنا تختلف حسب الخدمة:\n- تصميم موقع: يبدأ من 500$\n- متجر إلكتروني: يبدأ من 1000$\n- التسويق: يبدأ من 300$/شهر\nهل تريد عرض سعر مفصل لمشروعك؟" :
            "Our prices vary by service:\n- Website design: starts from $500\n- E-commerce: starts from $1000\n- Marketing: starts from $300/month\nWould you like a detailed quote?"
    },
    {
        keywords: pageLang === "ar" ? ["خصم", "عرض ترويجي", "تخفيض", "عروض خاصة"] : ["discount", "promotion", "offer", "special deals"],
        response: pageLang === "ar" ?
            "حالياً لدينا عرض خاص على حزم التسويق الشاملة بخصم 20% للعملاء الجدد. هل تريد تفاصيل أكثر عن العروض الحالية؟" :
            "We currently have a special 20% discount on complete marketing packages for new clients. Would you like more details about current offers?"
    },
    {
        keywords: pageLang === "ar" ? ["طرق الدفع", "الدفع الإلكتروني", "الدفع عند التسليم", "الدفع بالتقسيط"] : ["payment methods", "online payment", "cash on delivery", "installments"],
        response: pageLang === "ar" ?
            "طرق الدفع المتاحة:\n- تحويل بنكي\n- بطاقات ائتمان\n- PayPal\n- تقسيط على 3 دفعات\nما هي الطريقة المناسبة لك؟" :
            "Available payment methods:\n- Bank transfer\n- Credit cards\n- PayPal\n- 3 installment payments\nWhich method suits you?"
    },

    // === القسم 7: التوقيت والتسليم ===
    {
        keywords: pageLang === "ar" ? ["متى", "التسليم", "مدة", "الوقت", "كم يستغرق"] : ["delivery", "when", "timeframe", "time", "how long"],
        response: pageLang === "ar" ?
            "مدة التسليم التقريبية:\n- موقع بسيط: 1-2 أسبوع\n- متجر إلكتروني: 3-4 أسابيع\n- تطبيق ويب: 4-6 أسابيع\nهل لديك موعد نهائي محدد تحتاج التسليم قبله؟" :
            "Estimated delivery time:\n- Basic website: 1-2 weeks\n- E-commerce: 3-4 weeks\n- Web app: 4-6 weeks\nDo you have a specific deadline?"
    },
    {
        keywords: pageLang === "ar" ? ["تسليم جزئي", "مراحل المشروع", "خطوات العمل"] : ["partial delivery", "project phases", "work stages"],
        response: pageLang === "ar" ?
            "نعمل على مشاريعنا بمراحل واضحة:\n1. التصميم الأولي\n2. التطوير الأساسي\n3. الاختبارات\n4. التسليم النهائي\nهل تريد شرحاً مفصلاً لكل مرحلة؟" :
            "We work in clear project phases:\n1. Initial design\n2. Core development\n3. Testing\n4. Final delivery\nWould you like detailed explanation for each phase?"
    },

    // === القسم 8: التواصل والمتابعة ===
    {
        keywords: pageLang === "ar" ? ["اتصال", "تواصل", "رقم", "هاتف", "بريد", "كيف", "التواصل", "الايميل"] : ["contact", "how to reach", "get in touch", "phone", "email", "contact us"],
        response: pageLang === "ar" ?
            "يمكنك التواصل معنا عبر:\n- البريد: info@digital-art.website\n- الهاتف: 00905398847282\n- الواتساب: نفس الرقم\nأي وسيلة تفضلها؟" :
            "You can contact us via:\n- Email: info@digital-art.website\n- Phone: 00905398847282\n- WhatsApp: same number\nWhich method do you prefer?"
    },
    {
        keywords: pageLang === "ar" ? ["مكتبكم", "الموقع الجغرافي", "زيارة المكتب", "عنوانكم", "العنوان"] : ["your office", "location", "visit us", "your address", "address"],
        response: pageLang === "ar" ?
            "مقرنا الرئيسي في اسطنبول، العنوان:\nDigital Art Company\nشارع الاستقلال، مبنى رقم 123\nنستقبل الزيارات بموعد مسبق. هل تريد تحديد موعد؟" :
            "Our main office in Istanbul:\nDigital Art Company\nIstiklal Street, Building No: 123\nWe receive visits by appointment. Would you like to schedule a visit?"
    },
    {
        keywords: pageLang === "ar" ? ["واتساب", "تواصل عبر واتساب", "ارسال واتساب"] : ["whatsapp", "contact via whatsapp", "send whatsapp"],
        response: pageLang === "ar" ?
            "يمكنك التواصل مباشرة عبر واتساب:\nhttps://wa.me/905398847282\nسنجيب على استفسارك في أسرع وقت!" :
            "You can contact us directly via WhatsApp:\nhttps://wa.me/905398847282\nWe'll reply to your inquiry ASAP!"
    },

    // === القسم 9: خدمات إضافية ===
    {
        keywords: pageLang === "ar" ? ["استضافة", "SSL", "أمان", "حماية", "سيرفر"] : ["hosting", "SSL", "security", "protection", "server"],
        response: pageLang === "ar" ?
            "نوفر حلول استضافة متكاملة:\n- استضافة مشتركة\n- سيرفرات خاصة\n- شهادات SSL\n- حماية من الاختراق\nما هي احتياجاتك من الاستضافة؟" :
            "We provide complete hosting solutions:\n- Shared hosting\n- Private servers\n- SSL certificates\n- Hack protection\nWhat are your hosting needs?"
    },
    {
        keywords: pageLang === "ar" ? ["اسم نطاق", "دومين", "شراء دومين"] : ["domain name", "domain", "buy domain"],
        response: pageLang === "ar" ?
            "نساعدك في اختيار وشراء اسم النطاق المناسب:\n- البحث عن اسم متاح\n- التسجيل لمدة سنة أو أكثر\n- إدارة DNS\nهل لديك اسم معين في ذهنك؟" :
            "We help choose and buy perfect domain:\n- Search for available names\n- Registration for 1+ years\n- DNS management\nDo you have a specific name in mind?"
    },

    // === القسم 10: بدء المشروع ===
    {
        keywords: pageLang === "ar" ? ["كيف أبدأ", "خدمة", "طلب خدمة", "التعاون", "بدء مشروع"] : ["how to start", "request service", "collaboration", "start project"],
        response: pageLang === "ar" ?
            "لبدء مشروعك:\n1. أخبرنا عن فكرتك\n2. سنقترح الحل الأمثل\n3. نقدم عرض سعر\n4. نبدأ التنفيذ\nهل لديك فكرة مشروع جاهزة؟" :
            "To start your project:\n1. Tell us about your idea\n2. We'll suggest best solution\n3. Provide a quote\n4. Begin implementation\nDo you have a project idea ready?"
    },
    {
        keywords: pageLang === "ar" ? ["عقد عمل", "ضمان", "شروط وأحكام", "سياسة الاسترجاع"] : ["contract", "warranty", "terms and conditions", "refund policy"],
        response: pageLang === "ar" ?
            "جميع مشاريعنا تتم بعقد رسمي يشمل:\n- ضمان لمدة عام\n- سياسة استرجاع\n- شروط واضحة\nيمكنك الاطلاع على النموذج هنا: [رابط العقد]" :
            "All projects include official contract with:\n- 1 year warranty\n- Refund policy\n- Clear terms\nYou can view the template here: [contract link]"
    }
];

// إنشاء عناصر واجهة الروبوت ديناميكياً
function createChatbotElements() {
    // العنصر الرئيسي
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'digital-art-chatbot-container';
    chatbotContainer.className = 'digital-art-chatbot-container';

    // الهيدر
    const header = document.createElement('div');
    header.className = 'digital-art-chatbot-header';
    header.innerHTML = `
        <h3 id="digital-art-chatbot-title">${pageLang === "ar" ? "روبوت الدردشة الذكي" : "Smart Chatbot"}</h3>
        <span class="digital-art-close-btn">&times;</span>
    `;

    // جسم المحادثة
    const body = document.createElement('div');
    body.id = 'digital-art-chatbot-body';
    body.className = 'digital-art-chatbot-body';
    body.innerHTML = `
        <div class="digital-art-message digital-art-bot-message">
            <p id="digital-art-welcome-message">${pageLang === "ar"
            ? "مرحبًا بك في Digital Art! كيف يمكنني مساعدتك اليوم؟"
            : "Welcome to Digital Art! How can I assist you today?"
        }</p>
        </div>
    `;

    // الفوتر (حقل الإدخال)
    const footer = document.createElement('div');
    footer.className = 'digital-art-chatbot-footer';
    footer.innerHTML = `
        <input type="text" id="digital-art-messageInput" placeholder="${pageLang === "ar" ? "اكتب رسالتك هنا..." : "Type your message here..."
        }" />
        <button id="digital-art-sendBtn"><i class="fas fa-paper-plane"></i></button>
        <button id="digital-art-whatsappBtn"><i class="fab fa-whatsapp"></i></button>
    `;

    // زر التفعيل
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'digital-art-chatbot-toggle';
    toggleBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';

    // تجميع العناصر
    chatbotContainer.appendChild(header);
    chatbotContainer.appendChild(body);
    chatbotContainer.appendChild(footer);

    document.body.appendChild(chatbotContainer);
    document.body.appendChild(toggleBtn);

    // إضافة عناصر مؤشر الكتابة
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'digital-art-typing-indicator';
    typingIndicator.style.display = 'none';
    typingIndicator.innerHTML = '<div class="digital-art-typing-dots"><span></span><span></span><span></span></div>';
    body.appendChild(typingIndicator);
}

// تهيئة الأحداث
function initChatbotEvents() {
    // فتح/إغلاق الروبوت
    document.querySelector('.digital-art-chatbot-toggle').addEventListener('click', toggleChatbot);
    document.querySelector('.digital-art-close-btn').addEventListener('click', toggleChatbot);

    // إرسال الرسالة
    document.getElementById('digital-art-sendBtn').addEventListener('click', sendMessage);

    // إرسال بالضغط على Enter
    document.getElementById('digital-art-messageInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // زر الواتساب
    document.getElementById('digital-art-whatsappBtn').addEventListener('click', function () {
        const whatsappUrl = pageLang === "ar"
            ? "https://wa.me/905398847282?text=مرحباً، أريد الاستفسار عن خدماتكم"
            : "https://wa.me/905398847282?text=Hello, I want to inquire about your services";
        window.open(whatsappUrl, '_blank');
    });

    // إغلاق عند النقر خارج الروبوت
    document.addEventListener('click', function (event) {
        const chatbot = document.getElementById('digital-art-chatbot-container');
        const toggleBtn = document.querySelector('.digital-art-chatbot-toggle');

        if (!chatbot.contains(event.target) && !toggleBtn.contains(event.target)) {
            chatbot.classList.remove('digital-art-active');
        }
    });
}

// تحسين معالجة النص العربي
function normalizeArabic(text) {
    return text
        .replace(/[أآإ]/g, 'ا')
        .replace(/[ة]/g, 'ه')
        .replace(/[ى]/g, 'ي')
        .replace(/[ؤئ]/g, 'ء')
        .replace(/[\u064B-\u065F\u0670]/g, '') // إزالة التشكيل
        .replace(/\s+/g, ' ') // تقليل المسافات المتعددة
        .trim()
        .toLowerCase();
}

// مؤشر الكتابة
function showTypingIndicator() {
    const typing = document.getElementById('digital-art-typing-indicator');
    typing.style.display = 'block';
    document.getElementById('digital-art-chatbot-body').scrollTop =
        document.getElementById('digital-art-chatbot-body').scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('digital-art-typing-indicator').style.display = 'none';
}

// صوت التنبيه
function playNotificationSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
    audio.play().catch(e => console.log('لم يتم تشغيل الصوت:', e));
}

// تنقية المدخلات من XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// البحث عن رد مناسب
function findReply(message) {
    const cleanMessage = normalizeArabic(message);

    // البحث عن قاعدة تطابق الرسالة
    for (const rule of rules) {
        const found = rule.keywords.some(keyword => {
            const cleanKeyword = normalizeArabic(keyword);
            return cleanMessage === cleanKeyword ||
                cleanMessage.includes(` ${cleanKeyword} `) ||
                cleanMessage.startsWith(`${cleanKeyword} `) ||
                cleanMessage.endsWith(` ${cleanKeyword}`);
        });

        if (found) {
            return rule.response;
        }
    }

    // الرد الافتراضي
    return pageLang === "ar"
        ? "لم أفهم سؤالك. لمزيد من المعلومات عن خدماتنا يمكنك التواصل معنا عبر البريد الإلكتروني: info@digital-art.website أو الاتصال بنا على الرقم: 00905398847282."
        : "I didn't understand your question. You can contact us via email: info@digital-art.website or call us at: 00905398847282.";
}

// إضافة رسالة للدردشة
function addMessage(text, sender) {
    const chatBox = document.getElementById('digital-art-chatbot-body');
    const message = document.createElement('div');
    message.className = `digital-art-message digital-art-${sender}-message`;
    message.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// تبديل حالة الروبوت (فتح/إغلاق)
function toggleChatbot() {
    document.getElementById('digital-art-chatbot-container').classList.toggle('digital-art-active');
}

// إرسال الرسالة
function sendMessage() {
    const input = document.getElementById('digital-art-messageInput');
    const message = sanitizeInput(input.value.trim());

    if (message) {
        addMessage(message, 'user');
        input.value = '';

        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            const reply = findReply(message);
            addMessage(reply, 'bot');
            playNotificationSound();
        }, 1000 + Math.random() * 2000);
    }
}

// تهيئة الروبوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    createChatbotElements();
    initChatbotEvents();
});