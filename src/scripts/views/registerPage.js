import { registerUser } from '../api/auth/auth.js';

export const registerPage = () => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
            <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Account</h1>
            <form id="registerForm" class="space-y-6">
                <input type="text" placeholder="Name" id="name" required class="block w-full mb-2 px-3 py-2 border rounded">
                <input type="url" placeholder="Profile Image URL" id="profileImage" class="block w-full mb-2 px-3 py-2 border rounded">
                <input type="email" placeholder="Email" id="email" required class="block w-full mb-2 px-3 py-2 border rounded">
                <input type="password" placeholder="Password" id="password" required class="block w-full mb-2 px-3 py-2 border rounded">
                <input type="password" placeholder="Confirm Password" id="confirmPassword" required class="block w-full mb-2 px-3 py-2 border rounded">
                <button type="submit" class="bg-secondary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
        </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const profileImage = document.getElementById('profileImage').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!email.endsWith('@stud.noroff.no')) {
            alert('Please use your stud.noroff.no email to register.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await registerUser(email, password, name, profileImage);
            alert('User registered successfully!');
        } catch (error) {
            console.error('Error registering user: ', error);
            alert('Error registering user. Please try again.');
        }
    });
};