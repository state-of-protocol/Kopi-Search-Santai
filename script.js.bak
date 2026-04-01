/** 
 * 1. KONFIGURASI GLOBAL & ENGINE STATE
 */
let currentEngine = 'AI';

/** 
 * 2. PROTOKOL TEMA (THEME LOGIC) 
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
 * 3. LOGIC ENGINE SWITCH
 */
function setEngine(mode) {
    currentEngine = mode;
    const aiBtn = document.getElementById('aiMode');
    const webBtn = document.getElementById('webMode');
    const searchBox = document.getElementById('mainSearchBox');
    const prefix = document.getElementById('enginePrefix');
    const input = document.getElementById('searchInput');
    const auditLabel = document.getElementById('auditLabel');

    aiBtn.classList.remove('active');
    webBtn.classList.remove('active');
    searchBox.classList.remove('ai-active', 'web-active');

    if (mode === 'AI') {
        aiBtn.classList.add('active');
        searchBox.classList.add('ai-active');
        prefix.innerText = "AI >";
        input.placeholder = "ASK NEURAL AI ANYTHING...";
        if(auditLabel) auditLabel.innerText = "NEURAL_AUDIT_REPORT";
    } else {
        webBtn.classList.add('active');
        searchBox.classList.add('web-active');
        prefix.innerText = "WEB >";
        input.placeholder = "SEARCH THE BIG FOUR INDEX...";
        if(auditLabel) auditLabel.innerText = "CRAWLER_AUDIT_REPORT";
    }
}

/** 
 * 4. PROTOKOL CARIAN (HYBRID ENGINE)
 */
function handleKey(e) { if (e.key === 'Enter') runSearch(); }

async function runSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    const out = document.getElementById('output');
    const btn = document.getElementById('searchBtn');
    const grid = document.getElementById('results-grid');

    if (!input) return;

    btn.disabled = true;
    btn.innerText = currentEngine === 'AI' ? "LINKING..." : "CRAWLING...";
    results.style.display = 'block';
    
    if (grid) {
        grid.style.display = 'none';
        grid.className = currentEngine === 'AI' ? '' : 'web-active-result';
    }

    out.innerHTML = `<div style="color:var(--accent); font-size:11px;">> INITIATING_${currentEngine}_STREAM: ${input.toUpperCase()}...</div>`;

    try {
        if (currentEngine === 'WEB') {
            // Memanggil data dari arkib JSON yang sentiasa dikemaskini
            const webResults = await fetchWebData(input);
            
            if (webResults.length > 0) {
                renderGrid(webResults);
                updateAuditUI("WEB_INDEX_SUCCESS", `${webResults.length} relevant nodes retrieved from latest archive.`);
            } else {
                throw new Error("NO_MATCHING_DATA_FOUND_IN_ARCHIVE");
            }
        } else {
            // Mode AI Gemini
            const response = await fetch(`/api/search?query=${encodeURIComponent(input)}`);
            const data = await response.json();
            
            if (data.error) throw new Error(data.error);
            const aiResponse = data.candidates[0].content.parts[0].text;
            
            const segments = aiResponse.split('\n').filter(t => t.length > 10).map((text, i) => ({
                title: `NEURAL_FRAGMENT_0${i+1}`,
                desc: text,
                url: `NEURAL/NODE/0${i+1}`,
                lang: "AI"
            }));

            renderGrid(segments);
            updateAuditUI("ACCESS_GRANTED", "Neural link established via Vercel Edge.");
        }
    } catch (error) {
        out.innerHTML = `<div style="color:#ff5555; font-size:11px;">> SYSTEM_FAILURE: ${error.message}</div>`;
        if (grid) grid.style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.innerText = "EXECUTE";
    }
}

/**
 * 4.1 WEB ARCHIVE FETCH (AUTO-LATEST VERSION)
 * Kini menggunakan path statik supaya Python boleh push tanpa menukar kod JS.
 */
async function fetchWebData(keyword) {
    try {
        // Path statik: Pastikan Python Spider anda simpan fail dengan nama ini
        const targetPath = `./data/web_index_latest.json`;
        
        const response = await fetch(targetPath);
        if (!response.ok) throw new Error("ARCHIVE_NODE_OFFLINE");
        
        const allData = await response.json();
        
        // Tapis data
        const filtered = allData.filter(item => 
            item.title.toLowerCase().includes(keyword.toLowerCase()) || 
            item.desc.toLowerCase().includes(keyword.toLowerCase())
        );

        return filtered.map(item => ({
            title: item.title,
            desc: item.desc,
            url: item.url,
            lang: item.lang 
        }));

    } catch (e) {
        console.error("Web Fetch Error:", e);
        return [];
    }
}

