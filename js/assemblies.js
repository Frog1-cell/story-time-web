// assemblies.js - управление установкой через StoryTime-Manager

class InstallationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
        this.init();
    }

    init() {
        // Добавляем стили для уведомлений
        this.addNotificationStyles();
        console.log('StoryTime Manager UI инициализирован');
    }

    addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .stm-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--space-accent), var(--space-purple));
                color: white;
                padding: 16px 20px;
                border-radius: 12px;
                font-weight: 500;
                z-index: 10001;
                box-shadow: 0 8px 32px rgba(79, 46, 240, 0.4);
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 0.95rem;
                max-width: 380px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                animation: slideIn 0.5s forwards;
            }
            
            .stm-notification.error {
                background: linear-gradient(135deg, #ff4757, #ff3838);
                box-shadow: 0 8px 32px rgba(255, 71, 87, 0.3);
            }
            
            .stm-notification.warning {
                background: linear-gradient(135deg, #ffa502, #ff7f00);
                box-shadow: 0 8px 32px rgba(255, 165, 2, 0.3);
            }
            
            .stm-notification.success {
                background: linear-gradient(135deg, #2ed573, #1dd1a1);
                box-shadow: 0 8px 32px rgba(46, 213, 115, 0.3);
            }
            
            .stm-notification i {
                font-size: 1.2rem;
            }
            
            .stm-notification-content {
                flex: 1;
            }
            
            .stm-notification-title {
                font-weight: 600;
                margin-bottom: 4px;
                font-size: 1rem;
            }
            
            .stm-notification-message {
                opacity: 0.9;
                font-size: 0.85rem;
                line-height: 1.4;
            }
            
            .stm-notification-close {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                transition: all 0.2s;
            }
            
            .stm-notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .stm-progress-bar {
                height: 3px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                margin-top: 8px;
                overflow: hidden;
            }
            
            .stm-progress {
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 2px;
            }
            
            @keyframes slideIn {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOut {
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .stm-pulse {
                animation: pulse 1.5s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(type, title, message, duration = 5000) {
        // Удаляем старые уведомления, если их слишком много
        if (this.notifications.length >= this.maxNotifications) {
            const oldNotif = this.notifications.shift();
            if (oldNotif) {
                this.removeNotification(oldNotif.id);
            }
        }

        const id = 'stm-notif-' + Date.now();
        const notification = document.createElement('div');
        notification.id = id;
        notification.className = `stm-notification ${type}`;
        
        let icon = 'fas fa-info-circle';
        switch(type) {
            case 'error':
                icon = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                icon = 'fas fa-exclamation-triangle';
                break;
            case 'success':
                icon = 'fas fa-check-circle';
                break;
            case 'loading':
                icon = 'fas fa-spinner fa-spin';
                break;
        }

        notification.innerHTML = `
            <i class="${icon}"></i>
            <div class="stm-notification-content">
                <div class="stm-notification-title">${title}</div>
                <div class="stm-notification-message">${message}</div>
                ${type === 'loading' ? '<div class="stm-progress-bar"><div class="stm-progress"></div></div>' : ''}
            </div>
            <button class="stm-notification-close" onclick="window.stmManager.removeNotification('${id}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);
        this.notifications.push({ id, element: notification });

        // Автоматическое удаление через указанное время (кроме загрузки)
        if (type !== 'loading' && duration > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, duration);
        }

        return id;
    }

    removeNotification(id) {
        const notification = document.getElementById(id);
        if (notification) {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(n => n.id !== id);
            }, 300);
        }
    }

    updateProgress(id, progress) {
        const notification = document.getElementById(id);
        if (notification) {
            const progressBar = notification.querySelector('.stm-progress');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        }
    }

    downloadManager(type) {
        let url, filename, title, message;
        
        switch(type) {
            case 'windows':
                url = 'https://drive.google.com/file/d/1z1LUyy704r7EJKvAu2x6MP6bX7exEW7i/view?usp=sharing';
                filename = 'storytime-manager.exe';
                title = 'Скачивание для Windows';
                message = 'Загружаем portable версию менеджера...';
                break;
            case 'linux':
                url = 'https://drive.google.com/file/d/13eSCApoCfLPdGvhleCcYZjejhRYQIzmq/view?usp=sharing';
                filename = 'storytime-manager';
                title = 'Скачивание для Linux';
                message = 'Загружаем исполняемый файл для Linux...';
                break;
            case 'arch':
                this.showNotification(
                    'info',
                    'Установка на Arch Linux',
                    'Выполните команду в терминале:<br><code style="background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 4px; margin-top: 5px;">yay -S stm</code><br>Или используйте любой другой AUR-хелпер.',
                    8000
                );
                return;
            default:
                this.showNotification('error', 'Ошибка', 'Неизвестный тип операционной системы');
                return;
        }

        // Показываем уведомление о начале загрузки
        const notifId = this.showNotification('loading', title, message);
        
        // Симулируем прогресс загрузки
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            this.updateProgress(notifId, progress);
        }, 200);

        // Создаем скрытую ссылку для скачивания
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Обновляем уведомление о завершении
            clearInterval(progressInterval);
            this.updateProgress(notifId, 100);
            
            setTimeout(() => {
                this.removeNotification(notifId);
                this.showNotification(
                    'success',
                    'Скачивание завершено!',
                    'Файл сохранён в папке "Загрузки".<br>Запустите его и следуйте инструкциям.',
                    6000
                );
                
                // Показываем подсказку
                setTimeout(() => {
                    this.showNotification(
                        'info',
                        'Что делать дальше?',
                        '1. Запустите скачанный файл<br>2. Следуйте инструкциям в консоли<br>3. При возникновении проблем зайдите в наш Discord',
                        8000
                    );
                }, 1000);
            }, 500);
        }, 1500);
    }

    downloadAssembly(type) {
        if (type === 'direct-download') {
            this.showNotification(
                'warning',
                'Ручная установка временно недоступна',
                'Пожалуйста, используйте StoryTime-Manager для установки сборки.<br>Это проще, быстрее и надежнее!',
                6000
            );
            
            // Через 3 секунды показываем подсказку
            setTimeout(() => {
                this.showNotification(
                    'info',
                    'Почему менеджер лучше?',
                    '✓ Автоматически скачивает все зависимости<br>✓ Проверяет целостность файлов<br>✓ Обновляется в один клик<br>✓ Не требует ручной настройки',
                    8000
                );
            }, 3000);
        } else {
            this.showNotification(
                'error',
                'Устаревший метод установки',
                'Пожалуйста, используйте StoryTime-Manager для установки сборки.',
                5000
            );
        }
    }

    openDiscord() {
        this.showNotification(
            'info',
            'Открываем Discord',
            'Перенаправляем вас на наш сервер поддержки...',
            3000
        );
        
        setTimeout(() => {
            window.open('https://discord.gg/storytime', '_blank');
        }, 1000);
    }

    showSystemRequirements() {
        this.showNotification(
            'info',
            'Системные требования',
            'Проверяем минимальные требования...<br><br>' +
            '• Java 17+<br>' +
            '• 4GB RAM<br>' +
            '• 2GB свободного места',
            7000
        );
    }

    showInstallationGuide() {
        this.showNotification(
            'success',
            'Готовы начать установку?',
            '<strong>Просто выполните 3 шага:</strong><br><br>' +
            '1. Скачайте менеджер для вашей ОС<br>' +
            '2. Запустите программу<br>' +
            '3. Следуйте инструкциям в консоли',
            8000
        );
    }
}

// Инициализация менеджера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.stmManager = new InstallationManager();
    
    // Добавляем обработчики для всех кнопок скачивания
    document.querySelectorAll('[onclick*="downloadManager"]').forEach(button => {
        const oldOnClick = button.getAttribute('onclick');
        const match = oldOnClick.match(/downloadManager\('(\w+)'\)/);
        if (match) {
            button.removeAttribute('onclick');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.stmManager.downloadManager(match[1]);
            });
        }
    });
    
    document.querySelectorAll('[onclick*="downloadAssembly"]').forEach(button => {
        const oldOnClick = button.getAttribute('onclick');
        const match = oldOnClick.match(/downloadAssembly\('(\w+)'\)/);
        if (match) {
            button.removeAttribute('onclick');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.stmManager.downloadAssembly(match[1]);
            });
        }
    });
    
    // Добавляем обработчик для Discord кнопки
    const discordBtn = document.querySelector('[onclick*="discord"]');
    if (discordBtn) {
        const oldOnClick = discordBtn.getAttribute('onclick');
        discordBtn.removeAttribute('onclick');
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.stmManager.openDiscord();
        });
    }
    
    console.log('StoryTime Installation Manager загружен и готов к работе!');
});

// Функции для глобального доступа (обратная совместимость)
function downloadManager(type) {
    if (window.stmManager) {
        window.stmManager.downloadManager(type);
    } else {
        console.error('Менеджер не инициализирован');
    }
}

function downloadAssembly(type) {
    if (window.stmManager) {
        window.stmManager.downloadAssembly(type);
    } else {
        console.error('Менеджер не инициализирован');
    }
}