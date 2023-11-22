// Appeler la fonction
// fetchCateg().then((categories) => {
//   console.log(categories);
// });

async function init() {
  const categories = await fetchCateg();
  const works = await fetchWorks();
  showCategories(categories, works);
  showWorks(works);
  showModalWorks(works);
  loadCategories();
  console.log(works, categories);
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
    const sousTitre = document.createElement("figcaption");
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
    const showInModal = document.createElement("div");
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
//------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--- catégorie selec et option
async function loadCategories() {
  try {
    const categories = await fetchCateg();
    const selectElement = document.getElementById("cat_select");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories : ", error);
  }
}

//Preview

const preview = document.getElementById("addphotos");
const imageForm = document.querySelector(".imageForm");

// Initialisation
imageForm.style.display = "block"; // Masquer initialement .imageForm

preview.addEventListener("change", function (event) {
  const [file] = event.target.files;
  const previewContainer = document.querySelector(".imagePreview");
  if (file) {
    const reader = new FileReader(); //-- permet de lire les files
    reader.onload = function (e) {
      //--- gestionnaire d'evenement comme window document ... onload charge des ressources externes
      const img = previewContainer.querySelector("img") || new Image();
      img.src = e.target.result;
      // img.className = "selected-img";
      // previewContainer.innerHTML = "";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file); //----La fonction de FileReader lit et convertit File en chaîne de caractères.
  }
  imageForm.style.display = "none"; // Afficher .imageForm lorsqu'une image est sélectionnée
});

//------ Envois du formulaire---------------
const submitForm = document.getElementById("submit_form_js");
const selectImg = document.querySelector(".selected-img");
const formMain = document.getElementById("form_valid");

// preview.addEventListener("click", () => {
//   if (selectImg) {
//     selectImg.style.display = "flex";
//   }
// });

formMain.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const catSelect = document.getElementById("cat_select").value;
  const errorMessageElement = document.querySelector(".erreur");
  //--validation champs
  if (!preview.files.length || !title || !catSelect) {
    //-- si * ou * ou *sont false alors message d'erreur

    errorMessageElement.textContent = "Veuillez remplir tous les champs";
    errorMessageElement.style.display = "block"; // Assurez-vous que l'élément est visible
    return;
  } else {
    // Cacher le message d'erreur si les champs sont correctement remplis

    errorMessageElement.style.display = "none";
  }

  //----prépa données du formulaire formData

  const formData = new FormData();
  formData.append("image", preview.files[0]);
  console.log(preview.files[0]);
  formData.append("title", title);
  formData.append("category", catSelect);
  console.log(catSelect.value);

  //----envoi du formulaire try catch pr verif
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const updatedWorks = await fetchWorks();

      alert("Projet ajouté avec succès !");
      showModalWorks(updatedWorks); // mettre à jour la modal
      showWorks(updatedWorks); // mettre à jour les works de la page
      closeModal(event); //----fermer la modal

      formMain.reset(); //---vider le formulaire
      imageForm.style.display = "block"; // Afficher de nouveau .imageForm après réinitialisation
      let imagePreview = document.querySelector(".selected-img");
      imagePreview.src = "";
      updateSubmitButtonState();
    } else {
      const errorText = await response.text(); // Ou response.json() si le serveur renvoie du JSON
      throw new Error(`Échec de l'envoi du formulaire : ${errorText}`);
    }
  } catch (error) {
    console.error(error);
    document.querySelector(".erreur").textContent = error.message;
  }
});

submitForm.disabled = true; // Désactiver le bouton lors de l'initialisation

function updateSubmitButtonState() {
  const title = document.getElementById("title").value;
  const catSelect = document.getElementById("cat_select").value;
  const isFormValid = preview.files.length && title && catSelect;

  submitForm.disabled = !isFormValid; // Activer ou désactiver le bouton en fonction de la validité du formulaire
  submitForm.style.backgroundColor = isFormValid ? "#1d6154" : "grey"; // Modifier la couleur du bouton
}

// Ajoutez des écouteurs d'événements pour chaque champ du formulaire
preview.addEventListener("change", updateSubmitButtonState);
document.getElementById("title").addEventListener("input", updateSubmitButtonState);
document.getElementById("cat_select").addEventListener("change", updateSubmitButtonState);

// Appel initial pour définir l'état initial du bouton
updateSubmitButtonState();
