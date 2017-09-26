import { _ } from './utils';

var OmniMetricsLib = function () {};

OmniMetricsLib.prototype.sayHello = function () {
    return 'Hello World';
};


OmniMetricsLib.prototype.track = function(event_name, properties) {

    if(typeof event_name !== 'string'){
        return;
    }
    properties = properties || {};

    var data = {
        'event': event_name,
        'properties': properties
    };

    var truncated_data = _.truncate(data, 255);
    return truncated_data;
};

function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i = 0, iLen = events.length; i < iLen; i++) {
        element.addEventListener(events[i], listener, true);
    }
}

OmniMetricsLib.prototype._addDomEventHandler = function (instance) {
    var listenEvents = 'mousedown mousemove scroll focus touchstart';

    addListenerMulti(window, listenEvents ,function(event){
        instance.track();
        switch (event['name']){
            case 'mousedown':
                this.track('$web_mevent', {'$type':'mousedown'});
                break;
            case 'mousemove':
                this.track('$web_mevent', {'$type':'mousemove'});
                break;
            case 'scroll':
                this.track('$web_mevent', {'$type':'scroll'});
                break ;
            case 'focus':
                this.track('$web_event', {'$type' : 'focus'});
                break;
            case 'touchstart':
                this.track('$web_event', {'$type' : 'touchstart'});
                break;
        }

    });

};

var OmniMetricsPage = function () {};

OmniMetricsPage.prototype.setPageId = function (pageid) {
    if(typeof pageid !== 'string'){
        return console.log('page id is not valid');}
    document.cookie = 'pageid=' + pageid +'; path=/';
    return pageid;
};

OmniMetricsPage.prototype.getPageId = function () {
    return document.cookie.split('=')[1];
};

OmniMetricsPage.prototype.trackPageView = function () {
    var pageid = this.getPageId();
    var page = _.pageviewInfo(pageid);
}

var omniMaster = new OmniMetricsLib();
var omniPage = new OmniMetricsPage();

export { omniMaster, omniPage };

