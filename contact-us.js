import { send } from "@emailjs/browser";

const Name = document.getElementById("name");
const email = document.getElementById("email");
const nameHolder = document.getElementById("name-holder");
const emailHolder = document.getElementById("email-holder");
const message = document.querySelector("textarea");
const messageHolder = document.getElementById("message-holder");
const submit = document.getElementById("submit-btn");

const sendEmail = e => {
  e.preventDefault();

  if (Name.value === "" || email.value === "" || message.value === "") {
    alert("Please enter your name, email, and message.");
  } else {
    if (!email.value.includes("@")) {
      alert("Email must contain @ symbol.");
    } else {
      submit.textContent = "SENDING...";

      send(
        "joview-mail",
        "template_scnkg34",
        {
          name: Name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
        },
        "XymwmkfziJI-JtCUJ"
      )
        .then(() => {
          Name.value = "";
          email.value = "";
          message.value = "";

          submit.textContent = "SENT!";

          alert("Email successfully sent!");
          setTimeout(() => (submit.textContent = "SEND EMAIL"), 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};

nameHolder.addEventListener("click", () => Name.focus());
Name.addEventListener("focus", () => (nameHolder.style.translate = "0 30px"));
Name.addEventListener("focusout", () => {
  if (Name.value) {
    return;
  } else {
    nameHolder.style.translate = "0 49px";
  }
});

emailHolder.addEventListener("click", () => email.focus());
email.addEventListener("focus", () => (emailHolder.style.translate = "0 30px"));
email.addEventListener("focusout", () => {
  if (email.value) {
    return;
  } else {
    emailHolder.style.translate = "0 49px";
  }
});

messageHolder.addEventListener("click", () => Name.focus());
message.addEventListener(
  "focus",
  () => (messageHolder.style.translate = "0 33px")
);
message.addEventListener("focusout", () => {
  if (message.value) {
    return;
  } else {
    messageHolder.style.translate = "0 134px";
  }
});

submit.addEventListener("click", sendEmail);