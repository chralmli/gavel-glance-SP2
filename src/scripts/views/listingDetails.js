export const listingDetailsPage = (listing) => {
    const mediaUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'default-image.jpg';
    const mediaAlt = listing.media && listing.media.length > 0 ? listing.media[0].alt : 'Default Image';

    // Calculate the current bid from the bids array
    const currentBid = listing.bids && listing.bids.length > 0
    ? Math.max(...listing.bids.map(bid => bid.amount))
    : 0;

    return `
        <div class="max-w-4xl mx-auto px-4 py-8">
            <div class="grid md:grid-cols-3 gap-6">
                <div class="md:col-span-2">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-64 object-cover rounded-lg shadow-md">
                    <h1 class="text-2xl font-bold text-gray-800 mt-4">${listing.title}</h1>
                    <p class="text-gray-600 mt-2">${listing.description}</p>
                    <div class="mt-4">
                        <span class="text-lg font-semibold">Current Bid: ${currentBid} Credits</span>
                        <span class="ml-4 text-lg">${new Date(listing.endsAt).toLocaleString()}</span>
                    </div>
                    <div class="mt-4">
                        <input type="number" class="border rounded w-24 px-2 py-1 text-lg" placeholder="160">
                        <button class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <span>Place Bid</span>
                            <svg class="fill-current w-4 h-4 ml-2" viewBox"0 0 20 20">path d="M10 2.101L15.47 12H4.53L10 2.101zM9 13h2v5H9v-5z"</svg>
                        </button>
                    </div>
                </div>
                <div class="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
                    <h3 class="text-lg font-bold mb-2">Bidders</h3>
                    <ul class="divide-y divide-gray-200">
                        ${(listing.bids && listing.bids.length > 0) ? listing.bids.map(bid => `
                            <li class="py-2">
                                <div class="flex justify-between items-center">
                                    <span>${bid.bidder.name}</span>
                                    <span>${bid.amount} Credits</span>
                                </div>
                                <div class="text-right text-sm text-gray-500">
                                    ${new Date(bid.created).toLocaleString()}
                                </div>
                            </li>
                        `).join('') : '<li class="py-2 text-gray-600">No bids yet.</li>'}
                    </ul>
                </div>
            </div>
        </div>
    `;
};