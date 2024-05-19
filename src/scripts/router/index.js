import { fetchListings, fetchListingDetails } from '../api/auction/auction.js';
import { updateNavigation } from '../ui/navigation.js';
import { renderView } from '../ui/renderView.js';
import * as views from '../views/index.js';
import { authGuard } from './authGuard.js';
import { listingDetailsPage } from '../views/listingDetails.js';

function handleRoute(hash) {
    const [route, query] = hash.split('?');
    const params = new URLSearchParams(query);

    switch(route) {
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
                renderView(views.listingsPage(listings));
            });
            break;
        case 'listing-details':
            const listingId = params.get('id');
            if (listingId) {
                    fetchListingDetails(listingId, { _seller: true, _bids: true })
                    .then(details => listingDetailsPage(details))
                    .catch(error => {
                        console.error('Error fetching listing details:', error);
                        renderView('<p>Error loading details. Please try again later.</p>')
                    });
            } else {
                renderView(views.homePage());
            }
            break;
        case 'login':
            renderView(views.loginPage(), false);
            break;
        case 'register':
            renderView(views.registerPage(), false);
            break;
        case 'profile':
            authGuard(() => renderView(views.profilePage()));
            break;
        default:
            renderView(views.homePage());
            break;
    }
}

// set up initial routing and handle subsequent hash changes
export function setupRoutes() {
    const initialHash = window.location.hash.slice(1);
    handleRoute(initialHash || 'home');
}

// handle navigation to different parts of the site
export function navigateTo(newHash) {
    window.location.hash = newHash;
    const cleanedHash = newHash.startsWith('#') ? newHash.slice(1) : newHash;
    handleRoute(cleanedHash);
}

window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash;
    navigateTo(currentHash);
    updateNavigation();
});
document.addEventListener('DOMContentLoaded', setupRoutes);