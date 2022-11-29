import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;

     }
    async fetchImage() {
                
        try {
            const BASE_URL = 'https://pixabay.com/api/';
            const KEY = '31608375-581536e59e6cd039daecb6e21';

            const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&language=en&per_page=40&page=${this.page}`;        
            const resp = await fetch(url);
            

            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            const data = await resp.json();
            console.log(data);
            if (data.total === 0 ) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                // 
                
            } else if (data.hits.length === 0) {
                Notify.warning("We're sorry, but you've reached the end of search results.");

            } else if(this.page === 1){
                Notify.info(`Hooray! We found all ${data.total} and now we show you just ${data.totalHits} images.`);
            }
            this.page += 1;
            return data.hits;

        } catch (err) {
            return console.log(err)
        }
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}