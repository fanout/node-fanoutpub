Fanout.io Library for NodeJS
===================================================

Author: Katsuyuki Ohmuro <harmony7@pex2.jp>, Konstantin Bokarius <kon@fanout.io>

Description
-----------

Fanout Pubsub Protocol library for NodeJS.

The Fanout pubsub protocol is used to send simple realtime messages over a communications channel. This library has been designed for use with the Fanout.io pubsub service.

This library implements the JsonObject format as a custom data format for pubcontrol, an EPCP library for NodeJS. These data objects created using node fanoutpub may also be used with pubcontrol's publisher if desired.

This library also provides some convenience methods that provide simple ways to set up a publisher when working with the Fanout service.

Requirements
------------

    pubcontrol

Sample Usage
------------

The simple usage of node-fanoutpub is with the Fanout.io service. This usage requires a realm name and a base64-encoded realm key, which are available to users of the Fanout service.

```javascript
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
```

License
-------

(C) 2015 Fanout, Inc.  
Licensed under the MIT License, see file COPYING for details.
