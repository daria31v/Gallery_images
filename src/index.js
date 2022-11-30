import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import NewsApiService from './new-api-service';

const form = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

btnLoadMore.classList.add("is-hidden");

const newsApiService = new NewsApiService();
const limit = 40;

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onMoreImg);

async function onSearch(evt) {
  evt.preventDefault();
  newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  console.log(newsApiService.query)
  
  if (newsApiService.query === '') {
    return Notify.info('Please enter the query parameters.')  
  }
  
  
  newsApiService.resetPage();
  try {
    await newsApiService.fetchImage().then(hits => {
      clearGalleryMarkup();
      creatMarkup(hits);
      console.log(hits.length);

               
      if (hits.length > limit) {
         btnLoadMore.classList.remove("is-hidden");
      }
      else if (hits.length <= limit) {
        btnLoadMore.classList.add("is-hidden");
      }
    })
  }
    catch (err) {
            console.error(err)
        }
}

async function onMoreImg() {
  try {
    await newsApiService.fetchImage().then(creatMarkup);
   
  }
  catch (err) {
            console.error(err)
        }
}
function clearGalleryMarkup() {
gallery.innerHTML = "";
}

function creatMarkup(hits) {
  console.log(hits)
  const markup = hits.map(({
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads
  }) => {
    return `<div class="photo-card">
      <div><a href=${largeImageURL} class="gallery__link">
        <img src=${webformatURL} alt=${tags} class="gallery__image" loading="lazy"/></a>
    </div>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
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
  gallery.insertAdjacentHTML('beforeend', markup);


let galleryImg = new SimpleLightbox('.photo-card a', {
  captionDelay: 150,
  captionsData: 'alt'
});
galleryImg.refresh();

}

