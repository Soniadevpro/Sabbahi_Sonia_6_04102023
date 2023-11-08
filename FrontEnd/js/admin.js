// MODELE POUR STYLE LORSQUE CONNECTE

let token = localStorage.getItem("authToken");
const changeLog = document.querySelector(".login");
const editBanner = document.querySelector(".edit-banner");
const byeFilterBar = document.querySelector(".filterbar");
const buttonModal = document.querySelector(".button-modal");

if (token) {
  editBanner.style.display = "flex";
  byeFilterBar.style.display = "none";
  buttonModal.style.display = "flex";
  changeLog.innerHTML = "logout";
  changeLog.style.fontWeight = "bold";
  changeLog.style.textDecoration = "underline";

  changeLog.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "./login.html";
  });
}
