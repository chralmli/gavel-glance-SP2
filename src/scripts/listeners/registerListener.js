import { registerUser } from '../api/auth/auth.js';
import { displayErrorMessage } from '../tools/errorMessage.js';

const setupRegisterListener = () => {
    // Registration form listener
    const registerForm = document.getElementById('registerForm');
    if (registerForm && !registerForm.dataset.listenerAdded) {
        registerForm.dataset.listenerAdded = 'true';
        registerForm.addEventListener('submit', async (event) => {
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
                if (error.message.includes('409')) {
                    displayErrorMessage('formErrorContainer', 'Email is already in use.');
                } else {
                    displayErrorMessage('formErrorContainer', `Error registering user. Please try again. ${error.message}`);
                }
            }
        });
    }
};

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export { setupRegisterListener };