export const clientListen = function () {
    const getXhr = function getXhr(id) {
        return window.xhrListen.find(function (xhr) {
            return xhr.id === id;
        });
    };
    const rand = function rand() {
        return Math.random() * 16 | 0;
    };
    const uuidV4 = function uuidV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            return (c === 'x' ? rand() : rand() & 0x3 | 0x8).toString(16);
        });
    };

    window.xhrListen = [];

    if (!XMLHttpRequest.customized) {
        XMLHttpRequest.realSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.realOpen = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function (method, url) {
            this.id = uuidV4();

            this.onload = function () {
                window.xhrListen.push({
                    method: method,
                    url: url,
                    httpResponseCode: this.status,
                });
            };
            XMLHttpRequest.realOpen.apply(this, arguments);
        };
        XMLHttpRequest.prototype.send = function (data) {
            const xhr = getXhr(this.id);
            if (xhr) xhr.requestData = data;

            XMLHttpRequest.realSend.apply(this, arguments);
        };
        XMLHttpRequest.customized = true;
    }
};

export const clientPoll = function () {
    if (!window.xhrListen) return null;
    return window.xhrListen.length > 0 ? window.xhrListen : null;
};
