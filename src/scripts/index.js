import * as api from './api/index.js';
import * as router from './router/index.js';
import { setupListeners } from './listeners/index.js';
import { initializeUI } from './ui/index.js';
import { updateNavigation } from './ui/navigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    api.init();
    setupListeners();
    await router.setupRoutes();
    initializeUI();
    await updateNavigation();
});

window.addEventListener('hashchange', async () => {
    router.navigateTo(window.location.hash);
    await updateNavigation();
});