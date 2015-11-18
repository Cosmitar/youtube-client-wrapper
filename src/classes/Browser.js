'use strict'
import Client from './../services/YouTubeAPIClient';
import Paginator from './Paginator';
import SearchParams from './SearchParams';
import Manufacturer from './Manufacturer';

class Browser {
    constructor( params = {} ) {
        this.entityId = params.id || 0;
        this.slug = params.slug || '';
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

    _getClient() {
        return Client;
    }

    _query( path, payload ) {
        return this._getClient().request( path, payload );
    }

    all() {
        let path = this._getSearchPath();
        let payload = this._getSearchPayload();
        let promise = this._query( path, payload );
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

}

export default Browser;