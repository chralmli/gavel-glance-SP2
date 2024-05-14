export const footer = () => `
    <footer class="bg-secondary-blue text-white py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 class="font-bold text-lg mb-2">Quick Links</h3>
                    <ul>
                        <li><a href="#home" class="hover:underline">Home</a></li>
                        <li><a href="#about" class="hover:underline">About</a></li>
                        <li><a href="#listings" class="hover:underline">All Listings</a></li>
                        <li><a href="#contact" class="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">Stay Updated</h3>
                    <p class="mb-4">Sign up for our newsletter to receive the latest auction updates and exclusive offers right in your inbox!</p>
                    <form class="flex justify-center md:justify-start">
                        <input type="email" class="px-4 py-2 rounded-l-lg" placeholder="Your Email..."></input>
                        <button class="bg-primary-cream hover:bg-accent-blue text-white px-4 py-2 rounded-r-lg">Submit</button>
                    </form>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">Connect With Us</h3>
                    <div class="flex justify-center md:justify-start space-x-4">
                        <a href="#" class="hover:underline"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="hover:underline"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="hover:underline"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="hover:underline"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4">
            <p>Designed and Developed by <a href="#" class="hover:underline">Christian Almli</a></p>
        </div>
    </footer>
`;