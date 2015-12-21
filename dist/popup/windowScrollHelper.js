define('melon/popup/windowScrollHelper', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var originalHTMLBodySize = {};
    function stop(name) {
        var element = document.getElementsByTagName(name)[0];
        originalHTMLBodySize[name] = {
            width: element.style.width,
            height: element.style.height,
            overflowX: element.style.overflowX,
            overflowY: element.style.overflowY
        };
        element.style.width = '100%';
        element.style.height = '100%';
        return element;
    }
    function restore(name) {
        var element = document.getElementsByTagName(name)[0];
        var size = originalHTMLBodySize[name];
        element.style.width = size.width;
        element.style.height = size.height;
        element.style.overflowX = size.overflowX;
        element.style.overflowY = size.overflowY;
        delete originalHTMLBodySize[name];
        return element;
    }
    exports.update = function () {
        exports.stop();
        exports.restore();
    };
    exports.stop = function () {
        stop('body').style.overflowX = 'hidden';
        stop('html').style.overflowX = 'hidden';
        stop('body').style.overflowY = 'auto';
        stop('html').style.overflowY = 'auto';
    };
    exports.restore = function () {
        if (!originalHTMLBodySize.body || !originalHTMLBodySize.html) {
            return;
        }
        restore('body');
        restore('html');
    };
});