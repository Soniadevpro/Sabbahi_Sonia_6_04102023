// Appeler la fonction
// fetchCateg().then((categories) => {
//   console.log(categories);
// });

async function init() {
  const categories = await fetchCateg();
  const works = await fetchWorks();

  showCategories(categories, works);
  console.log(categories, works);
  showWorks(works);
  showModalWorks(works);

  // autrefontuon()
}

init();

function showCategories(categories, works) {
  const filterShow = document.querySelector(".filterbar");

  const categoriesProjets = document.createElement("button");
  categoriesProjets.setAttribute("class", "btnCat");
  categoriesProjets.setAttribute("id", 0);
  categoriesProjets.textContent = "Tous";
  filterShow.appendChild(categoriesProjets);

  categoriesProjets.addEventListener("click", () => {
    // Désélectionner tous les boutons de catégorie
    const allCategoryButtons = document.querySelectorAll(".btnCat");
    allCategoryButtons.forEach((button) => button.classList.remove("selected"));
    showWorks(works);
  });

  for (const categorie of categories) {
    const categoriesProjets = document.createElement("button");
    categoriesProjets.setAttribute("class", "btnCat");
    categoriesProjets.setAttribute("id", categorie.id);
    categoriesProjets.textContent = categorie.name;
    filterShow.appendChild(categoriesProjets);

    // Ajouter les element de la modal

    categoriesProjets.addEventListener("click", () => {
      // Désélectionner tous les boutons de catégorie
      const allCategoryButtons = document.querySelectorAll(".btnCat");
      allCategoryButtons.forEach((button) => button.classList.remove("selected"));

      // Sélectionner le bouton de catégorie actuel
      categoriesProjets.classList.add("selected");

      let filterWorks = works.filter((work) => work.categoryId === categorie.id);
      showWorks(filterWorks);
    });
  }
}

// Creation des categories HTML

function showWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    //créa article et apport du contenu dynamique
    const worksProjets = document.createElement("figure");
    //attribution des class
    worksProjets.setAttribute("class", "figure");
    //attribution d'un id
    worksProjets.setAttribute("id", work.id);
    // attribution des categories
    worksProjets.setAttribute("data-category", work.categoryId);
    //ajout d'une image
    const img = document.createElement("img");
    img.src = work.imageUrl;
    //ajout d'un sous titre
    const sousTitre = document.createElement("figsub");
    sousTitre.innerHTML = work.title;
    //asso enfant parent
    gallery.appendChild(worksProjets);
    worksProjets.appendChild(img);
    worksProjets.appendChild(sousTitre);
  }

  // Creation des works HTML
}

// dans modal wrapper je dois recupérer la fonction showWorks.

function showModalWorks(works) {
  const modalWrapp = document.querySelector(".workmodal");
  modalWrapp.innerHTML = "";

  for (const workModal of works) {
    const showInModal = document.createElement("figuremod");
    showInModal.setAttribute("class", "figure-modal");
    showInModal.setAttribute("id", workModal.id);

    const img = document.createElement("img");
    img.src = workModal.imageUrl;
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-regular fa-trash-can");
    icon.addEventListener("click", (e) => {
      e.preventDefault();

      console.log("ID de l'image : " + workModal.id);

      fetchDelete(workModal.id);
      // removeImage(workModal.id);
    });
    modalWrapp.appendChild(showInModal);
    showInModal.appendChild(icon);
    showInModal.appendChild(img);
  }
}
//------------Fonction qui va faire se supprimer les works au click de la poubelle
//------------------------------------------------------------------------------------
function removeImage(imageId) {
  const imageToRemove = document.querySelector(`.figure-modal[id="${imageId}"]`);
  if (imageToRemove) {
    imageToRemove.remove();
  }
}

async function populateCategorySelect() {
  // Récupérez les données des catégories depuis l'API avec fetchCateg
  try {
    const categories = await fetchCateg(); // Assurez-vous que fetchCateg renvoie les données des catégories correctement
    const select = document.getElementById("cat_select");

    // Pour chaque catégorie, créez une option et ajoutez-la au select
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id; // La valeur de l'option, vous pouvez utiliser l'ID de la catégorie
      option.textContent = category.name; // Le texte affiché dans l'option, vous pouvez utiliser le nom de la catégorie
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}

// Appelez cette fonction pour remplir le select avec les catégories
populateCategorySelect();

//---------------- affichage image modal

const imageInput = document.getElementById("addPic");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    // Affichez la prévisualisation de l'image
    showImagePreview(file);
  } else {
    // Effacez la prévisualisation si aucun fichier n'est sélectionné
    clearImagePreview();
  }
});

function showImagePreview(file) {
  // Créez un élément image pour afficher la prévisualisation
  const imgElement = document.createElement("img");
  imgElement.setAttribute("class", "preview-image");

  // Utilisez l'objet URL pour créer une URL temporaire pour le fichier image
  const imageURL = URL.createObjectURL(file);
  imgElement.src = imageURL;

  // Ajoutez l'image à la div de prévisualisation
  imagePreview.innerHTML = "";
  imagePreview.appendChild(imgElement);

  // Vous pouvez également ajouter du CSS pour définir la taille de la prévisualisation, etc.
}

function clearImagePreview() {
  // Effacez la prévisualisation en supprimant l'enfant de la div
  imagePreview.innerHTML = "";
}

//-----------VALIDATION CHAMPS DE FORMUILAIRE
//---------------------------------------------
function validateForm() {
  const titleInput = document.getElementById("title");
  const imageInput = document.getElementById("addPic");

  if (titleInput.value.trim() === "") {
    alert("Le champ titre ne peut pas être vide.");
    return false; // Arrêtez l'envoi du formulaire
  }

  if (imageInput.files.length === 0) {
    alert("Sélectionnez une image.");
    return false; // Arrêtez l'envoi du formulaire
  }

  return true; // Permettez l'envoi du formulaire si la validation réussit
}

//----------- FORMDATA  POUR ENVOYER LES DONNEES
//-----------------------------------------------------

const myForm = document.getElementById("form_valid");
myForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêchez l'envoi par défaut du formulaire
  if (!validateForm()) {
    return; // Arrêtez l'envoi du formulaire si la validation échoue
  }

  const formData = new FormData(myForm);

  // Ajoutez le token d'authentification (si nécessaire)
  const token = localStorage.getItem("authToken");
  if (token) {
    formData.append("Authorization", `Bearer ${token}`);
  }
});

//-Envoyer le formulaire et les données via le fetch avec la méthode POST

async function handleSubmitForm(formData) {
  // Utilisez le code de la requête fetch ici
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      // Vous pouvez ajouter des en-têtes personnalisés ici
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
  } else {
    alert("Une erreur s'est produite lors de l'envoi du formulaire.");
  }
}

// Assurez-vous que le formulaire a un ID dans le HTML
// Utilisation de document.querySelector pour sélectionner le formulaire
// const form = document.querySelector("form");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault(); // Empêche la soumission du formulaire par défaut

//   // Récupérez les données du formulaire, par exemple, formData
//   const formData = new FormData(form);

//   // Appelez la fonction pour gérer la soumission du formulaire
//   await handleSubmitForm(formData);
// });
