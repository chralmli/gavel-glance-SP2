// import { registerUser } from '../api/auth/auth.js';
import { setupRegisterListener } from '../listeners/registerListener.js';
// import { displayErrorMessage } from '../tools/errorMessage.js';
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

    setupRegisterListener();
};