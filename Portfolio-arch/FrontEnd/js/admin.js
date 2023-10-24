// Appel du token
const authUser = localStorage.getItem("authToken");

// Modifications de l'accueil lorsque administrateur

if (authUser) {
  // Le bouton login devient logout
  const loginBtn = document.querySelector(".login");
  loginBtn.innerText = "logout";
  // Au clic sur logout, je me déconnecte
  loginBtn.addEventListener("click", function (logout) {
    // On empêche le refresh de la page par défaut
    logout.preventDefault();
    // Effacer le contenu du localStorage
    localStorage.clear();
    // Renvoi à l'accueil
    window.location.href = "./index.html";
  });
}
