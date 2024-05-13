import Carousel from "../carousel/index";
import { displayFeaturedListings } from "../templates/featuredListings";

export const homePage = async () => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
        <section class="hero-section bg-hero-pattern bg-cover bg-center mx-auto text-center py-40 min-h-screen p-12">
            <h1 class="font-heading text-4xl font-bold text-gray-700 mb-3">All-Purpose Auction</h1>
            <button class="bg-secondary-blue hover:bg-blue-700 text-primary-cream font-bold py-2 px-4 rounded">
                Start Bidding Now
            </button>
        </section>
        <section class="container mx-auto px-4 py-8 text-center">
            <h2 class="text-2xl font-bold mb-4">FEATURED LISTINGS</h2>
            <div class="carousel">
                <div class="carousel-content"></div>
                <button class="carousel-prev">Prev</button>
                <button class="carousel-next">Next</button>
            </div>
        </section>
    `;

    try {
        const listings = await displayFeaturedListings();
        new Carousel('.carousel', { items: listings });
    } catch (error) {
        console.error('Error initializing the carousel with listings: ', error);
    }
};