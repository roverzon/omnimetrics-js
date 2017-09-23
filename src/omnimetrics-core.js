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


var omniMaster = new OmniMetricsLib();

export { omniMaster };

