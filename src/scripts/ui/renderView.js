import { footer } from '../views/footer.js';

export const renderView = (content, includeFooter = true) => {
    const appContainer = document.getElementById('appContainer');
    if (typeof content === 'string') {
        appContainer.innerHTML = content;
    } else if (content instanceof Element) {
        appContainer.innerHTML = '';
        appContainer.appendChild(content);
    }
    if (includeFooter) {
        appContainer.innerHTML += footer();
    }
};