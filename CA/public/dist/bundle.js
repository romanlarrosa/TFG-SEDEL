(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var prefix = 'sessionAccessId-';

function getId(data) {
    var id = void 0;

    if (data && data.id && ~data.id.indexOf(prefix)) {
        id = data.id;
    }

    return id;
}

module.exports = getId;
},{}],2:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getId = require('../getId');

var prefix = 'sessionAccessId-';

function createId() {
    return prefix + Date.now();
}

module.exports = function storageGuest(source, parent) {
    parent = parent || document.body;

    var contentWindow = void 0;
    var callbacks = {};
    var sessionRequests = [];
    var connected = false;
    var closed = true;
    var connectedTimeout = void 0;
    var isLoaded = false;

    var iframe = document.createElement('iframe');
    iframe.src = source;
    iframe.width = 0;
    iframe.height = 0;
    iframe.style.display = 'none';
    iframe.onload = function () {
        isLoaded = true;
    };

    function openStorage() {
        parent.appendChild(iframe);
        contentWindow = iframe.contentWindow;
        closed = false;

        window.addEventListener('message', handleMessage);

        checkConnected();
    }

    openStorage();

    function handleMessage(event) {
        var response = event.data;
        var sessionAccessId = getId(response);

        if (sessionAccessId === 'sessionAccessId-connected') {
            connected = true;
            return;
        }

        if (response.connectError) {
            Object.keys(callbacks).forEach(function (key) {
                return callbacks[key](response.error);
            });
            callbacks = {};
            return;
        }

        var callback = callbacks[sessionAccessId];

        if (sessionAccessId && callback) {
            callback(response.error, response.data);
        }
    }

    function close() {
        clearTimeout(connectedTimeout);
        window.removeEventListener('message', handleMessage);
        iframe.parentNode.removeChild(iframe);
        connected = false;
        closed = true;
    }

    function message(method, key, value, callback) {
        if (closed) {
            openStorage();
        }

        if (!connected && method !== 'connect') {
            sessionRequests.push([method, key, value, callback]);
        }

        var id = createId();

        if (callbacks && typeof callback === 'function') {
            callbacks[id] = callback;
        }

        if (isLoaded) {
            contentWindow.postMessage({
                method: method,
                key: key,
                value: value,
                id: id
            }, source);
        }
    }

    function get(key, callback) {
        if (!callback) {
            throw new Error('callback required for get');
        }

        message('get', key, null, callback);
    }

    function set(key, value, callback) {
        message('set', key, value, callback);
    }

    function remove(key, callback) {
        message('remove', key, null, callback);
    }

    function checkConnected() {
        if (connected) {
            clearTimeout(connectedTimeout);
            while (sessionRequests.length) {
                message.apply(undefined, _toConsumableArray(sessionRequests.pop()));
            }

            return;
        }

        message('connect');

        connectedTimeout = setTimeout(checkConnected, 125);
    }

    return {
        get: get,
        set: set,
        remove: remove,
        close: close
    };
};
},{"../getId":1}],3:[function(require,module,exports){
const guest = require('./distribution/guest');

module.exports = guest;

},{"./distribution/guest":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeTo = void 0;

var createGuest = require('cross-domain-storage/guest');

var writeTo = function writeTo(path, key, value) {
  var bazStorage = createGuest(path);
  bazStorage.set(key, value, function () {
    console.log('Escrito...');
  });
};

exports.writeTo = writeTo;
var origin = document.getElementById('origin').innerHTML;
var signed = document.getElementById('signed').innerHTML;
writeTo(origin, 'signed', signed);
console.log({
  origin: origin,
  signed: signed
});

},{"cross-domain-storage/guest":3}]},{},[4]);
