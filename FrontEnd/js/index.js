// Appeler la fonction
// fetchCateg().then((categories) => {
//   console.log(categories);
// });

async function init() {
  const categories = await fetchCateg();
  const works = await fetchWorks();
  showCategories(categories);
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

document.getElementById("addPic").addEventListener("change", function (event) {
  const [file] = event.target.files;
  const previewContainer = document.querySelector(".imagePreview");
  if (file) {
    const reader = new FileReader(); //-- permet de lire les files
    reader.onload = function (e) {
      //--- gestionnaire d'evenement comme window document ... onload charge des ressources externes
      const img = previewContainer.querySelector("img") || new Image();
      img.src = e.target.result;
      img.className = "selected-img";

      previewContainer.innerHTML = "";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file); //----La fonction de FileReader lit et convertit File en chaîne de caractères.
  }
});

//------ Envois du formulaire---------------
const formMain = document.getElementById("submit_form_js");

formMain.addEventListener("click", async function (event) {
  event.preventDefault();

  const form = document.getElementById("form-valid");
  const addPic = document.getElementById("addPic");
  const title = document.getElementById("title");
  const catSelect = document.getElementById("cat_select");

  //--validation champs
  if (!addPic.files.length || !title.value || !catSelect.value) {
    //-- si * ou * ou *sont false alors message d'erreur
    document.querySelector(".erreur").textContent = "Veuillez remplir tous les champs";
    return;
  }

  //----prépa données du formulaire formData

  const formData = new FormData();
  formData.append("image", addPic.files[0]);
  formData.append("title", title.value);
  formData.append("category", catSelect.value);

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
      showModalWorks(updatedWorks); // mettre à jour la modal
      showWorks(updatedWorks); // mettre à jour les works de la page
      closeModal(event); //----fermer la modal
      formMain.reset(); //---vider le formulaire
    } else {
      throw new Error(`Echec de l'envoie du formulaire`);
    }
  } catch (error) {
    console.error(error);
    document.querySelector(".erreur").textContent = error.message;
  }
});
