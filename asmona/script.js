// 📦 Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDguR3k4zcF987QQiIr2Z3_XV8pUyGFBC0",
    authDomain: "asmona-01.firebaseapp.com",
    projectId: "asmona-01",
    storageBucket: "asmona-01.firebasestorage.app",
    messagingSenderId: "499572569571",
    appId: "1:499572569571:web:a56419658501762272dcd6",
    measurementId: "G-R84KPKH0ER"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// حالة التطبيق
const appState = {
    namesData: null,
    favorites: JSON.parse(localStorage.getItem('favoriteNames')) || [],
    currentName: null,
    isLoading: true
};

// عناصر DOM
const DOM = {
    sections: {
        nameGenerator: document.getElementById('name-generator'),
        pregnancyCalculator: document.getElementById('pregnancy-calculator'),
        savedNames: document.getElementById('saved-names')
    },
    navItems: document.querySelectorAll('.nav-item'),
    nameForm: document.getElementById('name-form'),
    nameResults: document.getElementById('name-results'),
    resultsCount: document.querySelector('.results-count'),
    pregnancyForm: document.querySelector('.calculator-card'),
    pregnancyResult: document.getElementById('pregnancy-result'),
    favoritesList: document.getElementById('favorites-list'),
    modal: {
        container: document.getElementById('share-modal'),
        name: document.getElementById('shared-name'),
        meaning: document.getElementById('shared-meaning'),
        letter: document.getElementById('shared-letter'),
        gender: document.getElementById('shared-gender'),
        type: document.getElementById('shared-type'),
        closeBtn: document.querySelector('.close-modal'),
        shareBtns: {
            whatsapp: document.getElementById('share-wa'),
            facebook: document.getElementById('share-fb'),
            twitter: document.getElementById('share-tw')
        },
        downloadBtn: document.getElementById('download-card')
    }
};

// بدء التطبيق
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    await loadNamesData();
    setupEventListeners();
    showSection('name-generator');
}

// تحميل بيانات الأسماء من Firebase
async function loadNamesData() {
    try {
        const querySnapshot = await getDocs(collection(db, "names"));
        const rawData = [];

        querySnapshot.forEach(doc => rawData.push(doc.data()));

        const grouped = { "ذكر": {}, "أنثى": {} };
        rawData.forEach(name => {
            const gender = name.gender;
            const type = name.type;
            if (!grouped[gender][type]) grouped[gender][type] = [];
            grouped[gender][type].push(name);
        });

        appState.namesData = grouped;
        appState.isLoading = false;
        console.log("📦 أسماء محملة:", appState.namesData);

    } catch (error) {
        console.error("🔥 Error loading from Firebase:", error);
        showError("فشل تحميل البيانات من Firebase");
    }
}

// إعداد الأحداث
function setupEventListeners() {
    DOM.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            DOM.navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    DOM.nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchNames();
    });

    document.getElementById('calculate-btn').addEventListener('click', calculatePregnancy);

    DOM.modal.closeBtn.addEventListener('click', closeModal);
    DOM.modal.shareBtns.whatsapp.addEventListener('click', shareOnWhatsApp);
    DOM.modal.shareBtns.facebook.addEventListener('click', shareOnFacebook);
    DOM.modal.shareBtns.twitter.addEventListener('click', shareOnTwitter);
    DOM.modal.downloadBtn.addEventListener('click', downloadNameCard);

    document.getElementById('browse-names').addEventListener('click', () => {
        showSection('name-generator');
        DOM.navItems[0].classList.add('active');
        DOM.navItems[2].classList.remove('active');
    });

    document.getElementById('random-name-btn').addEventListener('click', suggestRandomName);
}

// عرض قسم
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    section.classList.add('active');

    if (sectionId === 'saved-names') loadFavorites();
}

// بحث الأسماء
function searchNames() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const type = document.getElementById('type').value;
    const letter = document.getElementById('letter').value.trim();
    const length = parseInt(document.getElementById('length').value);

    let results = appState.namesData[gender];

    if (type !== 'all') {
        results = results[type] ? { [type]: results[type] } : {};
    }

    let allNames = [];
    Object.values(results).forEach(names => {
        allNames = allNames.concat(names);
    });

    const filtered = allNames.filter(name => {
        const matchesLetter = !letter || name.name.startsWith(letter);
        const matchesLength = isNaN(length) || name.length === length;
        return matchesLetter && matchesLength;
    });

    displayResults(filtered);
}

