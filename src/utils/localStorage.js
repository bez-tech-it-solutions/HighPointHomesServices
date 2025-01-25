/* eslint-disable no-unused-vars */
export const loadFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) return defaultValue;

    try {
        const parsedValue = JSON.parse(storedValue);
        return Object.keys(parsedValue).length > 0 ? parsedValue : storedValue;
    } catch (e) {
        return storedValue;
    }
};

export const saveToLocalStorage = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
    });
};

export const deleteFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};