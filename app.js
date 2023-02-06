const form = document.querySelector("form");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
let counter = 1;
const showError = (input, msg) => {
  const inputBox = input.parentElement;
  inputBox.classList = "input__box error";
  const errorMsg = inputBox.querySelector(".error__msg");
  errorMsg.innerText = msg;
};

const showSuccess = (input) => {
  const inputBox = input.parentElement;
  inputBox.classList = "input__box success";
};

// Get the input name by Id to be showing in error message
const getInputName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = (...inputs) => {
  inputs.forEach((input) => {
    //First condition is to change the error message content in password confirmation
    if (confirmPassword.id === input.id && input.value === "") {
      showError(input, "Please enter the same password");
    } else if (input.value === "") {
      showError(input, `${getInputName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkUserName = (input, min, max) => {
  if (input.value.length < min || input.value.length > max) {
    showError(input, `Enter a name between ${min} and ${max} character`);
  } else {
    showSuccess(input);
    return true;
  }
};

const checkEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!String(email.value).toLowerCase().match(regex)) {
    showError(email, "Enter a valid email");
  } else {
    showSuccess(email);
  }
  return String(email.value).toLowerCase().match(regex);
};

const checkUserPassword = (input, min, max) => {
  if (input.value.length < 8) {
    showError(input, `Password must be more than ${min} characters`);
  } else if (input.value.length > 25) {
    showError(input, `Password must be less than ${max} characters`);
  } else {
    showSuccess(input);
    return true;
  }
};

const checkPasswordConfirmation = (input1, input2) => {
  if (input1.value === input2.value && input1.value.length >= 8) {
    showSuccess(input2);
    return true;
  } else {
    showError(input2, "Please enter the same password");
  }
};

const preventDefaultCheck = () => {
  let flag = true;
  if (
    checkUserName(userName, 3, 15) &&
    checkEmail(userEmail) &&
    checkUserPassword(password, 8, 25) &&
    checkPasswordConfirmation(password, confirmPassword)
  ) {
    flag = false;
  } else {
    flag ? event.preventDefault() : "";
  }
};

form.addEventListener("submit", (event) => {
  checkRequired(userName, userEmail, password, confirmPassword);
  checkUserName(userName, 3, 15);
  checkEmail(userEmail);
  checkUserPassword(password, 8, 25);
  checkPasswordConfirmation(password, confirmPassword);
  preventDefaultCheck();
});
