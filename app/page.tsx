'use client'

import { useRef } from 'react'
import { ThreeBackground } from '@/components/ThreeBackground'
import { useHeroEntrance, useFadeUpPanels } from '@/lib/useGsapScroll'
import styles from './page.module.css'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

  // GSAP anims
  useHeroEntrance(heroRef)
  useFadeUpPanels('.section-panel')

  return (
    <>
      {/* 3D Background with bloom */}
      <ThreeBackground accent="#ff2a36" secondary="#ff0033" bgColor="#000000" bloom />

      {/* Foreground Content */}
      <main className={styles.main}>
        {/* ---- Nav ---- */}
        <header className={styles.header}>
          <nav className={styles.nav}>
            <span className={styles.logo}>VADERLABZ</span>
            <div className={styles.navLinks}>
              <a href="#projects">PROJECTS</a>
              <a href="#lab">LAB</a>
              <a href="#stack">STACK</a>
              <a href="#contact">CONNECT</a>
            </div>
          </nav>
        </header>

        {/* ---- Hero (GSAP entrance) ---- */}
        <section ref={heroRef} className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTag}>
              {'// VADER_PROTOCOL'.split('').map((ch, i) => (
                <span key={i} data-hero-letter className={styles.heroLetter}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
            <span className={styles.heroName}>
              {'VADERLABZ'.split('').map((ch, i) => (
                <span key={i} data-hero-letter className={styles.heroLetter}>
                  {ch}
                </span>
              ))}
            </span>
            <span data-hero-sub className={styles.heroSub}>
              Dev Lab &amp; AI Playground
            </span>
          </h1>
          <p data-hero-desc className={styles.heroDesc}>
            Building, breaking, and learning. Full-stack AI experiments,
            personal projects, and new ideas forged in the dark.
          </p>
          <div data-hero-actions className={styles.heroActions}>
            <a href="#projects" className={styles.btnPrimary}>
              VIEW PROJECTS
            </a>
            <a
              href="https://github.com/jonbeatz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              GITHUB ↗
            </a>
          </div>
        </section>

        {/* ---- Section 01: Projects ---- */}
        <section id="projects" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(01)</span> PROJECTS
          </h2>
          <div className={styles.projectGrid}>
            {[
              {
                name: 'Boilerplate-v2',
                status: 'ACTIVE',
                desc: 'Cursor-native full-stack boilerplate with a 52-point self-grader, isolated sandboxes, Vader Protocol UI shield, Biome linting, and MCP-ready agent workflows.',
                tags: ['Next.js', 'Payload CMS', 'WordPress', 'Biome', 'MCP'],
              },
              {
                name: 'Node-Launcher',
                status: 'ACTIVE',
                desc: 'Vader Project Engine — Station Prime. Full-stack Electron launcher with renderer sandboxing, SQLite, and forge workflow automation.',
                tags: ['Electron', 'Node.js', 'SQLite', 'Next.js'],
              },
              {
                name: 'MSC-Projectz',
                status: 'BUILDING',
                desc: 'Projects management app and personal dashboard for tracking builds, experiments, and dev progress across the VaderLabz ecosystem.',
                tags: ['Node.js', 'React', 'TypeScript'],
              },
            ].map((p) => (
              <article key={p.name} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4 className={styles.projectName}>{p.name}</h4>
                  <span
                    className={`${styles.projectStatus} ${
                      p.status === 'ACTIVE' ? styles.statusActive : styles.statusBuilding
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className={styles.projectDesc}>{p.desc}</p>
                <div className={styles.projectTags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://github.com/jonbeatz/${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  VIEW ON GITHUB ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Section 02: Lab / Experiments ---- */}
        <section id="lab" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(02)</span> LAB / EXPERIMENTS
          </h2>
          <div className={styles.experimentGrid}>
            {[
              { name: 'AI Agent Workflows', status: 'COMING SOON' },
              { name: 'MCP Integrations', status: 'COMING SOON' },
              { name: 'LLM Prompt Engineering', status: 'COMING SOON' },
              { name: 'Full-Stack AI Apps', status: 'COMING SOON' },
            ].map((e) => (
              <div key={e.name} className={styles.experimentCard}>
                <span className={styles.experimentIcon}>⬡</span>
                <span className={styles.experimentName}>{e.name}</span>
                <span className={styles.experimentStatus}>{e.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Section 03: Tech Stack ---- */}
        <section id="stack" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(03)</span> TECH STACK
          </h2>
          <div className={styles.stackGrid}>
            {[
              'Next.js', 'Node.js', 'React', 'TypeScript', 'Payload CMS',
              'WordPress', 'SQLite', 'Electron', 'Biome', 'MCP Workflows',
              'AI/LLM', 'Cursor', 'Vitest', 'Playwright', 'Docker',
              'GitHub Actions',
            ].map((s) => (
              <span key={s} className={styles.stackItem}>
                // {s}
              </span>
            ))}
          </div>
        </section>

        {/* ---- Section 04: Connect ---- */}
        <section id="contact" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(04)</span> CONNECT
          </h2>
          <p className={styles.contactDesc}>
            Building in public. Always learning. Always shipping.
          </p>
          <a
            href="https://github.com/jonbeatz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            GITHUB ↗
          </a>
        </section>

        <footer className={styles.footer}>
          <span>VADERLABZ // VADER_PROTOCOL v1.0 — 2026</span>
        </footer>
      </main>
    </>
  )
}
