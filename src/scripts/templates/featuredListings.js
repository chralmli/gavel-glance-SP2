import { fetchFeaturedListings } from '../api/auction/auction.js';
import { renderView } from '../ui/renderView.js';

const displayFeaturedListings = async () => {
    try {
        const listings = await fetchFeaturedListings();
        const listingsHtml = listings.map(listing => `
            <div class="card listing-card">
                <img src="${listing.media[0]?.url || 'default-image.jpg'}" alt="${listing.media[0]?.alt} class="card-img-top">
                <div class="listing-details">
                    <h3>${listing.title}</h3>
                    <small>Bids: ${listing._count.bids}</small>
                </div>
        `).join('');
    
        renderView(listingsHtml);
    } catch (error) {
        renderView(`<div>Error loading featured listings: ${error.message}</div>`)
    }
};

export { displayFeaturedListings };W