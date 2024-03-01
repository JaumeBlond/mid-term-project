const navBar = document.getElementById("navigationBar");
const footer = document.getElementById("footerSection");
const emailCTA = document.getElementById("CTAEmail");
const projects = document.getElementById("projects");

function loadImage(id, url) {
  let cardID = `projectCard${id}_img`;
  let cardImage = document.getElementById(cardID);
  cardImage.src = url;
}

function loadTitle(id, title) {
  let cardID = `projectCard${id}_title`;
  let titleText = document.getElementById(cardID);
  titleText.innerHTML = title;
}

function loadSubtitle(id, description) {
  let cardID = `projectCard${id}_description`;
  const contentText = document.getElementById(cardID);
  contentText.innerText = description;
}

function setProjectLink(id, uuid) {
  const linkHref = document.querySelector(`#projectCard${id} > .textInfo > a`);
  linkHref.id = `button${uuid}`;
  linkHref.href = `projects/1.html?uuid=${uuid}`;
}

function loadContent() {
  for (let i = 1; i <= 3; i++) {
    fetch(`https://ih-json-server-zpfb.onrender.com/projects?uuid=${i}`)
      .then((response) => response.json())
      .then((data) => {
        data.map((project) => {
          loadImage(i, project.image);
          loadSubtitle(i, project.description);
          loadTitle(i, project.name);
          setProjectLink(i, project.uuid);
        });
      });
  }
}

function setListener() {
  const submitButton = document.getElementById("CTAButton");
  submitButton.addEventListener("click", function () {
    const email = document.getElementById("inputEmail");
    alert(`We will contact you soon on: ${email.value.trim()}`);
  });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    fetch("./components/navBar.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        navBar.innerHTML = htmlContent;
      });
    fetch("./components/projectsCards.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        projects.innerHTML = htmlContent;
      })
      .finally(loadContent());

    fetch("./components/emailCTA.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        emailCTA.innerHTML = htmlContent;
      })
      .finally(setListener);
    fetch("./components/footer.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        footer.innerHTML = htmlContent;
      });
  },
  false
);

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== "undefined") {
  module.exports = index;
}
