'use strict'
import Browser from './../classes/Browser';

class YouTubeSearch {

    /**
    * Performs a search based on given query string an optiona search parameters.
    * @param {string} queryString The string to search.
    * @param {object=} params The aditiona configuration options
    * @return {Promise}
    */
    static where( queryString, params = {} ){
        params.q = queryString;
        //YouTubeSearch.where method should trigger a search, independant for the searched entity.
        //for example on Videos searches, the path should be .search.list and the type:video
        params.type = this.SINGLE_TYPE;
        let searcher = new Browser();
        searcher.config = params;
        return searcher.all();
    }
}

export default YouTubeSearch;