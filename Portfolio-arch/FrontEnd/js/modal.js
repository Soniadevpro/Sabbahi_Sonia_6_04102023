////// Ouverture et fermeture de la modal

let modal = null;
let modal2 = null;
const openModal = function (e) {
  e.preventDefault();

  const target = document.querySelector(e.target.getAttribute("href"));
  if (target) {
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  }
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const addPhotosButton = document.querySelector(".addphotos");
addPhotosButton.addEventListener("click", openSecondModal);

function openSecondModal() {
  const secondModal = document.querySelector("#modal2");
  if (secondModal) {
    secondModal.style.display = "flex";
    secondModal.removeAttribute("aria-hidden");
    secondModal.setAttribute("aria-modal", "true");
    modal2 = secondModal;
    modal2.addEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-close2").addEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-stop2").addEventListener("click", stopPropagation);
  }
}

const closeModal2 = function (e) {
  if (modal2 === null) return;
  e.preventDefault();
  modal2.style.display = "none";
  modal2.setAttribute("aria-hidden", "true");
  modal2.removeAttribute("aria-modal");
  modal2.removeEventListener("click", closeModal2);
  modal2.querySelector(".js-modal-close2").removeEventListener("click", closeModal2);
  modal2.querySelector(".js-modal-stop2").removeEventListener("click", stopPropagation);
  modal2 = null;
};

// accessibilité clavier
// window.addEventListener("keydown", function (e) {
//   if (e.key === "Escape" || e.key === "Esc") {
//     closeModal(e);
//   }
// });

/////// ajout des picrures dans la deuxième modal
