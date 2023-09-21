export function search (el) {
  const search = el.querySelector('[type="search"]')

  function init () {
    search.focus()
  }

  return { init }
}
