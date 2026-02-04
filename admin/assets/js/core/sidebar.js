function initSidebar() {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("mySidebar");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    if (menuBtn) {
        menuBtn.onclick = () => {
            sidebar.style.width = "260px";
            overlay.style.display = "block";
        };
    }

    function close() {
        sidebar.style.width = "0";
        overlay.style.display = "none";
    }

    if (closeBtn) closeBtn.onclick = close;
    if (overlay) overlay.onclick = close;
}
