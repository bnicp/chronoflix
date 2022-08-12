export const fetchMovies = () => {
  function generateRandomPage(max) {
    return Math.floor(Math.random() * max);
  }

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.REACT_APP_API_KEY
    }&page=${generateRandomPage(
      500
    )}&with_original_language=en&include_adult=false&primary_release_date.gte=1985`
  );
};

export const generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
};
