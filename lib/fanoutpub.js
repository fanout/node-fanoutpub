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
        if (isFunction(id)) {
            cb = id;
            id = undefined;
            prevId = undefined;
        }
        this.pubControl.publish(channel, new pubcontrol.Item(new JsonObjectFormat(data), id, prevId), cb);
    }
});

exports.JsonObjectFormat = jsonobjectformat.JsonObjectFormat;
exports.Fanout = Fanout;
