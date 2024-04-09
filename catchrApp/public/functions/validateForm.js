// function to validate form, checking that it was 1 uppercase char and 1 number
function validateForm() {
    const password = document.getElementById("password").value;

    // list of all special characters possible
    const specialChars = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!specialChars.test(password)) {
        alert("Password must be at least 6 characters with 1 uppercase and 1 number");
        return false; // Prevent form submission
    }

    // Check if password matches confirmation
    const passwordConfirmation = document.getElementById("password_confirmation").value;
    if (password !== passwordConfirmation) {
        alert("Passwords do not match");
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}