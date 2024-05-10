export const updateNavigation = () => {
    const userNav = document.getElementById('userNav');
    userNav.style.display = isLoggedIn() ? 'block' : 'none';
};