// Функция подключения к серверу
function connectToServer() {
    const ip = 'story-time.playit.plus';
    navigator.clipboard.writeText(ip).then(() => {
        // Показываем уведомление о копировании
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: var(--github-success); 
            color: white; padding: 12px 20px; border-radius: 6px; 
            font-weight: 500; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = 'IP скопирован! Вставьте в Minecraft.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
    
    // Предотвращаем переход по ссылке
    return false;
}

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
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        updateActiveNav(`#${current}`);
    }
});

// Добавление класса загрузки
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Обработка ресайза
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});