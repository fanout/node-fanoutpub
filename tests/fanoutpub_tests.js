var assert = require('assert');
var pubcontrol = require('pubcontrol');
var fanoutpub = require('../lib/fanoutpub');

(function testInitialize() {
    var fo = new fanoutpub.Fanout('realm', 'key', true);
    assert.equal(fo.pubControl.uri, 'https://api.fanout.io/realm/realm');
    assert.equal(fo.pubControl.auth.claim['iss'], 'realm');
    assert.equal(fo.pubControl.auth.key.toString(),
            new Buffer('key', 'base64').toString());
    fo = new fanoutpub.Fanout('realm', 'key', false);
    assert.equal(fo.pubControl.uri, 'http://api.fanout.io/realm/realm');
    assert.equal(fo.pubControl.auth.claim['iss'], 'realm');
    assert.equal(fo.pubControl.auth.key.toString(),
            new Buffer('key', 'base64').toString());
})();

(function testPublish() {
    var fo = new fanoutpub.Fanout('realm', 'key', true);
    var wasPublishCalled = false;
    fo.pubControl.publish = function(channel, items, cb) {
        assert.equal(channel, 'chan');
        assert.equal(JSON.stringify(items), JSON.stringify(
                new pubcontrol.Item(new fanoutpub.
                JsonObjectFormat('message'),
                'id', 'prev-id')));
        assert.equal(cb, 'callback');
        wasPublishCalled = true;
    };
    fo.publish('chan', 'message', 'id', 'prev-id', 'callback');
    assert(wasPublishCalled);
})();

(function testPublish() {
    var callback = function() { }
    var fo = new fanoutpub.Fanout('realm', 'key', true);
    var wasPublishCalled = false;
    fo.pubControl.publish = function(channel, items, cb) {
        assert.equal(channel, 'chan');
        assert.equal(JSON.stringify(items), JSON.stringify(
                new pubcontrol.Item(new fanoutpub.
                JsonObjectFormat('message'))));
        assert.equal(cb, callback);
        wasPublishCalled = true;
    };
    fo.publish('chan', 'message', callback);
    assert(wasPublishCalled);
})();
