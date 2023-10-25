// MODELE POUR STYLE LORSQUE CONNECTE

let token = localStorage.getItem("authToken");
const changeLog = document.querySelector(".login");
const editBanner = document.querySelector(".edit-banner");
const byeFilterBar = document.querySelector(".filterbar");
if (token) {
  editBanner.style.display = "flex";
  byeFilterBar.style.display = "none";
  changeLog.innerHTML = "logout";
  changeLog.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "./login.html";
  });
}
