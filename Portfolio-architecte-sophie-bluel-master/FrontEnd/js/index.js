// fonction asynchrone pour récupérer les catégories
async function fetchCateg() {
  // Effectuer une requête HTTP asynchrone vers l'URL spécifiée
  const requete = await fetch("http://localhost:5678/api/categories");

  // Vérif de la requête
  if (requete.ok === true) {
    // Si la requête réussi, renvoyer les données JSON
    return requete.json();
  } else {
    // Si la requête a échoué, lancer un message d'erreur
    throw new Error("Impossible de contacter le serveur");
  }
}

// Appeler la fonction
fetchCateg().then((categories) => {
  console.log(categories);
});
