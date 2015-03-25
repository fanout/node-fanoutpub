/*
 * node-fanoutpub
 * Fanout.io library for NodeJS.
 * (C) 2015 Fanout, Inc.
 * File name: jsonobjectformat.js
 * File contains: the JSON object format class.
 * File authors: 
 * Katsuyuki Ohmuro <harmony7@pex2.jp>
 * Konstantin Bokarius <kon@fanout.io>
 * Licensed under the MIT License, see file COPYING for details.
 */

var pubcontrol = require('pubcontrol');
var util = require('util');
var utilities = require('./utilities');

// The JSON object format used for publishing messages to Fanout.io.
var JsonObjectFormat = function(value) {

    // Initialize with a value representing the message to be sent.
    this.value = value;
};

util.inherits(JsonObjectFormat, pubcontrol.Format);
utilities.extend(JsonObjectFormat.prototype, {

    // The name of the format.
    name: function() { return 'json-object'; },
    
    // The method used to export the format data.
    export: function() { return this.value; }
});

exports.JsonObjectFormat = JsonObjectFormat;
