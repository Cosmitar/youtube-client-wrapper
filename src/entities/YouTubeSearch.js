'use strict'
import Browser from './../classes/Browser';

class YouTubeSearch {
    /**
    * Performs a search based on given query string an optiona search parameters.
    * Use this method to search multiples entities (Video, Playlist and Channels).
    * For specific entity search is better start queriyng from its class i order to 
    * get a response with aditional information defined in the parameter -part-.
    * @param {string} queryString The string to search.
    * @param {object=} params The aditiona configuration options
    * @return {Promise}
    */
    static where( queryString, params = {} ){
        params.q = queryString;
        let searcher = new Browser();
        /**
        * YouTube allows search by text only for search.list API method.
        * If you want a spacific entity data as https://developers.google.com/youtube/v3/docs/videos/list#part
        * you need to get video ids first and then call Video.find() or Video.several() with { part: contentDetails }
        * as config search.
        * Method YouTubeSearch.where allways has 'search' as origin, this means the api calls gapi.youtube.search.list
        */
        searcher.origin = 'search';
        searcher.config = params;
        return searcher.all();
    }
}

export default YouTubeSearch;