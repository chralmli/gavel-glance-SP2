export const registerPage = () => {
    const appContainer = document.getElementById('appContainer');
    appContainer.innerHTML = `
        <div class="flex justify-center items-center min-h-screen bg-primary-cream">
            <div class="w-full max-w-md">
                <form id="registerForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-secondary-blue text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-secondary-blue text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-secondary-blue hover:bg-accent-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('registerForm').addEventListener('submit', handleRegisterSubmit);
};

function handleRegisterSubmit(event) {
    event.preventDefault();
    // Register logic
}