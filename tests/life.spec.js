import { test, expect } from '@playwright/test'
import { step } from '../scripts/life/engine.js'

function board(points, width = 8, height = 8) {
  const cells = new Uint8Array(width * height)
  for (const [x, y] of points) cells[y * width + x] = 1
  return cells
}

test('Life preserves a block and oscillates a blinker', () => {
  const block = board([
    [2, 2],
    [3, 2],
    [2, 3],
    [3, 3],
  ])
  expect(step(block, 8, 8)).toEqual(block)
  const blinker = board([
    [2, 3],
    [3, 3],
    [4, 3],
  ])
  const vertical = step(blinker, 8, 8)
  expect(vertical).toEqual(
    board([
      [3, 2],
      [3, 3],
      [3, 4],
    ]),
  )
  expect(step(vertical, 8, 8)).toEqual(blinker)
})

test('a glider moves one cell diagonally after four generations', () => {
  let cells = board([
    [2, 1],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ])
  for (let i = 0; i < 4; i++) cells = step(cells, 8, 8)
  expect(cells).toEqual(
    board([
      [3, 2],
      [4, 3],
      [2, 4],
      [3, 4],
      [4, 4],
    ]),
  )
})

test('neighbors wrap across the edges of the fixed board', () => {
  const cells = board([
    [7, 3],
    [0, 3],
    [1, 3],
  ])
  expect(step(cells, 8, 8)).toEqual(
    board([
      [0, 2],
      [0, 3],
      [0, 4],
    ]),
  )
})

test('the live board advances, resets, and stops offscreen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const generation = page.locator('[data-life-generation]')
  await page.getByRole('button', { name: 'Random seed', exact: true }).click()
  await expect(
    page.locator('[data-life-pause], [data-life-view], [data-life-controls]'),
  ).toHaveCount(0)
  await expect(generation).not.toHaveText('Generation 000')
  await page
    .getByRole('button', { name: 'Start a new Game of Life world' })
    .press('Enter')
  await expect(generation).toHaveText('0 cells drawn')
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  await page.getByRole('button', { name: 'Random seed', exact: true }).click()
  await expect(generation).not.toHaveText('Generation 000')
  await page
    .locator('footer')
    .evaluate((element) => element.scrollIntoView({ behavior: 'instant' }))
  await expect(page.locator('#life')).not.toBeInViewport()
  await page.waitForTimeout(100)
  const offscreen = await generation.textContent()
  await page.waitForTimeout(750)
  await expect(generation).toHaveText(offscreen)
  await page.locator('#life').scrollIntoViewIfNeeded()
  await expect(generation).not.toHaveText(offscreen)
})

test('reduced motion starts still and responds to explicit playback', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  await page.waitForTimeout(750)
  await expect(page.locator('#life figcaption')).toBeHidden()
  await page.locator('[data-life-stage]').focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('Space')
  await expect(page.locator('[data-life-generation]')).toHaveText(
    '2 cells drawn',
  )
  await expect(page.locator('#life figcaption')).toBeVisible()
  await expect(page.locator('[data-life-generation]')).not.toHaveText(
    'Generation 000',
  )
})

test('tabbing away after drawing a cell still starts playback', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.locator('[data-life-stage][tabindex="0"]').focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-life-generation]')).toContainText(
    'Generation',
  )
})

test('settled worlds pause briefly and reseed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => {
    Math.random = () => 0.9
  })
  await page.goto('/')
  await page
    .getByRole('button', { name: 'Random seed', exact: true })
    .press('Enter')
  await expect(page.locator('[data-life-status]')).toHaveText(
    'Settled · a new world soon',
  )
  await page.locator('[data-life-generation]').evaluate(
    (element) =>
      new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          if (element.textContent === 'Generation 000') {
            observer.disconnect()
            resolve()
          }
        })
        observer.observe(element, { childList: true })
      }),
  )
})

test('drawing stays paused during a stroke and starts on release', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  const label = page.locator('[data-life-generation]')
  await expect(label).toHaveText('0 cells drawn')
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  await expect(page.locator('#life figcaption')).toBeHidden()
  const rect = await page.locator('[data-life-stage] canvas').boundingBox()
  const x = rect.x + rect.width * 0.65
  const y = rect.y + rect.height * 0.5
  await page.mouse.move(x, y)
  await page.mouse.down()
  await expect(label).toHaveText('1 cell drawn')
  await expect(page.locator('[data-life-intro]')).toBeHidden()
  await page.mouse.move(x + 90, y, { steps: 8 })
  expect(parseInt(await label.textContent())).toBeGreaterThan(3)
  await page.waitForTimeout(500)
  await expect(label).toContainText('cells drawn')
  await page.mouse.up()
  await expect(label).toContainText('Generation')
  await expect(page.locator('#life figcaption')).toBeVisible()
})

