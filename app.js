const views = {
  overview: `
    <div class="bento-grid">
        <div class="bento-card fade-up" style="grid-column: span 2; background: linear-gradient(135deg, #10b981 0%, #047a55 100%); color: white;">
            <h2>Patient Portal: Active</h2>
            <p style="opacity:0.9;">Your latest sequencing results and neural diagnostics are ready for review.</p>
            <button class="tag" style="margin-top:20px; border:none; background:rgba(255,255,255,0.2); color:white; padding:8px 16px; cursor:pointer;">View Final Reports</button>
        </div>

        <div class="bento-card fade-up">
            <div class="stat-icon" style="color:#0ea5e9"><i class="fa-solid fa-flask"></i></div>
            <div><h3>4</h3><small>Active Studies</small></div>
        </div>

        <div class="bento-card fade-up">
            <div class="stat-icon" style="color:#10b981"><i class="fa-solid fa-check"></i></div>
            <div><h3>Top 5%</h3><small>Genetic Resilience</small></div>
        </div>

        <div class="bento-card fade-up" style="grid-column: span 2; grid-row: span 2;">
            <h4>Biomarker History</h4>
            <canvas id="mainChart"></canvas>
        </div>

        <div class="bento-card fade-up" style="grid-column: span 2; grid-row: span 2;">
            <h4>Sequence Quality Split</h4>
            <canvas id="sideChart"></canvas>
        </div>
    </div>`,

  myResearch: `
    <div class="bento-grid">
        <div class="bento-card fade-up" style="grid-column: span 4;">
            <div style="display:flex; justify-content:space-between;">
                <div>
                    <h4 style="color:var(--secondary); font-size:1.4rem;">Cancer Genomics Study</h4>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-top:4px;">Comprehensive analysis of genetic mutations in breast cancer patients.</p>
                </div>
                <span class="tag tag-green">Active Node</span>
            </div>
            
            <div style="display:flex; gap:20px; margin:20px 0; flex-wrap:wrap; border-top: 1px solid rgba(0,0,0,0.05); padding-top:20px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-users" style="color:#0ea5e9;"></i> <strong>4</strong> members
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-sack-dollar" style="color:#10b981;"></i> <strong>$500K</strong> budget
                </div>
            </div>

            <div style="height:12px; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                <div style="width: 67%; height:100%; background: linear-gradient(90deg, #10b981, #0ea5e9);"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:0.85rem; font-weight:600;">
                <span style="color:var(--text-muted);">Compile Progress</span>
                <strong style="color:#10b981">67%</strong>
            </div>
        </div>
        
        <div class="bento-card fade-up" style="grid-column: span 4; background: var(--bg-light);">
            <div style="display:flex; justify-content:space-between;">
                <div>
                    <h4 style="color:var(--secondary); font-size:1.4rem;">Alzheimer's Early-Stage Biomarkers</h4>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-top:4px;">Identifying novel protein structures.</p>
                </div>
                <span class="tag" style="background:#e2e8f0; color:var(--text-muted);">Queued</span>
            </div>
        </div>
    </div>`,

  messages: `
    <div class="bento-grid">
        <div class="bento-card fade-up" style="grid-column: span 4;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h4>Direct Communication Hub</h4>
                <button class="tag tag-blue" style="border:none; cursor:pointer;" onclick="window.location.href='404.html'">+ New Comms</button>
            </div>
            
            <div style="display:flex; gap:15px; padding:20px; border-radius:16px; background:#f8fafc; border:1px solid #e2e8f0; margin-bottom:15px; transition: 0.3s; cursor:pointer;">
                <img src="assets/img_scientist.webp" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
                <div style="flex-grow:1;">
                    <div style="display:flex; justify-content:space-between;">
                        <strong>Dr. Aria Vance</strong>
                        <span style="font-size:0.75rem; color:var(--text-muted);">2h ago</span>
                    </div>
                    <p style="font-size:0.9rem; font-weight:600; color:#10b981; margin:4px 0;">Urgent: Sequencing Log Ready</p>
                    <p style="font-size:0.85rem; color:var(--text-muted);">The latest batches have cleared Phase 3 trials successfully.</p>
                </div>
            </div>

            <div style="display:flex; gap:15px; padding:20px; border-radius:16px; background:#f8fafc; border:1px solid #e2e8f0; transition: 0.3s; cursor:pointer;">
                <div class="stat-icon" style="background:#e2e8f0; color:var(--secondary); width:50px; height:50px; flex-shrink:0;"><i class="fa-solid fa-robot"></i></div>
                <div style="flex-grow:1;">
                    <div style="display:flex; justify-content:space-between;">
                        <strong>Automated System</strong>
                        <span style="font-size:0.75rem; color:var(--text-muted);">Yesterday</span>
                    </div>
                    <p style="font-size:0.9rem; font-weight:600; color:var(--secondary); margin:4px 0;">Node Maintenance</p>
                    <p style="font-size:0.85rem; color:var(--text-muted);">Server Alpha will be off-grid for standard 30-min purge.</p>
                </div>
            </div>
        </div>
    </div>`,

  profile: `
    <div class="bento-grid">
        <div class="bento-card fade-up" style="grid-column: span 2; text-align:center; padding-top:40px;">
            <div style="position:relative; width:120px; margin:0 auto 20px;">
                <img src="assets/img_team.webp" style="width:120px; height:120px; border-radius:30px; box-shadow:0 15px 30px rgba(16, 185, 129, 0.2); object-fit:cover;">
            </div>
            <h3 style="font-size:1.6rem;">Patient #BN-992</h3>
            <p style="color:var(--text-muted); font-size:0.9rem; margin-top:5px;">NeoGenix Subject</p>
            <div style="display:flex; justify-content:center; gap:10px; margin-top:20px;">
                <span class="tag tag-green">Analyzed</span>
                <span class="tag tag-blue">Phase 2</span>
            </div>
        </div>

        <div class="bento-card fade-up" style="grid-column: span 2;">
            <h4>Biologic Profile</h4>
            <div style="margin-top:20px; display:grid; gap:16px; font-size:1rem;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
                    <span style="color:var(--text-muted);">Assigned Division</span>
                    <strong>Somatic Research</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
                    <span style="color:var(--text-muted);">Primary Location</span>
                    <strong>Geneva Node, CH</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Integration Date</span>
                    <strong>Oct 2025</strong>
                </div>
            </div>
        </div>
    </div>`,

  billing: `
    <div class="bento-grid">
        <div class="bento-card fade-up" style="grid-column: span 4; background: linear-gradient(135deg, #0ea5e9 0%, #1e293b 100%); color:white;">
            <p style="opacity:0.8; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px;">Active Tier</p>
            <h2 style="margin:10px 0; font-size:2.5rem; color:white;">Pro-Researcher</h2>
            <p style="opacity:0.9;">Node Renewal: <strong>April 28, 2026</strong></p>
        </div>

        <div class="bento-card fade-up" style="grid-column: span 4;">
            <h4>Data Computation Limits</h4>
            <div style="margin-top:20px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                    <span>Quantum Storage (14.2TB / 50.0TB)</span>
                    <strong style="color:#0ea5e9;">28%</strong>
                </div>
                <div style="height:12px; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                    <div style="width:28%; height:100%; background:#0ea5e9;"></div>
                </div>
            </div>
            <div style="margin-top:25px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                    <span>Compute Nodes (850 / 1000)</span>
                    <strong style="color:#10b981;">85%</strong>
                </div>
                <div style="height:12px; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                    <div style="width:85%; height:100%; background:#10b981;"></div>
                </div>
            </div>
        </div>
    </div>`
};

