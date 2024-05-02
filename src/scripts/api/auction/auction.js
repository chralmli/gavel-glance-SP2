import { get, post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";

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

const fetchPopularListings = async () => {
    const response = await get('auction/listings');
    const listings = await response.json();
    // Sort listings by the number of bids, descending
    return listings.data.sort((a, b) => b._count.bids - a._count.bids);
};

const fetchListingByTag = async (tag) => {
    const response = await get(`auction/listings?tag=${tag}`);
    return response.json();
};

export { createListing, addBid, viewBids, searchListings, fetchPopularListings, fetchListingByTag };