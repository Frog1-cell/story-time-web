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