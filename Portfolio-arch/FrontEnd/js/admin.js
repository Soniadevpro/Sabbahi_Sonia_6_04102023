// MODELE POUR STYLE LORSQUE CONNECTE
let token = localStorage.getItem("authToken");
const login =
if (token) {
  banner.style.display = "flex";

  modalButton.forEach((button) => {
    button.style.display = "flex";
  });

  login.innerHTML = "logout";
  login.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  });
}
