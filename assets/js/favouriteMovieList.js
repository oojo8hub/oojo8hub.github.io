let addMovieBtn = document.getElementById("add-movie-btn");
let searchMovieBtn = document.getElementById("search-btn");

let movies = [];

let renderMovie = (filter = "") => {
  let movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  let filterMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filterMovies.forEach((movie) => {
    let movieEl = document.createElement("li");
    // movieEl.textContent = movie.info.title;

    let { info } = movie; ///array destruction

    // if("info" in movie) {  } to check if a key exist in the object itself

    // let text = info.title + " - ";
    let { getFormatedTitle } = movie;
    // getFormatedTitle = getFormatedTitle.bind(movie);

    let text = getFormatedTitle.call(movie) + " - ";
    for (let key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }

    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

function addMovieHandler() {
  let title = document.getElementById("title").value;
  let extraName = document.getElementById("extra-name").value;
  let extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  let newMovie = {
    info: {
      get title() {
        return this._title;
      },

      set title(val) {
        if (val.trim === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },

      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormatedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  // console.log(newMovie.info.title);

  movies.push(newMovie);
  // console.log(movies);
  renderMovie();
}

let searchMovieHandler = () => {
  let filterTitle = document.getElementById("filter-title").value;
  renderMovie(filterTitle);
};
addMovieBtn.addEventListener("click", addMovieHandler);
searchMovieBtn.addEventListener("click", searchMovieHandler);

// let userEnteredInput = "UserInput";

// let person = {
//   "whose child": "mama ola",
//   name: "boy",
//   age: 12,
//   [userInput]: "...",
//   hobbies: ["playng ball", "watching anime "],
//   greet: function () {
//     alert("shabamm bamm ");
//   },
//   1.0: "Hello dear",
// };

// person.isboy = "true";
// console.log(person);
// console.log(person["whose child"]);
// console.log(person[1.0]);
