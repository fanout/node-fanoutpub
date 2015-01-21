/*
 * node-fanoutpub
 * Fanout.io library for NodeJS.
 * (C) 2015 Fanout, Inc.
 * File authors: 
 * Katsuyuki Ohmuro <harmony7@pex2.jp>
 * Konstantin Bokarius <kon@fanout.io>
 * Licensed under the MIT License, see file COPYING for details.
 */

// Version String
var version = '1.0.0';

// Dependencies
var util = require('util');
var pubcontrol = require('pubcontrol');

////////////////////////////////////////
// General Utilities

// Type Detection
var objectToString = Object.prototype.toString;
var functionObjectIdentifier = objectToString.call(function(){});
var isFunction = function(obj) {
    return obj && objectToString.call(obj) === functionObjectIdentifier;
};

// Objects
var extend = function() {
    var args = Array.prototype.slice.call(arguments);

    var obj;
    if (args.length > 1) {
        obj = args.shift();
    } else {
        obj = {};
    }

    while(args.length > 0) {
        var opts = args.shift();
        if(opts != null) {
            for(prop in opts) {
                obj[prop] = opts[prop];
            }
        }
    }

    return obj;
};

////////////////////////////////////////
// Classes

// JsonObjectFormat class
var JsonObjectFormat = function(value) {
    this.value = value;
};
util.inherits(JsonObjectFormat, pubcontrol.Format);
extend(JsonObjectFormat.prototype, {
    name: function() { return 'json-object'; },
    export: function() { return this.value; }
});

// Fanout publisher class
var Fanout = function(realm, key, ssl) {
    var scheme = 'https';
    if (typeof ssl !== 'undefined' && !ssl) {
        scheme = 'http';
    }
    var uri = scheme + '://api.fanout.io/realm/' + realm;
    var pubControl = new pubcontrol.PubControlClient(uri);
    pubControl.setAuthJwt({'iss': realm}, new Buffer(key, 'base64'));
    this.pubControl = pubControl;
};
extend(Fanout.prototype, {
    publish: function (channel, data, id, prevId, cb) {
        // id and prevId are optional, so if cb is passed as third parameter, then
        // remap params.
        if (isFunction(id)) {
            cb = id;
            id = undefined;
            prevId = undefined;
        }
        this.pubControl.publish(channel, new pubcontrol.Item(new JsonObjectFormat(data), id, prevId), cb);
    }
});

////////////////////////////////////////
// Exports

exports.version = version;
exports.JsonObjectFormat = JsonObjectFormat;
exports.Fanout = Fanout;
