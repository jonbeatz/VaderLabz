'use client'

import { ThreeBackground } from '@/components/ThreeBackground'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      {/* 3D Background — VaderLabz Red */}
      <ThreeBackground accent="#ff2a36" secondary="#ff0033" bgColor="#0a0a0b" />

      {/* Foreground Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <span className={styles.logo}>VADERLABZ</span>
            <div className={styles.navLinks}>
              <a href="#projects">PROJECTS</a>
              <a href="#lab">LAB</a>
              <a href="#stack">STACK</a>
              <a href="#contact">CONTACT</a>
            </div>
          </nav>
        </header>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTag}>// VADER_PROTOCOL :: INITIALIZED</span>
            <span className={styles.heroName}>VADERLABZ</span>
            <span className={styles.heroSub}>Dev Lab &amp; AI Playground</span>
          </h1>
          <p className={styles.heroDesc}>
            Building, breaking, and learning. Full-stack AI experiments,
            personal projects, and new ideas forged in the dark.
          </p>
          <div className={styles.heroActions}>
            <a href="#projects" className={styles.btnPrimary}>VIEW PROJECTS</a>
            <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>GITHUB ↗</a>
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionNumber}>01</h2>
          <h3 className={styles.sectionTitle}>PROJECTS</h3>
          <div className={styles.projectGrid}>
            {[
              { name: 'Boilerplate-v2', status: 'ACTIVE', desc: 'Cursor-native full-stack boilerplate with a 52-point self-grader, isolated sandboxes, Vader Protocol UI shield, Biome linting, and MCP-ready agent workflows.', tags: ['Next.js', 'Payload CMS', 'WordPress', 'Biome', 'MCP'] },
              { name: 'Node-Launcher', status: 'ACTIVE', desc: 'Vader Project Engine — Station Prime. Full-stack Electron launcher with renderer sandboxing, SQLite, and forge workflow automation.', tags: ['Electron', 'Node.js', 'SQLite', 'Next.js'] },
              { name: 'MSC-Projectz', status: 'BUILDING', desc: 'Projects management app and personal dashboard for tracking builds, experiments, and dev progress across the VaderLabz ecosystem.', tags: ['Node.js', 'React', 'TypeScript'] },
            ].map((p) => (
              <article key={p.name} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4 className={styles.projectName}>{p.name}</h4>
                  <span className={`${styles.projectStatus} ${styles[p.status === 'ACTIVE' ? 'statusActive' : 'statusBuilding']}`}>{p.status}</span>
                </div>
                <p className={styles.projectDesc}>{p.desc}</p>
                <div className={styles.projectTags}>
                  {p.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
                <a href={`https://github.com/jonbeatz/${p.name}`} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>VIEW ON GITHUB ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="lab" className={styles.section}>
          <h2 className={styles.sectionNumber}>02</h2>
          <h3 className={styles.sectionTitle}>LAB / EXPERIMENTS</h3>
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

        <section id="stack" className={styles.section}>
          <h2 className={styles.sectionNumber}>03</h2>
          <h3 className={styles.sectionTitle}>TECH STACK</h3>
          <div className={styles.stackGrid}>
            {['Next.js', 'Node.js', 'React', 'TypeScript', 'Payload CMS', 'WordPress', 'SQLite', 'Electron', 'Biome', 'MCP Workflows', 'AI/LLM', 'Cursor', 'Vitest', 'Playwright', 'Docker', 'GitHub Actions'].map((s) => (
              <span key={s} className={styles.stackItem}>// {s}</span>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionNumber}>04</h2>
          <h3 className={styles.sectionTitle}>CONNECT</h3>
          <p className={styles.contactDesc}>Building in public. Always learning. Always shipping.</p>
          <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>GITHUB ↗</a>
        </section>

        <footer className={styles.footer}>
          <span>VADERLABZ // VADER_PROTOCOL v1.0 — 2026</span>
        </footer>
      </main>
    </>
  )
}
