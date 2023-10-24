// Déclaration de l'URL pour la requête fetch

const urlLogin = "http://localhost:5678/api/users/login";

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector(".password").value;
  // Déclaration de l'objet à envoyer
  const formData = {
    email: email,
    password: password,
  };

  // Déclaration de la valeur de l'option body
  const formJSON = JSON.stringify(formData);
  //console.log(formJSON);

  // Requête fetch méthode POST
  fetch(urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formJSON,
  })
    // Traitement de la réponse
    .then((response) => response.json())
    .then((data) => {
      // Affichage des données retournées dans la console

      let token = data.token;
      if (token) {
        // Stockage du token en local
        localStorage.setItem("authToken", token);
        // Renvoi à la page d'accueil
        window.location.href = "./index.html";
      } else {
        // Message d'erreur si mauvais identifiants
        alert("Erreur d'adresse mail ou du mot de passe.");
      }
    });
}

console.log("page login");
