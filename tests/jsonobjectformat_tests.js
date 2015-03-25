var assert = require('assert');
var jsonobjectformat = require('../lib/jsonobjectformat');

(function testInitialize() {
    obj = new jsonobjectformat.JsonObjectFormat('value');
    assert.equal(obj.value, 'value');
})();

(function testName() {
    obj = new jsonobjectformat.JsonObjectFormat('value');
    assert.equal(obj.name(), 'json-object');
})();

(function testExport() {
    obj = new jsonobjectformat.JsonObjectFormat('value');
    assert.equal(obj.export(), 'value');
})();
