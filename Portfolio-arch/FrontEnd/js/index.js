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
    // for (let b = 0; b < works.length; b++) {
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

// dans le modal wrapper je dois recupérer la fonction showWorks.

function showModalWorks(works) {
  const modalWrapp = document.querySelector(".workmodal");
  modalWrapp.innerHTML = "";

  for (const workModal of works) {
    const showInModal = document.createElement("figuremod");
    showInModal.setAttribute("class", "figure-modal");
    showInModal.setAttribute("id", workModal.id);

    const img = document.createElement("img");
    img.src = workModal.imageUrl;

    modalWrapp.appendChild(showInModal);
    showInModal.appendChild(img);
  }
}
