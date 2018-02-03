const util = require('util');
const events = require('events');

import { clientListen, clientPoll } from '../client';

function waitForNextXHRWithCB(urlPattern = '', delay = 1000, callback = () => {
}) {
    const api = browser;

    // console.log('Verifying request ...');
    if (typeof urlPattern === 'string') {
        // throw new Error('urlPattern should be empty, string or regular expression');
    }
    if (typeof callback !== 'function') {
        throw new Error('callback should be a function');
    }

    // console.log('Setting up listening...');
    api.executeScript(clientListen);
    // console.warn('Listening XHR requests');

    let matchingXhrs = null;

    const interval = setInterval(() => {
        return api.executeScript(clientPoll).then((xhrs) => {
            // console.log('xhrss', xhrs);
            matchingXhrs = xhrs ? xhrs.filter(function (xhr) {
                return xhr.url.match(urlPattern);
            }) : null;
            if (matchingXhrs) {
                callback(matchingXhrs);
                clearInterval(interval);
                clearTimeout(timeout);
            }
        });
    }, 300);
    const timeout = setTimeout(function () {
        clearInterval(interval);
        if (matchingXhrs) callback(matchingXhrs); else throw new Error('Request never ocurred')
    }, delay);

    // console.log('Done');
    return this;
}

function waitForNextXHR(urlPattern, time) {
    return new Promise((resolve, reject) => {
        try {
            waitForNextXHRWithCB(urlPattern, time, function (xhrs) {
                resolve(xhrs);
            })
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = waitForNextXHR;