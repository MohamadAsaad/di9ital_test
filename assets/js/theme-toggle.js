document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');

    if (!themeToggleBtn) return; // زر غير موجود

    // التحقق من التفضيل الحالي
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeToggleBtn.textContent = '☀️';
    } else {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '🌙';
    }

    // عند الضغط على الزر
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '☀️';
        }
    });
});
