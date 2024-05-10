export const listingsPage = (listings) => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
        <div class="p-8">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">All Listings</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${listings.map(listing => `
                    <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img src="${listing.image}" alt="${listing.title}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="font-semibold text-lg text-secondary-500"${listing.title}</h3>
                            <p class="text-gray-600">Current Bid: ${listing.currentBid} credits</p>
                            <p class="text-gray-600">Time Left: ${listing.timeLeft}</p>
                            <div class="flex justify-between items-center mt-4">
                                <button class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Bid Now</button>
                                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">View Listing</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};