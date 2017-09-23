import { expect } from 'chai';
import { describe, it } from 'mocha';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';

import { omniMaster } from '../../src/omnimetrics-core';

jsdom({
    url: 'https://omnimetrics.com/about/?query=param'
});

const triggerMouseEvent = function(node, eventType) {
    node.dispatchEvent(new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        screenX : 100,
        screenY:20
    }));
};

const simulateClick = function(el) {
    triggerMouseEvent(el, 'click');
};


describe('track click event on browser', function () {
    const lib = {
        track: sinon.spy()
    };

    before(function () {
        omniMaster._addDomEventHandler(lib);
    });

    it('should track click event', function () {
        const div = document.createElement('div');
        document.body.appendChild(div);
        simulateClick(div);
        simulateClick(div);
        expect(true).to.equal(lib.track.calledTwice);
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



})
