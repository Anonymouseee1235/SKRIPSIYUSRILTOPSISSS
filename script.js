document.addEventListener("DOMContentLoaded", function () {
    populateTable();
    renderTopsisChart();
    renderAhpChart();
    handleMissingImages();
});

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabId + '-section');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    event.currentTarget.classList.add('active');
}

function handleMissingImages() {
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (!parent.querySelector('.img-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'img-fallback';
                fallback.style.cssText = 'background: #e2e8f0; padding: 25px 15px; border-radius: 8px; border: 2px dashed #cbd5e1; margin-bottom: 10px; color: #475569; font-size: 13px; font-weight: 600; text-align: center;';
                fallback.innerHTML = '<i class="fa-solid fa-image" style="font-size: 32px; color: #94a3b8; margin-bottom: 8px; display: block;"></i>Gambar Belum Ada di Folder <b>assets/</b><br><span style="font-size: 11px; color: #64748b; font-weight: normal;">(Salin file foto Anda & rename sesuai petunjuk Daftar Gambar)</span>';
                parent.insertBefore(fallback, this);
            }
        };
    });
}

function populateTable() {
    const tbody = document.getElementById("riskTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    DASHBOARD_CONFIG.failureData.forEach(item => {
        let badgeClass = "rank-badge";
        if (item.rank === 1) badgeClass += " rank-1";
        else if (item.rank === 2) badgeClass += " rank-2";
        else if (item.rank === 3) badgeClass += " rank-3";

        const row = `
            <tr>
                <td><span class="${badgeClass}"><i class="fa-solid fa-medal"></i> #${item.rank}</span></td>
                <td><strong>${item.code}</strong></td>
                <td><strong>${item.component}</strong></td>
                <td>${item.mode}</td>
                <td>${item.s}</td>
                <td>${item.o}</td>
                <td>${item.d}</td>
                <td>${item.rpn} <em style="color:#ef4444; font-size:12px;">(#${item.rpnRank})</em></td>
                <td style="background-color: #f8fafc; font-size: 16px;"><strong>${item.cci.toFixed(4)}</strong></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderTopsisChart() {
    const canvas = document.getElementById('topsisChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels = DASHBOARD_CONFIG.failureData.map(d => d.component);
    const data = DASHBOARD_CONFIG.failureData.map(d => d.cci);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nilai Preferensi (CCi)',
                data: data,
                backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6', '#64748b', '#94a3b8', '#cbd5e1'],
                borderRadius: 8, borderWidth: 1, borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 0.8 }, x: { grid: { display: false } } }
        }
    });
}

function renderAhpChart() {
    const canvas = document.getElementById('ahpChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: DASHBOARD_CONFIG.ahpWeights.labels,
            datasets: [{
                data: DASHBOARD_CONFIG.ahpWeights.weights,
                backgroundColor: ['#1e3c72', '#3b82f6', '#93c5fd'],
                borderWidth: 2, borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            cutout: '60%',
            plugins: { legend: { position: 'bottom', labels: { padding: 15, font: {size: 12, weight: 'bold'} } } }
        }
    });
}
