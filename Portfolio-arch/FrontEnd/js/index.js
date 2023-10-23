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

  // autrefontuon()
}

init();

// const buttons = document.querySelectorAll(".filterbar button");
// const worksFilters = document.querySelectorAll(".gallery figure");

//event
//for (let a = 0; a < buttons.length; a++) {
//buttons[a].addEventListener("click", filterImg);
//}

function showCategories(categories, works) {
  const filterShow = document.querySelector(".filterbar");

  const categoriesProjets = document.createElement("button");
  //atribution des class
  categoriesProjets.setAttribute("class", "btnCat");
  //attribution d'un id
  categoriesProjets.setAttribute("id", 0);
  categoriesProjets.textContent = "Tous";
  filterShow.appendChild(categoriesProjets);

  categoriesProjets.addEventListener("click", () => {
    showWorks(works);
  });

  for (const categorie of categories) {
    // for (let a = 0; a < categories.length; a++) {
    //créa article et apport du contenu dynamique
    const categoriesProjets = document.createElement("button");
    //atribution des class
    categoriesProjets.setAttribute("class", "btnCat");
    //attribution d'un id
    categoriesProjets.setAttribute("id", categorie.id);
    categoriesProjets.textContent = categorie.name;
    filterShow.appendChild(categoriesProjets);
    categoriesProjets.addEventListener("click", () => {
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
// Tous
// buttons[0].addEventListener("click", () => {
//   worksFilters.forEach((work) => {
//     work.classList.remove("hidden");
//   });
// });

// const allWorks = document.getElementsByClassName("btnCat")[0];
// allWorks.addEventListener("click", () => {
//   // console.log("afficher les travaux");

//   // let galleryFilter = document.querySelector(".gallery");
//   // galleryFilter.innerHTML = "";

//   // fetchWorks().then((response) => {
//   showWorks(response);
//   // console.log(allWorks);
//   // });
// });

// //Objets
// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     const objWorks = document.getElementsByClassName("btnCat")[1];
//     objWorks.addEventListener("click", () => {
//       let galleryFilter = document.querySelector(".gallery");
//       galleryFilter.innerHTML = "";

//       fetchWorks().then((response) => {
//         let filterWorks = response.filter((work) => work.categoryId === 1);
//         //console.log(filterWorks);
//         showWorks(filterWorks);
//       });
//     });
//   }, 1000);
// });
// //Appartements
// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     const apptWorks = document.getElementsByClassName("btnCat")[2];
//     apptWorks.addEventListener("click", () => {
//       let galleryFilter = document.querySelector(".gallery");
//       galleryFilter.innerHTML = "";

//       fetchWorks().then((response) => {
//         let filterWorks = response.filter((work) => work.categoryId === 2);
//         // console.log(filterWorks);
//         showWorks(filterWorks);
//       });
//     });
//   }, 1000);
// });
// //Restaus hôtels
// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     const hotWorks = document.getElementsByClassName("btnCat")[3];
//     hotWorks.addEventListener("click", () => {
//       let galleryFilter = document.querySelector(".gallery");
//       galleryFilter.innerHTML = "";

//       fetchWorks().then((response) => {
//         let filterWorks = response.filter((work) => work.categoryId === 3);
//         console.log(filterWorks);
//         showWorks(filterWorks);
//       });
//     });
//   }, 1000);
// });
// Appel du token
