// Appeler la fonction
// fetchCateg().then((categories) => {
//   console.log(categories);
// });

async function init() {
  const categories = await fetchCateg();

  showCategories(categories);

  const works = await fetchWorks();
  showWorks(works);
}

init();

const gallery = document.querySelector(".gallery");
const buttons = document.querySelectorAll(".filterbar button");
const worksFilters = document.querySelectorAll(".gallery figure");
const filterShow = document.querySelector(".filterbar");

//event
//for (let a = 0; a < buttons.length; a++) {
//buttons[a].addEventListener("click", filterImg);
//}

function showCategories(categories) {
  for (let a = 0; a < categories.length; a++) {
    //créa article et apport du contenu dynamique
    const categoriesProjets = document.createElement("button");
    //atribution des class
    categoriesProjets.setAttribute("class", "button");
    //attribution d'un id
    categoriesProjets.setAttribute("id", categories[a].id);
    categoriesProjets.textContent = categories[a].name;
    filterShow.appendChild(categoriesProjets);

    categoriesProjets.addEventListener("click", () => {
      let galleryFilter = document.querySelector(".gallery");
      galleryFilter.innerHTML = "";

      fetchWorks().then((response) => {
        let filterWorks = response.filter((work) => work.categoryId === 1);

        showWorks(filterWorks);
      });
    });
  }
}

// Creation des categories HTML

function showWorks(works) {
  for (let b = 0; b < works.length; b++) {
    //créa article et apport du contenu dynamique
    const worksProjets = document.createElement("figure");
    //atribution des class
    worksProjets.setAttribute("class", "figure");
    //attribution d'un id
    worksProjets.setAttribute("id", works[b].id);
    // attribution des categories
    worksProjets.setAttribute("data-category", works[b].categoryId);
    //ajout d'une image
    const img = document.createElement("img");
    img.src = works[b].imageUrl;
    //ajout d'un sous titre
    const sousTitre = document.createElement("figsub");
    sousTitre.innerHTML = works[b].title;
    //asso enfant parent
    gallery.appendChild(worksProjets);
    worksProjets.appendChild(img);
    worksProjets.appendChild(sousTitre);
  }

  // Creation des works HTML
}

function filterImg(d) {
  const btnType = parseInt(d.target.getAttribute("categoryId"));
  // Boucle au travers des travaux
  works.forEach((work) => {
    // Montrer tous les travaux
    work.classList.remove("hidden");
    // Récup les données depuis les attributs de données
    // Récup le type de donnée image
    const workType = parseInt(work.dataset.category);

    // Si le type image différent du type bouton
    if (workType !== btnType) {
      // Cacher le travail
      work.classList.add("hidden");
    }
  });
}

buttons[0].addEventListener("click", () => {
  works.forEach((work) => {
    work.classList.remove("hidden");
  });
});

const allWorks = document.getElementsByClassName("button")[0];
allWorks.addEventListener("click", () => {
  console.log("afficher les travaux");

  let galleryFilter = document.querySelector(".gallery");
  galleryFilter.innerHTML = "";

  fetchWorks().then((response) => {
    let filterWorks = response.filter((work) => work.categoryId === 1);

    showWorks(filterWorks);
    console.log(allWorks);
  });
});
