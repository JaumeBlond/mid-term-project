const submitForm = document.getElementById("submitButton");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formPhone = document.getElementById("phone");
const formMessage = document.getElementById("messageText");
const navBar = document.getElementById("navigationBar");
const footer = document.getElementById("footerSection");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
const phoneRegex = /^(?:6|7|9)\d{8}$/; // Regular expression for Spanish phone number validation without country code

function checkFields() {
  if (formName.value.trim() == "ironhack") {
    alert("You cannot be Ironhack, because I am Ironhack");
  }
}

function checkSubmit() {
  if (
    formName.value.trim() !== "" &&
    formEmail.value.trim() !== "" &&
    formPhone.value.trim() !== "" &&
    formMessage.value.trim() !== ""
  ) {
    if (emailRegex.test(formEmail.value.trim())) {
      formEmail.style.border = ""; // Remove red border if email is valid
      submitForm.disabled = false;
    } else if (phoneRegex.test(formPhone.value.trim())) {
      formPhone.style.border = ""; // Remove red border if email is valid
      submitForm.disabled = false;
    } else {
      if (!emailRegex.test(formEmail.value.trim())) {
        formEmail.style.border = "2px solid red"; // Add red border if email is invalid
        submitForm.disabled = true;
      }
      if (!phoneRegex.test(formPhone.value.trim())) {
        formPhone.style.border = "2px solid red"; // Add red border if email is invalid
        submitForm.disabled = true;
      }
    }
  } else {
    submitForm.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  submitForm.addEventListener("click", checkFields);

  formName.addEventListener("input", checkSubmit);
  formEmail.addEventListener("input", checkSubmit);
  formPhone.addEventListener("input", checkSubmit);
  formMessage.addEventListener("input", checkSubmit);

  fetch("./components/navBar.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      navBar.innerHTML = htmlContent;
    });
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      footer.innerHTML = htmlContent;
    });
});

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== "undefined") {
  module.exports = contactService;
}
