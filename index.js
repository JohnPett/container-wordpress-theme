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
    } else {
      container.style.height = "162px";
      search2.style.opacity = 1;
      search2.focus();
    }
    open = !open;
  }
  function change() {
    console.log(search2.value);
    if (search2.value)
      submit.removeAttribute("disabled");
    else
      submit.setAttribute("disabled", "disabled");
  }
  function init() {
    button.addEventListener("click", toggle);
    search2.addEventListener("keyup", change);
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
};
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", initSite);
else
  window.attachEvent("onload", initSite);
