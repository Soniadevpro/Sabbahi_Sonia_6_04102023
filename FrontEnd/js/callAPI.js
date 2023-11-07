// ---------FETCH GET CATEGORIES----------------
//-----------------------------------------------

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
//------------FETCH GET WORKS----------------
//-------------------------------------------

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

//---------------- Fetch DELETE--------
//------------------------------------
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
//-------- Fetch POST Works
//-----------------------------

async function submitFormWithData() {
  const formData = new FormData(document.getElementById("form_valid"));
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const token = localStorage.getItem("authToken");
  // Vérifiez que le token est bien récupéré
  console.log("Authorization Token:", token);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l’envoi du formulaire");
    }

    // Actualisez les works ici avec les nouvelles données
    const updatedWorks = await fetchWorks();
    showWorks(updatedWorks);
    showModalWorks(updatedWorks);

    // Fermez la modal et réinitialisez le formulaire
    closeModal(); // Assurez-vous que cette fonction existe et est correcte
    document.getElementById("form_valid").reset();
  } catch (error) {
    console.error(error);
  }
}
