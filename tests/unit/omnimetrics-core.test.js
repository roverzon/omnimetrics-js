import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { _ } from '../../src/utils.js';

import { omniMaster, omniPage } from '../../src/omnimetrics-core';

jsdom({
    url: 'https://omnimetrics.com/about/?query=param',
    referrer: 'http://www.bbc.co.uk',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
});


const triggerMouseEvent = function(node, eventType) {
    node.dispatchEvent(new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        screenX : 100,
        screenY:20
    }));
};

const simulateMouseDown = function(el) {
    triggerMouseEvent(el, 'mousedown');
};

const simulateMouseMove = function(el) {
    triggerMouseEvent(el, 'mousemove');
};


describe('track event on DOM', function () {
    const lib = {
        track: sinon.spy()
    };

    before(function () {
        omniMaster._addDomEventHandler(lib);
    });

    it('should track mousedown event', function () {
        const div = document.createElement('div');
        document.body.appendChild(div);
        simulateMouseDown(div);
        simulateMouseDown(div);
        expect(true).to.equal(lib.track.calledTwice);
        lib.track.reset();
    });

    it('should track mousemove event', function () {
        const div = document.createElement('div');
        document.body.appendChild(div);
        simulateMouseMove(div);
        expect(true).to.equal(lib.track.called);
        lib.track.reset();
    });

});

describe('event tracking', function () {

    it('tracking event is a json format', function () {
        var result = omniMaster.track('event1', {'page_section' : 'home'});
        expect(JSON.stringify(result)).is.eq(
            JSON.stringify({'event':'event1','properties':{'page_section':'home'}})
        );
    });

});

describe('get page infow', function () {

    it('setPageId it will store pageid in cookie ', function () {
        omniPage.setPageId('123456');
        expect(document.cookie).is.eq('pageid=123456');
    });

    it('getPageId', function () {
        expect(document.cookie).is.eq('pageid=123456');
    });

    it('pageviewInfo', function () {

        var pageId = omniPage.getPageId();
        var pageView = _.info.pageviewInfo(pageId);

    });


});


