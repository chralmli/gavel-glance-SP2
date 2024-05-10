export function initializeUI() {
    setupNavigation();
}

function setupNavigation() {
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const path = new URL(link.href).hash;
            window.location.hash = path;
        });
    });
}