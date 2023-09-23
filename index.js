var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/text-balancer/text-balancer.js
var require_text_balancer = __commonJS((exports) => {
  var candidates = [];
  var textBalancer = function(selectors) {
    if (!selectors) {
      candidates = document.querySelectorAll(".balance-text");
    } else {
      createSelectors(selectors);
    }
    balanceText();
    var rebalanceText = debounce(function() {
      balanceText();
    }, 100);
    window.addEventListener("resize", rebalanceText);
  };
  var createSelectors = function(selectors) {
    selectorArray = selectors.split(",");
    for (var i = 0;i < selectorArray.length; i += 1) {
      var currentSelectorElements = document.querySelectorAll(selectorArray[i].trim());
      for (var j = 0;j < currentSelectorElements.length; j += 1) {
        var currentSelectorElement = currentSelectorElements[j];
        candidates.push(currentSelectorElement);
      }
    }
  };
  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate)
          func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func.apply(context, args);
    };
  };
  var balanceText = function() {
    var element;
    var i;
    for (i = 0;i < candidates.length; i += 1) {
      element = candidates[i];
      if (textElementIsMultipleLines(element)) {
        element.style.maxWidth = "";
        squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
      }
    }
  };
  var squeezeContainer = function(element, originalHeight, bottomRange, topRange) {
    var mid;
    if (bottomRange >= topRange) {
      element.style.maxWidth = topRange + "px";
      return;
    }
    mid = (bottomRange + topRange) / 2;
    element.style.maxWidth = mid + "px";
    if (element.clientHeight > originalHeight) {
      squeezeContainer(element, originalHeight, mid + 1, topRange);
    } else {
      squeezeContainer(element, originalHeight, bottomRange + 1, mid);
    }
  };
  var textElementIsMultipleLines = function(element) {
    var firstWordHeight;
    var elementHeight;
    var HEIGHT_OFFSET;
    var elementWords;
    var firstWord;
    var ORIGINAL_ELEMENT_TEXT;
    ORIGINAL_ELEMENT_TEXT = element.innerHTML;
    HEIGHT_OFFSET = 10;
    elementWords = element.innerHTML.split(" ");
    firstWord = document.createElement("span");
    firstWord.id = "element-first-word";
    firstWord.innerHTML = elementWords[0];
    elementWords = elementWords.slice(1);
    element.innerHTML = "";
    element.appendChild(firstWord);
    element.innerHTML += " " + elementWords.join(" ");
    firstWord = document.getElementById("element-first-word");
    firstWordHeight = firstWord.offsetHeight;
    elementHeight = element.offsetHeight;
    element.innerHTML = ORIGINAL_ELEMENT_TEXT;
    return elementHeight - HEIGHT_OFFSET > firstWordHeight;
  };
  exports.balanceText = textBalancer;
});

// node_modules/ev-emitter/ev-emitter.js
var require_ev_emitter = __commonJS((exports, module) => {
  (function(global, factory) {
    if (typeof module == "object" && exports) {
      module.exports = factory();
    } else {
      global.EvEmitter = factory();
    }
  })(typeof window != "undefined" ? window : exports, function() {
    function EvEmitter() {
    }
    let proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
      if (!eventName || !listener)
        return this;
      let events = this._events = this._events || {};
      let listeners = events[eventName] = events[eventName] || [];
      if (!listeners.includes(listener)) {
        listeners.push(listener);
      }
      return this;
    };
    proto.once = function(eventName, listener) {
      if (!eventName || !listener)
        return this;
      this.on(eventName, listener);
      let onceEvents = this._onceEvents = this._onceEvents || {};
      let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
      onceListeners[listener] = true;
      return this;
    };
    proto.off = function(eventName, listener) {
      let listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length)
        return this;
      let index = listeners.indexOf(listener);
      if (index != -1) {
        listeners.splice(index, 1);
      }
      return this;
    };
    proto.emitEvent = function(eventName, args) {
      let listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length)
        return this;
      listeners = listeners.slice(0);
      args = args || [];
      let onceListeners = this._onceEvents && this._onceEvents[eventName];
      for (let listener of listeners) {
        let isOnce = onceListeners && onceListeners[listener];
        if (isOnce) {
          this.off(eventName, listener);
          delete onceListeners[listener];
        }
        listener.apply(this, args);
      }
      return this;
    };
    proto.allOff = function() {
      delete this._events;
      delete this._onceEvents;
      return this;
    };
    return EvEmitter;
  });
});

