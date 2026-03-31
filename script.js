/** * PROTOKOL TEMA (THEME LOGIC) 
 * Mengawal pertukaran mod Gelap/Cerah secara lokal.
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

/** * PROTOKOL CARIAN ASET (MAIN SEARCH) 
 * Simulasi audit neural yang pantas dan estetik.
 */
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

/** * PROTOKOL LOKASI & CUACA (WEATHER & TIME DUAL-API) 
 * Menggunakan wttr.in + WorldTimeAPI (Bulletproof Logic)
 */
function handleCityKey(e) { if (e.key === 'Enter') getWeather(); }

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;

    const display = document.getElementById('weatherDisplay');
    const btn = document.querySelector('.city-protocol button');
    
    // UI Feedback
    btn.innerText = "...";
    btn.disabled = true;

    try {
        // 1. Panggil kedua-dua API secara serentak (Parallel Fetch) untuk kepantasan
        const [weatherRes, timeRes] = await Promise.all([
            fetch(`https://wttr.in/${city}?format=j1`),
            fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`) // Placeholder awal/fallback
        ]);

        if (!weatherRes.ok) throw new Error('Network failure');
        const weatherData = await weatherRes.json();
        
        // 2. Ekstrak data rasmi dari API
        const cityName = weatherData.nearest_area[0].areaName[0].value;
        const tempC = weatherData.current_condition[0].temp_C;
        const condition = weatherData.current_condition[0].weatherDesc[0].value;
        const rawTime = weatherData.current_condition[0].localObsDateTime; 

        // 3. Kemaskini UI dengan Kesan Visual (Gempak)
        display.style.opacity = "0";
        display.style.display = 'flex';
        
        setTimeout(() => {
            display.style.transition = "opacity 0.5s ease";
            display.style.opacity = "1";
        }, 50);

        document.getElementById('cityName').innerText = cityName.toUpperCase();
        document.getElementById('temp').innerText = `${tempC}°C`;
        document.getElementById('wDesc').innerText = condition.toUpperCase();

        // 4. Logik Masa 12-Jam (Tepat & Bulletproof)
        // Format wttr.in: "2026-03-31 09:51 AM"
        const timeMatch = rawTime.match(/(\d{1,2}):(\d{2})\s+(AM|PM)/);
        
        if (timeMatch) {
            let hours = timeMatch[1].padStart(2, '0');
            const minutes = timeMatch[2];
            const ampm = timeMatch[3];
            document.getElementById('localTime').innerText = `${hours}:${minutes} ${ampm}`;
        }

        btn.innerText = "FETCH";
        btn.disabled = false;

    } catch (error) {
        console.error("S.O.P Protocol Error:", error);
        btn.innerText = "RETRY";
        btn.disabled = false;
        
        // Paparan Ralat pada UI
        document.getElementById('weatherDisplay').style.display = 'flex';
        document.getElementById('wDesc').innerText = "NODE NOT FOUND / TIMEOUT";
    }
}

/** * HUD UPDATE (REAL-TIME CLOCK) 
 * Kemaskini status bar pada bahagian atas setiap saat.
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
