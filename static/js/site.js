const toggle = document.querySelector('[data-theme-toggle]')
const preference = matchMedia('(prefers-color-scheme: dark)')

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
  toggle.setAttribute(
    'aria-label',
    `Switch to ${dark ? 'light' : 'dark'} theme`,
  )
  document.querySelector('#syntax-light').media = dark ? 'not all' : 'all'
  document.querySelector('#syntax-dark').media = dark ? 'all' : 'not all'
}

function syncTheme() {
  let saved
  try {
    saved = localStorage.getItem('portfolio-theme-v1')
  } catch {
    // Fall back to the system preference.
  }
  applyTheme(saved === 'dark' || (saved !== 'light' && preference.matches))
}

toggle.hidden = false
syncTheme()
toggle.addEventListener('click', () => {
  const dark = !document.documentElement.classList.contains('dark')
  applyTheme(dark)
  try {
    localStorage.setItem('portfolio-theme-v1', dark ? 'dark' : 'light')
  } catch {
    // The selected theme still applies for this page visit.
  }
})
preference.addEventListener('change', syncTheme)
window.addEventListener('storage', syncTheme)

document.querySelectorAll('[data-tooltip]').forEach((tooltip) => {
  const show = () => tooltip.removeAttribute('data-dismissed')
  tooltip.addEventListener('pointerenter', show)
  tooltip.addEventListener('focusin', show)
  tooltip.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      tooltip.setAttribute('data-dismissed', '')
      event.stopPropagation()
    }
  })
})

const menu = document.querySelector('#mobile-nav')
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) menu.open = false
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false
    menu.querySelector('summary').focus()
  }
})
