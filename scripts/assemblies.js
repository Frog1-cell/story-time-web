let selectedAssembly = null;

function openModal() {
    document.getElementById('downloadModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedAssembly = null;
    updateDownloadButton();
    resetSelection();
}

function selectAssembly(assembly) {
    selectedAssembly = assembly;
    updateDownloadButton();
    

    document.querySelectorAll('.assembly-option').forEach(option => {
        option.classList.remove('selected');
    });

    
    event.currentTarget.classList.add('selected');
}

function resetSelection() {
    document.querySelectorAll('.assembly-option').forEach(option => {
        option.classList.remove('selected');
    });
}

function updateDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (selectedAssembly) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Перейти к скачиванию`;
    } else {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Перейти к скачиванию`;
    }
}

function downloadSelected() {
    if (!selectedAssembly) return;
    

    const googleDiskLinks = {
        'standard': 'https://drive.google.com/file/d/1hPdGUxRHPIclfvHGUABl9uoDMq8H72sV/view?usp=sharing'
    };
    
    const googleDiskLink = googleDiskLinks[selectedAssembly];
    

    window.open(googleDiskLink, '_blank');
    

    showRedirectNotification();
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
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    notification.innerHTML = `
        <i class="fas fa-external-link-alt"></i>
        <div>
            <div>Открывается Google Disk</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">Скачайте файл оттуда</div>
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
