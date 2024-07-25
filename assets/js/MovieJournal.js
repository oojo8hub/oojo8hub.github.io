let addMovieModal = document.getElementById("add-modal");

let addBackDrop = document.getElementById("backdrop");

let startAddMovieButton = document.querySelector("header button");

let cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
let confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

let userMovieInput = addMovieModal.querySelectorAll("input");

let entryTextSection = document.getElementById("entry-text");

let deleteMovieDecider = document.getElementById("delete-modal");

let movies = [];

let closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

let toggleBackDropHandler = () => {
  addBackDrop.classList.toggle("visible");
};

function showMovieModel() {
  addMovieModal.classList.add("visible");
  toggleBackDropHandler();
}

function backDropClickHandler() {
  closeMovieModal();
  cancelMovieDeletionModal();
  clearUserMovieInput();
}

function clearUserMovieInput() {
  for (let usrInput of userMovieInput) {
    usrInput.value = "";
  }
}

function cancelAddMovieHandler() {
  closeMovieModal();
  toggleBackDropHandler();
  clearUserMovieInput();
}

function addMovieHandler() {
  let titleValue = userMovieInput[0].value;
  let imageUrlValue = userMovieInput[1].value;
  let ratingValue = userMovieInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 1 ||
    parseInt(ratingValue) > 5
  ) {
    alert(" Please enter value between 1-5 for rating purposes ");
    return;
  }

  let newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearUserMovieInput();
  toggleBackDropHandler();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );

  // userMovieInput;
}

function updateUI() {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
}

function renderNewMovieElement(id, title, imageUrl, rating) {
  let newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  // newMovieElement.innerHTML;
  newMovieElement.innerHTML = `
   <div class ="movie-elememt__image">
      <img src = "${imageUrl}"  >
   </div>
   <div class = "movie-elememt__info">
      <h2>
      ${title}
      </h2>
      <p>
      ${rating} /5 stars
       </p>
   </div>
   `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  let listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
}

function cancelMovieDeletionModal() {
  toggleBackDropHandler();
  deleteMovieDecider.classList.remove("visible");
}

function deleteMovie(movieId) {
  let movieIndex = 0;
  for (let movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);

  let listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  cancelMovieDeletionModal();
}

function deleteMovieHandler(movieId) {
  deleteMovieDecider.classList.add("visible");
  toggleBackDropHandler();

  let cancelDeletionButton = deleteMovieDecider.querySelector(".btn--passive");
  let confimDeletionButton = deleteMovieDecider.querySelector(".btn--danger");

  confimDeletionButton.replaceWith(confimDeletionButton.cloneNode(true));

  confimDeletionButton = deleteMovieDecider.querySelector(".btn--danger");

  // confimDeletionButton.removeEventListener(
  //   "click",
  //   deleteMovie.bind(null, movieId)
  // );
  cancelDeletionButton.removeEventListener("click", cancelMovieDeletionModal);

  // cancelDeletionButton.addEventListener("click", cancelMovieDeletionModal);

  confimDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
  updateUI();

  // deleteMovie(movieId);
}

startAddMovieButton.addEventListener("click", showMovieModel);
addBackDrop.addEventListener("click", backDropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