function showData(type, btn) {
  document.querySelectorAll(".nav-link, .mobile-link").forEach((el) => el.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const sidebarMatch = document.querySelector(`.sidebar .nav-link[onclick*="'${type}'"]`);
  if (sidebarMatch) sidebarMatch.classList.add("active");

  const container = document.getElementById("dynamicContent");
  container.innerHTML = views[type];

  const titleMap = {
    overview: "User Node Dashboard",
    myResearch: "Assigned Research",
    messages: "Comms Relay",
    profile: "Biologic Profile",
    billing: "Network Billing",
  };
  document.getElementById("pageTitle").innerText = titleMap[type] || "Dashboard";

  if (type === "overview") {
    setTimeout(() => {
      renderChart("mainChart", "line", ["Mon", "Tue", "Wed", "Thu", "Fri"], [12, 19, 15, 22, 30], "#10b981");
      renderChart("sideChart", "doughnut", ["Verified", "Processing"], [80, 20], ["#10b981", "#0ea5e9"]);
    }, 50);
  }
}

function renderChart(id, type, labels, data, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
          data: data,
          backgroundColor: color,
          borderColor: Array.isArray(color) ? "#fff" : color,
          tension: 0.4,
      }],
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { legend: { display: type !== "line" && type !== "bar" } }
    },
  });
}

function loadUserData() {
  document.getElementById("userRole").textContent = "Subject";
  document.getElementById("userEmail").textContent = "bn992@neogenix.bio";
  document.getElementById("userAvatar").src = "assets/img_team.webp";
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

function logout() { window.location.href = "login.html"; }

window.onload = () => {
  loadUserData();
  showData("overview", document.querySelector(".nav-link.active"));
  createMenuToggle();
};
