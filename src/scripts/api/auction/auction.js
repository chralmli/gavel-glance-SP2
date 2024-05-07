import { get, post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";

const fetchListings = async () => {
    try {
        const response = await get('auction/listings');
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const listings = await response.json();
        console.log("API response data:", listings);
        return listings.data;
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        throw error;
    }
};

const createListing = async (token, apiKey, listingDetails) => {
    const headers = getAuthHeaders(token, apiKey);
    return post('auction/listings', listingDetails, { headers }).then(res => res.json());
};

const addBid = async (token, apiKey, listingId, bidAmount) => {
    const headers = getAuthHeaders(token, apiKey);
    return post(`auction/listings/${listingId}/bids`, { bidAmount }, { headers }).then(res => res.json());
};

const viewBids = async (token, apiKey, listingId) => {
    const headers = getAuthHeaders(token, apiKey);
    return get(`auction/listings/${listingId}/bids`, { headers }).then(res => res.json());
}

const searchListings = async (query) => {
    return get(`auction/listings?search=${query}`).then(res => res.json());
}

const fetchFeaturedListings = async () => {
    try {
        const response = await get('auction/listings');
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

const fetchListingDetails = async (listingId, token, apiKey) => {
    const headers = getAuthHeaders(token, apiKey);
    try {
        const response = await get(`auction/listings/${listingId}`, { headers });
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const listingDetails = await response.json();
        console.log("API response data:", details);
        return listingDetails;
    } catch (error) {
        console.error("Error fetching listing details:", error);
        throw error;
    }
};

export { fetchListings, createListing, addBid, viewBids, searchListings, fetchFeaturedListings, fetchListingsByTag, fetchListingDetails };