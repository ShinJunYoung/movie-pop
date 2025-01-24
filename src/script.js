import { loadHeader } from "./js/loadHeader.js";

const articles = document.querySelector(".recommend__content");
const swiperContainer = document.querySelector(".new-swiper");
const swiperContainer2 = document.querySelector(".classic-swiper");
const topBtn = document.querySelector(".topBtn");
// setTimeout( () => {} , 4000 )

loadHeader();

topBtn.addEventListener("click", () => {
  document.body.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  console.log("click");
});

document.body.addEventListener("scroll", () => {
  if (document.body.scrollTop > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

async function fetchData() {
  try {
    const response = await fetch("./data/movieData.json"); // 미리 저장한 json 파일 fetch
    const data = await response.json();

    renderMovies(data);
    dataRender(data, articles);
  } catch (err) {
    // 디펜시브 코딩 (실패 시 에러메세지 도출)
    console.error("Error!", err);
  }
}

function renderMovies(data) {
  const newMovies = data.filter((movie) => parseInt(movie.Year) >= "2017");
  const classicMovies = data.filter((movie) => parseInt(movie.Year) < "2017");
  console.log("new", newMovies);
  console.log("classic", classicMovies);

  dataRender2(newMovies, swiperContainer);
  dataRender2(classicMovies, swiperContainer2);
}

function dataRender(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
              <article class="movie-card">
                  <div class="movie-card__imgcontainer">
                      <a href="/src/pages/detail/detail.html?id=${movie.imdbID}">
                          <img src="${movie.Poster}" alt="${movie.Title}">
                      </a>
                  </div>
                  <h2 class="movie-title">${movie.Title}</h2>
                  <div class="post-info">
                  <span class="movie-year">${movie.Year}</span> • 
                  <span class="movie-runtime">${movie.Runtime}</span>
                  </div>
              </article>
              `
    )
    .join("");
}
function dataRender2(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
      <swiper-slide>
        <article class="movie-card">
          <div class="movie-card__imgcontainer">
              <a 
              class="movie-card__navigate-section"
              href="/src/pages/detail/detail.html?id=${movie.imdbID}">
                  <img src="${movie.Poster}" alt="${movie.Title}">
              </a>
          </div>
          <h2 class="movie-title">${movie.Title}</h2>
          <div class="post-info">
          <span class="movie-year">${movie.Year}</span> • 
          <span class="movie-runtime">${movie.Runtime}</span>
          </div>
        </article>
      </swiper-slide>
      `
    )
    .join("");
}

fetchData();

const swiperEl = document.querySelector(".new-swiper");
const swiperEl2 = document.querySelector(".classic-swiper");

const params = {
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  slidesPerView: "auto",
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const params2 = {
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  slidesPerView: "auto",
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
};

Object.assign(swiperEl, params);

swiperEl.initialize();

Object.assign(swiperEl2, params2);

swiperEl2.initialize();
