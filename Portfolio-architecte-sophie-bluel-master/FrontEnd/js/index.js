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
    console.log(categories);
  }
}
// Creation des categories HTML

function showWorks(works) {
  for (let i = 0; i < works.length; i++) {
    //créa article et apport du contenu dynamique
    const worksProjets = document.createElement("figure");
    //atribution des class
    worksProjets.setAttribute("class", "figure");
    //attribution d'un id
    worksProjets.setAttribute("id", works[i].id);
    // attribution des categories
    worksProjets.setAttribute("data-category", works[i].categoryId);
    //ajout d'une image
    const img = document.createElement("img");
    img.src = works[i].imageUrl;
    //ajout d'un sous titre
    const sousTitre = document.createElement("figsub");
    sousTitre.innerHTML = works[i].title;
    //asso enfant parent
    gallery.appendChild(worksProjets);
    worksProjets.appendChild(img);
    worksProjets.appendChild(sousTitre);
  }

  // Creation des works HTML
}

// créa des categories
