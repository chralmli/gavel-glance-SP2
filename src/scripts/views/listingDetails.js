import { addBid } from '../api/auction/auction.js';
import { calculateTimeLeft } from '../tools/timeLeft.js';

export const listingDetailsPage = (listing) => {
    const mediaUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'default-image.jpg';
    const mediaAlt = listing.media && listing.media.length > 0 ? listing.media[0].alt : 'Default Image';

    // Calculate the current bid from the bids array
    const currentBid = listing.bids && listing.bids.length > 0
    ? Math.max(...listing.bids.map(bid => bid.amount))
    : 0;

    // Calculate time left
    const timeLeft = calculateTimeLeft(listing.endsAt);

    const detailsPageHtml = `
        <div class="max-w-6xl mx-auto px-6 py-8">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                    <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-72 object-cover rounded-lg shadow-md">
                    <h1 class="text-3xl font-bold text-gray-800 mt-6">${listing.title}</h1>
                    <div class="mt-4">
                        <span class="text-2xl font-semibold text-gray-900">Current Bid: ${currentBid} Credits</span>
                        <p class="text-gray-600">Time Left: ${timeLeft}</p>
                    </div>
                    <div class="mt-6">
                        <input type="number" id="bidAmount" class="border rounded px-4 py-2 w-32 text-lg" placeholder="160">
                        <button id="placeBidButton" class="bg-secondary-blue hover:bg-accent-blue text-white font-bold py-2 px-6 rounded-lg inline-flex items-center">
                            <span>Place Bid</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </button>
                    </div>
                    <div class="mt-6 bg-transparent border border-secondary-blue p-6 rounded-lg shadow-lg">
                        <h2 class="font-heading text-2xl mb-4 text-gray-800">Description</h2>
                        <p class="text-gray-700">${listing.description}</p>
                    </div>
                </div>
                <div class="md:col-span-1 bg-transparent p-6 shadow-md rounded-lg">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Bidders</h3>
                    <div class="overflow-y-auto max-h-96">
                        <ul class="divide-y divide-gray-200">
                            ${(listing.bids && listing.bids.length > 0) ? listing.bids.map(bid => `
                                <li class="py-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-800">${bid.bidder.name}</span>
                                        <span class="text-gray-800">${bid.amount} Credits</span>
                                    </div>
                                    <div class="text-right text-sm text-gray-500">
                                        ${new Date(bid.created).toLocaleString()}
                                    </div>
                                </li>
                            `).join('') : '<li class="py-4 text-gray-600">No bids yet.</li>'}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('appContainer').innerHTML = detailsPageHtml;

    // Add event listeners for the bid button
    document.getElementById('placeBidButton').addEventListener('click', async () => {
        const bidAmount = parseFloat(document.getElementById('bidAmount').value);

        if (isNaN(bidAmount) || bidAmount <= 0) {
            alert('Please enter a valid bid amount.');
            return;
        }

        try {
            const bidData = await addBid(listing.id, bidAmount);
            alert('Bid placed successfully!');
            // Reload the page to show the updated bid list
            window.location.reload();
        } catch (error) {
            console.error('Error placing bid:', error);
            alert('Failed to place bid. Please try again later.');
        }
    });
};
