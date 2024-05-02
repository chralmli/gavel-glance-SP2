import { fetchAllListings } from '../api/auction/auction.js';

const displayAllListings = async () => {
    const container = document.getElementById('allListingsContainer');
    const listings = await fetchAllListings();
    listings.data.forEach(listing => {
        container.appendChild(createListingCard(listing));
    });
};

const createListingCard = (listing) => {
    const card = document.createElement('div');
    card.className = 'card listing-card';
    card.innerHTML = `
    <img src="${listing.media[0]?.url || 'default-image.jpg'}" alt="${listing.media[0]?.alt}">
    <div class="p-4">
        <h3>${listing.title}</h3>
        <p>${listing.description}</p>
    </div>
    `;
    return card;
};

export { displayAllListings };