
const API_KEY = "api_key=97fc8efc4994c61eacc461cc904163ba";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY + '&query=';
const  latest = BASE_URL + "/movie/latest?" + API_KEY;
const top_rated = BASE_URL + "/movie/top_rated?" + API_KEY;
const trailer = BASE_URL + "/movie/{movie_id}/videos?" + API_KEY;
const upcoming = BASE_URL + "/movie/upcoming?" + API_KEY;
const popular = BASE_URL + "/movie/popular?" + API_KEY;
const genre_url = BASE_URL + '/genre/movie/list?' + API_KEY
// const detail = BASE_URL + `/movie/${movie_id}?` + API_KEY;
 

async function getTopRated() {
    let res = await fetch(top_rated);
    let data = await res.json();
    return data.results;
  }
  async function getMovieCredits(url){
      let res = await fetch(url);
    let data = await res.json();
    return data;
  }

async function getGenre(){
  const res = await fetch(genre_url);
  const data = await res.json()
  return data;
}

async function getUpcoming() {
  let res = await fetch(upcoming);
  let data = await res.json();
  return data.results;
}
async function getPopular() {
  let res = await fetch(popular);
  let data = await res.json();
  return data.results;
}

async function search(url){
  const res = await fetch(url)
  const data = await res.json();
  return data.results;
    
}