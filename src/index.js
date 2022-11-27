import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios, { isCancel, AxiosError } from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// console.log(Notify)
// console.log(axios)
// console.log(SimpleLightbox)
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31608375-581536e59e6cd039daecb6e21';

// const image = 'photo';
// const orientation = 'horizontal';
const params = 'image_type=photo&orientation=horizontal&safesearch=true';
const form = document.querySelector('#search-form');
const inputText = document.querySelector('input');
const btnSearch = document.querySelector('button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
btnLoadMore.classList.add("is-hidden");

let page = 1;
let limit = 40;

const totalPages = 100 / limit;

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onMoreImg);



function onSearch(evt) {
  evt.preventDefault();
  // console.log(evt.currentTarget);
  const elementsEvt = evt.currentTarget.elements;
  // console.log(elementsEvt);
  const inputValue = inputText.value;
  console.log(inputValue);

  if (!inputValue) {
    alert('Поле пусте!');
    return;
  } 
  pixabayApi(inputValue).then(data => creatMarkup(data));
}

async function pixabayApi(inputValue) {
  
  try {
    const resp = await fetch(`${BASE_URL}?key=${API_KEY}&q=${inputValue}&${params}&limit=40&page=${page}`);
    // console.log(resp)
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return await resp.json();    
  } catch (err) {
    return console.error(err);
  }
}

function creatMarkup(data) {
  // console.log(data)

  const markup = data.hits.map(({
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads
  }) => {
    return `<div class="photo-card">
      <div class = "image-preview"
        <a class="gallery__link" href=${largeImageURL}>
        <img class="gallery__image"
        src=${webformatURL}
       alt=${tags} loading="lazy"/></a>
       </div>

  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
  }).join('');
  gallery.insertAdjacentHTML("beforeend", markup);
}

function onMoreImg() {
  // if (page > totalPages) {
    // return toggleAlertPopup();
    page += 1;
    pixabayApi(page).then(data => console.log(data))
//  } 
}


function infoNotifyTotalHits() {
    Notify.info(`Hooray! We found ${totalHits} images.`);
}

function errorNotify() {
    Notify.failure("Oops, there is no country with that name.");
}

function endNotify() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}
// function toggleAlertPopup() {
//   if()
// }

// new SimpleLightbox('.image-preview a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
