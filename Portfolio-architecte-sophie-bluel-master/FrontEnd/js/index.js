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

const gallery = document.querySelector(".filterbar");

function showCategories(categories) {
  // Creation des categories HTML
}

function showWorks(works) {
  // Creation des works HTML
}
