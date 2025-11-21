let selectedAssembly = null;

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
    const names = {
        'standard': 'Standard Version',
        'enhanced': 'Optimal Version'
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
    
    const googleDiskLinks = {
        'standard': 'https://drive.google.com/file/d/1x4ITehiU9z02U_99RV-P8KpAiv-SmNn1/view?usp=sharing',
        'enhanced': 'https://drive.google.com/file/d/your-enhanced-assembly-link/view?usp=sharing'
    };
    
    const googleDiskLink = googleDiskLinks[selectedAssembly];
    
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