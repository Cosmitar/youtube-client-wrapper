'use strict'

class Paginator {
    constructor( owner ) {
        /**
        * Initialization variables
        */
        this._limit = /*data.maxResults || */Paginator.LIMIT_DEFAULT;
        this._offset = /*data.offset || */Paginator.OFFSET_DEFAULT;
        this._total_pages = 0;
        this._total_results = 0;
        this._currentIndex = 1;
        this._currentPage = [];
        this._pagesCache = [];
        this._nextPageToken = '';
        this._prevPageToken = '';
        this._tokenPagination = '';
        this._pageToken = null;

        /**
        * Composition owner, shuld be an object who handle the method .all() to trigger a search
        * @type {Browser}
        */
        this._owner = owner;
    }

    get searchParams() { return this._searchParams; }

    get elements() { return this._currentPage; }

    get limit() { return this._limit; }

    get offset() { return this._offset; }

    get total_pages() { return this._total_pages; }

    get currentIndex() { return this._currentIndex; }

    get page_size() { return this._limit; }

    set browser( value ) {
        this._owner = value;
    }

    getPaginationParams() {
        let params = {};
        params.maxResults = this._limit;
        params.pageToken = this._pageToken;
        return params;
    }

    update( data = {} ) {
        this._nextPageToken = data.nextPageToken;
        this._prevPageToken = data.prevPageToken;
        this._tokenPagination = data.tokenPagination;
        //YouTube doesn't have offset value
        this._offset = data.offset || this._offset;
        //pageInfo.resultsPerPage came from search response
        //maxResults came from query parameter
        this._limit = (data.pageInfo && data.pageInfo.resultsPerPage) || data.maxResults || this._limit;
        this._total_results = (data.pageInfo && data.pageInfo.totalResults) || this._total_results;
        this._currentIndex = data.current_page || this._offset + 1;//offset can be 0 but index starts in 1
        this._total_pages = data.total_pages || Math.ceil(this._total_results / this._limit);
    }

    setPage( items ) {
        this._currentPage = items;
    }

    firstElement() {
        return this._currentPage[0];
    }
    lastElement() {
        return this._currentPage[this._currentPage.length-1];
    }
    elementAt( index ) {
        return this._currentPage[index];
    }


    hasNextPage() { return this._currentIndex < this._total_pages };
    hasPrevPage() { return this._currentIndex > 1; }
    nextPage() {
        let retVal = new Promise((resolve,reject) => {
            if( this.hasNextPage() ){
                this._offset++;
                this._pageToken = this._nextPageToken;
                this._owner.all()
                    .then(result => {
                        this._pageToken = null;//clear for next queries not related with pagination
                        resolve( result );
                    });
            }else{
                reject(null);
            }
        });
        return retVal;
    }
    prevPage() {
        let retVal = new Promise((resolve,reject) => {
            if( this.hasPrevPage() ){
                this._offset--;
                this._pageToken = this._prevPageToken;
                this._owner.all()
                    .then(() => {
                        this._pageToken = null;//clear for next queries not related with pagination
                    })
                    .then((result) => {
                        resolve( result );
                    });
            }else{
                reject(null);
            }
        });
        return retVal;
    }
    firstPage() {
        let retVal = new Promise((resolve,reject) => {
            this._offset = 0;
            resolve( this._owner.all() );
        });
        return retVal;
    }
    lastPage() {
        let retVal = new Promise((resolve,reject) => {
            this._offset = this._total_pages;
            resolve( this._owner.all() );
        });
        return retVal;
    }
    goToPage( index ) {
        let retVal = new Promise((resolve,reject) => {
            this._offset = index;
            resolve( this._owner.all() );
        });
        return retVal;
    }
}

Paginator.LIMIT_DEFAULT = 10;
Paginator.OFFSET_DEFAULT = 0;

export default Paginator;