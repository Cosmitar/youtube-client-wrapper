# YouTube Web API Wrapper | ES6
Wrapper written in ECMAScript 6. Allows a simplified use of [Google API Client (YouTube API)](https://developers.google.com/api-client-library/javascript/).
Entity oriented approach

## How simple it is?
- Include Google API script in the html page.paramters
```html
<script src="https://apis.google.com/js/client.js?onload=OnGoogleAPILoadCallback"></script>
```
- Config the API client with your API_KEY.
```javascript
import {Config} from 'youtube-client-wrapper';
Config.set({
    apiKey: 'YOUR API KEY'
});
```
- Boot up the API, this will include the YoutTube API vía ``` gapi.client.load('youtube', 'v3')```
```javascript
Config.boot().then(() => {
    //start quering 
});
```
- Search a Video, Playlist, Channel or all of them together.
```javascript
import {Video} from 'youtube-client-wrapper';

Video.where('Dream On, Aerosmith')
.then((page) => {
    //your function here
    doSomethingWithTheVideo( page.firstElement() );
});
```
```javascript
import {Search} from 'youtube-client-wrapper';

Search.where('adele')
.then((page) => {
    for( let entity of page.elements ){
        switch( entity.name ){
            case 'YouTubeVideo':
                doSomethingWithVideo( entity );
                break;
            case 'YouTubePlaylist':
                doSomethingWithPlaylist( entity );
                break;
            case 'YouTubeChannel':
                doSomethingWithChannel( entity );
                break;
        }
    }
});
```
- Search a Video with extended search parameters and paginate results
```javascript
import {Video} from 'youtube-client-wrapper';
let params = {
    maxResults: 2,
    safeSearch: true,
    orderBy: 'date'
};
let pager;

Video.where('Maroon 5', params)
    .then((page => {
        pager = page;
        drawElements( page.elements );
}));

let onClickNextHandler = () => {
    pager.next()
        .then(page => {
            drawElements( page.elements );
    });
}
```
for a full list of search parameters, see https://developers.google.com/apis-explorer/#p/youtube/v3/

**At this point the Wrapper only support querying methods. More features will be developed in the future.**

See here a working example soon.

##Development
```git clone git@github.com:Cosmitar/youtube-client-wrapper.git```

```npm install```

```gulp watch```

Open the localhost:3000/demo/index.html and look for console logs

##License
MIT
