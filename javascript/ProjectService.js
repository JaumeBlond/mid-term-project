const cardImage = document.getElementById("cardImage");
const cardImageBlurr = document.getElementById("cardImageBlurr");
const descriptionField = document.getElementById("description");
const completitionDate = document.getElementById("completition");
const titleField = document.getElementById("title");
const contentField = document.getElementById("contentField");
const contentField2 = document.getElementById("contentField2");

const navBar = document.getElementById("navigationBar");
const footer = document.getElementById("footerSection");
const emailCTA = document.getElementById("CTAEmail");

function loadProject() {
  const urlParams = new URLSearchParams(window.location.search);
  const project = urlParams.get("uuid");
  if (project == null) {
    loadProjectInfo(1);
  } else {
    loadProjectInfo(project);
  }
}

function loadProjectInfo(projectId) {
  const response = fetch(
    `https://ih-json-server-zpfb.onrender.com/projects?uuid=${projectId}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((project) => {
        titleField.innerText = project.name;
        descriptionField.innerText = project.description;
        completitionDate.innerText = project.completed_on;
        cardImage.src = project.image;
        cardImageBlurr.src = project.image;
        contentField.innerText = project.content;
        contentField2.innerText = project.content;
      });
    });
  loadOtherProjects(projectId);
}

function loadOtherProjects(currentID) {
  let cardId = 1;
  for (let i = 1; i <= 3; i++) {
    if (cardId == currentID) {
      cardId++;
    }
    fetch(`https://ih-json-server-zpfb.onrender.com/projects?uuid=${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        data.map((project) => {
          loadCardImage(i, project.image);
          loadCardName(i, project.description);
          loadCardDescription(i, project.name);
          loadLink(i, project.uuid);
        });
      });
    cardId++;
  }
}

function loadCardImage(id, url) {
  console.log(id);
  let cardID = `card${id}_image`;
  let projectCardImage = document.getElementById(cardID);
  projectCardImage.src = url;
}

function loadCardName(id, name) {
  let cardID = `card${id}_name`;
  let titleText = document.getElementById(cardID);
  titleText.innerHTML = name;
}

function loadCardDescription(id, description) {
  let cardID = `card${id}_description`;
  const contentText = document.getElementById(cardID);
  contentText.innerText = description;
}

function loadLink(id, link) {
  const linkHref = document.querySelector(`#card${id} > .textInfo > a`);
  linkHref.href = `1.html?uuid=${link}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("../components/navBar.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      navBar.innerHTML = htmlContent;
    });

  fetch("../components/emailCTA.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      emailCTA.innerHTML = htmlContent;
    });
  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((htmlContent) => {
      footer.innerHTML = htmlContent;
    });

  loadProject();
});

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== "undefined") {
  module.exports = ProjectService;
}
