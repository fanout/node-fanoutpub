var assert = require('assert');
var utilities = require('../lib/utilities');

(function testIsFunction() {
    assert(!(utilities.isFunction('hello')));
    assert(utilities.isFunction(function(){}));
})();

(function testIsArray() {
    assert(!(utilities.isArray('hello')));
    assert(utilities.isArray([]));
})();

(function testToBuffer() {
    var buf = new Buffer('hello');
    assert.equal(buf, utilities.toBuffer(buf));
    buf = utilities.toBuffer('hello');
    assert(Buffer.isBuffer(buf));
    assert(buf.toString(), 'hello');
})();
