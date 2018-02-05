# Protractor XHR

We've encountered some issues with our e2e tests.
We tried checking if clicks on specific links behave as they should (which also meant, send a POST XHR request to a tracking server).

Since we couldn't find any package for that, we wrote one.

So - this package waits for XHR to complete and enables a callback with its values for assertion.

Have fun!

Install
---
```shell
npm install protractor-xhr
```

or 

```shell
yarn add protractor-xhr
```

## Commands 

### waitForNextXHR
Calls the `trigger`, and then calls `callback` with the first xhr request corresponding to the given `urlPattern`, failing if `timeout` is exceeded.  

## Usage Examples
The function expects these parameters:
* urlPattern - a regex match for url pattern, will only listen to urls matching this, use '' for all urls.
* timeout - well, timeout

### waitForNextXHR:
```javascript
module.exports = {
    'Catch next XHRs': function () {
        waitForNextXHR('/some/path/regex/', 1000).then(function(xhrs) {
            expect(xhrs.length > 0).toBe(true);
        })
    }
 }
```

### waitForNextXHR (async/await):
```javascript
module.exports = {
    'Catch next XHRs': async function () {
        const xhrs = await waitForNextXHR('/some/path/regex/', 1000);
        expect(xhrs.length > 0).toBe(true);
    }
 }
```

The promise returns an array of objects containing the following properties :
* method (GET/POST)
* url (url of request)
* httpResponseCode (HTTP status response code, eg: "200")

When the anticipated XHR request has not occurred, it fails an assertion. Callback is not called and an error will be thrown

## Contributors

A huge thank you for the people at [nightwatch-xhr](https://github.com/cortexmg/nightwatch-xhr) for providing
most of the code with their library. This one is just a fork adapted to Protractor.