// node_modules/imagesloaded/imagesloaded.js
var require_imagesloaded = __commonJS((exports, module) => {
  /*!
   * imagesLoaded v5.0.0
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */
  (function(window2, factory) {
    if (typeof module == "object" && exports) {
      module.exports = factory(window2, require_ev_emitter());
    } else {
      window2.imagesLoaded = factory(window2, window2.EvEmitter);
    }
  })(typeof window !== "undefined" ? window : exports, function factory(window2, EvEmitter) {
    let $ = window2.jQuery;
    let console2 = window2.console;
    function makeArray(obj) {
      if (Array.isArray(obj))
        return obj;
      let isArrayLike = typeof obj == "object" && typeof obj.length == "number";
      if (isArrayLike)
        return [...obj];
      return [obj];
    }
    function ImagesLoaded(elem, options, onAlways) {
      if (!(this instanceof ImagesLoaded)) {
        return new ImagesLoaded(elem, options, onAlways);
      }
      let queryElem = elem;
      if (typeof elem == "string") {
        queryElem = document.querySelectorAll(elem);
      }
      if (!queryElem) {
        console2.error(`Bad element for imagesLoaded ${queryElem || elem}`);
        return;
      }
      this.elements = makeArray(queryElem);
      this.options = {};
      if (typeof options == "function") {
        onAlways = options;
      } else {
        Object.assign(this.options, options);
      }
      if (onAlways)
        this.on("always", onAlways);
      this.getImages();
      if ($)
        this.jqDeferred = new $.Deferred;
      setTimeout(this.check.bind(this));
    }
    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
    ImagesLoaded.prototype.getImages = function() {
      this.images = [];
      this.elements.forEach(this.addElementImages, this);
    };
    const elementNodeTypes = [1, 9, 11];
    ImagesLoaded.prototype.addElementImages = function(elem) {
      if (elem.nodeName === "IMG") {
        this.addImage(elem);
      }
      if (this.options.background === true) {
        this.addElementBackgroundImages(elem);
      }
      let { nodeType } = elem;
      if (!nodeType || !elementNodeTypes.includes(nodeType))
        return;
      let childImgs = elem.querySelectorAll("img");
      for (let img of childImgs) {
        this.addImage(img);
      }
      if (typeof this.options.background == "string") {
        let children = elem.querySelectorAll(this.options.background);
        for (let child of children) {
          this.addElementBackgroundImages(child);
        }
      }
    };
    const reURL = /url\((['"])?(.*?)\1\)/gi;
    ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
      let style = getComputedStyle(elem);
      if (!style)
        return;
      let matches = reURL.exec(style.backgroundImage);
      while (matches !== null) {
        let url = matches && matches[2];
        if (url) {
          this.addBackground(url, elem);
        }
        matches = reURL.exec(style.backgroundImage);
      }
    };
    ImagesLoaded.prototype.addImage = function(img) {
      let loadingImage = new LoadingImage(img);
      this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.addBackground = function(url, elem) {
      let background = new Background(url, elem);
      this.images.push(background);
    };
    ImagesLoaded.prototype.check = function() {
      this.progressedCount = 0;
      this.hasAnyBroken = false;
      if (!this.images.length) {
        this.complete();
        return;
      }
      let onProgress = (image, elem, message) => {
        setTimeout(() => {
          this.progress(image, elem, message);
        });
      };
      this.images.forEach(function(loadingImage) {
        loadingImage.once("progress", onProgress);
        loadingImage.check();
      });
    };
    ImagesLoaded.prototype.progress = function(image, elem, message) {
      this.progressedCount++;
      this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
      this.emitEvent("progress", [this, image, elem]);
      if (this.jqDeferred && this.jqDeferred.notify) {
        this.jqDeferred.notify(this, image);
      }
      if (this.progressedCount === this.images.length) {
        this.complete();
      }
      if (this.options.debug && console2) {
        console2.log(`progress: ${message}`, image, elem);
      }
    };
    ImagesLoaded.prototype.complete = function() {
      let eventName = this.hasAnyBroken ? "fail" : "done";
      this.isComplete = true;
      this.emitEvent(eventName, [this]);
      this.emitEvent("always", [this]);
      if (this.jqDeferred) {
        let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
        this.jqDeferred[jqMethod](this);
      }
    };
    function LoadingImage(img) {
      this.img = img;
    }
    LoadingImage.prototype = Object.create(EvEmitter.prototype);
    LoadingImage.prototype.check = function() {
      let isComplete = this.getIsImageComplete();
      if (isComplete) {
        this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
        return;
      }
      this.proxyImage = new Image;
      if (this.img.crossOrigin) {
        this.proxyImage.crossOrigin = this.img.crossOrigin;
      }
      this.proxyImage.addEventListener("load", this);
      this.proxyImage.addEventListener("error", this);
      this.img.addEventListener("load", this);
      this.img.addEventListener("error", this);
      this.proxyImage.src = this.img.currentSrc || this.img.src;
    };
    LoadingImage.prototype.getIsImageComplete = function() {
      return this.img.complete && this.img.naturalWidth;
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
      this.isLoaded = isLoaded;
      let { parentNode } = this.img;
      let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
      this.emitEvent("progress", [this, elem, message]);
    };
    LoadingImage.prototype.handleEvent = function(event) {
      let method = "on" + event.type;
      if (this[method]) {
        this[method](event);
      }
    };
    LoadingImage.prototype.onload = function() {
      this.confirm(true, "onload");
      this.unbindEvents();
    };
    LoadingImage.prototype.onerror = function() {
      this.confirm(false, "onerror");
      this.unbindEvents();
    };
    LoadingImage.prototype.unbindEvents = function() {
      this.proxyImage.removeEventListener("load", this);
      this.proxyImage.removeEventListener("error", this);
      this.img.removeEventListener("load", this);
      this.img.removeEventListener("error", this);
    };
    function Background(url, element) {
      this.url = url;
      this.element = element;
      this.img = new Image;
    }
    Background.prototype = Object.create(LoadingImage.prototype);
    Background.prototype.check = function() {
      this.img.addEventListener("load", this);
      this.img.addEventListener("error", this);
      this.img.src = this.url;
      let isComplete = this.getIsImageComplete();
      if (isComplete) {
        this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
        this.unbindEvents();
      }
    };
    Background.prototype.unbindEvents = function() {
      this.img.removeEventListener("load", this);
      this.img.removeEventListener("error", this);
    };
    Background.prototype.confirm = function(isLoaded, message) {
      this.isLoaded = isLoaded;
      this.emitEvent("progress", [this, this.element, message]);
    };
    ImagesLoaded.makeJQueryPlugin = function(jQuery) {
      jQuery = jQuery || window2.jQuery;
      if (!jQuery)
        return;
      $ = jQuery;
      $.fn.imagesLoaded = function(options, onAlways) {
        let instance = new ImagesLoaded(this, options, onAlways);
        return instance.jqDeferred.promise($(this));
      };
    };
    ImagesLoaded.makeJQueryPlugin();
    return ImagesLoaded;
  });
});

// js/index.js
var import_text_balancer = __toESM(require_text_balancer(), 1);
var import_imagesloaded = __toESM(require_imagesloaded(), 1);

// js/modules/header.js
function header(el) {
  function init() {
    console.log(el);
  }
  return { init };
}

// js/modules/search.js
function search(el) {
  const button = el.querySelector("button");
  const search2 = el.querySelector('[type="search"]');
  const submit = el.querySelector('[type="submit"]');
  const container = el.querySelector("button + div");
  let open = false;
  function toggle() {
    if (open) {
      container.style.height = 0;
      search2.style.opacity = 0;
      search2.value = "";
      submit.setAttribute("disabled", "disabled");
      submit.style.opacity = 0;
      setTimeout(() => {
        search2.value = "";
      }, 450);
    } else {
      container.style.height = "162px";
      setTimeout(() => {
        submit.style.opacity = 0.5;
        search2.style.opacity = 1;
        search2.focus();
      }, 150);
    }
    open = !open;
  }
  function change() {
    if (search2.value) {
      submit.style.opacity = 1;
      submit.removeAttribute("disabled");
    } else {
      submit.style.opacity = 0.5;
      submit.setAttribute("disabled", "disabled");
    }
  }
  function init() {
    button.addEventListener("click", toggle);
    search2.addEventListener("keyup", change);
    submit.addEventListener("click", toggle);
  }
  return { init };
}

// js/index.js
var setupModules = (className, include) => {
  return [...document.getElementsByClassName(className)].map((el) => {
    const module = include(el);
    module.init();
    return module;
  });
};
var initSite = () => {
  setupModules("header", header);
  setupModules("search", search);
  import_imagesloaded.default([...document.querySelectorAll("img")], function() {
    import_text_balancer.default.balanceText();
    document.querySelector("body").style.opacity = 1;
  });
};
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", initSite);
else
  window.attachEvent("onload", initSite);
