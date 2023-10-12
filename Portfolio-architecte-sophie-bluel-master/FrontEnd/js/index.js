// Appeler la fonction
// fetchCateg().then((categories) => {
//   console.log(categories);
// });

async function init() {
  const categories = await fetchCateg();

  showCategories(categories);
  console.log(categories);

  const works = await fetchWorks();
  showWorks(works);
  console.log(works);
}

init();

const gallery = document.querySelector(".gallery");

function showCategories(categories) {}
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
