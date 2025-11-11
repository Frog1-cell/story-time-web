// Плавная прокрутка для навигации
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Обновление активного пункта меню
            updateActiveNav(this.getAttribute('href'));
        }
    });
});

// Обновление активного пункта меню
function updateActiveNav(targetHref) {
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-links a[href="${targetHref}"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('active');
    }
}

// Обновление активного пункта меню при прокрутке
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.content-section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        updateActiveNav(`#${current}`);
    }
});

// Динамическое обновление статистики (пример)
function updateViewCount() {
    const viewCountElement = document.querySelector('.meta-item:nth-child(3) strong');
    if (viewCountElement) {
        const currentViews = parseInt(viewCountElement.textContent.replace(',', '')) || 1247;
        viewCountElement.textContent = (currentViews + 1).toLocaleString();
    }
}

// Имитация увеличения счетчика просмотров
document.addEventListener('DOMContentLoaded', function() {
    updateViewCount();
    
    // Обновление времени последнего изменения
    const lastUpdated = document.querySelector('.meta-item:nth-child(2) strong');
    if (lastUpdated) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        lastUpdated.textContent = now.toLocaleDateString('ru-RU', options);
    }
});

// Добавление класса загрузки для плавного появления
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Обработка ресайза окна
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});
// Обновление активности в реальном времени
function updateActivity() {
    const activities = [
        { user: "Player123", action: "завершил квест 'Драконья пещера'", time: "5 минут назад" },
        { user: "BuilderPro", action: "построил новый город", time: "15 минут назад" },
        { user: "Miner42", action: "нашел редкий ресурс", time: "30 минут назад" }
    ];
    
    const activityContainer = document.querySelector('.meta-section:last-child');
    if (activityContainer) {
        // Можно добавить динамическое обновление активности
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateViewCount();
    updateActivity();
    
    // Обновление времени последнего изменения
    const lastUpdated = document.querySelector('.meta-item:nth-child(2) .meta-value');
    if (lastUpdated) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        lastUpdated.textContent = now.toLocaleDateString('ru-RU', options);
    }
});