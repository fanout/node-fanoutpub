// fpp-fanout.js
// (C) 2013 Fanout, Inc.
// File authors:
// Katsuyuki Ohmuro <harmony7@pex2.jp>
// Konstantin Bokarius <kon@fanout.io>
// Licensed under the MIT License, see file COPYING for details.

// This example uses fanoutpub to send a message through fanout.io

var util = require('util');
var fanout = require('fanoutpub');

var callback = function(success, message, context) {
    if (success) {
        console.log('Publish successful!');
    }
    else {
        console.log('Publish failed!');
        console.log('Message: ' + message);
        console.log('Context: ');
        console.dir(context); 
    }
};

var fanout = new fanout.Fanout('<myrealm>', '<myrealmkey>');
fanout.publish('<channel>', 'Test Publish!', callback);
