// Функция для загрузки сайдбаров
function loadSidebars() {
    // Загружаем левый сайдбар
    fetch('../components/left-sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Left sidebar not found');
            }
            return response.text();
        })
        .then(data => {
            const leftSidebar = document.querySelector('.sidebar-left .sidebar-content');
            if (leftSidebar) {
                leftSidebar.innerHTML = data;
                highlightActivePage();
                attachSidebarEvents();
                fixMainPageStyles(); // Добавляем фикс стилей для главной страницы
            }
        })
        .catch(error => {
            console.error('Error loading left sidebar:', error);
            createFallbackSidebar();
        });

    // Загружаем правый сайдбар
    fetch('../components/right-sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Right sidebar not found');
            }
            return response.text();
        })
        .then(data => {
            const rightSidebar = document.querySelector('.sidebar-right .sidebar-content');
            if (rightSidebar) {
                rightSidebar.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading right sidebar:', error);
            createFallbackRightSidebar();
        });
}

// Функция для создания fallback правого сайдбара
function createFallbackRightSidebar() {
    const rightSidebar = document.querySelector('.sidebar-right .sidebar-content');
    if (rightSidebar) {
        rightSidebar.innerHTML = `
            <div class="meta-info">
                <div class="meta-section">
                    <h4><i class="fas fa-info-circle"></i> Информация</h4>
                    <div class="meta-item">
                        <span class="meta-label"><i class="fas fa-user"></i> Создатель:</span>
                        <span class="meta-value">Frog_o21</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Функция для фикса стилей на главной странице
function fixMainPageStyles() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPath === 'index.html' || currentPath === '' || currentPath.includes('index.html')) {
        // Убираем отступы у ссылок на якоря на главной странице
        const style = document.createElement('style');
        style.textContent = `
            .nav-links a[href^="#"] {
                padding: 8px 12px !important;
                margin: 0 !important;
            }
            .nav-links li {
                border-left: 2px solid transparent !important;
                margin-bottom: 2px !important;
            }
            .nav-links li.active {
                border-left-color: var(--github-accent) !important;
                background-color: rgba(255, 255, 255, 0.03) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Остальные функции остаются без изменений...
function createFallbackSidebar() {
    const leftSidebar = document.querySelector('.sidebar-left .sidebar-content');
    if (leftSidebar) {
        leftSidebar.innerHTML = `
            <div class="server-info">
                <div class="server-name">
                    <i class="fas fa-book fa-fw"></i> Story Time
                </div>
            </div>

            <div class="nav-section">
                <div class="nav-title"><i class="fas fa-folder fa-fw"></i> Основные разделы</div>
                <ul class="nav-links">
                    <li><a href="index.html"><i class="fas fa-home fa-fw"></i> Главная</a></li>
                    <li><a href="assemblies.html"><i class="fas fa-download fa-fw"></i> Сборки</a></li>
                    <li><a href="sponsors.html"><i class="fas fa-heart fa-fw"></i> Спонсорство</a></li>
                </ul>
            </div>

            <div class="nav-section">
                <div class="nav-title"><i class="fas fa-chart-line fa-fw"></i> Игровая статистика</div>
                <ul class="nav-links">
                    <li><a href="clans.html"><i class="fas fa-users fa-fw"></i> Кланы</a></li>
                </ul>
            </div>

            <div class="nav-section">
                <div class="nav-title"><i class="fas fa-play-circle fa-fw"></i> Начало игры</div>
                <ul class="nav-links">
                    <li><a href="index.html#discord-registration"><i class="fab fa-discord fa-fw"></i> Регистрация в Discord</a></li>
                    <li><a href="index.html#getting-started"><i class="fas fa-plug fa-fw"></i> Подключение к серверу</a></li>
                    <li><a href="index.html#rules"><i class="fas fa-gavel fa-fw"></i> Правила сервера</a></li>
                    <li><a href="index.html#discord-rules"><i class="fas fa-scroll fa-fw"></i> Правила Discord</a></li>
                </ul>
            </div>

            <div class="nav-section">
                <div class="nav-title"><i class="fas fa-life-ring fa-fw"></i> Полезное</div>
                <ul class="nav-links">
                    <li><a href="index.html#support"><i class="fas fa-headset fa-fw"></i> Техподдержка</a></li>
                </ul>
            </div>
        `;
        highlightActivePage();
        attachSidebarEvents();
        fixMainPageStyles();
    }
}

// Функция для подсветки активной страницы
function highlightActivePage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        const linkPath = href.split('#')[0]; 
        
        link.parentElement.classList.remove('active');
        
        if (linkPath === currentPath || 
            (currentPath === '' && linkPath === 'index.html') ||
            (currentPath === 'index.html' && linkPath === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
}

// Функция для привязки событий сайдбара
function attachSidebarEvents() {
    // Обработка кликов по навигационным ссылкам
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем активный раздел
                    document.querySelectorAll('.nav-links li').forEach(li => {
                        li.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }
            }
        });
    });

    // Обработка кликов по ссылкам на страницы
    document.querySelectorAll('.nav-links a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                document.body.classList.remove('loaded');
            }
        });
    });
}

// Функция для копирования IP сервера
function connectToServer() {
    const ip = 'story-time.playit.plus';
    navigator.clipboard.writeText(ip).then(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: var(--github-success); 
            color: white; padding: 12px 20px; border-radius: 6px; 
            font-weight: 500; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = 'IP скопирован! Вставьте в Minecraft.';
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    });
    return false;
}

// Функция для обновления активного раздела (для главной страницы)
function updateActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.parentElement.classList.add('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadSidebars();
    document.body.classList.add('loaded');
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection();
    }
});

// Обработка изменения размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});