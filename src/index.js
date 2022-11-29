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

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onMoreImg);

function onSearch(evt) {
  evt.preventDefault();
  newsApiService.query = evt.currentTarget.elements.searchQuery.value;
  console.log(newsApiService.query)
  
  if (newsApiService.query === '') {
    return Notify.info('Please enter the query parameters.')  
  }
  
  
  newsApiService.resetPage();
  newsApiService.fetchImage().then(hits => {
    clearGalleryMarkup();
    creatMarkup(hits);
    btnLoadMore.classList.remove("is-hidden");
    
    if (hits.length === 0) {
    btnLoadMore.classList.add("is-hidden");
  }
      
  })
 
}

function onMoreImg() {
  newsApiService.fetchImage().then(creatMarkup)  
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

