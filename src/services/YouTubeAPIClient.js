'use strict'

class YouTubeAPIClient {
    static request( path, payload ) {
        let fn;
        eval(`fn = gapi.client.youtube.${path}`);
        return fn( payload ).then(resp => {
            return resp;
        },reason => {
            console.log('Error: ' + reason.result.error.message);
        });
    }
}

export default YouTubeAPIClient;