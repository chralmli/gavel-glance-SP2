import { isLoggedIn } from '../api/auth/auth.js';
import { calculateTimeLeft} from '../tools/timeLeft.js';
import { addBid, createListing, searchListings } from '../api/auction/auction.js';
import { updateNavigation } from '../ui/navigation.js';
import { fetchListings } from '../api/auction/auction.js';

let listings = [];
let appContainer;
let currentPage = 1;
let listingsPerPage = 12;

const createListingModalHtml = () => `
    <div id="createListingModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full p-8">
            <div class="p-4 border-b flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">Create Listing</h2>
                <button id="closeCreateListingModalButton" class="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-4">
                <form id="createListingForm" class="space-y-6">
                    <input type="text" placeholder="Title" id="listingTitle" required class="block w-full mb-2 px-3 py-2 border rounded"/>
                    <textarea placeholder="Description" id="listingDescription" required class="block w-full mb-2 px-3 py-2 border rounded"></textarea>
                    <input type="number" placeholder="Starting Bid (Credits)" id="startingBid" required class="block w-full mb-2 px-3 py-2 border rounded"/>
                    <input type="datetime-local" id="endsAt" required class="block w-full mb-2 px-3 py-2 border rounded"/>

                    <label for="imageInput" class="block text-sm font-medium text-gray-700">Image (URL)</label>
                    <input type="text" id="imageInput" placeholder="Image URL" class="block w-full mb-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue sm:text-sm"/>
                    <input type="text" placeholder="Image Alt Text" id="imageAltInput" class="block w-full px-3 py-2 border rounded" shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue sm:text-sm/>

                    <button type="submit" class="bg-transparent hover:bg-accent-blue text-secondary-blue font-bold py-2 px-4 rounded">Create Listing</button>
                </form>
            </div>
        </div>
    </div>
`;

const bidModalHtml = () => `
    <div id="bidModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full p-8">
            <div class="p-4 border-b flex justify-between items-center">
                <h2 id="modalTitle" class="text-2xl font-bold text-gray-800"></h2>
                <button id="closeModalButton" class="text-gray-600 hover:text-gray-900 relative">
                    Close
                </button>
            </div>
            <div class="p-4">
                <img id="modalImage" src="" alt="" class="w-full h-48 object-cover rounded-lg">
                <p id="modalDescription" class="mt-4 text-gray-600"></p>
                <div class="mt-4">
                    <span class="text-lg font-semibold">Current Bid: <span id="modalCurrentBid"></span> Credits</span>
                    <span class="ml-4 text-lg">Time left: <span id="modalTimeLeft"></span></span>
                </div>
                <div class="mt-4">
                    <input type="number" id="modalBidAmount" class="border rounded px-4 py-2 w-full text-lg" placeholder="Enter your bid">
                    <button id="placeModalBidButton" class="bg-transparent hover:bg-accent-blue text-secondary-blue font-bold py-2 px-4 rounded w-full items-center mt-2">
                        Place Bid
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

// Function to open the bid modal and populate it with listing details
export const openBidModal = async (listing) => {

    appContainer.insertAdjacentHTML('beforeend', bidModalHtml());
    const bidModal = document.getElementById('bidModal');

    document.getElementById('modalTitle').textContent = listing.title;
    document.getElementById('modalImage').src = listing.media[0]?.url || 'default-image.png';
    document.getElementById('modalImage').alt = listing.media[0]?.alt || 'Default Image';
    document.getElementById('modalDescription').innerText = listing.description;
    document.getElementById('modalCurrentBid').innerText = listing.bids && listing.bids.length > 0
        ? Math.max(...listing.bids.map(bid => bid.amount))
        : 0;
    document.getElementById('modalTimeLeft').innerText = calculateTimeLeft(listing.endsAt);

    bidModal.classList.remove('hidden');

    const closeBidModalButton = document.getElementById('closeModalButton');
    closeBidModalButton.addEventListener('click', () => {
        bidModal.remove();
    });

    document.getElementById('placeModalBidButton').onclick = () => placeBid(listing.id);
};

//  Function to place a bid on a listing
export const placeBid = async (listingId) => {
    const bidAmount = parseFloat(document.getElementById('modalBidAmount').value);

    if (isNaN(bidAmount) || bidAmount <= 0) {
        alert('Please enter a valid bid amount');
        return;
    }

    try {
        const bidData = await addBid(listingId, bidAmount);
        alert('Bid placed successfully');
        // Close the modal and refresh the page to show the updated bid
        document.getElementById('bidModal').remove();
        await updateNavigation();
        await listingsPage();
    } catch (error) {
        console.error('Error placing bid:', error);
        alert('Failed to place bid. Please try again later.');
    }
}

const renderListingsGrid = (listings, userLoggedIn) => {
    if (!Array.isArray(listings)) {
        console.error('Expected listings to be an array', listings);
        return '';
    }

    return listings.map(listing => {
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
                    <h3 class="font-semibold text-lg text-secondary-500">${listing.title}</h3>
                    <p class="text-gray-600">Current Bid: ${currentBid} credits</p>
                    <p class="text-gray-600">Time Left: ${timeLeft}</p>
                    <div class="flex justify-between items-center mt-4">
                        ${userLoggedIn ? `<button class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bid-now-button" data-listing='${listing.id}'>Bid Now</button>` : ''}
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="window.location.hash='listing-details?id=${listing.id}'">View Listing</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

