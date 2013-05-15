// fpp-customserver.js
// (C) 2013 Fanout, Inc.
// File author: Katsuyuki Ohmuro <harmony7@pex2.jp>
// Licensed under the MIT License, see file COPYING for details.

// This example uses FPP to send a message through
// a custom server that accepts FPP

var fpp = require('fpp');
var pubcontrol = require('pubcontrol');

// Create publisher for endpoint
var endpoint = "http://localhost:1337";
var pub = new fpp.FppPubControl(endpoint);

// Publish message
pub.publish("test", "hello world", function(success, message, context) {
    console.log(success);
    console.log(message);
    console.dir(context);
});
