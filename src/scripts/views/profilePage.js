import { updateUserProfile, getUserCredits } from '../api/auth/auth.js';
import { API_BASE_URL } from '../api/apiBase.js';
import { API_KEY } from '../api/constants.js';

export const profilePage = async () => {
    const appContainer = document.getElementById('appContainer');
    const profile = await getProfileData();
    const credits = await getUserCredits();

    appContainer.innerHTML = `
        <div class="bg-secondary-blue bg-cover text-white py-8">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex">
                    <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="w-24 h-24 rounded-full border-4 border-primary-cream mr-4">
                    <div>
                        <h1 class="font-heading text-3xl">${profile.name}</h1>
                        <p>${profile.email}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mx-auto py-8">
            <div class="bg-primary-cream p-6 rounded-lg shadow-lg">
                <h2 class="font-heading text-2xl mb-2">Biography</h2>
                <p>${profile.bio}</p>
                <div class="grid grid-cols-3 gap-4 mt-4 text-secondary-blue">
                    <div class="text-center">
                        <h3 class="text-cl font-semibold">${profile._count.listings}</h3>
                        <p>Listings</p>
                    </div>
                    <div class="text-center">
                        <h3 class="text-xl font-semibold">${profile._count.wins}</h3>
                        <p>Wins</p>
                    </div>
                    <div class="text-center">
                        <h3 class="text-xl font-semibold">${credits}</h3>
                        <p>Credits</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const updateAvatarForm = document.getElementById('updateAvatarForm');
    if (updateAvatarForm) {
        updateAvatarForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const avatarUrl = document.getElementById('avatarUrl').value;

            try {
                await updateUserProfile({ avatar: { url: avatarUrl } });
                alert('Avatar updated successfully!');
            } catch (error) {
                console.error('Error updating avatar: ', error);
                alert('Error updating avatar. Please try again.');
            }
        });
    }
};

async function getProfileData() {
    try {
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('Username not found in local storage');
        }
        console.log(`Fetching profile data for user: ${username}`);
        const response = await fetch(`${API_BASE_URL}auction/profiles/${username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': API_KEY,
                'Accept': 'application/json'
            }
        });
        const responseText = await response.text();
        console.log('Response text: ', responseText);
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const profileData = responseText ? JSON.parse(responseText) : {};
        return profileData.data;
    } catch (error) {
        console.error('Failed to fetch profile data: ', error);
        throw error;
    }
}