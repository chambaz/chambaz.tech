// Run before CSS to apply the saved preference without a light-theme flash.
;(() => {
  let saved
  try {
    saved = localStorage.getItem('portfolio-theme-v1')
  } catch {
    // System preference is still available when storage is blocked.
  }
  document.documentElement.classList.toggle(
    'dark',
    saved === 'dark' ||
      (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches),
  )
})()
