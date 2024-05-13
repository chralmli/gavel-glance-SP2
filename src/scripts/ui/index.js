export function initializeUI() {
    setupNavigation();
}

function setupNavigation() {
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navigateTo(new URL(link.href).hash.slice(1));
        });
    });
}