import { isLoggedIn } from '../api/auth/auth.js';


export const listingsPage = (listings) => {
    const appContainer = document.getElementById('appContainer');
    const userLoggedIn = isLoggedIn();

    appContainer.innerHTML = `
        <div class="p-8">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">All Listings</h1>
            ${userLoggedIn ? `
                <div class="mb-8">
                    <h2 class="text-xl font-semibold mb-4">Create New Listing</h2>
                    <form id="createListingForm" class="space-y-6">
                        <input type="text" placeholder="Title" id="listingTitle required class="block w-full mb-2 px-3 py-2 border rounded">
                        <textarea placeholder="Description" id="listingDescription" required class="block w-full mb-2 px-3 py-2 border rounded"></textarea>
                        <input type="number" placeholder="Starting Bid (Credits)" id="startingBid" required class="block w-full mb-2 px-3 py-2 border rounded">
                        <button type="submit" class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Listing</button>
                    </form>
                </div>
            ` : ''}
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

    if (userLoggedIn) {
        document.getElementById('createListingForm').addEventListener('submit', handleCreateListing);
    }
};

function handleCreateListing(event) {
    event.preventDefault();
    const title = document.getElementById('listingTitle').value;
    const description = document.getElementById('listingDescription').value;
    const startingBid = document.getElementById('startingBid').value;

    // Call API to create listing
    console.log('Creating listing:', { title, description, startingBid });
}