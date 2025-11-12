// scripts/assemblies.js
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
    
    // Сбрасываем выделение у всех вариантов
    document.querySelectorAll('.assembly-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Выделяем выбранный вариант
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
        'lite': 'Lite Version',
        'standard': 'Standard Version', 
        'full': 'Full Version',
        'ultra': 'Ultra Version'
    };
    return names[assembly] || 'сборку';
}

function downloadSelected() {
    if (!selectedAssembly) return;
    
    // Пути к файлам в папке assemblies
    const filePaths = {
        'lite': 'assemblies/storytime-lite-v2.1.0.zip',
        'standard': 'assemblies/storytime-standard-v2.1.0.zip',
        'full': 'assemblies/storytime-full-v2.1.0.zip',
        'ultra': 'assemblies/storytime-ultra-v2.1.0.zip'
    };
    
    const filePath = filePaths[selectedAssembly];
    const fileName = filePath.split('/').pop();
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Показываем уведомление
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

// Закрытие модального окна по клику вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('downloadModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});