export const listingsPage = async (page = 1, loadMore = false) => {
    try {
        const { data: fetchedListings } = await fetchListings(page, listingsPerPage);
        const userLoggedIn = isLoggedIn();

        if (loadMore) {
            listings = [...listings, ...fetchedListings];
        } else {
            listings = fetchedListings;
        }

        if (!loadMore) {
            appContainer = document.getElementById('appContainer');
            // Add modal HTML and pagination controls to the page
            appContainer.innerHTML = `
            <div class="max-w-screen-xl mx-auto p-6 sm:p-8">
                <button id="openCreateListingModalButton" class="fixed bottom-8 right-8 bg-secondary-blue text-white hover:bg-transparent hover:text-secondary-blue rounded-full p-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <div class="p-0 sm:p-6">
                    <h1 class="text-4xl font-semibold text-gray-800 mb-6 text-center">All Listings</h1>
                    <div class="flex justify-center mb-6">
                        <input type="text" id="searchInput" placeholder="Search Listings" class="px-4 py-2 border w-full md:w-2/3 lg:w-1/3 rounded-l-lg">
                        <button id="searchButton" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">Search</button>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-center mb-6 space-y-2 sm:space-y-0 sm:space-x-2">
                        <p class="font-semibold text-gray-700 px-4 py-2 rounded">Filter items by:</p>
                        <button id="filterByCreatedDate" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Newest First</button>
                        <button id="filterByEndDate" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Ending Soon</button>
                        <button id="filterByNumberOfBids" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Most Bids</button>
                        <button id="clearFilters" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Clear Filters</button>
                    </div>
                    <div id="listingsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${renderListingsGrid(listings, userLoggedIn)}
                    </div>
                    <div class="flex justify-center mt-8">
                        <button id="viewMoreListingsBtn" class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">View More Listings</button>
                    </div>
                </div>
            </div>
            
            `;
        } else {
            const listingsGrid = document.getElementById('listingsGrid');
            listingsGrid.innerHTML += renderListingsGrid(listings, userLoggedIn);
        }
    
        attachEventListeners(userLoggedIn);

    } catch (error) {
        console.error('Failed to fetch listings:', error);
        alert('Failed to fetch listings. Please try again later.');
    }
};

const attachEventListeners = (userLoggedIn) => {
    const openCreateListingModalButton = document.getElementById('openCreateListingModalButton');
    openCreateListingModalButton.addEventListener('click', openCreateListingModal);

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchListingsHandler);

    const viewMoreListingsBtn = document.getElementById('viewMoreListingsBtn');
    viewMoreListingsBtn.addEventListener('click', () => {
        currentPage++;
        listingsPage(currentPage, true);
    });

    const bidNowButtons = document.querySelectorAll('.bid-now-button');
    bidNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const listingId = event.target.getAttribute('data-listing');
            openBidModalHandler(listingId, userLoggedIn);
        });
    });

    // Attach filter event listeners
    document.getElementById('filterByCreatedDate').addEventListener('click', filterByCreatedDate);
    document.getElementById('filterByEndDate').addEventListener('click', filterByEndDate);
    document.getElementById('filterByNumberOfBids').addEventListener('click', filterByNumberOfBids);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
};

