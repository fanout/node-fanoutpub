/*
 * node-fanoutpub
 * Fanout.io library for NodeJS.
 * (C) 2015 Fanout, Inc.
 * File name: fanoutpub.js
 * File contains: the Fanout class.
 * File authors: 
 * Katsuyuki Ohmuro <harmony7@pex2.jp>
 * Konstantin Bokarius <kon@fanout.io>
 * Licensed under the MIT License, see file COPYING for details.
 */

var util = require('util');
var pubcontrol = require('pubcontrol');

var utilities = require('./utilities');
var jsonobjectformat = require('./jsonobjectformat');

// The Fanout class is used for publishing messages to Fanout.io and is
// configured with a Fanout.io realm and associated key. SSL can either
// be enabled or disabled.
var Fanout = function(realm, key, ssl) {

    // Initialize with a specified realm, key, and a boolean indicating wther
    // SSL should be enabled or disabled.
    var scheme = 'https';
    if (typeof ssl !== 'undefined' && !ssl) {
        scheme = 'http';
    }
    var uri = scheme + '://api.fanout.io/realm/' + realm;
    var pubControl = new pubcontrol.PubControlClient(uri);
    pubControl.setAuthJwt({'iss': realm}, new Buffer(key, 'base64'));
    this.pubControl = pubControl;
};

utilities.extend(Fanout.prototype, {

    // Publish the specified data to the specified channel for the configured
    // Fanout.io realm. Optionally provide an ID and previous ID to send along
    // with the message, as well a callback method that will be called after
    // publishing is complete and passed the result and error message (if an
    // error was encountered).
    publish: function (channel, data, id, prevId, cb) {
        if (utilities.isFunction(id)) {
            cb = id;
            id = undefined;
            prevId = undefined;
        }
        this.pubControl.publish(channel, new pubcontrol.Item(
                new jsonobjectformat.JsonObjectFormat(data),
                id, prevId), cb);
    }
});

exports.JsonObjectFormat = jsonobjectformat.JsonObjectFormat;
exports.Fanout = Fanout;
