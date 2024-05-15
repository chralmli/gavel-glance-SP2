import { registerUser } from '../api/auth/auth.js';
import { displayErrorMessage } from '../tools/errorMessage.js';
import auctionImage from '../../assets/auction-image-tp.png';

export const registerPage = () => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
    <div class="min-h-screen flex flex-col md:flex-row">
        <!-- Left Section -->
        <div class="md:w-1/2 flex items-center justify-center p-6 bg-primary-cream">
            <img src="${auctionImage}" alt="Auction" class="max-w-full max-h-full">
        </div>

        <!-- Right Section: Registration Form -->
        <div class="md:w-1/2 bg-white flex items-center justify-center p-6">
            <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Account</h1>
                <form id="registerForm" class="space-y-6">
                    <div id="formErrorContainer"></div>
                    <div>
                        <label for="name" class="block text-gray-700">Name</label>
                        <input type="text" placeholder="Name" id="name" required class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label for="profileImage" class="block text-gray-700">Profile Image URL</label>
                        <input type="url" placeholder="Profile Image URL" id="profileImage" class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label for="profileImageAlt" class="block text-gray-700">Profile Image Alt Text</label>
                        <input type="text" placeholder="Profile Image Alt Text" id="profileImageAlt" class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label for="bio" class="block text-gray-700">Bio</label>
                        <textarea placeholder="Bio" id="bio" class="block w-full mb-2 px-3 py-2 border rounded"></textarea>
                    </div>
                    <div>
                        <label for="email" class="block text-gray-700">Email</label>
                        <input type="email" placeholder="Email" id="email" required class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700">Password</label>
                        <input type="password" placeholder="Password" id="password" required class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" required class="block w-full mb-2 px-3 py-2 border rounded">
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="venueManager" class="mr-2">
                        <label for="venueManager" class="text-gray-700">Are you a venue manager?</label>
                    </div>
                    <button type="submit" class="bg-secondary-blue hover:bg-accent-blue text-white font-bold py-2 px-4 rounded">Create Account</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const profileImage = document.getElementById('profileImage').value.trim();
        const profileImageAlt = document.getElementById('profileImageAlt').value.trim();
        const bio = document.getElementById('bio').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const venueManager = document.getElementById('venueManager').checked;

        if (!email.endsWith('@stud.noroff.no')) {
            displayErrorMessage('formErrorContainer', 'Password must be at least 8 characters long.');
            return;
        }

        if (password.length < 8) {
            displayErrorMessage('formErrorContainer', 'Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            displayErrorMessage('formErrorContainer', 'Passwords do not match.');
            return;
        }

        if (bio && bio.length > 160) {
            displayErrorMessage('formErrorContainer', 'Bio must be less than 160 characters.');
            return;
        }

        if (profileImage && !isValidUrl(profileImage)) {
            displayErrorMessage('formErrorContainer', 'Profile Image URL is not valid.');
            return;
        }

        if (profileImageAlt && profileImageAlt.length > 120) {
            displayErrorMessage('formErrorContainer', 'Profile Image Alt Text must be less than 120 characters.');
            return;
        }

        const avatar = profileImage ? { url: profileImage, alt: profileImageAlt || '' } : undefined;

        try {
            const response = await registerUser(name, email, password, bio, avatar, venueManager);
            console.log('Registration successful', response);
            alert('User registered successfully!');
            window.location.hash = 'login';
        } catch (error) {
            console.error('Error registering user: ', error);
            displayErrorMessage('formErrorContainer', `Error registering user. Please try again. ${error.message}`);
        }
    });

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
};