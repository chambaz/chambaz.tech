// Draft content from Adam's brief. Confirm all wording, contributions, assets, and URLs before launch.
export const profile = {
  intro:
    'I’m Adam, an engineer working at the intersection of developer experience, AI agents, and decentralized applications.',
  role: 'Leading developer experience for Groundhog at the Stellar Development Foundation.',
  about:
    'I work on the tools and experiences that help people build on next-generation blockchains.',
  background:
    'My background spans hands-on engineering and technology leadership, from digital products to decentralized infrastructure. Today, my focus is developer and agentic experience.',
  previous: ['Digital Surgeons', 'Metaplex', 'Lasso Labs', 'Marginfi'],
  socials: [
    { label: 'X / Twitter', url: '' },
    { label: 'LinkedIn', url: '' },
  ],
}
interface Project {
  title: string
  category: string
  description: string
  contribution: string
  status: string
  visual: 'tooling' | 'life' | null
  url: string
}
export const projects: Project[] = [
  {
    title: 'Groundhog',
    category: 'Developer tooling',
    description:
      'Developer tooling for a next-generation blockchain. A closer look at the work is coming together.',
    contribution:
      'My role: developer experience. Specific contributions to be confirmed.',
    status: 'Candidate project · assets and links pending',
    visual: 'tooling',
    url: '',
  },
  {
    title: 'Game of Life, onchain',
    category: 'An onchain experiment',
    description:
      'An onchain Game of Life demo. Simple rules, shared state, and patterns that emerge.',
    contribution: 'My contribution: to be confirmed.',
    status: 'Candidate project · assets and links pending',
    visual: 'life',
    url: '',
  },
  {
    title: 'From the archive',
    category: 'Earlier work',
    description:
      'A place for selected earlier work across engineering and technology leadership.',
    contribution: 'Project selection and contribution details pending.',
    status: 'Selection in progress',
    visual: null,
    url: '',
  },
]
