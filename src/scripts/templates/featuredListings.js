import { fetchFeaturedListings } from '../api/auction/auction.js';

const displayFeaturedListings = async () => {
    try {
        const listings = await fetchFeaturedListings();
        // Return the data for use elsewhere
        return listings.map(listing => ( {
            image: listing.media[0]?.url || 'https://via.placeholder.com/150',
            title: listing.title,
            description: `Current Bid: ${listing.currentBid}`,
            bidCount: listing._count.bids
        }));
    } catch (error) {
        console.error('Failed to fetch featured listings:', error.message);
        return [];
    }
};

export { displayFeaturedListings };