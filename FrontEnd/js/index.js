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
//---------------------Créer Select et option--------
//----------------------------------------------------------------
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

//---------------- Preview image modal---------------
//---------------------------------------------------

const imageInput = document.getElementById("addPic");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    // Affichez la prévisualisation de l'image
    showImagePreview(file);

    // Mettez à jour le champ du titre avec le nom du fichier (image)
    const titleInput = document.getElementById("title");
    titleInput.value = file.name;

    // Sélectionnez la catégorie correspondante en utilisant getCategoryFromFileName
    const selectedCategory = getCategoryFromFileName(file.name);

    // Si la catégorie est trouvée, mettez à jour la sélection du menu déroulant
    if (selectedCategory) {
      const categorySelect = document.getElementById("cat_select");
      categorySelect.value = selectedCategory.id; // Sélectionnez la catégorie par sa valeur
    } else {
      // Si la catégorie n'est pas trouvée, vous pouvez réinitialiser la sélection ou effectuer d'autres actions.
      console.log("Catégorie non trouvée pour le fichier : " + file.name);
    }
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
  const tokenValid = localStorage.getItem("validToken");
  if (tokenValid) {
    formData.append("Authorization", `Bearer ${tokenValid}`);
  }

  // Envoyer le formulaire
  handleSubmitForm(formData, tokenValid);
});

async function handleSubmitForm(formData, tokenValid) {
  // ... (votre code pour envoyer le formulaire)

  if (response.ok) {
    // Traitement de la réponse réussie (par exemple, afficher un message de succès)
    console.log("Formulaire envoyé avec succès !");
    closeModal(); // Fermer la modal
    clearForm(); // Vider le formulaire
    refreshWorks(); // Actualiser les works
  } else {
    alert("Une erreur s'est produite lors de l'envoi du formulaire.");
    console.log(response.statusText); // Afficher le message d'erreur de la réponse
  }
}

async function refreshWorks() {
  const works = await fetchWorks();
  showWorks(works);
}
function clearForm() {
  document.getElementById("title").value = ""; // Réinitialise le champ titre
  document.getElementById("addPic").value = ""; // Réinitialise le champ d'ajout d'image
  document.getElementById("cat_select").selectedIndex = 0; // Réinitialise la sélection de catégorie
}
