import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios, { isCancel, AxiosError } from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// console.log(Notify)
// console.log(axios)
// console.log(SimpleLightbox)
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31608375-581536e59e6cd039daecb6e21';
const q = 'cat,dog';
// const image = 'photo';
// const orientation = 'horizontal';
const params = 'image_type=photo&orientation=horizontal&safesearch=true';

const form = document.querySelector('#search-form');
const inputText = document.querySelector('input');
const btnSearch = document.querySelector('button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
// console.log(inputText)
// const totalHitsValue = totalHits;

form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  console.log(evt.currentTarget);
  const elementsEvt = evt.currentTarget.elements;
  console.log(elementsEvt);
  const inputValue = inputText.value;
  console.log(inputValue);

  if (!inputValue) {
    alert('Поле пусте!');
    return;
  }
  pixabayApi(inputValue).then(data => console.log(data));
}

function pixabayApi(inputValue) {
  console.log(inputValue);
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${q}&${params}`)
    .then(resp => {
      // console.log(resp)
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.error(err));
}

// function creatMarkup(items) {
//   const markup = u.map(
//       item =>
//         `<div class="photo-card">
//         <a class="gallery__link" href=${item.largeImageURL}>
//         <img class="gallery__image"
//         src=${item.webformatURL}
//        alt=${item.tags} loading="lazy"/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:${item.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:${item.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${item.downloads}</b>
//     </p>
//   </div>
// </div>`).join();
//   gallery.innerHTML = markup;
// }

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
