// Добавьте в начало main.js
(function() {
    // Устанавливаем правильные MIME-типы для ссылок
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            if (link.href && link.href.endsWith('.css')) {
                link.type = 'text/css';
            }
        });
        
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.src && script.src.endsWith('.js')) {
                script.type = 'application/javascript';
            }
        });
    });
})();

const SITE_CONFIG = {
    serverIP: 'story-time.playit.plus',
    discordLink: 'https://discord.gg/2Sc83ZvjNF',
    youtubeLink: 'https://www.youtube.com/@StoryTimeofficalchanel',
    youtubeSponsorLink: 'https://youtube.com/@sponsorchannel',
    twitchSponsorLink: 'https://twitch.tv/sponsorstream'
};

function getBaseUrl() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathname = window.location.pathname;
    
    let basePath = pathname;
    if (basePath.endsWith('.html')) {
        const lastSlash = basePath.lastIndexOf('/');
        basePath = basePath.substring(0, lastSlash + 1);
    }
    
    return `${protocol}//${host}${basePath}`;
}

function getSiteRoot() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathname = window.location.pathname;
    
    if (pathname.includes('/pages/')) {
        const segments = pathname.split('/');
        const rootPath = segments.slice(0, segments.length - 2).join('/') + '/';
        return `${protocol}//${host}${rootPath}`;
    }
    
    const segments = pathname.split('/');
    const rootPath = segments.slice(0, segments.length - 1).join('/') + '/';
    return `${protocol}//${host}${rootPath}`;
}

function createLeftSidebar() {
    const leftSidebar = document.querySelector('.sidebar-left .sidebar-content');
    if (!leftSidebar) return;
    
    const siteRoot = getSiteRoot();
    
    leftSidebar.innerHTML = `
        <div class="server-info">
            <div class="server-name">
                <i class="fas fa-book fa-fw"></i> Story Time
            </div>
        </div>

        <div class="nav-section">
            <div class="nav-title"><i class="fas fa-folder fa-fw"></i> Основные разделы</div>
            <ul class="nav-links">
                <li><a href="${siteRoot}index.html"><i class="fas fa-home fa-fw"></i> Главная</a></li>
                <li><a href="${siteRoot}pages/about-project.html"><i class="fas fa-info-circle fa-fw"></i> О проекте</a></li>
                <li><a href="${siteRoot}pages/assemblies.html"><i class="fas fa-download fa-fw"></i> Сборки</a></li>
                <li><a href="${siteRoot}pages/sponsors.html"><i class="fas fa-heart fa-fw"></i> Спонсорство</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <div class="nav-title"><i class="fas fa-gavel fa-fw"></i> Правила</div>
            <ul class="nav-links">
                <li><a href="${siteRoot}index.html#rules"><i class="fas fa-list fa-fw"></i> Основные правила</a></li>
                <li><a href="${siteRoot}pages/minecraft-rules.html"><i class="fas fa-cube fa-fw"></i> Правила Minecraft</a></li>
                <li><a href="${siteRoot}pages/discord.html"><i class="fab fa-discord fa-fw"></i> Discord</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <div class="nav-title"><i class="fas fa-life-ring fa-fw"></i> Полезное</div>
            <ul class="nav-links">
                <li><a href="${siteRoot}index.html#about-project"><i class="fas fa-info-circle fa-fw"></i> Особенности проекта</a></li>
                <li><a href="${siteRoot}index.html#about-us"><i class="fas fa-users fa-fw"></i> О нас</a></li>
                <li><a href="${siteRoot}index.html#support"><i class="fas fa-headset fa-fw"></i> Техподдержка</a></li>
            </ul>
        </div>
    `;
    
    highlightActivePage();
    attachSidebarEvents();
}

function highlightActivePage() {
    const currentUrl = window.location.href;
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        const isAnchor = href && href.includes('#');
        const li = link.parentElement;
        
        li.classList.remove('active');
        
        // Для якорных ссылок на главной
        if (isAnchor) {
            if (currentPath !== 'index.html' && currentPath !== '' && !currentPath.includes('index.html')) {
                return;
            }
        }
        
        // Сравниваем URL
        const linkUrl = href ? href.split('#')[0] : '';
        const currentUrlNoAnchor = currentUrl.split('#')[0];
        
        if (linkUrl === currentUrlNoAnchor) {
            li.classList.add('active');
        }
    });
}

function attachSidebarEvents() {
    // Обработчики для якорных ссылок на главной странице
    document.querySelectorAll('.nav-links a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                e.preventDefault();
                const parts = href.split('#');
                const pageUrl = parts[0];
                const anchor = parts[1];
                
                // Если это главная страница с якорем
                if (pageUrl.includes('index.html')) {
                    // Если мы уже на главной, просто скроллим
                    if (window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' || 
                        window.location.pathname.endsWith('/')) {
                        
                        const targetElement = document.querySelector(`#${anchor}`);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                            
                            // Обновляем URL без перезагрузки
                            window.history.pushState(null, '', `#${anchor}`);
                        }
                    } else {
                        // Если не на главной, переходим на главную с якорем
                        window.location.href = href;
                    }
                } else {
                    // Для других страниц просто переходим
                    window.location.href = href;
                }
            }
        });
    });

    // Обработчики для ссылок на другие страницы
    document.querySelectorAll('.nav-links a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Если это не якорная ссылка, устанавливаем активный класс
            if (!this.getAttribute('href').includes('#')) {
                document.querySelectorAll('.nav-links li').forEach(li => {
                    li.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            }
        });
    });
}

function connectToServer() {
    navigator.clipboard.writeText(SITE_CONFIG.serverIP).then(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: var(--github-success); 
            color: white; padding: 12px 20px; border-radius: 6px; 
            font-weight: 500; z-index: 10000; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        notification.textContent = 'IP скопирован! Вставьте в Minecraft.';
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    });
    return false;
}

function updateActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');
    
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
        if (link.getAttribute('href').endsWith(currentSection)) {
            link.parentElement.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createLeftSidebar();
    document.body.classList.add('loaded');
    
    // Удаляем правую панель из HTML
    const rightSidebar = document.querySelector('.sidebar-right');
    if (rightSidebar) {
        rightSidebar.remove();
    }
    
    // Для главной страницы добавляем отслеживание скролла
    const currentPath = window.location.pathname;
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection();
    }
    
    // Проверяем якорь в URL при загрузке страницы
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
});

window.addEventListener('popstate', highlightActivePage);

let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});