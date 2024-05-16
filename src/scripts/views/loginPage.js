import { setupLoginListener } from '../listeners/loginListener.js';
import { isLoggedIn, logoutUser } from '../api/auth/auth.js';

export const loginPage = () => {
    const appContainer = document.getElementById('appContainer');
    const loggedIn = isLoggedIn();

    appContainer.innerHTML = `
        <div class="flex justify-center items-center min-h-screen bg-primary-cream">
            <div class="w-full max-w-md">
                <form id="loginForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div id="formErrorContainer"></div>
                    <div class="mb-4">
                        <label class="block text-secondary-blue text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-secondary-blue text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*****************" required>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-secondary-blue hover:bg-accent-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" ${loggedIn ? 'disabled' : ''}>
                            Sign In
                        </button>
                        ${loggedIn ? '<button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>' : ''}
                    </div>
                </form>
                ${loggedIn ? '<p class="text-center text-green-500">You are logged in.</p>' : ''}
            </div>
        </div>
    `;
    if (loggedIn) {
        document.getElementById('logoutButton').addEventListener('click', () => {
            logoutUser();
            window.location.reload();
        });
    } else {
        setupLoginListener();
    }
};