export const getUserIP = async () => {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        return await response.json();
    } catch (error) {
        console.error("Error fetching IP:", error);
    }
};