export const renderView = (content) => {
    const appContainer = document.getElementById('appContainer');
    if (typeof content === 'string') {
        appContainer.innerHTML = content;
    } else if (content instanceof Element) {
        appContainer.innerHTML = '';
        appContainer.appendChild(content);
    }
};