const tr = document.querySelector(".tr");
const up = document.querySelector(".popular");
const sr = document.querySelector(".sr");
const search1 = document.querySelector(".search-res");
const modal_content = document.querySelector(".modal-content");
const mod_title = modal_content.firstElementChild.firstElementChild;
const modal_body = modal_content.firstElementChild.nextElementSibling;
const mov_details = modal_body.lastElementChild;
let tit = mov_details.lastElementChild.firstElementChild;
//var gnre = document.querySelector('.lead')
console.log();
tr.innerHTML = "";
up.innerHTML = "";

getTopRated().then((movies) => {
  movies.forEach((movie) => {
    showMovies(movie, "tr");
    console.log(movie);
  });
});

// getUpcoming().then(uc =>{
//   uc.forEach(upcoming =>{
//     showMovies(upcoming, 'up');
//   })
//   return console.log('Upcoming movies:' , uc);
// })
getPopular().then((pop) => {
  pop.forEach((pop) => {
    showMovies(pop, "up");
  });
  // return console.log('Upcoming movies:' , uc);
});
function addListener(e) {
  // e.forEach(e => e.addEventListener('click', el ))
  for (let i = 0; i < e.length; i++) {
    const btn = e[i];
    btn.addEventListener("click", getDetails);
  }
}

function getDetails(e) {
  const trgt = e.target;
  const target_iD = trgt.getAttribute("id");
  // const id = trgt.getAttribute("id");
  const credit = BASE_URL + `/movie/${target_iD}/credits?` + API_KEY;

  getTrailer(target_iD).then((trailer) => {
    const results = trailer.results[0];
    const { key } = results;
    console.log(results);
    vidplayer(key);
  });

  getMovieCredits(credit).then((data) => {
    let main_cast = "";
    let are = [];
    let character = "";
    let arr = [];
    const { cast, crew } = data;
    const { name, job } = crew[0];
    for (let i = 0; i < 4; i++) {
      // main_cast += " " + cast[i].original_name ;
      character += cast[i].character;
      arr.push(cast[i].original_name);
    }
    main_cast = arr.join(", ");
    console.log(``);
    tit.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = ` <span class="fw-bold">Cast: </span> ${main_cast} `;
    tit.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `<span class="fw-bold">Director:</span> ${name}`;
  });

  getDetail(target_iD).then((movie) => {
    // const results = movie.results;
    const {
      genres,
      original_title,
      title,
      overview,
      release_date,
      backdrop_path,
      poster_path,
    } = movie;
    mod_title.innerHTML = `${original_title} (${title})`;
    let img = mov_details.firstElementChild;

    tit.innerHTML = `${title}`;
    tit.nextElementSibling.innerHTML = `  ${overview}`;
    tit.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `<span class="fw-bold">Release Date:</span> ${release_date}`;
    img.setAttribute("src", `${IMG_URL + poster_path}`);
    console.log(movie);
    genres.forEach((iD) => {
      // console.log(id.name)
      const { id, name } = iD;
      let con = document.querySelector(".container");
      let div = document.createElement("div");
      div.innerHTML = `
      <div class='fw-bold '>${name} </div>
      `;
      tit.nextElementSibling.nextElementSibling.innerHTML = `<span class="fw-bold">Genre:</span>  ${name} `;
      console.log(name);
      //gnre.appendChild(div)
    });
  });
}

let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.scrollTo(0, 700);
  const searchword = document.querySelector("#search");
  var term = searchword.value;
  let su = searchURL + term;
  search(su).then((search) => {
    let nr = document.querySelector(".noresult");
    let con = document.querySelector(".cons");
    if (search.length === 0) {
      sr.style.display = "none";
      //res.style.display = 'block'
      search1.innerHTML = "Search Result";
      nr.innerHTML = "No result found...";
      console.log(search);
    } else {
      sr.innerHTML = ''
      search.forEach((search) => {
        console.log(search);
        nr.innerHTML = "";
        sr.style.display = "flex";
        showMovies(search, "search");
       
      });
    }
  });
});

function showMovies(movie, option) {
  const { title, poster_path, vote_average, id } = movie;
  let topRated = document.querySelector(".top");
  let pop = document.querySelector(".pop");
  const col = document.createElement("div");
  col.classList.add("col");
  col.classList.add("d-flex");
  col.classList.add("justify-content-center");
  col.innerHTML = `
          <a class="card text-warning"  href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <div class="card-body" id="${id}"  >
                  <img class="img-fluid " style="pointer-events:none"src="${
                    poster_path
                      ? IMG_URL + poster_path
                      : "http://via.placeholder.com/1080x1580"
                  }" alt="${title}">
                  <div class="movie-info"style="pointer-events:none">
                      <p class="fs-5 mt-md-2 mb-lg-0">${title}
                      </p>  <span  >${vote_average}</span>
                  </div>
              </div>
          </a>
      `;
  if (option === "tr") {
    tr.appendChild(col);
    topRated.innerHTML = "Top Rated";
  } else if (option === "up") {
    up.appendChild(col);
    pop.innerHTML = "Popular";
  } else if (option === "search") {
    search1.innerHTML = "Search Result";
    sr.append(col);
  }
 
  const ro = document.querySelectorAll(".row");
  addListener(ro);
}

async function getTrailer(movie_id) {
  const trailer = BASE_URL + `/movie/${movie_id}/videos?` + API_KEY;
  const res = await fetch(trailer);
  const data = await res.json();
  return data;
}

async function getDetail(movie_id) {
  const detail = BASE_URL + `/movie/${movie_id}?` + API_KEY;
  const res = await fetch(detail);
  const data = await res.json();
  return data;
}

function vidplayer(key) {
  const iframe = modal_body.firstElementChild;
  console.log(iframe);
  const frame = document.querySelector(".frame");
  const sauce = `https://www.youtube.com/embed/${key}`;
  iframe.setAttribute("src", sauce);
}
