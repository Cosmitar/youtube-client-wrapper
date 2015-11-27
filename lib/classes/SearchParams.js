'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SearchParams = function SearchParams() {
    _classCallCheck(this, SearchParams);

    this.part = 'snippet';
    this.channelId;
    this.channelType;
    this.eventType;
    this.forContentOwner;
    this.forDeveloper;
    this.forMine;
    this.location;
    this.locationRadius;
    this.onBehalfOfContentOwner;
    this.order = 'relevance';
    this.publishedAfter;
    this.q = '';
    this.regionCode;
    this.relatedToVideoId;
    this.relevanceLanguage;
    this.safeSearch;
    this.topicId;
    this.type = 'video';
    this.videoCaption;
    this.videoCategoryId;
    this.videoDefinition;
    this.videoDimension;
    this.videoDuration;
    this.videoEmbeddable;
    this.videoLicense;
    this.videoSyndicated;
    this.videoType;
    this.fields;
};

exports['default'] = SearchParams;
module.exports = exports['default'];