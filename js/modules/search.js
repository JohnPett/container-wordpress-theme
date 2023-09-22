export function search (el) {
  const button = el.querySelector('button')
  const search = el.querySelector('[type="search"]')
  const submit = el.querySelector('[type="submit"]')
  const container = el.querySelector('button + div')

  let open = false

  function toggle () {
    if (open) {
      container.style.height = 0
      search.style.opacity = 0
      search.value = ''
      submit.setAttribute('disabled', 'disabled')
      submit.style.opacity = 0
      setTimeout(() => {
        search.value = ''
      }, 450)
    } else {
      container.style.height = '162px'
      setTimeout(() => {
        submit.style.opacity = 0.5
        search.style.opacity = 1
        search.focus()
      }, 150)
    }
    open = !open
  }

  function change () {
    if (search.value) {
      submit.style.opacity = 1
      submit.removeAttribute('disabled')
    } else {
      submit.style.opacity = 0.5
      submit.setAttribute('disabled', 'disabled')
    }
  }

  function init () {
    button.addEventListener('click', toggle)
    search.addEventListener('keyup', change)
    submit.addEventListener('click', toggle)
  }

  return { init }
}
