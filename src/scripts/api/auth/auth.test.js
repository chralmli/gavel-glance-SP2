import { post } from '../apiBase';
import { API_BASE_URL } from '../apiBase';
import { API_KEY } from '../constants';
import { 
    registerUser, loginUser, logoutUser, isLoggedIn, 
    getUserProfile, updateUserProfile, getUserCredits, 
    getAccessToken, createApiKey 
} from './auth';

// Mock the post function
jest.mock('../apiBase', () => ({
    post: jest.fn()
}));

// Mock the fetch function globally
global.fetch = jest.fn();

describe('Auth API functions', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ data: 'mockData' }), status: 201 };
            post.mockResolvedValue(mockResponse);

            const result = await registerUser('name', 'email', 'password', 'bio', 'avatar', true);

            expect(result).toEqual({ data: 'mockData' });
            expect(post).toHaveBeenCalledWith('auth/register', {
                name: 'name',
                email: 'email',
                password: 'password',
                bio: 'bio',
                venueManager: true,
                avatar: 'avatar'
            }, { headers: { 'Content-Type': 'application/json' } });
        });

        it('should throw an error if registration fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), status: 400 };
            post.mockResolvedValue(mockResponse);

            await expect(registerUser('name', 'email', 'password', 'bio', 'avatar', true))
                .rejects.toThrow('Failed to register user: 400 - mockError');
        });
    });

    describe('loginUser', () => {
        it('should login a user successfully and store token', async () => {
            const mockResponse = {
                json: jest.fn().mockResolvedValue({ data: { accessToken: 'mockToken', name: 'mockName' } }),
                ok: true
            };
            post.mockResolvedValue(mockResponse);

            const result = await loginUser('email', 'password');

            expect(result).toEqual({ data: { accessToken: 'mockToken', name: 'mockName' } });
            expect(post).toHaveBeenCalledWith('auth/login', { email: 'email', password: 'password' }, { headers: { 'Content-Type': 'application/json' } });
            expect(localStorage.getItem('token')).toBe('mockToken');
            expect(localStorage.getItem('username')).toBe('mockName');
        });

        it('should throw an error if login fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), ok: false, status: 400 };
            post.mockResolvedValue(mockResponse);

            await expect(loginUser('email', 'password'))
                .rejects.toThrow('Failed to login user: 400 - mockError');
        });
    });

    describe('logoutUser', () => {
        it('should remove token and username from localStorage', () => {
            localStorage.setItem('token', 'mockToken');
            localStorage.setItem('username', 'mockName');

            logoutUser();

            expect(localStorage.getItem('token')).toBeNull();
            expect(localStorage.getItem('username')).toBeNull();
        });
    });

    describe('isLoggedIn', () => {
        it('should return true if token is present in localStorage', () => {
            localStorage.setItem('token', 'mockToken');

            const result = isLoggedIn();

            expect(result).toBe(true);
        });

        it('should return false if token is not present in localStorage', () => {
            localStorage.removeItem('token');

            const result = isLoggedIn();

            expect(result).toBe(false);
        });
    });

    describe('getAccessToken', () => {
        it('should return the token from localStorage', () => {
            localStorage.setItem('token', 'mockToken');

            const result = getAccessToken();

            expect(result).toBe('mockToken');
        });
    });

    describe('getUserProfile', () => {
        it('should fetch and return the user profile', async () => {
            const mockResponse = {
                json: jest.fn().mockResolvedValue({ data: 'mockProfile' }),
                ok: true
            };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            const result = await getUserProfile();

            expect(result).toEqual('mockProfile');
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}auction/profiles/mockName`, {
                headers: {
                    Authorization: 'Bearer mockToken',
                    'X-Noroff-API-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        });

        it('should throw an error if fetching profile fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), ok: false, status: 400 };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            await expect(getUserProfile()).rejects.toThrow('Failed to get user profile: 400');
        });
    });

    describe('updateUserProfile', () => {
        it('should update the user profile successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue('mockUpdatedProfile'), ok: true };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            const result = await updateUserProfile({ bio: 'newBio' });

            expect(result).toEqual('mockUpdatedProfile');
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}auction/profiles/mockName`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer mockToken',
                    'X-Noroff-API-Key': API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: 'newBio' })
            });
        });

        it('should throw an error if updating profile fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), ok: false, status: 400 };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            await expect(updateUserProfile({ bio: 'newBio' })).rejects.toThrow('Failed to update user profile: 400');
        });
    });

    describe('getUserCredits', () => {
        it('should fetch and return the user credits', async () => {
            const mockResponse = {
                json: jest.fn().mockResolvedValue({ data: { credits: 1000 } }),
                ok: true
            };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            const result = await getUserCredits();

            expect(result).toBe(1000);
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}auction/profiles/mockName`, {
                headers: {
                    'Authorization': 'Bearer mockToken',
                    'X-Noroff-API-Key': API_KEY
                }
            });
        });

        it('should throw an error if fetching credits fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), ok: false, status: 400 };
            fetch.mockResolvedValue(mockResponse);
            localStorage.setItem('username', 'mockName');
            localStorage.setItem('token', 'mockToken');

            await expect(getUserCredits()).rejects.toThrow('Failed to get user credits: 400');
        });
    });

    describe('createApiKey', () => {
        it('should create an API key successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ data: { key: 'mockApiKey' } }), ok: true };
            post.mockResolvedValue(mockResponse);
            localStorage.setItem('token', 'mockToken');

            const result = await createApiKey();

            expect(result).toBe('mockApiKey');
            expect(post).toHaveBeenCalledWith('auth/create-api-key', {}, {
                headers: {
                    'Authorization': 'Bearer mockToken',
                    'Content-Type': 'application/json'
                }
            });
        });

        it('should throw an error if creating API key fails', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ message: 'mockError' }), ok: false, status: 400 };
            post.mockResolvedValue(mockResponse);
            localStorage.setItem('token', 'mockToken');

            await expect(createApiKey()).rejects.toThrow('Failed to create API key: 400 - mockError');
        });
    });
});