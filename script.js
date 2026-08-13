// Script Render Dashboard & Interactivity
document.addEventListener("DOMContentLoaded", function () {
    populateTable();
    renderTopsisChart();
    renderAhpChart();
});

// Tab Switching Function
function switchTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Deactivate all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab & set button active
    const selectedTab = document.getElementById(tabId + '-section');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Set button state
    event.currentTarget.classList.add('active');
}

// Populate Table
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
                <td><span class="${badgeClass}">#${item.rank}</span></td>
                <td><strong>${item.code}</strong></td>
                <td><strong>${item.component}</strong></td>
                <td>${item.mode}</td>
                <td>${item.s}</td>
                <td>${item.o}</td>
                <td>${item.d}</td>
                <td>${item.rpn}</td>
                <td><strong>${item.cci.toFixed(4)}</strong></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Render TOPSIS Bar Chart
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
                backgroundColor: [
                    '#dc2626', '#f59e0b', '#3b82f6', '#64748b', '#94a3b8', '#cbd5e1'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 0.8 }
            }
        }
    });
}

// Render AHP Pie Chart
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
                backgroundColor: ['#1e3c72', '#3b82f6', '#93c5fd']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
