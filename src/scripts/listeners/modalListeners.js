import { fetchListings } from "../api/auction/auction.js";
import { listingsPage } from "../views/listingsPage.js";

let listings;
export function attachBidNowListeners(appContainer, listings, openBidModal) {
    appContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('bid-now-button')) {
            const listingId = event.target.getAttribute('data-listing');

            const listing = listings.find(listing => listing.id == listingId);

            if (listing) {
                openBidModal(listing);
            } else {
                console.error('Listing not found:', listingId);
                alert('Listing not found');
            }
        }
    });
}

export async function refreshListingsPage(listings, openBidModal) {
    await listingsPage();

    const appContainer = document.getElementById('appContainer');
    attachBidNowListeners(appContainer, listings, openBidModal);
}