
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
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Скачать ${getAssemblyName(selectedAssembly)}`;
    } else {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Скачать выбранную сборку`;
    }
}

function getAssemblyName(assembly) {
    const names = {
        'standard': 'Standard Version',
        'modified_files': 'Standard Version Modified (Files)',
        'modified_full': 'Standard Version Modified (Full)'
    };
    return names[assembly] || 'сборку';
}

function downloadSelected() {
    if (!selectedAssembly) return;
    

    const filePaths = {
        'standard': 'assemblies/S-V.zip',
        'modified_files': 'assemblies/S-V-M-FS.zip',
        'modified_full': 'assemblies/S-V-M-FF.zip'
    };
    
    const filePath = filePaths[selectedAssembly];
    const fileName = filePath.split('/').pop();
    

    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    

    showDownloadNotification(fileName);
    closeModal();
}

function showDownloadNotification(fileName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--github-success);
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
        <i class="fas fa-check-circle"></i>
        <div>
            <div>Сборка скачивается</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${fileName}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
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