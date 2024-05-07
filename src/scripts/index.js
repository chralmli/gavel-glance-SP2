import * as api from './api/index.js';
import router from './router/index.js';
import { setupListeners } from './listeners/index.js';
import { displayFeaturedListings } from './templates/featuredListings.js';
import { displayAllListings } from './templates/allListings.js';

document.addEventListener('DOMContentLoaded', async () => {
    api.init();
    setupListeners();
    await router();
    displayFeaturedListings();
    displayAllListings();
});