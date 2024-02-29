const projectButton = document.querySelectorAll(".gotoProject");

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
  linkHref.className = `gotoProject`;
}

function loadContent() {
  for (let i = 1; i <= 3; i++) {
    const response = fetch(`http://localhost:8000/projects?uuid=${i}`)
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

document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadContent();
    const projectButton = document.getElementsByClassName("gotoProject");
  },
  false
);

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== "undefined") {
  module.exports = index;
}
