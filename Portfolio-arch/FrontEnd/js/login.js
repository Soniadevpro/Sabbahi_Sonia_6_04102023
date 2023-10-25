// const init2 = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     email: "inputMail",
//     password: "inputPass",
//   }),
//   mode: "cors",
//   credentials: "same-origin",
// };

// fetch("http://localhost:5678/api/users/login", init2).then(() => console.log("data envoyée"));

// const result = fetch("http://localhost:5678/api/users/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     email: "inputMail",
//     password: "inputPass",
//   }),
//   mode: "cors",
//   credentials: "same-origin",
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json));

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  // Récupération des données du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Création de l'objet de données à envoyer
  const data = {
    email: email,
    password: password,
  };

  // Envoi de la requête POST vers l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      let token = data.token;
      localStorage.setItem("authToken", token);

      // Traiter la réponse de l'API ici
      if (token) {
        alert("Connexion réussie !");
        // Redirection vers la page index
        window.location.href = "/Portfolio-arch/FrontEnd/index.html";
      } else {
        alert("Échec de la connexion. Vérifiez vos informations.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête : ", error);
    });
});
