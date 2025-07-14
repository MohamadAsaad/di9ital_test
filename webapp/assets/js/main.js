/**
 * Digital Art - Main JavaScript File
 * يحتوي على جميع الوظائف الأساسية للموقع
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر الأساسية
    const appContent = document.getElementById('app-content');
    const loader = document.getElementById('loader');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const scrollTop = document.querySelector('.scroll-top');
    const header = document.querySelector('#header');

    // 2. التحقق من وجود العناصر الأساسية
    if (!appContent || !loader || !darkModeToggle) {
        console.error('Essential elements are missing!');
        return;
    }

    // 3. تهيئة المتغيرات العامة
    const appConfig = {
        darkMode: localStorage.getItem('darkMode') === 'enabled',
        currentPath: window.location.pathname,
        routes: {
            '/': { view: 'home', title: 'Digital Art - الرئيسية' },
            '/about': { view: 'about', title: 'من نحن - Digital Art' },
            '/services': { view: 'services', title: 'خدماتنا - Digital Art' },
            '/portfolio': { view: 'portfolio', title: 'أعمالنا - Digital Art' },
            '/pricing': { view: 'pricing', title: 'الأسعار - Digital Art' },
            '/faq': { view: 'faq', title: 'الأسئلة الشائعة - Digital Art' },
            '/contact': { view: 'contact', title: 'اتصل بنا - Digital Art' },
            '/404': {
                view: '404',
                title: '404 - الصفحة غير موجودة',
                isErrorPage: true
            }
        }
    };

    // 4. دوال المساعدة
    const showLoader = (show) => {
        if (show) {
            loader.style.display = 'flex';
            setTimeout(() => loader.classList.add('show'), 10);
        } else {
            loader.classList.remove('show');
            setTimeout(() => loader.style.display = 'none', 300);
        }
    };

    const updateActiveLinks = (currentPath) => {
        document.querySelectorAll('.router-link').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === currentPath);
        });
    };

    // 5. نظام التوجيه (Router)
    const loadView = async (path) => {
        try {
            showLoader(true);

            const routeInfo = appConfig.routes[path] || appConfig.routes['/404'];

            // تجنب الحلقة اللانهائية لصفحة 404
            if (routeInfo.isErrorPage) {
                renderErrorPage();
                return;
            }

            const response = await fetch(`/views/${routeInfo.view}.html`);

            if (!response.ok) {
                throw new Error('Failed to load page');
            }

            const content = await response.text();
            appContent.innerHTML = content;
            document.title = routeInfo.title;
            updateActiveLinks(path);
            initPageComponents(routeInfo.view);
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Error loading view:', error);
            renderErrorPage();
        } finally {
            showLoader(false);
        }
    };

    const renderErrorPage = () => {
        appContent.innerHTML = `
            <section class="section d-flex align-items-center" style="min-height: 80vh;">
                <div class="container text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <h2>الصفحة غير موجودة</h2>
                    <p>عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
                    <a href="/" class="btn btn-primary router-link">العودة إلى الرئيسية</a>
                </div>
            </section>
        `;
        document.title = '404 - الصفحة غير موجودة';
    };

    // 6. تهيئة المكونات الخاصة بالصفحات
    const initPageComponents = (view) => {
        // تهيئة العداد
        if (document.querySelector('.purecounter') && typeof PureCounter !== 'undefined') {
            new PureCounter();
        }

        // تهيئة Swiper لمنزلق الأعمال
        if (view === 'portfolio' && typeof Swiper !== 'undefined') {
            initPortfolioSlider();
        }

        // تهيئة الأسئلة الشائعة
        if (view === 'faq') {
            initFAQAccordions();
        }

        // تهيئة AOS للحركات
        if (typeof AOS !== 'undefined') {
            AOS.init({ once: true, duration: 600 });
        }

        // تهيئة GLightbox
        if (typeof GLightbox !== 'undefined' && document.querySelector('.glightbox')) {
            const lightbox = GLightbox({ selector: '.glightbox' });
        }
    };

    const initPortfolioSlider = () => {
        new Swiper('.portfolio-slider', {
            speed: 600,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 20 }
            }
        });
    };

    const initFAQAccordions = () => {
        document.querySelectorAll('.faq-question').forEach(item => {
            item.addEventListener('click', () => {
                const parent = item.closest('.faq-item');
                parent.classList.toggle('faq-active');
            });
        });
    };

    // 7. نظام الوضع المظلم
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        darkModeToggle.classList.replace(
            isDarkMode ? 'bi-moon-fill' : 'bi-sun-fill',
            isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill'
        );

        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    };

    // 8. الأحداث العامة
    const initEventListeners = () => {
        // أحداث الروابط
        document.body.addEventListener('click', e => {
            const link = e.target.closest('.router-link');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('href');
                window.history.pushState({}, '', path);
                loadView(path);
            }
        });

        // حدث تغيير المسار
        window.addEventListener('popstate', () => {
            loadView(window.location.pathname);
        });

        // حدث الوضع المظلم
        darkModeToggle.addEventListener('click', toggleDarkMode);

        // حدث زر التمرير لأعلى
        if (scrollTop) {
            scrollTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // 9. التهيئة الأولية
    const init = () => {
        // تطبيق الوضع المظلم إذا كان مفعلًا
        if (appConfig.darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }

        // تهيئة الأحداث
        initEventListeners();

        // تحميل العرض الأولي
        loadView(appConfig.currentPath);

        // حدث التمرير
        window.addEventListener('scroll', () => {
            // زر العودة للأعلى
            if (scrollTop) {
                scrollTop.classList.toggle('active', window.scrollY > 100);
            }

            // تأثير الهيدر
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 100);
            }
        });
    };

    // بدء التطبيق
    init();
});