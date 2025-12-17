let selectedAssembly = null;
let archiveConfig = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            archiveConfig = config.archive;
        })
        .catch(error => {
            console.error('Error loading config:', error);
            archiveConfig = {
                'standard-v3': { name: 'Standard Version v0.3' },
                'standard-v2': { name: 'Standard Version v0.2' },
                'enhanced-v2': { name: 'Optimal Version v0.2' },
                'standard': { name: 'Standard Version v0.1' },
                'enhanced': { name: 'Optimal Version v0.1' }
            };
        });
});

function toggleAssembly(assemblyId) {
    const content = document.getElementById(`${assemblyId}-content`);
    const header = event.currentTarget;
    
    document.querySelectorAll('.assembly-content').forEach(item => {
        if (item.id !== `${assemblyId}-content`) {
            item.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.assembly-header-btn').forEach(btn => {
        if (btn !== header) {
            btn.classList.remove('active');
        }
    });
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

function downloadAssembly(assembly) {
    selectedAssembly = assembly;
    const assemblyName = getAssemblyName(assembly);
    document.getElementById('modalMessage').textContent = `Вы будете перенаправлены на Google Disk для скачивания сборки "${assemblyName}".`;
    openModal();
}

function getAssemblyName(assembly) {
    if (archiveConfig && archiveConfig[assembly]) {
        return archiveConfig[assembly].name;
    }
    const names = {
        'standard-v3': 'Standard Version v0.3',
        'standard': 'Standard Version v0.1',
        'enhanced': 'Optimal Version v0.1',
        'standard-v2': 'Standard Version v0.2',
        'enhanced-v2': 'Optimal Version v0.2'
    };
    return names[assembly] || 'Сборка';
}

function openModal() {
    document.getElementById('downloadModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedAssembly = null;
}

function confirmDownload() {
    if (!selectedAssembly) return;
    
    let googleDiskLink = null;
    
    if (archiveConfig && archiveConfig[selectedAssembly]) {
        googleDiskLink = archiveConfig[selectedAssembly].download;
    }
    
    if (!googleDiskLink) {
        const googleDiskLinks = {
            'standard-v3': 'https://drive.google.com/file/d/10_A6d2nWk7NxaACHGxyClNcR-G2GoQsh/view?usp=sharing',
            'standard': 'https://drive.google.com/file/d/1x4ITehiU9z02U_99RV-P8KpAiv-SmNn1/view?usp=sharing',
            'enhanced': 'https://drive.google.com/file/d/1uyXdXHd-952l39aAg7QuYrVXrxlRWxjg/view?usp=sharing',
            'standard-v2': 'https://drive.google.com/file/d/1OPnZ2Fk3L43ToUadJ-d1Et2SimfxIwl0/view?usp=sharing',
            'enhanced-v2': 'https://drive.google.com/file/d/1riV5hrmKr4Bx7A4PTGegGRv7y58G1733/view?usp=sharing'
        };
        googleDiskLink = googleDiskLinks[selectedAssembly];
    }
    
    if (googleDiskLink) {
        window.open(googleDiskLink, '_blank');
        showRedirectNotification();
    }
    
    closeModal();
}

function showRedirectNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--github-accent);
        color: white;
        padding: 16px 24px;
        border-radius: 6px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
    `;
    notification.innerHTML = `
        <i class="fas fa-external-link-alt"></i>
        <div>
            <div>Открывается Google Disk</div>
            <div style="font-size: 0.8rem; opacity: 0.9;">Скачайте файл оттуда</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('click', function(event) {
    const modal = document.getElementById('downloadModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});