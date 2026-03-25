const views = {
    overview: `
        <div class="bento-grid">
            <div class="bento-card stat-primary fade-up" style="grid-column: span 2; background: linear-gradient(135deg, #10b981 0%, #047a55 100%); color: white;">
                <h2>Welcome back, Dr. Vance.</h2>
                <p style="opacity:0.9;">System integrity is at 99.8%. 12 new sequence batches waiting for review.</p>
                <div style="margin-top:20px; font-size: 2rem; font-weight: 800;">4,281 <span style="font-size:1rem;font-weight:400;opacity:0.8;">Samples Analyzed Today</span></div>
            </div>
            
            <div class="bento-card fade-up">
                <div class="stat-icon" style="color:#10b981"><i class="fa-solid fa-microscope"></i></div>
                <div><h3>96.8%</h3><small>CRISPR Accuracy</small></div>
            </div>
            
            <div class="bento-card fade-up">
                <div class="stat-icon" style="color:#0ea5e9"><i class="fa-solid fa-server"></i></div>
                <div><h3>14.2TB</h3><small>Processed Data</small></div>
            </div>

            <div class="bento-card fade-up" style="grid-column: span 2; grid-row: span 2;">
                <h4>Global Node Activity</h4>
                <div class="chart-wrapper">
                    <canvas id="lineChart" style="margin-top:15px;"></canvas>
                </div>
            </div>
            
            <div class="bento-card fade-up" style="grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column;">
                <h4>Active Personnel Overview</h4>
                <div class="team-list" style="margin-top: 15px; display:flex; flex-direction: column; gap: 15px;">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <img src="assets/img_scientist.webp" style="width:45px; height:45px; border-radius:50%; object-fit:cover; border:2px solid #10b981;">
                        <div>
                            <strong>Dr. Emily Chen</strong><br><small style="color:var(--text-muted);">Lead Geneticist</small>
                        </div>
                        <span class="tag tag-green" style="margin-left:auto;">In Lab</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:15px;">
                        <img src="assets/img_team.webp" style="width:45px; height:45px; border-radius:50%; object-fit:cover; border:2px solid #0ea5e9;">
                        <div>
                            <strong>Julian Thorne</strong><br><small style="color:var(--text-muted);">Neural Architect</small>
                        </div>
                        <span class="tag tag-blue" style="margin-left:auto;">Computing</span>
                    </div>
                </div>
            </div>
        </div>`,

    research: `
        <div class="bento-grid">
            <div class="bento-card fade-up">
                <h4>Active Projects</h4>
                <div style="font-size:2.5rem; font-weight:800; color:#10b981;">12</div>
            </div>
            <div class="bento-card fade-up">
                <h4>Pending Reviews</h4>
                <div style="font-size:2.5rem; font-weight:800; color:#f59e0b;">5</div>
            </div>
            <div class="bento-card fade-up" style="grid-column: span 2;">
                <h4>Resource Allocation</h4>
                <div class="chart-wrapper">
                    <canvas id="barChart"></canvas>
                </div>
            </div>
            <div class="bento-card fade-up" style="grid-column: span 4;">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <h4>Neo-Pathology Study</h4>
                    <span class="tag" style="background:#e0f2fe; color:#0369a1;">Sequencing</span>
                </div>
                <img src="assets/img_abstract.webp" style="width:100%; height:150px; object-fit:cover; border-radius:12px; margin-bottom:15px;">
                <p style="color:var(--text-muted); font-size:0.9rem;">Mapping localized molecular structures in neural tissue regeneration.</p>
            </div>
        </div>`,

    sequencing: `
        <div class="bento-grid">
            <div class="bento-card fade-up" style="grid-column: span 2;">
                <h4>Sequence Quality Trends</h4>
                <div class="chart-wrapper">
                    <canvas id="seqLineChart"></canvas>
                </div>
            </div>
            <div class="bento-card fade-up" style="grid-column: span 2;">
                <h4>Genome Variants Found</h4>
                <div class="chart-wrapper">
                    <canvas id="seqPieChart"></canvas>
                </div>
            </div>
        </div>`,

    staff: `
        <div class="bento-grid">
            <div class="bento-card fade-up" style="grid-column: span 4;">
                <h4>Personnel Management API</h4>
                <p style="color:var(--text-muted); margin-top:10px;">Connect to Identity Nodes for cross-referencing lab clearance protocols.</p>
            </div>
        </div>`,

    settings: `<div class="bento-card fade-up"><h4>System Nodes</h4><p>Security configuration and Neural Keys active.</p></div>`
};

function showData(type, btn) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    btn.classList.add('active');
    const container = document.getElementById('dynamicContent');
    container.innerHTML = views[type];

    if (type === 'overview') {
        setTimeout(() => renderChart('lineChart', 'line', ['Jan', 'Feb', 'Mar', 'Apr'], [65, 80, 95, 125], '#10b981'), 100);
    } else if (type === 'research') {
        setTimeout(() => renderChart('barChart', 'bar', ['Study A', 'Study B', 'Study C'], [85, 42, 67], '#10b981'), 100);
    } else if (type === 'sequencing') {
        setTimeout(() => {
            renderChart('seqLineChart', 'line', ['Wk1', 'Wk2', 'Wk3', 'Wk4'], [92, 98, 94, 99], '#0ea5e9');
            renderChart('seqPieChart', 'pie', ['Type A', 'Type B'], [60, 40], ['#10b981', '#0ea5e9']);
        }, 100);
    }
}

function renderChart(id, type, labels, data, colors) {
    const ctx = document.getElementById(id);
    if (!ctx) return;

    // Destroy old chart if exists (prevents stacking issues)
    if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
    }

    ctx.chartInstance = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: Array.isArray(colors) ? "#fff" : colors,
                tension: 0.4,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 🔥 important
            layout: {
                padding: 10
            },
            plugins: {
                legend: {
                    display: type !== "line" && type !== "bar"
                }
            },
            scales: type !== "pie" ? {
                x: {
                    ticks: { autoSkip: true, maxTicksLimit: 6 }
                },
                y: {
                    beginAtZero: true
                }
            } : {}
        },
    });
}

function loadUserData() {
    const role = "Director";
    const email = "vance@neogenix.bio";
    const name = "Dr. Aria Vance";

    document.getElementById("userRole").textContent = role;
    document.getElementById("userEmail").textContent = email;
    document.getElementById("userAvatar").src = "assets/img_scientist.webp";
    document.getElementById("userAvatar").style.objectFit = "cover";
}

function createMenuToggle() {
    const btn = document.createElement("div");
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    btn.style.fontSize = "1.3rem";
    btn.style.cursor = "pointer";
    document.querySelector(".header-left").prepend(btn);
    btn.onclick = () => { document.querySelector(".sidebar").classList.toggle("active"); };
}

const originalShowData = showData;
showData = function (type, btn) {
    originalShowData(type, btn);
};

function logout() { window.location.href = "login.html"; }

window.onload = () => {
    showData('overview', document.querySelector('.nav-link.active'));
    loadUserData();
    createMenuToggle();
};
