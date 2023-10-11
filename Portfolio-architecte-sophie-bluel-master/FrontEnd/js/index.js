///FETCH-----------

fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((lien) => console.log(lien));

/////////////////////////////////////////////
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((lien) => console.log(lien));
