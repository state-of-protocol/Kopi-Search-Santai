/** 
 * KONFIGURASI SISTEM
 * Masukkan kunci anda di sini.
 */
const GEMINI_API_KEY = "NO.API.HERE";

/** 
 * PROTOKOL TEMA (THEME LOGIC) 
 */
function toggleTheme() {
    const b = document.documentElement;
    const isL = b.getAttribute('data-theme') === 'light';
    b.setAttribute('data-theme', isL ? 'dark' : 'light');
    localStorage.setItem('k-theme', isL ? 'dark' : 'light');
}

if (localStorage.getItem('k-theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

/** 
 * PROTOKOL CARIAN AI (POWERED BY GEMINI) 
 * Menggantikan simulasi audit dengan carian pintar sebenar.
 */
function handleKey(e) { if (e.key === 'Enter') runSearch(); }

async function runSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    const out = document.getElementById('output');
    const btn = document.getElementById('searchBtn');

    if (!input) return;

    // UI Feedback: Vibe Million Dollar
    btn.innerText = "NEURAL_LINKING...";
    btn.disabled = true;
    results.style.display = 'block';
    out.innerHTML = `<div style="color:var(--accent); font-size:11px; letter-spacing:1px;">> INITIATING_CRAWL: ${input.toUpperCase()}...</div>`;

    try {
        // Memanggil Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Berikan maklumat ringkas, tepat, dan terkini tentang: ${input}. Gunakan nada profesional, teknikal, dan gaya cyberpunk. Jika ia fakta, pastikan ia sahih.` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const aiResponse = data.candidates[0].content.parts[0].text;

        // Simulasi "Processing" sekejap untuk kesan visual
        setTimeout(() => {
            btn.innerText = "EXECUTE";
            btn.disabled = false;

            // Bar kemajuan Raw (85-100%)
            const v = Math.floor(Math.random() * 15 + 85);
            document.getElementById('vVal').innerText = v;
            document.getElementById('bar').style.width = v + '%';

            // Paparan hasil carian dengan Markdown-friendly style
            out.innerHTML = `
                <div style="font-size:16px; color:var(--accent); margin-bottom:12px; font-weight:bold;">> ACCESS_GRANTED: SEARCH_RESULT</div>
                <div style="font-size:13px; color:var(--text); line-height:1.7; white-space: pre-wrap; font-family:inherit;">${aiResponse}</div>
                <div style="margin-top:20px; font-size:9px; color:var(--dim); border-top:1px dotted var(--border); padding-top:10px;">
                    SOURCE: GOOGLE_NEURAL_ENGINE // STATUS: VERIFIED_BY_KOPI_SOP
                </div>
            `;
            
            window.scrollTo({ top: results.offsetTop - 50, behavior: 'smooth' });
        }, 800);

    } catch (error) {
        console.error("AI Node Error:", error);
        btn.innerText = "RETRY";
        btn.disabled = false;
        out.innerHTML = `<div style="color:#ff5555; font-size:11px;">> ERROR: NODE_UNREACHABLE. Sila semak API Key atau sambungan internet anda.</div>`;
    }
}

/** 
 * PROTOKOL LOKASI & CUACA (WEATHER & TIME DUAL-API) 
 * Integrasi wttr.in + Visual Haptic
 */
function handleCityKey(e) { if (e.key === 'Enter') getWeather(); }

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;

    const display = document.getElementById('weatherDisplay');
    const btn = document.querySelector('.city-protocol button');
    
    btn.innerText = "...";
    btn.disabled = true;

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) throw new Error('Network failure');
        
        const weatherData = await response.json();
        
        // Data Extraction
        const cityName = weatherData.nearest_area[0].areaName[0].value;
        const tempC = weatherData.current_condition[0].temp_C;
        const condition = weatherData.current_condition[0].weatherDesc[0].value;
        const rawTime = weatherData.current_condition[0].localObsDateTime; 

        // Visual Effect (Fade In)
        display.style.opacity = "0";
        display.style.display = 'flex';
        setTimeout(() => {
            display.style.transition = "opacity 0.6s ease";
            display.style.opacity = "1";
        }, 50);

        document.getElementById('cityName').innerText = cityName.toUpperCase();
        document.getElementById('temp').innerText = `${tempC}°C`;
        document.getElementById('wDesc').innerText = condition.toUpperCase();

        // 12-Hour Time Logic via Regex
        const timeMatch = rawTime.match(/(\d{1,2}):(\d{2})\s+(AM|PM)/);
        if (timeMatch) {
            document.getElementById('localTime').innerText = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]} ${timeMatch[3]}`;
        }

        btn.innerText = "FETCH";
        btn.disabled = false;

    } catch (error) {
        console.error("Weather Node Error:", error);
        btn.innerText = "RETRY";
        btn.disabled = false;
        document.getElementById('wDesc').innerText = "LOCATION_NOT_FOUND";
    }
}

/** 
 * HUD UPDATE (REAL-TIME STATUS) 
 */
setInterval(() => {
    const t = new Date().toLocaleTimeString('ms-MY', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.innerText = `SYNC_ACTIVE // ${t} // 85°C`;
    }
}, 1000);
