const baseUrlMovies = "http://www.omdbapi.com/";
const accessKey = "206d082e";

const baseUrlBin = "https://api.jsonbin.io/v3/b/";
const ourBinUrl = baseUrlBin + "63a4529fdfc68e59d56e9b8d";
const masterKeyBin = "$2b$10$re8BCarS2TJ3.fYpy2KSd.d.Gya4h9xv/Kkmio4GmMjsYxCzTFvtu";

const App = {
    listOfMovies: [],
    listOfFavourites: [],
    movieDetails: {},
    elements: {
        container: document.getElementById("movieContainer"),
        favouriteContainer: document.getElementById("favouriteContainer")
    },

    fetchMovies(searchInput) {
        fetch(baseUrlMovies + "?s=" + searchInput + "&apikey=" + accessKey)
            .then(response => response.json()).then(data => {
                console.log(data);
                if (data.Response === "True") {
                    console.log("Sparar resultat i listOfMovies array");
                    App.listOfMovies = data.Search;
                    console.log("Rendera sidan");
                    App.render();
                }
            })
            .catch(error => {
                console.error(error);
            });
    },

    fetchMoviesDetails(selectedMovie) {
        fetch(baseUrlMovies + "?i=" + selectedMovie + "&apikey=" + accessKey)
            .then(response => response.json()).then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.log("error: " + error);
            });
    },

    createFavourite() {
        const favouriteTitle = document.querySelector(".movie__title")
        const favouritePoster = document.querySelector(".poster__main")
        const newFavourite = createNewFavourite(favouriteTitle.value, favouritePoster.value)
        this.listOfFavourites.push(newFavourite)

        fetch(ourBinUrl, {
            method: "PUT",
            headers: {
                "X-Master-key": masterKeyBin,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.listOfFavourites)
        })
            .then(function (response) {
                return response.json();
            })
            .then((response) => {
                let data = response
                console.log(data)
                this.fetchMovies()
            })
            .catch(function (err) {
                console.log("error: " + err)
            });

        // console.log("create: " + createNewFavourite())
    },


    update: function (id) {
        let findItemIndex = this.listOfFavourites.findIndex(item => item.imdbID === id)
        this.listOfFavourites[findItemIndex].checked = !this.listOfFavourites[findItemIndex].checked
        this.render()
    },

    removeFavourite(id) {
        let findItemIndex = this.listOfFavourites.findIndex(item => item.imdbID === id);
        this.listOfFavourites.splice(findItemIndex, 1)

        fetch(ourBinUrl, {
            method: "PUT",
            headers: {
                "X-Master-Key": masterKeyBin,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.listOfFavourites)
        })
            .then(function (response) {
                return response.json();
            })
            .then((response) => {
                let data = response;
                console.log(data)
                this.fetchMovies()
            })
            .catch(function (err) {
                console.log("error: ", err)
            })
        console.log("remove: " + removeFavourite())
    },

    render() {
        this.elements.container.innerHTML = ''
        resetForm()

        App.listOfMovies.forEach(movie => {
            const searchedMovies = document.createElement("div")
            const poster = document.createElement("img");
            const heartButton = document.createElement("button")
            const movieTitle = document.createElement("section");

            movieTitle.innerHTML = "<h2>" + movie.Title + "</h2>" + "<br>" + "Released: " + movie.Year + "<br>" + "Media type: " + movie.Type;

            poster.src = movie.Poster;
            poster.alt = "Movie Poster";

            poster.classList.add("poster__main")
            movieTitle.classList.add("movie__title")
            searchedMovies.classList.add("movie__container")
            heartButton.classList.add("heart__button")

            poster.onclick = function () {
                window.location.href = "moviedetails.html?parameter=" + movie.Title;
            }

            heartButton.addEventListener("click", function () {
                App.createFavourite(movie.Title)
            })

            searchedMovies.append(
                poster,
                heartButton,
                movieTitle
            )
            this.elements.container.appendChild(searchedMovies)
        });
    }
}

function createNewFavourite(suppliedTitle, suppliedPoster, suppliedimdbID) {
    return {
        imdbID: suppliedimdbID,
        Title: suppliedTitle,
        Poster: suppliedPoster,
        checked: false
    }
}

function search() {
    const inputValue = document.getElementById("inputField").value;
    console.log("Kolla här är det du sökte efter: " + inputValue);
    App.fetchMovies(inputValue);
}

function resetForm() {
    document.querySelector("#movieContainer").value = ''

}

async function fetchMoviesDetailsAsync(selectedMovie) {
    const response = await fetch(baseUrlMovies + "?t=" + selectedMovie + "&apikey=" + accessKey);
    const data = await response.json();
    return data;
}


// const newBtnIcon = ""

// newBtnRemove.addEventListener("click", function () {
//     App.remove(item.id);
// })
// newBtnCheck.addEventListener("click", function () {
//     App.update(item.id);
// })
// const newBtnRemove = 
// const  = document.createElement("img")
// newBtnIcon.src = '../assets/ic_trash.svg' 


// detailsButton.innerText = "More information" ;
            // heartButton.innerHTML = heartButton;
            // justADiv.innerHTML =  "<br><hr><br>"
 // const detailsButton = document.createElement("button");
            // const justADiv = document.createElement("div")
// const heartIcon = document.createElement("img")
// document.querySelector(".movie__container").appendChild(movieTitle);
            // heartIcon.src = '../assets/heart.png'
            // heartButton.appendChild(heartIcon)
            // document.querySelector(".movie__container").appendChild(poster);
                        // detailsButton.classList.add(".poster__button")
                        // document.querySelector(".movie__container").appendChild(detailsButton);
                        // detailsButton,
                // justADiv
        // heartButton.addEventListener("click", function () {
        //     App.removeFavourite(movie.imdbID);
        // })

        // this.elements.favouriteContainer.innerHTML = ""
        // App.listOfFavourites.forEach(movie => {
        //     createNewFavourite()
        //     const newFavouriteMovie = document.createElement("section")
        //     if (/*knappen blir tryckt på*/) {
        //         //så händer det saker.
        //     }
        //     removeFavourite()
        //     const removeFavouriteMovie = newFavouriteMovie
        //     if (/*knappen blir tryckt på */) {
        //         // så tar den bort från favoriter.
        //     }
        // })
        // document.querySelector("").value = ''