// loaders.js
const seriesDetailLoader = async ({ params }) => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const seriesId = params.id;
  
    // Fetch the series details
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&language=en-US`
    );
    const seriesData = await seriesRes.json();
  
    // Fetch release dates to get certification information
    const releaseDatesRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/release_dates?api_key=${apiKey}`
    );
    const releaseDatesData = await releaseDatesRes.json();
  
    // Add release dates information to series data
    seriesData.release_dates = releaseDatesData;
  
    return seriesData;
  };


  const detailLoader = async ({ params }) => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const movieId = params.id;
    
    // Fetch the movie details
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    const movieData = await movieRes.json();
  
    // Fetch release dates to get certification information
    const releaseDatesRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`
    );
    const releaseDatesData = await releaseDatesRes.json();
  
    // Add release dates information to movie data
    movieData.release_dates = releaseDatesData;
  
    return movieData;
  };
  
  export { seriesDetailLoader, detailLoader };
  