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

//------DERNIERE PARTIE DU CODE AVANT RDV MENTOR---------------
//----------------------------------------------------------------

//---------------------Créer Select et option--------
//----------------------------------------------------------------

//--------------------------------------------------------------------------------

// Fonction pour gérer l'ajout de projet
function handleAddProject() {
  const form = document.getElementById("imgpreview");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const catId = document.getElementById("cat_select").value;
    const image = document.getElementById("addPic").files[0];

    if (!title || !catId || !image) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", catId);
    formData.append("image", image);

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
        alert("Projet ajouté avec succès.");
        closeModal();
        form.reset();
        init(); // Actualiser les projets
      } else {
        alert("Une erreur s'est produite lors de l'ajout du projet.");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// Fonction pour gérer la prévisualisation de l'image
function handleImagePreview() {
  const addPicInput = document.getElementById("addPic");
  const imagePreview = document.querySelector(".imagePreview");

  addPicInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Fonction pour charger les catégories dans le formulaire
async function loadCategories() {
  const catSelect = document.getElementById("cat_select");
  const categories = await fetchCateg();

  catSelect.innerHTML = categories.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join("");
}

// Appeler les fonctions pour gérer le formulaire d'ajout
handleAddProject();
handleImagePreview();
loadCategories();
