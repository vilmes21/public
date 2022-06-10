function getAllSupportedMimeTypes(...mediaTypes) {
  // https://stackoverflow.com/questions/41739837/all-mime-types-supported-by-mediarecorder-in-firefox-and-chrome
  if (!mediaTypes.length) mediaTypes.push(...["video", "audio"]);
  const FILE_EXTENSIONS = ["webm", "ogg", "mp4", "x-matroska"];
  const CODECS = [
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

  return [
    ...new Set(
      FILE_EXTENSIONS.flatMap((ext) =>
        CODECS.flatMap((codec) =>
          mediaTypes.flatMap((mediaType) => [
            `${mediaType}/${ext};codecs:${codec}`,
            `${mediaType}/${ext};codecs=${codec}`,
            `${mediaType}/${ext};codecs:${codec.toUpperCase()}`,
            `${mediaType}/${ext};codecs=${codec.toUpperCase()}`,
            `${mediaType}/${ext}`,
          ])
        )
      )
    ),
  ].filter((variation) => MediaRecorder.isTypeSupported(variation));
}

const showInfo = (infoStr) => {
  document.getElementById("info_js").textContent = infoStr;
};

const is_iOS_chrome = () => {
  // https://stackoverflow.com/questions/13807810/ios-chrome-detection
  return (
    /CriOS/i.test(navigator.userAgent) &&
    /iphone|ipod|ipad/i.test(navigator.userAgent)
  );
};

const is_iOS_firefox = () => {
  // https://stackoverflow.com/questions/36822464/javascript-detect-ios-firefox
  return Boolean(navigator.userAgent.match("FxiOS"));
};

const init = () => {
  try {
    throw Error("FOOOFOF");
    const list1 = getAllSupportedMimeTypes("video");

    const allInfo = {
      is_iOS_chrome: is_iOS_chrome(),
      is_iOS_firefox: is_iOS_firefox(),
      supports: list1,
    };

    showInfo(JSON.stringify(allInfo, null, 2));

    alert("Pls select-all then copy the array info");
  } catch (e) {
    alert("e.message: " + e.message + " e: " + String(e));
    console.log("caught", e);
  }
};

init();
