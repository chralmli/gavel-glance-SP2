import { fetchListings, fetchListingDetails } from '../api/auction/auction.js';
import { isLoggedIn } from '../api/auth/auth.js';
import { renderView } from '../ui/renderView.js';
import * as views from '../views/index.js';

function handleRoute(hash) {
    switch(hash) {
        case 'listings':
            fetchListings().then(listings => renderView(() => views.listingsPage(listings)));
            break;
        case 'listing-details':
            const listingId = new URLSearchParams(window.location.search).get('id');
            if (!isLoggedIn()) {
                renderView(views.loginPage());
                return;
            }
            fetchListingDetails(listingId).then(details => renderView(() => views.listingDetailsPage(details)));
            break;
        case 'login':
            renderView(views.loginPage());
            break;
        case 'register':
            renderView(views.registerPage());
            break;
        default:
            fetchListings().then(listings => renderView(() => views.homePage(listings)));
            break;
    }
}

// set up initial routing and handle subsequent hash changes
export function setupRoutes() {
    handleRoute(window.location.hash.slice(1) || 'home');
}

// handle navigation to different parts of the site
export function navigateTo(newHash) {
    window.location.hash = newHash;
    handleRoute(newHash.slice(1));
}

window.addEventListener('hashchange', () => navigateTo(window.location.hash));
document.addEventListener('DOMContentLoaded', setupRoutes);