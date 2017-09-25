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


OmniMetricsLib.prototype._addDomEventHandler = function (instance) {
    document.addEventListener('click', function (event) {
        instance.track();
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
    return this['pageid'];
};


OmniMetricsPage.prototype.trackPageView = function () {
    var pageid = this.getPageId();
    var page = _.pageviewInfo(pageid);
}



var omniMaster = new OmniMetricsLib();
var omniPage = new OmniMetricsPage();

export { omniMaster, omniPage };

