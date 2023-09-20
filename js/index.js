import { header } from './modules/header.js'

const setupModules = (className, include) => {
  return [...document.getElementsByClassName(className)].map((el) => {
    const module = include(el)
    module.init()
    return module
  })
}

const initSite = () => {
  setupModules('header', header)
}

if (document.addEventListener) document.addEventListener('DOMContentLoaded', initSite)
else window.attachEvent('onload', initSite)
