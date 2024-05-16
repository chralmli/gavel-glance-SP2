function updateNavigation() {
    const authLink = document.getElementById('authLink');

    if (isLoggedIn()) {
        authLink.href = '#logout';
        authLink.removeEventListener('click', handleLoginClick);
        authLink.addEventListener('click', handleLoginClick);
    } else {
        authLink.textContent = 'Login';
        authLink.href = '#login';
        authLink.removeEventListener('click', handleLogoutClick);
        authLink.addEventListener('click', handleLoginClick);
    }
}

function handleLogoutClick(event) {
    event.preventDefault();
    logoutUser();
    updateNavigation();
    window.location.hash = 'home';
}

export { updateNavigation };