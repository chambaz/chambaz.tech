import { useEffect, useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  Bars2Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { projects, profile } from './content'

const currentYear = new Date().getFullYear()

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#connect' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem('portfolio-theme-v1')
      } catch {
        /* System preference works without storage. */
      }
      const next = saved === 'dark' || (saved !== 'light' && query.matches)
      document.documentElement.classList.toggle('dark', next)
      setDark(next)
    }
    query.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    return () => {
      query.removeEventListener('change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('portfolio-theme-v1', next ? 'dark' : 'light')
    } catch {
      /* The toggle still works for this visit. */
    }
  }
  return (
    <button
      onClick={toggle}
      className="grid size-12 place-items-center rounded-full hover:bg-ink/5"
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
    >
      {dark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="relative z-10">
      <div className="page-width flex min-h-28 items-center justify-between gap-6 border-b border-ink/15">
        <a
          href="/"
          aria-label="Homepage"
          className="font-medium tracking-tight"
        >
          Adam Chambers<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-8">
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-8 text-base max-lg:hidden sm:text-sm"
          >
            {navigation.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="grid size-12 place-items-center lg:hidden"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <XMarkIcon className="size-6" />
              ) : (
                <Bars2Icon className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
        className="page-width border-b border-ink/15 bg-paper py-4 lg:hidden"
      >
        {navigation.map((item) => (
          <div key={item.href}>
            <a
              className="flex min-h-12 items-center nav-link"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>
    </header>
  )
}

function ProjectVisual({ kind }: { kind: 'tooling' | 'life' }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[8/5] min-h-72 items-center justify-center overflow-hidden bg-surface pb-12"
    >
      {kind === 'tooling' ? (
        <div className="flex items-center gap-3 sm:gap-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="tooling-line h-32 w-5 border border-ink/30 sm:h-44 sm:w-8"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-9 gap-1.5">
          {Array.from({ length: 63 }, (_, i) => (
            <div
              key={i}
              className={`size-4 sm:size-5 ${[12, 22, 29, 30, 31, 39, 40, 48].includes(i) ? 'bg-accent' : 'bg-ink/7'}`}
            />
          ))}
        </div>
      )}
      <p className="absolute right-5 bottom-4 left-5 font-mono text-xs tracking-wide text-muted">
        VISUAL STUDY / NOT A PRODUCT SCREENSHOT
      </p>
    </div>
  )
}

function App() {
  return (
    <div className="isolate">
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-24 bg-ink px-4 py-3 text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section
          aria-labelledby="intro-title"
          className="pt-18 pb-12 sm:pt-24 lg:pt-30 lg:pb-16"
        >
          <div className="page-width">
            <p className="flex items-center gap-3 eyebrow">
              <span className="size-2 rounded-full bg-accent" />
              Developer & agentic experience
            </p>
            <h1
              id="intro-title"
              className="mt-8 max-w-[20ch] font-display text-6xl tracking-tight text-balance sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              Building what
              <br />
              comes <em className="font-normal">next.</em>
            </h1>
            <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2">
              <div className="flex flex-col items-start gap-8">
                <p className="max-w-[40ch] text-xl/8 text-pretty text-muted sm:text-lg/8">
                  {profile.intro}
                </p>
                <a
                  className="inline-flex min-h-12 items-center gap-5 border-b border-ink/60 py-2 hover:border-accent hover:text-accent"
                  href="#work"
                >
                  Explore my work <ArrowDownIcon className="size-6 shrink-0" />
                </a>
              </div>
              <div className="flex flex-col justify-end gap-4 border-l border-ink/15 pl-6 lg:justify-center lg:pl-10">
                <p className="eyebrow">Currently</p>
                <p className="max-w-[40ch] text-base/7 text-pretty">
                  {profile.role}
                </p>
                <p className="text-base text-muted sm:text-sm">
                  Draft role wording · to be confirmed
                </p>
              </div>
            </div>
            <div className="mt-18 flex flex-wrap justify-between gap-3 border-t border-ink/15 pt-5 text-base text-muted sm:mt-24 sm:text-sm">
              <p>Independent thinking. Distributed systems.</p>
              <p className="font-mono text-xs tracking-wide">
                PORTFOLIO / 2026
              </p>
            </div>
          </div>
        </section>
        <section
          id="work"
          aria-labelledby="work-title"
          className="py-14 sm:py-22"
        >
          <div className="page-width">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">01 / Selected work</p>
                <h2
                  id="work-title"
                  className="mt-4 font-display text-4xl tracking-tight text-balance sm:text-5xl"
                >
                  Ideas into practice.
                </h2>
              </div>
              <p className="max-w-[36ch] text-base/6 text-pretty text-muted sm:text-sm/6">
                A working selection. Project details and links are being put
                together.
              </p>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className={!project.visual ? 'md:col-span-2' : ''}
                >
                  {project.visual ? (
                    <ProjectVisual kind={project.visual} />
                  ) : null}
                  <div
                    className={`flex flex-col gap-4 ${!project.visual ? 'border-y border-ink/15 py-8 md:flex-row md:items-start md:justify-between md:gap-10' : 'pt-6'}`}
                  >
                    <div className="flex flex-col gap-3">
                      <p className="eyebrow">{project.category}</p>
                      <h3 className="text-2xl font-medium tracking-tight text-balance">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="max-w-[48ch] text-base/7 text-pretty text-muted">
                        {project.description}
                      </p>
                      <p className="text-base/6 text-muted sm:text-sm/6">
                        {project.contribution}
                      </p>
                      {project.url ? (
                        <div>
                          <a
                            href={project.url}
                            className="inline-flex min-h-12 items-center gap-2 underline decoration-ink/30 underline-offset-4 hover:text-accent"
                          >
                            View project{' '}
                            <ArrowUpRightIcon className="size-6 shrink-0" />
                          </a>
                        </div>
                      ) : (
                        <p className="text-base/6 text-muted sm:text-sm/6">
                          {project.status}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="about"
          aria-labelledby="about-title"
          className="py-14 sm:py-22"
        >
          <div className="page-width grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">02 / A little background</p>
              <h2
                id="about-title"
                className="mt-5 max-w-[15ch] font-display text-4xl tracking-tight text-balance sm:text-5xl"
              >
                An engineer.
                <br />A wider perspective.
              </h2>
            </div>
            <div className="flex flex-col gap-7">
              <p className="max-w-[48ch] text-lg/8 text-pretty">
                {profile.about}
              </p>
              <p className="max-w-[48ch] text-base/7 text-pretty text-muted">
                {profile.background}
              </p>
              <div className="border-t border-ink/15 pt-6">
                <p className="eyebrow">Previously</p>
                <ul
                  role="list"
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-base text-muted sm:text-sm"
                >
                  {profile.previous.map((company) => (
                    <li key={company}>{company}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          id="connect"
          aria-labelledby="connect-title"
          className="pt-16 pb-12 sm:pt-24"
        >
          <div className="page-width border-t border-ink/15 pt-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="eyebrow">03 / Connect</p>
                <h2
                  id="connect-title"
                  className="mt-5 font-display text-4xl tracking-tight text-balance sm:text-5xl"
                >
                  Keep in touch.
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6">
                <p className="max-w-[40ch] text-base/7 text-pretty text-muted">
                  Find me where the conversation continues.
                </p>
                <ul role="list" className="flex flex-wrap gap-8">
                  {profile.socials.map((social) => (
                    <li key={social.label}>
                      {social.url ? (
                        <a
                          className="inline-flex min-h-12 items-center gap-3 hover:text-accent"
                          href={social.url}
                        >
                          {social.label}
                          <ArrowUpRightIcon className="size-6 shrink-0" />
                        </a>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p>{social.label}</p>
                          <p className="text-base text-muted sm:text-sm">
                            Profile URL pending
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-ink/15 pt-6 text-base text-muted sm:text-sm">
              <p>© {currentYear} Adam Chambers</p>
              <p>Made with intention.</p>
              <a className="nav-link" href="#">
                Back to top ↑
              </a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}
export default App
