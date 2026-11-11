import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:15174',
    launchOptions: { args: ['--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command:
      'zola serve --interface 127.0.0.1 --port 15174 --drafts --output-dir .preview-test --force',
    url: 'http://127.0.0.1:15174',
    reuseExistingServer: false,
  },
})
