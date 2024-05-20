import { navigateTo } from "../router/index.js";
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

document.addEventListener('DOMContentLoaded', () => {
    const mobileButton = document.getElementById('mobileButton');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});