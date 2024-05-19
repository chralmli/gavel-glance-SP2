import { get, post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";
import { API_KEY } from "../constants.js";

/**
 * Fetches listings from the auction.
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=10] - The number of listings per page.
 * @returns {Promise<Object>} A promise that resolves to an object containing listings data and meta information.
 * @throws {Error} If the API response is not successful.
 */

const fetchListings = async (page = 1, limit = 10) => {
    try {
        const response = await get(`auction/listings?_page=${page}&_limit=${limit}&_bids=true`);

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const listingsData = await response.json();

        return {
            data: listingsData.data,
            meta: listingsData.meta,
        };
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        throw error;
    }
};

/**
 * Creates a new listing in the auction.
 * @param {Object} listingDetails - The details of the listing.
 * @param {string} listingDetails.title - The title of the listing.
 * @param {string} listingDetails.description - The description of the listing.
 * @param {string} listingDetails.imageInput - The URL of the listing image.
 * @param {string} listingDetails.imageAltInput - The alt text for the listing image.
 * @param {string} listingDetails.endsAt - The end date of the listing in ISO 8601 format.
 * @throws {Error} If the end date is not between today and one year from now.
 * @throws {Error} If the API response is not successful.
 * @returns {Promise<void>} A promise that resolves when the listing is created successfully.
 */
const createListing = async (listingDetails) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
        'Authorization': `Bearer ${token}`
    };

    const endsAtDate = new Date(listingDetails.endsAt);
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);

    if (endsAtDate < currentDate || endsAtDate > maxDate) {
        throw new Error('End date must be between today and one year from now');
    }

    const formattedListingDetails = {
        title: listingDetails.title,
        description: listingDetails.description,
        tags: [],
        media: [{
            url: listingDetails.imageInput,
            alt: listingDetails.imageAltInput
        }],
        endsAt: new Date (listingDetails.endsAt).toISOString(),
    };

    try {
        const response = await post('auction/listings', formattedListingDetails, { headers });
    
        if (!response.ok) {
            const errorMessage = (await response.json()).message || `API responded with status ${response.status}`;
            throw new Error(`Failed to create listing: ${errorMessage}`);
        }

        const responseData = await response.json();
        return responseData.data;
        
    } catch (error) {
        console.error("Failed to create listing:", error);
        throw error;
    }
};


/**
 * Adds a bid to a listing.
 * @param {string} listingId - The ID of the listing to bid on.
 * @param {number} bidAmount - The amount of the bid.
 * @returns {Promise<Object>} A promise that resolves to the bid data.
 * @throws {Error} If the API response is not successful.
 */

const addBid = async (listingId, bidAmount) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY,
            'Authorization': `Bearer ${token}`
        }

        const response = await post(`auction/listings/${listingId}/bids`, { amount: bidAmount }, { headers });
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const bidResponse = await response.json();
        return bidResponse.data;
    } catch (error) {
        console.error("Failed to add bid:", error);
        throw error;
    }
};


/**
 * Fetches bids for a listing.
 * @param {string} token - The authentication token.
 * @param {string} apiKey - The API key.
 * @param {string} listingId - The ID of the listing to fetch bids for.
 * @returns {Promise<Object>} A promise that resolves to the bid data.
 * @throws {Error} If the API response is not successful.
 */

const viewBids = async (token, apiKey, listingId) => {
    const headers = getAuthHeaders(token, apiKey);
    return get(`auction/listings/${listingId}/bids`, { headers }).then(res => res.json());
}

const searchListings = async (query) => {
    try {
        const response = await get(`auction/listings?_tag=name&title_like=${encodeURIComponent(query)}&_bids=true`);
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const searchResults = await response.json();

        return Array.isArray(searchResults.data) ? searchResults.data : [];
    } catch (error) {
        console.error("Failed to search listings:", error);
        throw error;
    }
};

const fetchFeaturedListings = async () => {
    try {
        const response = await get('auction/listings?_bids=true');
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const listings = await response.json();

        const featuredListings = listings.data.sort((a, b) => (b._count.bids || 0) - (a._count.bids || 0)).slice(0, 5);
        return featuredListings;
    } catch (error) {
        console.error("Failed to fetch featured listings:", error);
        throw error;
    }
};

const fetchListingsByTag = async (tag) => {
    const response = await get(`auction/listings?tag=${tag}`);
    return response.json();
};

const fetchListingDetails = async (listingId, params = {}) => {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await get(`auction/listings/${listingId}?${query}`);
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const listingDetails = await response.json();
        return listingDetails.data;
    } catch (error) {
        console.error("Error fetching listing details:", error);
        throw error;
    }
};

export { fetchListings, createListing, addBid, viewBids, searchListings, fetchFeaturedListings, fetchListingsByTag, fetchListingDetails };