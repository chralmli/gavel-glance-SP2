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
            carouselItem.classList.add('carousel-item');
            carouselItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="carousel-image">
                <div class="carousel-item-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <p>Bids: ${item.bidCount}</p>
                    <button class="cta-btn">Bid Now</button>
                </div>
            `;
            this.carouselContent.appendChild(carouselItem);
        });
    }

    moveCarousel(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.items.length - 1;
        if (this.currentIndex >= this.items.length) this.currentIndex = 0;
        this.carouselContent.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    setupNavigation() {
        const prevButton = this.carouselElement.querySelector('.carousel-prev');
        const nextButton = this.carouselElement.querySelector('.carousel-next');
        prevButton.addEventListener('click', () => this.moveCarousel(-1));
        nextButton.addEventListener('click', () => this.moveCarousel(1));
    }
}

export default Carousel;