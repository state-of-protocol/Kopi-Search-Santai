import { initTheme, toggleTheme, updateAuditUI } from './ui-updater.js';
import { currentEngine, setEngine } from './navigation.js';
import { fetchWebData, renderGrid } from './validation.js';

// Inisialisasi Tema
initTheme();

// Export ke Window supaya HTML button boleh panggil
window.toggleTheme = toggleTheme;
window.setEngine = setEngine;
window.runSearch = runSearch;
window.handleKey = (e) => { if (e.key === 'Enter') runSearch(); };

async function runSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    const out = document.getElementById('output');
    const btn = document.getElementById('searchBtn');

    if (!input) return;

    btn.disabled = true;
    btn.innerText = "LINKING...";
    results.style.display = 'block';
    out.innerHTML = `<div style="color:var(--accent); font-size:11px;">> INITIATING_${currentEngine}_STREAM...</div>`;

    try {
        if (currentEngine === 'WEB') {
            const webResults = await fetchWebData(input);
            if (webResults.length > 0) {
                renderGrid(webResults, 'WEB');
                updateAuditUI("WEB_INDEX_SUCCESS", `${webResults.length} nodes retrieved.`);
            } else {
                throw new Error("DATA_NOT_FOUND");
            }
        } else {
            // Logik AI anda di sini (API Gemini)
            updateAuditUI("AI_MODE", "Neural link ready (Awaiting API Integration).");
        }
    } catch (error) {
        out.innerHTML = `<div style="color:#ff5555; font-size:11px;">> ERROR: ${error.message}</div>`;
    } finally {
        btn.disabled = false;
        btn.innerText = "EXECUTE";
    }
}

// System Monitor Clock
setInterval(() => {
    const t = new Date().toLocaleTimeString('ms-MY', { hour12: false });
    const el = document.getElementById('status');
    if (el) el.innerText = `SYNC_ACTIVE // ${t} // STABLE`;
}, 1000);
