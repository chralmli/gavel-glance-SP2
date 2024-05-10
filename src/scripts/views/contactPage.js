export const contactPage = () => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
        <div class="container mx-auto p-8">
            <h1 class="text-3xl font-heading text-secondary-blue mb-6">Contact Us</h1>
            <form class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue sm:text-sm" required>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue sm:text-sm" required>
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue sm:text-sm" required></textarea>
                </div>
                <div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-blue hover:bg-secondary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-blue">
                </div>
            </form>
        </div>
    `;
};