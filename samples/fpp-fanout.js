// fpp-fanout.js
// (C) 2013 Fan Out Networks, Inc.
// File author: Katsuyuki Ohmuro <harmony7@pex2.jp>
// Licensed under the MIT License, see file COPYING for details.

// This example uses FPP to send a message through fanout.io

var fpp = require('fpp');

// Authentication / Create Publisher with Fanout
var realmName = "myrealm";          // fanout realm name
var realmKeyBase64 = "###########"; // fanout realm key
var pub = fpp.fanout(realmName, realmKeyBase64);

// Publish message
pub.publish("test", "hello world", function(success, message, context) {
    console.log(success);
    console.log(message);
    console.dir(context);
});