// عرض النتائج
function displayResults(names) {
    DOM.resultsCount.textContent = `${names.length} اسم`;

    if (names.length === 0) {
        DOM.nameResults.innerHTML = `
      <div class="empty-results">
        <i class="fas fa-search"></i>
        <p>لا توجد نتائج مطابقة لبحثك</p>
        <button class="secondary-btn" id="reset-search">
          <i class="fas fa-redo"></i> إعادة تعيين البحث
        </button>
      </div>
    `;
        document.getElementById('reset-search').addEventListener('click', () => {
            DOM.nameForm.reset();
            searchNames();
        });
        return;
    }

    DOM.nameResults.innerHTML = names.map(name => `
    <div class="name-card" data-name="${name.name}" data-meaning="${name.meaning}"
      data-letter="${name.starting_letter}" data-gender="${name.gender}" data-type="${name.type}">
      <div class="name"><a href="details.html?name=${name.name}" target="_blank">${name.name}</a></div>
      <div class="meaning">${name.meaning}</div>
      <div class="name-meta">
        <span><i class="fas fa-font"></i> ${name.starting_letter}</span>
        <span><i class="fas fa-hashtag"></i> ${name.length} أحرف</span>
      </div>
      <div class="name-actions">
        <button class="name-action-btn save"><i class="far fa-heart"></i> حفظ</button>
        <button class="name-action-btn share"><i class="fas fa-share-alt"></i> مشاركة</button>
      </div>
    </div>
  `).join('');

    document.querySelectorAll('.name-card .save').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.name-card');
            saveFavorite(card);
        });
    });

    document.querySelectorAll('.name-card .share').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.name-card');
            showNameCard(card);
        });
    });
}

// عشوائي
function suggestRandomName() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const type = document.getElementById('type').value;
    const letter = document.getElementById('letter').value.trim();

    let results = appState.namesData[gender];

    if (type !== 'all') {
        results = results[type] ? { [type]: results[type] } : {};
    }

    let allNames = [];
    Object.values(results).forEach(names => {
        allNames = allNames.concat(names);
    });

    const filtered = allNames.filter(name => {
        return (!letter || name.name.startsWith(letter));
    });

    if (filtered.length === 0) {
        showToast('لم يتم العثور على اسم بناءً على اختياراتك');
        return;
    }

    const random = filtered[Math.floor(Math.random() * filtered.length)];
    showToast(`تم اختيار الاسم: ${random.name}`);
    showNameCard(createNameCardElement(random));
}

function createNameCardElement(name) {
    return {
        dataset: {
            name: name.name,
            meaning: name.meaning,
            letter: name.starting_letter,
            gender: name.gender,
            type: name.type
        }
    };
}

// المفضلة
function saveFavorite(card) {
    const favorite = {
        name: card.dataset.name,
        meaning: card.dataset.meaning,
        letter: card.dataset.letter,
        gender: card.dataset.gender,
        type: card.dataset.type
    };

    if (!appState.favorites.some(f => f.name === favorite.name)) {
        appState.favorites.push(favorite);
        localStorage.setItem('favoriteNames', JSON.stringify(appState.favorites));
        const saveBtn = card.querySelector('.save');
        saveBtn.innerHTML = '<i class="fas fa-heart"></i> محفوظ';
        saveBtn.style.color = 'var(--accent-color)';
        showToast('تم حفظ الاسم في المفضلة');
    }
}

