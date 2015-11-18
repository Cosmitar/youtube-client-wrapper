'use strict'
import Client from './../services/YouTubeAPIClient';
import Paginator from './Paginator';
import SearchParams from './SearchParams';
import Manufacturer from './Manufacturer';

class Browser {
    constructor( params = {} ) {
        this._config = new SearchParams;
        this._paginator = new Paginator;
        this._paginator.browser = this;
    }

    set config( searchParams = {} ) {
        Object.assign( this._config, searchParams );
        this._paginator.update( searchParams );
    }

    _getSearchPath() {
        let path = `search.list`;
        return path;
    }

    _getSearchPayload() {
        let data = this._config;
        Object.assign( data, this._paginator.getPaginationParams() );
        return data;
    }

    _processQuery( promise ) {
        return promise.then( response => {
            let collection = [];
            for( let item of response.result.items ){
                collection.push( Manufacturer.make( item ) );
            }

            //update paginator
            this._paginator.update( response.result );
            this._paginator.setPage( collection );
            return this._paginator;
        }, reject => {
            console.log(reject);
            return reject;
        });
    }

    all() {
        let path = `search.list`;
        let payload = this._getSearchPayload();
        let promise = Client.request( path, payload );
        return this._processQuery( promise );
    }

    find() {
        let path = `${this._config.type}.list`;
        let payload = this._getSearchPayload();
        let promise = Client.request( path, payload );
        return this._processQuery( promise );
    }

    rate() {
        let path = `${this._config.type}.rate`;
        let payload = this._getSearchPayload();
        return Client.request( path, payload );
    }

}

export default Browser;
