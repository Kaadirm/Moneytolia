// Regular expression pattern for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to validate email
const isValidEmail = (email) => {
    return emailRegex.test(email);
};

// Export the validateEmail function
module.exports = isValidEmail;