// Helper: UI Updates
function updateAuditUI(status, subtext) {
    const v = Math.floor(Math.random() * 15 + 85);
    const vVal = document.getElementById('vVal');
    const bar = document.getElementById('bar');
    const output = document.getElementById('output');

    if(vVal) vVal.innerText = v;
    if(bar) bar.style.width = v + '%';
    
    output.innerHTML = `
        <div style="font-size:16px; color:var(--accent); margin-bottom:8px; font-weight:bold;">> ${status}</div>
        <div style="font-size:11px; color:var(--dim);">${subtext}</div>
    `;
}

// Helper: Render Grid
function renderGrid(items) {
    const grid = document.getElementById('results-grid');
    if (!grid) return;
    grid.style.display = 'grid';
    grid.innerHTML = items.map((item, index) => `
        <div class="stem-card" style="animation: fadeIn ${0.3 + (index * 0.1)}s ease forwards;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="stem-url">${item.url.substring(0, 25)}...</span>
                <span style="font-size:9px; background:var(--accent); color:black; padding:2px 5px; border-radius:3px; font-weight:bold;">${item.lang || 'DATA'}</span>
            </div>
            <div class="stem-title">${item.title}</div>
            <p class="stem-desc">${item.desc}</p>
            <a href="${item.url}" target="_blank" style="color:var(--accent); font-size:10px; text-decoration:none; margin-top:10px; display:block; border-top:1px solid #333; padding-top:5px;">[ OPEN_SOURCE_LINK ]</a>
        </div>
    `).join('');
}

/** 
 * 5. PROTOKOL LOKASI & CUACA
 */
async function searchLocation() {
    const input = document.getElementById('cityInput').value.trim().toUpperCase();
    const suggestions = document.getElementById('citySuggestions');
    if (input.length < 2) { suggestions.style.display = 'none'; return; }

    try {
        const continentFiles = ['./data/asia.json', './data/europe.json', './data/america.json'];
        const responses = await Promise.all(continentFiles.map(f => fetch(f).then(r => r.ok ? r.json() : [])));
        let matches = [];
        responses.flat().forEach(country => {
            if(country.states) {
                country.states.filter(s => s.name.toUpperCase().includes(input)).forEach(s => {
                    matches.push({ name: s.name, country: country.country, flag: country.flag });
                });
            }
        });

        if (matches.length > 0) {
            suggestions.innerHTML = matches.slice(0, 5).map(m => `
                <div class="suggestion-item" onclick="selectLocation('${m.name}')">
                    <span>${m.name.toUpperCase()} <small style="color:var(--dim)">/ ${m.country}</small></span>
                    <span>${m.flag}</span>
                </div>
            `).join('');
            suggestions.style.display = 'block';
        }
    } catch (e) { console.error("Location Node Error", e); }
}

function selectLocation(name) {
    document.getElementById('cityInput').value = name;
    document.getElementById('citySuggestions').style.display = 'none';
    getWeather();
}

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;
    const btn = document.querySelector('.city-protocol button');
    if(btn) btn.innerText = "...";
    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await res.json();
        document.getElementById('weatherDisplay').style.display = 'flex';
        document.getElementById('cityName').innerText = data.nearest_area[0].areaName[0].value.toUpperCase();
        document.getElementById('temp').innerText = `${data.current_condition[0].temp_C}°C`;
        document.getElementById('wDesc').innerText = data.current_condition[0].weatherDesc[0].value.toUpperCase();
        
        const timeMatch = data.current_condition[0].localObsDateTime.match(/(\d{1,2}):(\d{2})\s+(AM|PM)/);
        if (timeMatch) document.getElementById('localTime').innerText = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]} ${timeMatch[3]}`;
    } catch (e) { 
        const wDesc = document.getElementById('wDesc');
        if(wDesc) wDesc.innerText = "NODE_OFFLINE"; 
    }
    finally { if(btn) btn.innerText = "FETCH"; }
}

/** 
 * 6. HUD & SYSTEM MONITOR 
 */
setInterval(() => {
    const t = new Date().toLocaleTimeString('ms-MY', { hour12: false });
    const el = document.getElementById('status');
    if (el) el.innerText = `SYNC_ACTIVE // ${t} // 85°C`;
}, 1000);

// Init Listeners
const cityInput = document.getElementById('cityInput');
if(cityInput) cityInput.addEventListener('input', searchLocation);

document.addEventListener('click', (e) => {
    const sug = document.getElementById('citySuggestions');
    if (sug && !e.target.closest('.city-protocol')) sug.style.display = 'none';
});

function handleCityKey(e) { if (e.key === 'Enter') getWeather(); }