const openCreateListingModal = () => {
    if (isLoggedIn()) {
        appContainer.insertAdjacentHTML('beforeend', createListingModalHtml());
        const createListingModal = document.getElementById('createListingModal');

        const closeCreateListingModalButton = document.getElementById('closeCreateListingModalButton');
        closeCreateListingModalButton.addEventListener('click', () => {
            createListingModal.remove();
        });

        // Close the modal when clicking outside of it
        createListingModal.addEventListener('click', (event) => {
            if (event.target === createListingModal) {
                createListingModal.remove();
            }
        });

        const createListingForm = document.getElementById('createListingForm');
        createListingForm.addEventListener('submit', createListingHandler);
    } else {
        alert('You must be logged in to create a listing');
    }
};

const createListingHandler = async (event) => {
    event.preventDefault();
    
    const title = document.getElementById('listingTitle').value;
    const description = document.getElementById('listingDescription').value;
    const startingBid = document.getElementById('startingBid').value;
    const endsAt = document.getElementById('endsAt').value;
    const imageInput = document.getElementById('imageInput').value;
    const imageAltInput = document.getElementById('imageAltInput').value;

    if (isNaN(startingBid) || startingBid <= 0) {
        alert('Starting bid must be a positive number');
        return;
    }

    // Validate that the date is in the future
    const endsAtDate = new Date(endsAt);
    const now = new Date();
    if (endsAtDate <= now) {
        alert('Ends at date must be in the future');
        return;
    }

    const listingDetails = { title, description, startingBid, endsAt, imageInput, imageAltInput };

    try {
        const newListing = await createListing(listingDetails);
        alert('Listing created successfully');
        const createListingModal = document.getElementById('createListingModal');
        createListingModal.remove();

        if (newListing) {
            // Add new listing to the listings array and sort by created date
            listings.unshift(newListing);
            listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // update the listings grid
            updateListingsGrid(listings);
        } else {
            throw new Error('Failed to create listing');
        }
    } catch (error) {
        console.error('Error creating listing:', error);
        alert('Error creating listing. Please try again later or ensure all fields are filled out correctly.');
    }
};

const openBidModalHandler = async (listingId) => {
    const listing = listings.find(listing => listing.id == listingId);
    if (listing) {
        openBidModal(listing);
    } else {
        console.error(`Listing with id ${listingId} not found`);
        alert(`Listing with id ${listingId} not found`);
    }
};

const searchListingsHandler = async () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    if (query) {
        try {
            const searchResults = await searchListings(query);
            const listingsGrid = document.getElementById('listingsGrid');
            if (listingsGrid) {
                listingsGrid.innerHTML = renderListingsGrid(searchResults, isLoggedIn());
                attachEventListeners(isLoggedIn());
            } else {
                console.error('Listings grid not found');
            }
        } catch (error) {
            console.error('Error searching listings:', error);
            alert('Failed to search listings. Please try again later.');
        }
    }
};

// Filter listings by created date
const filterByCreatedDate = () => {
    const sortedListings = [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    updateListingsGrid(sortedListings);
};

const filterByEndDate = () => {
    const sortedListings = [...listings].sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    updateListingsGrid(sortedListings);
};

const filterByNumberOfBids = () => {
    const sortedListings = [...listings].sort((a, b) => (b.bids.length || 0) - (a.bids.length || 0));
    updateListingsGrid(sortedListings);
};

const clearFilters = () => {
    updateListingsGrid(listings);
}

const updateListingsGrid = (filteredListings) => {
    const listingsGrid = document.getElementById('listingsGrid');
    if (listingsGrid) {
        listingsGrid.innerHTML = renderListingsGrid(filteredListings, isLoggedIn());
        attachEventListeners(isLoggedIn());
    } else {
        console.error('Listings grid not found');
    }
};


export const init = async () => {
    await listingsPage();
}

init();