'use strict'
import Config from './../src/services/Config';
import Video from './../src/entities/YouTubeVideo';
import Playlist from './../src/entities/YouTubePlaylist';
import Channel from './../src/entities/YouTubeChannel';
import Search from './../src/entities/YouTubeSearch';
import Auth from './../src/entities/Auth';
let Demo = {
    index: 0,
    continuous: false,
    all: function(){
        this.continuous = true;
        this.next();
    },
    next: function(){
        console.groupEnd();
        console.log('------------------------');
        console.group();
        this.index++;
        if( this[`demo${this.index}`] && this.continuous ){
            this[`demo${this.index}`]();
        }
    },
    demo1: function(){
        let _self = this;
        console.log('SEARCH VIDEOS AND GET THE TITLE OF THE FIRST RESULT VIDEO');
        console.log(`Search for: Dream On, Aerosmith`);
        Video.where('Dream On, Aerosmith')
            .then((page) => {
                console.log(page.firstElement().title);
                _self.next();
            });
    },
    demo2: function(){
        let _self = this;
        console.log('PAGINATION EXAMPLE');
        let params = {
            maxResults: 2
        };
        console.log(`Search for: Aerosmith LIVE`);
        Video.where('Aerosmith LIVE', params)
            .then(page => {
                console.log('page 1:');
                for( let video of page.elements ){
                    console.log('---'+video.title);
                }
                page.nextPage().then(page => {
                    console.log('page 2:');
                    for( let video of page.elements ){
                        console.log('---'+video.title);
                    }
                    _self.next();
                });
            });
    },
    demo3: function(){
        let _self = this;
        console.log('SEARCH MULTIPLE ENTITIES');
        console.log(`Search for: adele`);
        Search.where('adele')
            .then(page => {
                console.log('Search.where');
                for( let entity of page.elements ){
                    console.log(`${entity.constructor.name}: ${entity.title}`);
                    console.log(`${entity.getThumbnail()}`);
                }
            });
    },
    demo4: function(){
        let _self = this;
        console.log('AUTHENTICATION');
        Auth.authorize()
            .then( authResult => {
                console.log(authResult);
                loggedInHandler();
            },() => {
                showLoginBtn();
            });

        let loggedInHandler = () => {
            hideLoginBtn();
            console.log('MAKE API CALL!');
        }

        let showLoginBtn = () => {
            let btn = document.querySelector('#login_button');
            btn.style.visibility = 'visible';
            btn.onclick = () => {
                Auth.showAuth()
                    .then(authResult => {
                        console.log(authResult);
                        loggedInHandler();
                    }, authResult => {
                        console.log('Cant authenticate.');
                        console.log(authResult.error);
                    });
            }
        };

        let hideLoginBtn = () => {
            let btn = document.querySelector('#login_button');
            btn.style.visibility = 'hidden';
        };
    },
    demoX: function(){
        let _self = this;
        _self.next();
    }
};

window.OnGoogleAPILoadCallback = () => { 
    Config.set({
            apiKey: 'YOUR API KEY',
            clientId: 'YOUR CLIENT ID',
            scopes: ['https://www.googleapis.com/auth/youtube']
        })
        .boot()
        .then(() => {
            Demo.all();
            //Demo.demo4();
        });
}