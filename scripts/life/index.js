import { seed, step, sameBoard } from './engine.js'

const figure = document.querySelector('#life')
const host = figure.querySelector('[data-life-stage]')
const fallback = figure.querySelector('.life-fallback')
const resetButton = figure.querySelector('[data-life-reset]')
const generationLabel = figure.querySelector('[data-life-generation]')
const status = figure.querySelector('[data-life-status]')
const caption = figure.querySelector('figcaption')
const randomButton = figure.querySelector('[data-life-random]')
const intro = figure.querySelector('[data-life-intro]')
const help = figure.querySelector('[data-life-help]')
const motion = matchMedia('(prefers-reduced-motion: reduce)')
const WIDTH = 40
const HEIGHT = 32
const STEP_SECONDS = 0.2
const REST_SECONDS = 3

let cells = new Uint8Array(WIDTH * HEIGHT)
const levels = Float32Array.from(cells)
let history = [cells.slice()]
let generation = 0
let accumulator = 0
let rest = 0
let editing = true
let drawingStarted = false
let visible = false
let lastTime = 0
let frame = 0
let scene
let loading = false
let failed = false
let startTimer = 0

function updateLabels() {
  const count = cells.reduce((total, cell) => total + cell, 0)
  generationLabel.textContent = editing
    ? `${count} ${count === 1 ? 'cell' : 'cells'} drawn`
    : `Generation ${String(generation).padStart(3, '0')}`
  caption.classList.toggle('invisible', editing)
  resetButton.hidden = editing
  intro.hidden = !editing || drawingStarted
  help.firstElementChild.textContent = editing
    ? 'Drag to draw. Release to start the world.'
    : 'Drag to rotate. With the grid focused, arrow keys rotate the view; Home resets it.'
  help.lastElementChild.textContent = editing
    ? ' Keyboard: arrow keys select a cell; Enter or Space toggles it. Playback starts after a short pause in drawing.'
    : ''
  status.textContent = editing
    ? 'Draw to seed · B3/S23'
    : rest
      ? 'Settled · a new world soon'
      : 'Live · a world of your own'
}

function paint(index, value = 1 - cells[index]) {
  if (!editing) return cells[index]
  drawingStarted = true
  cells[index] = value
  if (motion.matches) levels[index] = value
  updateLabels()
  if (motion.matches) scene.render(levels)
  else if (!frame && visible && !document.hidden) {
    lastTime = 0
    frame = requestAnimationFrame(animate)
  }
  return value
}

function resetDrawing() {
  clearTimeout(startTimer)
  editing = true
  drawingStarted = false
  cells.fill(0)
  levels.fill(0)
  generation = 0
  accumulator = 0
  rest = 0
  history = [cells.slice()]
  scene.resetView()
  scene.setEditing(true)
  updateLabels()
  syncPlayback()
  host.focus({ preventScroll: true })
}

function startWorld() {
  clearTimeout(startTimer)
  if (!editing || failed) return
  editing = false
  history = [cells.slice()]
  scene.setEditing(false)
  updateLabels()
  syncPlayback()
}

function drawingAction(action) {
  clearTimeout(startTimer)
  if (!editing || failed || !cells.some(Boolean)) return
  if (action === 'end') startWorld()
  else if (action === 'keyboard') startTimer = setTimeout(startWorld, 700)
}

function newWorld() {
  cells = seed(WIDTH, HEIGHT)
  history = [cells.slice()]
  generation = 0
  accumulator = 0
  rest = 0
  if (editing || motion.matches) levels.set(cells)
  updateLabels()
}

function advance() {
  const next = step(cells, WIDTH, HEIGHT)
  if (history.some((previous) => sameBoard(previous, next))) rest = REST_SECONDS
  cells = next
  history.push(next.slice())
  if (history.length > 16) history.shift()
  generation++
  updateLabels()
}

function animate(time) {
  frame = 0
  const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0
  lastTime = time
  if (!editing && rest > 0) {
    rest -= delta
    if (rest <= 0) newWorld()
  } else if (!editing) {
    accumulator += delta
    if (accumulator >= STEP_SECONDS) {
      accumulator -= STEP_SECONDS
      advance()
    }
  }
  const blend = motion.matches
    ? 1
    : 1 - Math.exp(-(delta || 1 / 60) * (editing ? 22 : 14))
  let settling = false
  for (let i = 0; i < levels.length; i++) {
    levels[i] += (cells[i] - levels[i]) * blend
    if (Math.abs(cells[i] - levels[i]) < 0.005) levels[i] = cells[i]
    else settling = true
  }
  const rotating = !motion.matches
  if (rotating) scene.rotate(delta)
  scene.render(levels)
  if (!editing || settling || rotating) frame = requestAnimationFrame(animate)
}

function syncPlayback() {
  cancelAnimationFrame(frame)
  frame = 0
  lastTime = 0
  if (!scene || failed || !visible || document.hidden) return
  if (!editing || !motion.matches) frame = requestAnimationFrame(animate)
  else scene.render(levels)
}

function fail() {
  failed = true
  clearTimeout(startTimer)
  cancelAnimationFrame(frame)
  fallback.hidden = false
  resetButton.hidden = true
  caption.classList.remove('invisible')
  intro.hidden = true
  host.removeAttribute('tabindex')
  figure.querySelector('[data-life-help]').hidden = true
  generationLabel.textContent = 'A study in emergence'
  status.textContent = 'Static preview · 3D unavailable'
  scene?.dispose()
  figure.dataset.reveal = 'ready'
  // Construction may fail before a scene handle is returned.
  host.querySelector('canvas')?.remove()
}

async function load() {
  if (loading || scene || failed) return
  loading = true
  try {
    const { createScene } = await import('./scene.js')
    scene = createScene(host, WIDTH, HEIGHT, fail, paint, drawingAction)
    scene.setEditing(true)
    scene.render(levels)
    fallback.hidden = true
    resetButton.hidden = false
    host.tabIndex = 0
    figure.querySelector('[data-life-help]').hidden = false
    updateLabels()
    figure.dataset.reveal = 'ready'
    syncPlayback()
  } catch {
    fail()
  }
}

const visibility = new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting
  if (visible) void load()
  syncPlayback()
})
visibility.observe(figure)

const size = new ResizeObserver(() => {
  if (!scene || failed) return
  scene.resize()
  if (visible) scene.render(levels)
})
size.observe(host)

const theme = new MutationObserver(() => {
  if (!scene || failed) return
  scene.theme()
  if (visible) scene.render(levels)
})
theme.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
})

resetButton.addEventListener('click', resetDrawing)
randomButton.addEventListener('click', () => {
  drawingStarted = true
  newWorld()
  scene.render(levels)
  startWorld()
  host.focus({ preventScroll: true })
})
motion.addEventListener('change', () => {
  if (motion.matches) levels.set(cells)
  updateLabels()
  syncPlayback()
})
document.addEventListener('visibilitychange', syncPlayback)
window.addEventListener('pagehide', () => {
  cancelAnimationFrame(frame)
  lastTime = 0
})
window.addEventListener('pageshow', syncPlayback)