test('the idle board rotates, holds still while drawing, and respects reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const canvas = page.locator('[data-life-stage] canvas')
  await expect(page.locator('[data-life-generation]')).toHaveText(
    '0 cells drawn',
  )
  await expect(page.locator('[data-life-stage]')).toHaveCSS('opacity', '1')
  const rect = await canvas.boundingBox()
  const snapshot = () => page.screenshot({ clip: rect })
  const initial = await snapshot()
  await page.waitForTimeout(600)
  expect((await snapshot()).equals(initial)).toBe(false)
  await page.mouse.move(rect.x + rect.width * 0.65, rect.y + rect.height * 0.5)
  await page.mouse.down()
  await expect(page.locator('[data-life-generation]')).toHaveText(
    '1 cell drawn',
  )
  await page.waitForTimeout(600)
  const held = await snapshot()
  await page.waitForTimeout(400)
  expect((await snapshot()).equals(held)).toBe(true)
  await page.mouse.up()
  await expect(page.locator('[data-life-generation]')).toContainText(
    'Generation',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page
    .getByRole('button', { name: 'Start a new Game of Life world' })
    .click()
  const still = await snapshot()
  await page.waitForTimeout(600)
  expect((await snapshot()).equals(still)).toBe(true)
})

test('mouse reset leaves no keyboard cell selector on the empty board', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  const canvas = page.locator('[data-life-stage] canvas')
  const original = await canvas.screenshot()
  const rect = await canvas.boundingBox()
  await page.mouse.click(rect.x + rect.width * 0.65, rect.y + rect.height * 0.5)
  await page
    .getByRole('button', { name: 'Start a new Game of Life world' })
    .click()
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  expect((await canvas.screenshot()).equals(original)).toBe(true)
  await page.keyboard.press('ArrowRight')
  expect((await canvas.screenshot()).equals(original)).toBe(false)
})

test('WebGL failure leaves a static grid and useful page', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith('webgl')
        ? null
        : original.call(this, type, ...args)
    }
  })
  await page.goto('/')
  await page.locator('#life').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-life-status]')).toHaveText(
    'Static preview · 3D unavailable',
  )
  await expect(page.locator('.life-fallback')).toBeVisible()
  await expect(page.locator('[data-life-controls]')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('the grid rotates and resets but cannot pan or zoom', async ({ page }) => {
  // Software-rendered WebGL stays active during these image comparisons.
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Math.random = () => 0.9
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Random seed', exact: true }).click()
  await page.evaluate(() => document.fonts.ready)
  const canvas = page.locator('[data-life-stage] canvas')
  const rect = await canvas.boundingBox()
  const snapshot = () => page.screenshot({ clip: rect })
  const original = await snapshot()
  const x = rect.x + rect.width / 2
  const y = rect.y + rect.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 90, y + 45, { steps: 8 })
  await page.mouse.up()
  expect((await snapshot()).equals(original)).toBe(false)
  await page.locator('[data-life-stage]').focus()
  await page.keyboard.press('Home')
  expect((await snapshot()).equals(original)).toBe(true)
  await page.mouse.move(x, y)
  await page.keyboard.down('Shift')
  await page.mouse.down()
  await page.mouse.move(x + 60, y, { steps: 5 })
  await page.mouse.up()
  await page.keyboard.up('Shift')
  expect((await snapshot()).equals(original)).toBe(true)
  await page.locator('[data-life-stage]').focus()
  await page.keyboard.press('Home')
  await page.mouse.move(x, y)
  await page.mouse.wheel(0, -200)
  expect((await snapshot()).equals(original)).toBe(true)
  await page.locator('[data-life-stage]').focus()
  await page.keyboard.press('Home')
  expect((await snapshot()).equals(original)).toBe(true)
  await page.keyboard.press('ArrowRight')
  expect((await snapshot()).equals(original)).toBe(false)
})

test('a lost graphics context switches back to the static grid', async ({
  page,
}) => {
  await page.goto('/')
  await page.locator('#life').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-life-intro]')).toBeVisible()
  await page.locator('[data-life-stage] canvas').evaluate((canvas) => {
    canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()
  })
  await expect(page.locator('.life-fallback')).toBeVisible()
  await expect(page.locator('[data-life-controls]')).toHaveCount(0)
})
