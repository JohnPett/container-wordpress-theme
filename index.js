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
};
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", initSite);
else
  window.attachEvent("onload", initSite);
