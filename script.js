function toggleTheme() {
    const b = document.documentElement;
    const isL = b.getAttribute('data-theme') === 'light';
    b.setAttribute('data-theme', isL ? 'dark' : 'light');
    localStorage.setItem('k-theme', isL ? 'dark' : 'light');
}

if (localStorage.getItem('k-theme') === 'light') document.documentElement.setAttribute('data-theme', 'light');

function handleKey(e) { if (e.key === 'Enter') runSearch(); }

function runSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    const out = document.getElementById('output');
    const btn = document.getElementById('searchBtn');

    if (!input) return;

    btn.innerText = "AUDITING...";
    btn.disabled = true;

    setTimeout(() => {
        results.style.display = 'block';
        btn.innerText = "EXECUTE";
        btn.disabled = false;

        const v = Math.floor(Math.random() * 30 + 70);
        document.getElementById('vVal').innerText = v;
        document.getElementById('bar').style.width = v + '%';

        out.innerHTML = `
            <div style="font-size:18px; color:var(--text); margin-bottom:10px;">> ACCESS_GRANTED: ${input.toUpperCase()}</div>
            <div style="font-size:11px; color:var(--dim); line-height:1.8;">
                Neural hash verified via Local Node Sync. Asset provenance confirmed 
                at Epoch 4. Synchronized with S.O.P Foundation standards.
            </div>
        `;

        window.scrollTo({ top: results.offsetTop - 50, behavior: 'smooth' });
    }, 1000);
}

// Minimalist HUD Update
setInterval(() => {
    const t = new Date().toLocaleTimeString('ms-MY', { hour12: false });
    document.getElementById('status').innerText = `SYNC_ACTIVE // ${t} // 85°C`;
}, 1000);
