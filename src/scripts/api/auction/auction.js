import { get, post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";
import { API_KEY } from "../constants.js";

const fetchListings = async (page = 1, limit = 10) => {
    try {
        const response = await get(`auction/listings?_page=${page}&_limit=${limit}&_bids=true`);

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const listingsData = await response.json();

        console.log("API response data:", listingsData);

        return {
            data: listingsData.data,
            meta: listingsData.meta,
        };
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        throw error;
    }
};

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
        endsAt: endsAtDate.toISOString(),
    };

    const response = await post('auction/listings', formattedListingDetails, { headers });
    
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }
};

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
        console.log("Bid response data:", bidResponse);
        return bidResponse.data;
    } catch (error) {
        console.error("Failed to add bid:", error);
        throw error;
    }
};

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
        console.log("Search results:", searchResults);

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
        console.log("API response data:", listings);

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
        console.log("API response data:", listingDetails);
        return listingDetails.data;
    } catch (error) {
        console.error("Error fetching listing details:", error);
        throw error;
    }
};

export { fetchListings, createListing, addBid, viewBids, searchListings, fetchFeaturedListings, fetchListingsByTag, fetchListingDetails };