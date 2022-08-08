require("dotenv").config();

export const fetchMovies = () => {
     function generateRandomPage(max) {
        return Math.floor(Math.random() * max);
     }

    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${generateRandomPage(500)}&language=en-US&primary_release_date.gte=2011&primary_release_date.lte=2020`);
  };

export const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max);
}
