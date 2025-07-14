async function loadComponent(componentPath, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`Element with id ${placeholderId} not found.`);
        return;
    }

    // إضافة مؤشر تحميل
    placeholder.innerHTML = '<div class="loading-spinner">Loading...</div>';

    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        placeholder.innerHTML = data;

        // تهيئة الأحداث بعد تحميل الـ Header
        if (placeholderId === 'header') {
            initializeHeaderEvents();
        }
    } catch (error) {
        placeholder.innerHTML = '<div>Error loading component.</div>';
        console.error('Error loading component:', error);
    }
}

function initializeHeaderEvents() {
    // تهيئة زر القائمة للموبايل
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', () => {
            document.querySelector('body').classList.toggle('mobile-nav-active');
            mobileNavToggleBtn.classList.toggle('bi-list');
            mobileNavToggleBtn.classList.toggle('bi-x');
        });
    }

    // تهيئة زر تبديل الوضع الليلي
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const icon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // تطبيق الوضع المحفوظ
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme === 'dark');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateIcon(newTheme === 'dark');
    });

    function updateIcon(isDark) {
        if (isDark) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadComponent('header.html', 'header');
    await loadComponent('footer.html', 'footer');
    await loadComponent('contact-form.html', 'contact');
});