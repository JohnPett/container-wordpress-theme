import textBalancer from 'text-balancer'
import imagesLoaded from 'imagesloaded'

import { header } from './modules/header.js'
import { search } from './modules/search.js'

const setupModules = (className, include) => {
  return [...document.getElementsByClassName(className)].map((el) => {
    const module = include(el)
    module.init()
    return module
  })
}

const initSite = () => {
  setupModules('header', header)
  setupModules('search', search)
  imagesLoaded(document, function () {
    textBalancer.balanceText()
    document.querySelector('body').style.opacity = 1
  })
}

if (document.addEventListener) document.addEventListener('DOMContentLoaded', initSite)
else window.attachEvent('onload', initSite)
