import { createListing } from './auction.js';

describe('createListing', () => {
  it('should throw an error if the end date is not between today and one year from now', async () => {
    const listingDetails = {
      title: 'Test Listing',
      description: 'This is a test listing',
      imageInput: 'https://example.com/image.jpg',
      imageAltInput: 'Test Image',
      endsAt: '2022-01-01', // Set an end date that is not between today and one year from now
    };

    await expect(createListing(listingDetails)).rejects.toThrow('End date must be between today and one year from now');
  });

  it('should make a POST request to create a new listing', async () => {
    const listingDetails = {
      title: 'Test Listing',
      description: 'This is a test listing',
      imageInput: 'https://example.com/image.jpg',
      imageAltInput: 'Test Image',
      endsAt: '2023-01-01', // Set an end date between today and one year from now
    };

    // Mock the localStorage.getItem method
    localStorage.getItem = jest.fn().mockReturnValue('testToken');

    // Mock the fetch function and return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    await createListing(listingDetails);

    // Verify that the fetch function was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('auction/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': 'your-api-key',
        'Authorization': 'Bearer testToken',
      },
      body: JSON.stringify({
        title: 'Test Listing',
        description: 'This is a test listing',
        tags: [],
        media: [{
          url: 'https://example.com/image.jpg',
          alt: 'Test Image',
        }],
        endsAt: '2023-01-01T00:00:00.000Z',
      }),
    });
  });

  it('should throw an error if the API responds with an error status', async () => {
    const listingDetails = {
      title: 'Test Listing',
      description: 'This is a test listing',
      imageInput: 'https://example.com/image.jpg',
      imageAltInput: 'Test Image',
      endsAt: '2023-01-01', // Set an end date between today and one year from now
    };

    // Mock the localStorage.getItem method
    localStorage.getItem = jest.fn().mockReturnValue('testToken');

    // Mock the fetch function and return an error response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(createListing(listingDetails)).rejects.toThrow('API responded with status 500');
  });
});import { get } from "../apiBase.js";
import { fetchListings } from "./auction.js";

describe('fetchListings', () => {
  it('should fetch listings with default page and limit', async () => {
    // Mock the get function and return a successful response
    get.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: [{ id: 1, title: 'Listing 1' }, { id: 2, title: 'Listing 2' }],
        meta: { total: 2 },
      }),
    });

    const result = await fetchListings();

    // Verify that the get function was called with the correct arguments
    expect(get).toHaveBeenCalledWith('auction/listings?_page=1&_limit=10&_bids=true');

    // Verify the returned result
    expect(result).toEqual({
      data: [{ id: 1, title: 'Listing 1' }, { id: 2, title: 'Listing 2' }],
      meta: { total: 2 },
    });
  });

  it('should fetch listings with custom page and limit', async () => {
    // Mock the get function and return a successful response
    get.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: [{ id: 3, title: 'Listing 3' }, { id: 4, title: 'Listing 4' }],
        meta: { total: 4 },
      }),
    });

    const result = await fetchListings(2, 5);

    // Verify that the get function was called with the correct arguments
    expect(get).toHaveBeenCalledWith('auction/listings?_page=2&_limit=5&_bids=true');

    // Verify the returned result
    expect(result).toEqual({
      data: [{ id: 3, title: 'Listing 3' }, { id: 4, title: 'Listing 4' }],
      meta: { total: 4 },
    });
  });

  it('should throw an error if the API responds with an error status', async () => {
    // Mock the get function and return an error response
    get.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchListings()).rejects.toThrow('API responded with status 500');
  });
});