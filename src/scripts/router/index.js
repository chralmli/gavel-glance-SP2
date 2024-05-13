import { fetchListings, fetchListingDetails } from '../api/auction/auction.js';
import { isLoggedIn } from '../api/auth/auth.js';
import { renderView } from '../ui/renderView.js';
import * as views from '../views/index.js';

function handleRoute(hash) {
    switch(hash) {
        case 'home':
            renderView(views.homePage());
            break;
        case 'about':
            renderView(views.aboutPage());
            break;
        case 'contact':
            renderView(views.contactPage());
            break;
        case 'listings':
            fetchListings().then(listings => {
                console.log('Fetched listings:', listings);
                renderView(views.listingsPage(listings));
            });
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
            console.log('No route matched, defaulting to home page');
            renderView(views.homePage());
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