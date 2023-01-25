const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//Variables declaration
const REQUIRED_MSG = 'This field cannot be left blank';
const INVALID_EMAIL = 'Please enter a valid e-mail address';
const INVALID_PHONE = 'Please enter a valid phone number';
const INVALID_PASSWORD = 'Password should satisfy specified rules';
const PASSWORD_MISMATCH = 'The password confirmation does not match';

//Set warning message
function setWarning(input, message, status) {
    input.parentNode.querySelector('small').innerText = message;
    if (status) {
        input.classList.remove('errorInput');
    }
    else {
        input.classList.add('errorInput');
    }
    return status;
}

//Required field validation
function requiredField(input, message) {
    const inputValue = input.value.trim();
    if (inputValue == '') {
        return setWarning(input, message, false);
    }
    else {
        return setWarning(input, '', true);
    }
}

//Password pattern matching
function passwordCheck(input, reqmessage, invalidmessage) {
    const required = requiredField(input, reqmessage);
    if (!required) {
        return false;
    }
    const passwordPattern = /(?=^.{10,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (passwordPattern.test(input.value.trim())) {
        return setWarning(input, '', true);
    }
    else {
        return setWarning(input, invalidmessage, false);
    }
}

//Password confirmation
function confirmPassword(input, reqmessage, mismatchmessage) {
    const matchinput = document.getElementById('password').value.trim();
    const required = requiredField(input, reqmessage);
    if (!required) {
        return false;
    }
    if (matchinput === input.value.trim()) {
        return setWarning(input, '', true);
    }
    else {
        return setWarning(input, mismatchmessage, false);
    }
}

//Email pattern matching
function emailValidation(input, reqmessage, invalidmessage) {
    const required = requiredField(input, reqmessage);
    if (!required) {
        return false;
    }
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailPattern.test(input.value.trim())) {
        return setWarning(input, '', true);
    }
    else {
        return setWarning(input, invalidmessage, false);
    }
}

//Phone number pattern matching
function phoneValidation(input, reqmessage, invalidmessage) {
    const required = requiredField(input, reqmessage);
    if (!required) {
        return false;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(input.value.trim())) {
        return setWarning(input, '', true);
    }
    else {
        return setWarning(input, invalidmessage, false);
    }
}

//Eventlistener
const form = document.getElementById('signup');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let nameValid = requiredField(document.getElementById('name'), REQUIRED_MSG);
    let passwordValid = passwordCheck(document.getElementById('password'), REQUIRED_MSG, INVALID_PASSWORD);
    let confirmValid = confirmPassword(document.getElementById('confirmpassword'), REQUIRED_MSG, PASSWORD_MISMATCH);
    let emailValid = emailValidation(document.getElementById('email'), REQUIRED_MSG, INVALID_EMAIL);
    let phoneValid = phoneValidation(document.getElementById('mobile'), REQUIRED_MSG, INVALID_PHONE);

    if (nameValid && passwordValid && confirmValid && emailValid && phoneValid) {
        alert('You have successfully entered the data !');
        form.reset();
    }
});