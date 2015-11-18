'use strict'

class SearchParams {
    constructor() {
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
    }
}

export default SearchParams;