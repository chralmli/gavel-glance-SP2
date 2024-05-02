import { fetchListings, fetchListingDetails } from '../auction/auction.js';
import { isLoggedIn } from '../api/auth/auth.js';
import { renderView } from '../ui/renderView.js';
import * as views from '../views/index.js';

function authGuard(callback, redirectUrl = './login.html') {
    if (!isLoggedIn()) {
        window.location.href = redirectUrl;
        return false;
    }
    return callback();
}

function parseUrl() {
    const url = new URL(window.location);
    const path = url.pathname.split('/').pop();
    const searchParams = new URLSearchParams(url.search);
    return { path, searchParams };
}

async function route() {
    const { path, searchParams } = parseUrl();

    switch (path) {
        case 'listings.html':
            const listings = await fetchListings();
            return views.listings(listings);

        case 'listing-details.html':
            const listingId = searchParams.get('id');
            return authGuard(async () => {
                const details = await fetchListingDetails(listingId);
                return views.listingDetails(details);
            });

        case 'profile.html':
            return authGuard(() => {

            }, './login.html');

        default:
            const defaultView = await fetchListings();
            return views.defaultPage(defaultView);
    }
}

export default async () => {
    try {
        const view = await route();
        renderView(view);
    } catch (error) {
        console.error('Routing error:', error);
        renderView(views.errorPage(error));
    }
};