function loadFavorites() {
    if (appState.favorites.length === 0) {
        DOM.favoritesList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-heart-broken"></i>
        <p>لا توجد أسماء في المفضلة بعد</p>
        <button class="secondary-btn" id="browse-names">
          <i class="fas fa-search"></i> تصفح الأسماء
        </button>
      </div>
    `;
        return;
    }

    DOM.favoritesList.innerHTML = appState.favorites.map(name => `
    <div class="name-card">
      <div class="name">${name.name}</div>
      <div class="meaning">${name.meaning}</div>
      <div class="name-meta">
        <span><i class="fas fa-venus-mars"></i> ${name.gender}</span>
        <span><i class="fas fa-tag"></i> ${name.type}</span>
      </div>
      <div class="name-actions">
        <button class="name-action-btn remove"><i class="fas fa-trash-alt"></i> إزالة</button>
        <button class="name-action-btn share"><i class="fas fa-share-alt"></i> مشاركة</button>
      </div>
    </div>
  `).join('');

    document.querySelectorAll('.name-card .remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.closest('.name-card').querySelector('.name').textContent;
            removeFavorite(name);
        });
    });

    document.querySelectorAll('.name-card .share').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.name-card');
            showNameCard(card);
        });
    });
}

function removeFavorite(name) {
    appState.favorites = appState.favorites.filter(f => f.name !== name);
    localStorage.setItem('favoriteNames', JSON.stringify(appState.favorites));
    loadFavorites();
    showToast('تم إزالة الاسم من المفضلة');
}

function showNameCard(card) {
    DOM.modal.name.textContent = card.dataset.name;
    DOM.modal.meaning.textContent = card.dataset.meaning;
    DOM.modal.letter.textContent = card.dataset.letter;
    DOM.modal.gender.textContent = card.dataset.gender === 'ذكر' ? 'ولد' : 'بنت';
    DOM.modal.type.textContent = card.dataset.type;
    DOM.modal.container.classList.add('active');
}

function closeModal() {
    DOM.modal.container.classList.remove('active');
}

function shareOnWhatsApp() {
    const text = `إسم مميز: ${DOM.modal.name.textContent}\nمعناه: ${DOM.modal.meaning.textContent}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnFacebook() {
    const text = `إسم مميز: ${DOM.modal.name.textContent}\nمعناه: ${DOM.modal.meaning.textContent}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`, '_blank');
}

function shareOnTwitter() {
    const text = `إسم مميز: ${DOM.modal.name.textContent}\nمعناه: ${DOM.modal.meaning.textContent}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
}

function downloadNameCard() {
    const element = document.getElementById('share-card');
    html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `اسم-${DOM.modal.name.textContent}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function calculatePregnancy() {
    const lastPeriod = new Date(document.getElementById('last-period').value);
    const cycleLength = parseInt(document.getElementById('cycle-length').value) || 28;

    if (isNaN(lastPeriod.getTime())) {
        showToast('الرجاء إدخال تاريخ صحيح');
        return;
    }

    const dueDate = new Date(lastPeriod);
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dueDate.toLocaleDateString('ar-SA', options);

    const today = new Date();
    const diffTime = today - lastPeriod;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    DOM.pregnancyResult.innerHTML = `
    <div class="pregnancy-info">
      <div class="info-card">
        <h3><i class="fas fa-calendar-day"></i> موعد الولادة المتوقع</h3>
        <p>${formattedDate}</p>
      </div>
      <div class="info-card">
        <h3><i class="fas fa-clock"></i> عمر الحمل الحالي</h3>
        <p>${weeks} أسابيع و ${days} أيام</p>
      </div>
      <div class="progress-container">
        <h3><i class="fas fa-chart-line"></i> تقدم الحمل</h3>
        <div class="progress-bar">
          <div class="progress" style="width: ${Math.min(100, Math.floor((diffDays / 280) * 100))}%"></div>
        </div>
        <div class="progress-labels">
          <span>بداية الحمل</span>
          <span>${Math.floor((diffDays / 280) * 100)}%</span>
          <span>موعد الولادة</span>
        </div>
      </div>
      <button class="primary-btn share-pregnancy">
        <i class="fas fa-share-alt"></i> مشاركة النتيجة
      </button>
    </div>
  `;

    document.querySelector('.share-pregnancy').addEventListener('click', () => {
        sharePregnancyResult(formattedDate, weeks, days);
    });
}

function sharePregnancyResult(date, weeks, days) {
    const text = `موعد ولادتي المتوقع: ${date}\nعمر الحمل الحالي: ${weeks} أسابيع و ${days} أيام\nتم الحساب بواسطة مولّد الأسماء الذكي`;

    DOM.modal.name.textContent = 'حاسبة موعد الولادة';
    DOM.modal.meaning.textContent = text;
    DOM.modal.letter.textContent = '⌛';
    DOM.modal.gender.textContent = 'حاسبة';
    DOM.modal.type.textContent = 'موعد الولادة';

    DOM.modal.container.classList.add('active');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <p>${message}</p>
    <button class="retry-btn">إعادة المحاولة</button>
  `;
    DOM.nameResults.innerHTML = '';
    DOM.nameResults.appendChild(errorDiv);

    document.querySelector('.retry-btn').addEventListener('click', initApp);
}
