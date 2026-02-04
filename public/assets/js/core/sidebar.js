document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch Sidebar using Root Path
    fetch('/components/sidebar.html')
        .then(res => {
            if(!res.ok) throw new Error("Sidebar missing");
            return res.text();
        })
        .then(html => {
            const container = document.getElementById('sidebar-container');
            if(container) {
                container.innerHTML = html;
                initSidebar();
            }
        })
        .catch(e => console.error(e));
});

function initSidebar() {
    const sidebar = document.getElementById("mySidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");
    
    // Highlight Active Link
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('href') === path) link.classList.add('active');
    });

    if(menuBtn && sidebar) {
        menuBtn.onclick = () => {
            sidebar.style.width = "280px";
            if(overlay) overlay.classList.add('active');
        }
    }

    function close() {
        if(sidebar) sidebar.style.width = "0";
        if(overlay) overlay.classList.remove('active');
    }

    if(closeBtn) closeBtn.onclick = close;
    if(overlay) overlay.onclick = close;
}


