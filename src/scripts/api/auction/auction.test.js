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
});