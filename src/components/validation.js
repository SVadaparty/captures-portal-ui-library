// pp-validation.js
window.PPValidation = (function () {

    const validators = {
        required: value =>
            value.trim() !== ""
                ? ""
                : "This field is required",

        email: value =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ""
                : "Please enter a valid email",

        password: value =>
            value.length >= 8
                ? ""
                : "Password must be at least 8 characters",

        pincode: value =>
            /^[0-9]{6}$/.test(value)
                ? ""
                : "Pincode must be 6 digits",

        mobileNumber: value =>
            /^\d{10}$/.test(value.trim())
                ? ""
                : "Mobile number must be exactly 10 digits"
    };

    function init() {
        document.querySelectorAll("[data-pp-input]").forEach(input => {
            const field = input.dataset.field;
            const type = input.dataset.type;
            const isRequired = input.dataset.required === "true";

            const messageBox = document.querySelector(
                `[data-pp-validation][data-for="${field}"]`
            );

            if (!messageBox) return;

            function validate() {
                const value = input.value || "";
                let error = "";

                if (isRequired) {
                    error = validators.required(value);
                }

                if (!error && validators[type]) {
                    error = validators[type](value);
                }

                messageBox.textContent = error;
                messageBox.style.display = error ? "block" : "none";
            }

            input.addEventListener("input", validate);
            input.addEventListener("blur", validate);
        });
    }

    return { init };
})();
