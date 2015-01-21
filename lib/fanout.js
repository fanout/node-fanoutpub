/*
 * nodefpp
 * An FPP library for NodeJS
 * (C) 2013 Fanout, Inc.
 * File author: Katsuyuki Ohmuro <harmony7@pex2.jp>
 * Licensed under the MIT License, see file COPYING for details.
 */

// Version String
var version = "0.1.2";

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

// Format class
var Format = function(data) {
    this.data = data;
};
util.inherits(Format, pubcontrol.Format);
extend(Format.prototype, {
    name: function() { return "fpp"; },
    export: function() { return this.data; }
});

// FppPubControl publisher class
var FppPubControl = function(uri, auth) {
    this.pubControl = new pubcontrol.PubControl(uri, auth);
};
extend(FppPubControl.prototype, {
    getUri: function () {
        return this.pubControl.getUri();
    },
    setUri: function (uri) {
        this.pubControl.setUri(uri);
    },
    getAuth: function () {
        return this.pubControl.getAuth();
    },
    setAuth: function (auth) {
        this.pubControl.setAuth(auth);
    },
    publish: function (channel, data, id, prevId, cb) {
        // id and prevId are optional, so if cb is passed as third parameter, then
        // remap params.
        if (isFunction(id)) {
            cb = id;
            id = undefined;
            prevId = undefined;
        }
        this.pubControl.publish(channel, new pubcontrol.Item(new Format(data), id, prevId), cb);
    }
});

////////////////////////////////////////
// Utility
var fanout = function(realmName, realmKeyBase64) {
    return createFanoutWorker(false, realmName, realmKeyBase64);
};
var fanoutSecure = function(realmName, realmKeyBase64) {
    return createFanoutWorker(true, realmName, realmKeyBase64);
};
var createFanoutWorker = function(secure, realmName, realmKeyBase64) {
    var auth = null;
    if(realmKeyBase64) {
        var realmKey = new Buffer(realmKeyBase64, 'base64');
        auth = new pubcontrol.Auth.AuthJwt({"iss": realmName}, realmKey);
    }
    var protocol = secure ? "https://" : "http://";
    return new FppPubControl(protocol + "api.fanout.io/realm/" + realmName, auth);
};

////////////////////////////////////////
// Exports

exports.version = version;
exports.Format = Format;
exports.FppPubControl = FppPubControl;
exports.fanout = fanout;
exports.fanoutSecure = fanoutSecure;