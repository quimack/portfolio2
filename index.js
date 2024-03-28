const parallax = document.getElementById("parallax");

// Parallax Effect for DIV 1
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset + "px";
});

const spinner = document.getElementById("spinner");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");

// Modals
let close = document.getElementsByClassName("close")[0];
let closeError = document.getElementsByClassName("close")[1];

close.onclick = function () {
  successModal.style.display = "none";
};
closeError.onclick = function () {
  errorModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == successModal) {
    successModal.style.display = "none";
  }
  if (event.target == errorModal) {
    errorModal.style.display = "none";
  }
};

// Form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  const formData = new FormData(this);
  const contactData = {};
  formData.forEach((value, key) => {
    contactData[key] = value;
  });

  const data = {
    service_id: "service_mbklyko",
    template_id: "template_1o0lxnw",
    user_id: "rtp5OCQsr9OC_68R4",
    template_params: contactData,
  };

  sendEmail(form, data);
});

const sendEmail = (form, data) => {
  spinner.style.display = "block";

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      spinner.style.display = "none";
      if (response.ok) {
        successModal.style.display = "block";
        form.reset();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .catch(function (error) {
      console.log(error);
      errorModal.style.display = "block";
    });
}

// Footer actions
const phoneNumber = document.getElementById("phoneNumber");
const copiedIcon = document.getElementById("copiedIcon");

phoneNumber.addEventListener("click", function () {
  const copyTxt = "+5491127957486";

  var element = document.createElement("textarea");
  element.value = copyTxt;
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  copiedIcon.style.opacity = 1;
  setTimeout(() => {
    copiedIcon.style.opacity = 0;
  }, 1300);
});
