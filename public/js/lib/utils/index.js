export function gettext(string){
  // Initial no-op gettext stand-in.
  return string;
}


export function genId({prefix=''} = {}) {
  return prefix + '_' + Math.random().toString(36).substr(2, 9);
}


export function addVisibilityHandler(callback) {
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  var handleVisibilityChange = () => {
    if (document[hidden]) {
      callback(false);
    } else {
      callback(true);
    }
  };

  if (typeof document.addEventListener !== "undefined" &&
      typeof document[hidden] !== "undefined") {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  } else {
    console.log('no support for page visibility changes');
  }
}
