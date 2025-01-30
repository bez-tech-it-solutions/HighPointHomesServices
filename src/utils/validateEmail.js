export const validateEmail = (email, trigger = null, message = null) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
        trigger && trigger(true);
        message && message(null);
    } else {
        trigger && trigger(false);
        message && message("Please enter a valid email");
    }
};