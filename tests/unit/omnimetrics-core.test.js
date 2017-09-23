import { expect } from 'chai';
import { describe, it } from 'mocha';
import jsdom from 'mocha-jsdom';

import { omniMaster } from '../../src/omnimetrics-core';

jsdom({
    url: 'https://omnimetrics.com/about/?query=param'
});

const triggerMouseEvent = function(node, eventType) {
  node.dispatchEvent(new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
  }));
};

const simulateClick = function(el) {
  triggerMouseEvent(el, 'click');
};


describe('1st testing spec ', function () {
    it('1st test case', function () {
        expect(omniMaster.sayHello()).is.eq('Hello World');
    });
});
