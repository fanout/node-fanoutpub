/*
 * node-fanoutpub
 * Fanout.io library for NodeJS.
 * (C) 2015 Fanout, Inc.
 * File name: utilities.js
 * File contains: various helper methods.
 * File authors: 
 * Katsuyuki Ohmuro <harmony7@pex2.jp>
 * Konstantin Bokarius <kon@fanout.io>
 * Licensed under the MIT License, see file COPYING for details.
 */

var objectToString = Object.prototype.toString;

// Determines whether the specified object is a function.
var functionObjectIdentifier = objectToString.call(function(){});
var isFunction = function(obj) {
    return obj && objectToString.call(obj) === functionObjectIdentifier;
};

// Determines whether the specified object is an array.
var arrayObjectIdentifier = objectToString.call([]);
var isArray = function(obj) {
    return obj && objectToString.call(obj) === arrayObjectIdentifier;
};

// Check if input is a buffer. If not, turn it into a string and then
// encode the bits of its UTF-8 representation into a new Buffer.
var toBuffer = function(input) {
    return Buffer.isBuffer(input) ? input : new Buffer(input.toString(), 'utf8');
};

// Class creation and management methods.
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
var extendClass = function(prototype) {
    var constructor, properties;
    var argc = arguments.length;
    if (argc >= 3) {
        constructor = arguments[1];
        properties = arguments[2];
    } else if (argc == 2) {
        var arg = arguments[1];
        if(isFunction(arg)) {
            constructor = arg;
            properties = null;
        } else {
            constructor = function(){};
            properties = arg;
        }
    } else if (argc == 1) {
        constructor = function(){};
        properties = null;
    }

    if (isFunction(prototype)) {
        prototype = new prototype();
    }

    if(prototype) {
        constructor.prototype = prototype;
    }
    if(properties) {
        extend(constructor.prototype, properties);
    }
    return constructor;
};
var defineClass = function() {
    var args = [null].concat(Array.prototype.slice.call(arguments));
    return extendClass.apply(this, args);
};

exports.objectToString = objectToString;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.toBuffer = toBuffer;
exports.extend = extend;
exports.extendClass = extendClass;
exports.defineClass = defineClass;
