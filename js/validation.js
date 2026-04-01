/** * DATA VALIDATION & FETCH MODULE
 */
export async function fetchWebData(keyword) {
    try {
        const response = await fetch(`./data/web_index_latest.json`);
        if (!response.ok) throw new Error("ARCHIVE_NODE_OFFLINE");
        
        const allData = await response.json();
        return allData.filter(item => 
            item.title.toLowerCase().includes(keyword.toLowerCase()) || 
            (item.desc && item.desc.toLowerCase().includes(keyword.toLowerCase()))
        );
    } catch (e) {
        console.error("Web Fetch Error:", e);
        return [];
    }
}

export function renderGrid(items, currentEngine) {
    const grid = document.getElementById('results-grid');
    if (!grid) return;
    grid.style.display = 'grid';
    grid.className = currentEngine === 'AI' ? '' : 'web-active-result';
    
    grid.innerHTML = items.map((item, index) => `
        <div class="stem-card" style="animation: fadeIn ${0.3 + (index * 0.1)}s ease forwards;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="stem-url">${item.url.substring(0, 25)}...</span>
                <span style="font-size:9px; background:var(--accent); color:black; padding:2px 5px; border-radius:3px; font-weight:bold;">${item.lang || 'DATA'}</span>
            </div>
            <div class="stem-title">${item.title}</div>
            <p class="stem-desc">${item.desc || 'No description available.'}</p>
            <a href="${item.url}" target="_blank" style="color:var(--accent); font-size:10px; text-decoration:none; margin-top:10px; display:block; border-top:1px solid #333; padding-top:5px;">[ OPEN_SOURCE_LINK ]</a>
        </div>
    `).join('');
}
