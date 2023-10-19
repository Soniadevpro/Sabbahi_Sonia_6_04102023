// fonction asynchrone pour récupérer les catégories
async function fetchCateg() {
  // Effectuer une requête HTTP asynchrone vers l'URL spécifiée
  const requete = await fetch("http://localhost:5678/api/categories");

  // Vérif de la requête
  if (requete.ok === true) {
    // Si la requête réussi, renvoyer les données JSON
    const data = await requete.json();
    return data;
  } else {
    // Si la requête a échoué, lancer un message d'erreur
    throw new Error("Impossible de contacter le serveur");
  }
}

async function fetchWorks() {
  const requete2 = await fetch("http://localhost:5678/api/works");
  if (requete2.ok === true) {
    // Si la requête réussi, renvoyer les données JSON
    const data2 = await requete2.json();
    return data2;
  } else {
    // Si la requête a échoué, lancer un message d'erreur
    throw new Error("Impossible de contacter le serveur");
  }
}

//----------------------------------------------------
// RQT FETCH POST AVEC LES DONNEES DU FORMULAIRE DU SWAGGER
//--------------------------------------------------------
