function getAllSupportedMimeTypes() {
    var mediaTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mediaTypes[_i] = arguments[_i];
    }
    if (!mediaTypes.length)
        mediaTypes.push.apply(mediaTypes, ["video", "audio"]);
    var FILE_EXTENSIONS = ["webm", "ogg", "mp4", "x-matroska"];
    var CODECS = [
        "vp9",
        "vp9.0",
        "vp8",
        "vp8.0",
        "avc1",
        "av1",
        "h265",
        "h.265",
        "h264",
        "h.264",
        "opus",
    ];
    var rawArr = [];
    FILE_EXTENSIONS.forEach(function (ext) {
        return CODECS.forEach(function (codec) {
            return mediaTypes.forEach(function (mediaType) {
                var items = [
                    mediaType + "/" + ext + ";codecs:" + codec,
                    mediaType + "/" + ext + ";codecs=" + codec,
                    mediaType + "/" + ext + ";codecs:" + codec.toUpperCase(),
                    mediaType + "/" + ext + ";codecs=" + codec.toUpperCase(),
                    mediaType + "/" + ext,
                ];
                items.forEach(function (x) {
                    rawArr.push(x);
                });
            });
        });
    });
    var _set = new Set(rawArr);
    return Array.from(_set).filter(function (variation) {
        return MediaRecorder.isTypeSupported(variation);
    });
}
var showInfo = function (infoStr) {
    document.getElementById("info_js").textContent = infoStr;
};
var is_iOS_chrome = function () {
    return (/CriOS/i.test(navigator.userAgent) &&
        /iphone|ipod|ipad/i.test(navigator.userAgent));
};
var is_iOS_firefox = function () {
    return Boolean(navigator.userAgent.match("FxiOS"));
};
var init = function () {
    try {
        var list1 = getAllSupportedMimeTypes("video");
        var allInfo = {
            is_iOS_chrome: is_iOS_chrome(),
            is_iOS_firefox: is_iOS_firefox(),
            supports: list1,
        };
        showInfo(JSON.stringify(allInfo, null, 2));
        alert("Pls select-all then copy the array info");
    }
    catch (e) {
        alert("e.message: " + e.message + " e: " + String(e));
        console.log("caught", e);
    }
};
init();
