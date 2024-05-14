class Carousel {
    constructor(selector, options) {
        this.carouselElement = document.querySelector(selector);
        this.carouselContent = this.carouselElement.querySelector('.carousel-content');
        this.items = options.items;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.renderItems();
        this.setupNavigation();
    }

    renderItems() {
        this.items.forEach(item => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item', 'flex-none', 'w-full', 'md:w-1/3', 'p-2', 'box-border', 'text-center', 'bg-white', 'rounded-lg', 'shadow-lg');
            carouselItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="carousel-image w-full h-48 object-cover rounded-t-lg">
                <div class="carousel-item-content p-4">
                    <h4 class="text-lg font-semibold">${item.title}</h4>
                    <p class="text-gray-600">${item.description}</p>
                    <p class="text-gray-500">Bids: ${item.bidCount}</p>
                    <button class="cta-btn bg-accent-blue hover:bg-secondary-blue text-white font-bold py-2 px-4 rounded mt-2">Bid Now</button>
                </div>
            `;
            this.carouselContent.appendChild(carouselItem);
        });
    }

    moveCarousel(direction) {
        const itemWidth = this.carouselContent.querySelector('.carousel-item').offsetWidth;
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.items.length - 1;
        if (this.currentIndex >= this.items.length) this.currentIndex = 0;
        this.carouselContent.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`;
    }

    setupNavigation() {
        const prevButton = this.carouselElement.querySelector('.carousel-prev');
        const nextButton = this.carouselElement.querySelector('.carousel-next');
        prevButton.addEventListener('click', () => this.moveCarousel(-1));
        nextButton.addEventListener('click', () => this.moveCarousel(1));
    }
}

export default Carousel;