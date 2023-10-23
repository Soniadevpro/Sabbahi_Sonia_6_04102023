//----------------------------------------------------
// RQT FETCH POST AVEC LES DONNEES DU FORMULAIRE DU SWAGGER
//-----------------------------------------------------------

const init2 = {
  method: "POST",
  headers: {
    "Content-Type": "application/JSON",
  },
  body: JSON.stringify(),
};

document.querySelector("form").addEventListener("submit", () => {
  fetch("http://localhost:5678/api/users/login", init2).then(() => console.log("data, ok"));
});
