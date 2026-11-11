import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {
  cpSync,
  mkdirSync,
  readFileSync,
  existsSync,
  writeFileSync,
} from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

test('production excludes drafts and includes a usable writing index and feed', () => {
  expect(existsSync('public/writing/first-essay/index.html')).toBe(false)
  for (const file of [
    'public/writing/index.html',
    'public/writing/atom.xml',
    'public/sitemap.xml',
  ]) {
    expect(readFileSync(file, 'utf8')).not.toContain('Your first essay')
    expect(readFileSync(file, 'utf8')).not.toContain('/first-essay/')
  }
  expect(readFileSync('public/index.html', 'utf8')).toContain(
    'Experience Engineering',
  )
  expect(readFileSync('public/index.html', 'utf8')).not.toContain('/src/')
  expect(readFileSync('public/index.html', 'utf8')).not.toContain(
    '/first-essay/',
  )
})

test('publishing generates articles, pagination, feed entries, and sitemap links', () => {
  const root = test.info().outputPath('site')
  mkdirSync(root, { recursive: true })
  for (const entry of [
    'config.toml',
    'templates',
    'content',
    'data',
    'static',
  ]) {
    cpSync(entry, path.join(root, entry), { recursive: true })
  }
  for (let i = 1; i <= 11; i++) {
    writeFileSync(
      path.join(root, `content/writing/published-${i}.md`),
      `+++\ntitle = "Published essay ${i}"\ndescription = "Publishing check."\ndate = 2026-10-${String(i).padStart(2, '0')}\n+++\n\nAn essay with **rendered Markdown**.\n`,
    )
  }
  const configPath = path.join(root, 'config.toml')
  writeFileSync(
    configPath,
    readFileSync(configPath, 'utf8').replace(
      'writing_coming_soon = true',
      'writing_coming_soon = false',
    ),
  )
  execFileSync('zola', ['--root', root, 'build'], { stdio: 'pipe' })
  const output = path.join(root, 'public')
  const homepage = readFileSync(path.join(output, 'index.html'), 'utf8')
  expect(
    [...homepage.matchAll(/href="[^"]*\/writing\/published-(\d+)\/"/g)].map(
      (match) => Number(match[1]),
    ),
  ).toEqual([11, 10, 9])
  expect(existsSync(path.join(output, 'writing/page/2/index.html'))).toBe(true)
  expect(
    readFileSync(path.join(output, 'writing/published-11/index.html'), 'utf8'),
  ).toContain('<strong>rendered Markdown</strong>')
  const feed = readFileSync(path.join(output, 'writing/atom.xml'), 'utf8')
  expect(feed.match(/<entry\b/g)).toHaveLength(11)
  expect(feed).not.toContain('first-essay')
  expect(readFileSync(path.join(output, 'sitemap.xml'), 'utf8')).toContain(
    '/writing/published-11/',
  )
})

test('Markdown preview works without JavaScript, including mobile navigation', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:15174/writing/first-essay/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Your first essay',
  )
  await expect(page.locator('pre code')).toContainText('println!')
  await expect(page.getByRole('table')).toBeVisible()
  await page.locator('summary').click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click()
  await expect(page).toHaveURL(/\/#work$/)
  await expect(
    page.getByRole('heading', { name: 'Recent work.', exact: true }),
  ).toBeVisible()
  await expect(page.locator('#writing')).toContainText('coming soon...')
  await expect(
    page.getByRole('link', { name: 'View all articles' }),
  ).toHaveCount(0)
  await context.close()
})

test('theme persists between pages and mobile menu supports keyboard dismissal', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await page.goto('/writing/first-essay/')
  await expect(page.locator('html')).toHaveClass('dark')
  await expect(page.locator('#syntax-dark')).toHaveAttribute('media', 'all')
  await page.locator('summary').click()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-nav')).not.toHaveAttribute('open')
  await expect(page.locator('summary')).toBeFocused()
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto')
})

for (const width of [375, 1440]) {
  test(`writing coming soon has an accessible non-link tooltip at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    if (width < 1024) await page.locator('summary').click()
    const nav = page.getByRole('navigation', {
      name: width < 1024 ? 'Mobile navigation' : 'Main navigation',
      exact: true,
    })
    const trigger = nav.getByRole('button', { name: 'Writing', exact: true })
    const tooltip = nav.getByRole('tooltip')
    await expect(trigger).toHaveAttribute('aria-disabled', 'true')
    await expect(trigger).not.toHaveAttribute('href')
    await expect(trigger).toHaveCSS('cursor', 'not-allowed')
    await trigger.hover()
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toHaveText('Coming soon')
    await trigger.focus()
    await page.keyboard.press('Escape')
    await expect(tooltip).toBeHidden()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('#writing')).toContainText('coming soon...')
    await expect(page.locator('#writing article')).toHaveCount(0)
    await expect(
      page.getByRole('link', { name: 'View all articles' }),
    ).toHaveCount(0)
  })
}

for (const viewport of [
  { width: 2560, height: 1440 },
  { width: 3440, height: 1440 },
  { width: 5120, height: 1440 },
]) {
  test(`the board stays bounded and its caption aligns with content at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const board = await page.locator('[data-life-stage]').boundingBox()
    const caption = await page.locator('#life figcaption').boundingBox()
    const content = await page.locator('#work .page-width').boundingBox()
    expect(board.width).toBeLessThanOrEqual(1280)
    expect(board.height).toBeLessThanOrEqual(768)
    expect(Math.abs(caption.x - content.x)).toBeLessThan(1)
    expect(Math.abs(caption.width - content.width)).toBeLessThan(1)
  })
}

for (const width of [375, 768, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`layout and accessibility at ${width}px in ${colorScheme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ colorScheme })
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      for (const url of ['/', '/writing/', '/writing/first-essay/']) {
        await page.goto(url)
        await page.evaluate(() => document.fonts.ready)
        if (url === '/' && width >= 1024) {
          const layout = await page.evaluate(() => {
            const copy = document
              .querySelector('.hero-copy')
              .getBoundingClientRect()
            const hero = document
              .querySelector('.hero-section')
              .getBoundingClientRect()
            const container = document
              .querySelector('.hero-stage')
              .getBoundingClientRect()
            const board = document
              .querySelector('#life')
              .getBoundingClientRect()
            return {
              centerOffset: Math.abs(
                copy.top + copy.height / 2 - innerHeight / 2,
              ),
              bottomOffset: Math.abs(hero.bottom - innerHeight),
              extendsRight: board.right > container.right,
            }
          })
          expect(layout.centerOffset).toBeLessThan(2)
          expect(layout.bottomOffset).toBeLessThan(2)
          expect(layout.extendsRight).toBe(true)
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true)
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
        expect(result.violations).toEqual([])
      }
      expect(errors).toEqual([])
    })
  }
}
