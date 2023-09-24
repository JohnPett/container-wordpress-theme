export function video (el) {
  function init () {
    const video = el.querySelector('video')

    function onCanPlay () {
      const videoHeight = video.getBoundingClientRect().height
      const videoDuration = video.duration * 1000
      const videoFrame = videoHeight / videoDuration
      const videoPlayback = 0.025

      function onScroll () {
        video.currentTime = videoFrame * window.scrollY * videoPlayback
      }

      window.addEventListener('scroll', onScroll)
    }

    video.addEventListener('canplay', onCanPlay)
  }

  return { init }
}
