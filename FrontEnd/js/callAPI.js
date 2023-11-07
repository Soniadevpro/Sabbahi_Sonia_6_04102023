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

//-- fetch delete
async function fetchDelete(imageId) {
  const token = localStorage.getItem("authToken");
  try {
    const requete3 = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (requete3.ok) {
      console.log("Image supprimée avec succès");
      init();
    } else {
      alert("Erreur lors de la suppression de l'image");
    }
  } catch (error) {
    console.log(error);
  }
}

//----------------------------------------------------
// //-Envoyer le formulaire et les données via le fetch avec la méthode POST
//--------------------------------------------------------

// Dans callAPI.js

// Ajoutez cette fonction pour faire le POST du nouveau projet
// async function postNewWork(formData) {
//   const token = localStorage.getItem("authToken");
//   try {
//     const response = await fetch(`http://localhost:5678/api/works`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });
//     if (!response.ok) throw new Error("Erreur lors de l'ajout du projet");
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// }
