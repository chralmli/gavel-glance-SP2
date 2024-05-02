import * as api from './api/index.js';
import router from './router/index.js';
import { setupListeners } from './listeners/index.js';
import { displayPopularCategories } from './templates/popularCategories.js';
import { displayAllListings } from './templates/allListings.js';

document.addEventListener('DOMContentLoaded', async () => {
  setupListeners();
  router.init();
  api.init();
    displayPopularCategories();
    displayAllListings();
});