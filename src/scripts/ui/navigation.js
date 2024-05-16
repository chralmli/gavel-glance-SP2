import { isLoggedIn, logoutUser, getUserProfile } from "../api/auth/auth";

function updateNavigation() {
    const authLink = document.getElementById('authLink');
    const registerLink = document.getElementById('registerLink');
    const profileContainer = document.getElementById('profileContainer');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileCredits = document.getElementById('profileCredits');

    if (isLoggedIn()) {
        getUserProfile().then(profile => {
            profileAvatar.src = profile.avatar.url;
            profileName.textContent = profile.name;
            profileCredits.textContent = `Credits: ${profile.credits}`;
        });

        profileContainer.classList.remove('hidden');
        authLink.classList.add('hidden');
        registerLink.classList.add('hidden');
    } else {
        profileContainer.classList.add('hidden');
        authLink.classList.remove('hidden');
        registerLink.classList.remove('hidden');
    }
    
    authLink.removeEventListener('click', handleLoginClick);
    authLink.addEventListener('click', handleLoginClick);

    document.getElementById('logoutLink').addEventListener('click', handleLogoutClick);
    profileAvatar.addEventListener('click', toggleDropdown);
}

function handleLogoutClick(event) {
    event.preventDefault();
    logoutUser();
    updateNavigation();
    window.location.hash = 'home';
}

function handleLoginClick() {
    window.location.hash = 'login';
}

function toggleDropdown() {
    const profileDropdown = document.getElementById('profileDropdown');
    profileDropdown.classList.toggle('hidden');
}

export { updateNavigation };