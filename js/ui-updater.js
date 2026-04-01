/** * UI UPDATER MODULE
 */
export function toggleTheme() {
    const b = document.documentElement;
    const isL = b.getAttribute('data-theme') === 'light';
    b.setAttribute('data-theme', isL ? 'dark' : 'light');
    localStorage.setItem('k-theme', isL ? 'dark' : 'light');
}

export function initTheme() {
    if (localStorage.getItem('k-theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

export function updateAuditUI(status, subtext) {
    const v = Math.floor(Math.random() * 15 + 85);
    const vVal = document.getElementById('vVal');
    const bar = document.getElementById('bar');
    const output = document.getElementById('output');

    if(vVal) vVal.innerText = v;
    if(bar) bar.style.width = v + '%';
    
    if(output) {
        output.innerHTML = `
            <div style="font-size:16px; color:var(--accent); margin-bottom:8px; font-weight:bold;">> ${status}</div>
            <div style="font-size:11px; color:var(--dim);">${subtext}</div>
        `;
    }
}
