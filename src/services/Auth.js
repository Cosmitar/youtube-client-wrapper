'use strict'
import Config from './../services/Config';

let promiseResolve, promiseReject;

class Auth {
    authorize() {
        this.handleAuth( true );
        return new Promise((resolve, reject) => {
            promiseResolve = resolve;
            promiseReject = reject;
        });
    }

    showAuth() {
        this.handleAuth( false );
        return new Promise((resolve, reject) => {
            promiseResolve = resolve;
            promiseReject = reject;
        });
    }

    handleAuth( immediate ) {
        gapi.auth.authorize({client_id: Config.clientId, scope: Config.scopes.join(','), immediate: immediate}, this.handleAuthResult.bind(this));
    }

    handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            promiseResolve( authResult );
        }else{
            promiseReject( authResult );
        }
    }
}

export default new Auth;