import { fetchListingsByTag } from '../api/auction/auction.js';

const displayPopularCategories = async () => {
    const container = document.getElementById('popularCategoriesContainer');
    const categories = await fetchListingsByTag('popular');
    categories.data.forEach(category => {
        container.appendChild(createCategoryCard(category));
    });
};

const createCategoryCard = (category) => {
    const card = document.createElement('div');
    card.className = 'card popular-card';
    card.innerHTML = `
    <img src="${category.media[0]?.url || 'default-image.jpg'}" alt="${category.media[0]?.alt}">
    <div class="p-4">
        <h3>${category.title}</h3>
        <p>${category.description}</p>
    </div>
    `;
    return card;
};

export { displayPopularCategories };