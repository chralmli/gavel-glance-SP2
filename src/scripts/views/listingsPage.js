import { isLoggedIn } from '../api/auth/auth.js';


export const listingsPage = (listings) => {
    const appContainer = document.getElementById('appContainer');
    const userLoggedIn = isLoggedIn();

    appContainer.innerHTML = `
        <div class="p-8">
            <h1 class="text-4xl font-semibold text-gray-800 mb-6 text-center">All Listings</h1>
            <div class="flex justify-center mb-6">
                <input tpe="text" placeholder="Search Listings" class="px-4 py-2 border rounded-l-lg w-1/3">
                <button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">Search</button>
            </div>
            <div class="flex justify-center mb-6">
                <div class="flex space-x-2">
                    <p class="font-semibold text-gray-700 px-4 py-2 rounded">Filter items by:</p>
                    <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Created Date</button>
                    <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">End Date</button>
                    <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Number of Bids</button>
                    <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Clear Filter(s)</button>
                </div>
            </div>
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
                ${listings.map(listing => {
                    // Calculate current bid
                    const currentBid = listing.bids && listing.bids.length > 0
                        ? Math.max(...listing.bids.map(bid => bid.amount))
                        : 0;

                    // Calculate time left
                    const timeLeft = calculateTimeLeft(listing.endsAt);

                    return `
                        <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img src="${listing.media[0]?.url}" alt="${listing.title}" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="font-semibold text-lg text-secondary-500"${listing.title}</h3>
                                <p class="text-gray-600">Current Bid: ${currentBid} credits</p>
                                <p class="text-gray-600">Time Left: ${timeLeft}</p>
                                <div class="flex justify-between items-center mt-4">
                                    <button class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Bid Now</button>
                                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="window.location.hash='listing-details?id=${listing.id}'">View Listing</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    if (userLoggedIn) {
        document.getElementById('createListingForm').addEventListener('submit', handleCreateListing);
    }
};

function calculateTimeLeft(endsAt) {
    const now = new Date();
    const endTime = new Date(endsAt);
    const timeDiff = endTime - now;

    if (timeDiff <= 0) {
        return 'Ended';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function handleCreateListing(event) {
    event.preventDefault();
    const title = document.getElementById('listingTitle').value;
    const description = document.getElementById('listingDescription').value;
    const startingBid = document.getElementById('startingBid').value;

    // Call API to create listing
    console.log('Creating listing:', { title, description, startingBid });
}