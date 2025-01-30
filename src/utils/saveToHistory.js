import { getUserIP } from './getUserIP'
import { loadFromLocalStorage } from './localStorage'

export const saveToHistory = async (name, value) => {
    try {
        const { ip } = await getUserIP();
        const profile = loadFromLocalStorage('profile', null);
        await fetch("https://api.teintoo.com/api.php/history", {
            method: "POST",
            body: JSON.stringify({ [profile ? "userEmail": "userIP"]: profile ? profile?.email: ip, name, value }),
        });
    } catch (error) {
        console.error("Error fetching IP:", error);
    }
};