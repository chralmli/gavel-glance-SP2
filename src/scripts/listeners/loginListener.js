import { loginUser, createApiKey } from '../api/auth/auth.js';
import { displayErrorMessage } from '../tools/errorMessage.js';
import { updateNavigation } from '../ui/navigation.js';

const setupLoginListener = () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm && !loginForm.dataset.listenerAdded) {
        loginForm.dataset.listenerAdded = 'true';
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                await loginUser(email, password);
                const apiKey = await createApiKey();
                alert('User logged in successfully!');
                updateNavigation();
                window.location.hash = 'home';
            } catch (error) {
                console.error('Login failed:', error);
                displayErrorMessage('formErrorContainer', 'Error logging in user. Please try again.');
            }
        });
    }
};

export { setupLoginListener };