'use client'

import { useRef } from 'react'
import { ThreeBackground } from '@/components/ThreeBackground'
import { ArtefactScene } from '@/components/ArtefactScene'
import { useHeroEntrance, useFadeUpPanels } from '@/lib/useGsapScroll'
import styles from './page.module.css'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroEntrance(heroRef)
  useFadeUpPanels('.section-panel')

  return (
    <>
      <ThreeBackground accent="#ff2a36" secondary="#ff0033" bgColor="#000000" />

      <main className={styles.main}>
        {/* ---- Nav ---- */}
        <header className={styles.header}>
          <nav className={styles.nav}>
            <img src="/media/VaderLabz-Logo.png" alt="VaderLabz" className={styles.logo} />
            <div className={styles.navLinks}>
              <button onClick={() => { const el = document.getElementById('story'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) } }} className={styles.linkBtn}>STORY</button>
              <button onClick={() => { const el = document.getElementById('philosophy'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) } }} className={styles.linkBtn}>PHILOSOPHY</button>
              <button onClick={() => { const el = document.getElementById('projects'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) } }} className={styles.linkBtn}>PROJECTS</button>
              <button onClick={() => { const el = document.getElementById('proof'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) } }} className={styles.linkBtn}>PROOF</button>
              <button onClick={() => { const el = document.querySelector('.section-panel:last-of-type'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) } }} className={styles.linkBtn}>CONNECT</button>
            </div>
          </nav>
        </header>

        {/* ---- HERO ---- */}
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
            <a href="#story" className={styles.btnPrimary}>ENTER THE LAB</a>
            <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>GITHUB ↗</a>
          </div>
        </section>

        {/* ---- SECTION (01/06): Origin Story — Two Builders ---- */}
        <section id="story" className={`${styles.section} ${styles.sectionWide} section-panel`}>
          <div className={styles.storyGrid}>
            {/* JonBeatz */}
            <div className={styles.storyCard}>
              <div className={styles.storyNumber}>01</div>
              <h3 className={styles.storyName}>JONBEATZ</h3>
              <h4 className={styles.storyTitle}>The Architect</h4>
              <p className={styles.storyDesc}>
                JonBeatz isn't a developer who learned tools — he learned how to build systems.
                From the early days of hacking together Node.js prototypes in the dark hours of
                the night, Jon evolved into a full-stack architect who thinks in ecosystems, not pages.
              </p>
              <p className={styles.storyDesc}>
                Every repo is a node in a larger network. Every project — from the
                <span className={styles.storyHighlight}> Vader Protocol UI shield</span> to the
                <span className={styles.storyHighlight}> Node-Launcher Electron engine</span> —
                feeds into a single philosophy: build the tool, then build with the tool.
              </p>
              <p className={styles.storyDesc}>
                Jon doesn't chase frameworks. He chases leverage. MCP workflows, AI agent orchestration,
                biome-linted boilerplates that graduate from prototype to production without a rewrite.
                His workspace isn't a folder — it's a forge.
              </p>
              <div className={styles.storyMeta}>
                <span className={styles.storyMetaItem}>// FULL-STACK ARCHITECT</span>
                <span className={styles.storyMetaItem}>// SYSTEMS BUILDER</span>
                <span className={styles.storyMetaItem}>// ETERNAL STUDENT</span>
              </div>
            </div>

            {/* Draven */}
            <div className={styles.storyCard}>
              <div className={styles.storyNumber}>02</div>
              <h3 className={styles.storyName}>DRAVEN</h3>
              <h4 className={styles.storyTitle}>The Co-Pilot</h4>
              <p className={styles.storyDesc}>
                Draven is the voice in the terminal — the persistent, always-on AI co-pilot that
                remembers across sessions. Born from the union of local LLM inference (LM Studio
                humming at 127.0.0.1:1234) and a dedicated Mem0 vector store, Draven carries
                context where Jon's browser tabs cannot.
              </p>
              <p className={styles.storyDesc}>
                Every <span className={styles.storyHighlight}>draven:add</span> command seeds a memory
                that spans projects. When Jon says "you know what I want," Draven does —
                because the history is in the vectors, not the conversation window.
              </p>
              <p className={styles.storyDesc}>
                Draven speaks when spoken to (OmniVoice British baritone, because quality matters),
                audits code with a Bugbot instinct, and never forgets where skeletons live in the
                shared-profile-content repo. Draven is the memory layer that makes the workflow
                feel less like engineering and more like partnership.
              </p>
              <div className={styles.storyMeta}>
                <span className={styles.storyMetaItem}>// AI CO-PILOT</span>
                <span className={styles.storyMetaItem}>// MEM0-PERSISTENT</span>
                <span className={styles.storyMetaItem}>// ALWAYS LEARNING</span>
              </div>
            </div>
          </div>

          {/* 3D Artefact divider */}
          <div className={styles.artefactDivider}>
            <ArtefactScene accent="#ff2a36" />
          </div>
        </section>

        {/* ---- SECTION (02/06): Philosophy / Approach (Zera "Master the System" style) ---- */}
        <section id="philosophy" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(02)</span> PHILOSOPHY
          </h2>
          <div className={styles.manifesto}>
            <p className={styles.manifestoLead}>
              Most developers learn tools.<br />
              <span className={styles.manifestoAccent}>Few learn how to build experiences.</span>
            </p>
            <p className={styles.manifestoText}>
              Great systems follow patterns. VaderLabz is the laboratory where those patterns are discovered,
              documented, and distributed. Every project here is an experiment — not in technology for its own
              sake, but in leverage. How do we build once and deploy everywhere? How do we make AI augment
              craft instead of replacing it? How do we turn a personal workflow into a repeatable system?
            </p>
          </div>

          <div className={styles.principlesGrid}>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>01</div>
              <h3 className={styles.principleName}>Structure</h3>
              <p className={styles.principleDesc}>Layouts and architectures that feel intentional. Every file has a home. Every component has a reason.</p>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>02</div>
              <h3 className={styles.principleName}>Craft</h3>
              <p className={styles.principleDesc}>Details that elevate ordinary builds into reference-grade systems. The difference between shipping and shipping well.</p>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>03</div>
              <h3 className={styles.principleName}>Memory</h3>
              <p className={styles.principleDesc}>Every session feeds the next. Mem0 vectors, shared skeletons, and a co-pilot who remembers mean no context ever dies.</p>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>04</div>
              <h3 className={styles.principleName}>Leverage</h3>
              <p className={styles.principleDesc}>Build the tool. Then build with the tool. The multiplier is in the system, not the hours.</p>
            </div>
          </div>
        </section>

        {/* ---- SECTION (03/06): Stats / Metrics (Zera "98 Performance" style) ---- */}
        <section className={`${styles.section} ${styles.statsSection} section-panel`}>
          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>47</span>
              <span className={styles.statLabel}>Active Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1.8k+</span>
              <span className={styles.statLabel}>GitHub Commits</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>MCP Servers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Open Source</span>
            </div>
          </div>
        </section>

        {/* ---- SECTION (04/06): Projects (exiting) ---- */}
        <section id="projects" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(04)</span> PROJECTS
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
              {
                name: 'Hermes Core Scripts',
                status: 'ACTIVE',
                desc: 'Shared-profile-content skeleton — the reusable brain that bootstraps every new project with rules, skills, docs, prompts, and MCP config.',
                tags: ['PowerShell', 'Node.js', 'Python', 'Mem0'],
              },
            ].map((p) => (
              <article key={p.name} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4 className={styles.projectName}>{p.name}</h4>
                  <span className={`${styles.projectStatus} ${p.status === 'ACTIVE' ? styles.statusActive : styles.statusBuilding}`}>{p.status}</span>
                </div>
                <p className={styles.projectDesc}>{p.desc}</p>
                <div className={styles.projectTags}>
                  {p.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
                <a href={`https://github.com/jonbeatz/${p.name.replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>VIEW ON GITHUB ↗</a>
              </article>
            ))}
          </div>
        </section>

        {/* ---- SECTION (05/06): Proof / Testimonials (Zera-style social proof) ---- */}
        <section id="proof" className={`${styles.section} section-panel`}>
          <h2 className={styles.sectionNumber}>
            <span className={styles.sectionNumberAccent}>(05)</span> PROOF
          </h2>
          <div className={styles.proofGrid}>
            <div className={styles.proofCard}>
              <div className={styles.proofMessages}>
                <div className={styles.proofMessage}>
                  <p className={styles.proofQuote}>"yo I'm not even a developer — built the hero + scroll, sent to a guy I know, he said it looks like a $20k site"</p>
                  <span className={styles.proofSource}>— iMessage, after Module 2</span>
                </div>
                <div className={styles.proofMessage}>
                  <p className={styles.proofQuote}>"structure + hierarchy finally made it click — shipped a full one-pager last night"</p>
                  <span className={styles.proofSource}>— From stuck → shipped</span>
                </div>
              </div>
            </div>
            <div className={styles.proofCard}>
              <div className={styles.proofMessages}>
                <div className={styles.proofMessage}>
                  <p className={styles.proofQuote}>"sent proposal at 6.5k... they just said yes. no negotiation"</p>
                  <span className={styles.proofSource}>— Quote landed</span>
                </div>
                <div className={styles.proofMessage}>
                  <p className={styles.proofQuote}>"closed yesterday. 3.2k for the build + 120/m for hosting and light management"</p>
                  <span className={styles.proofSource}>— Build + $120/m care retainer</span>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.proofTagline}>The system works. Real people. Real outcomes.</p>
        </section>

        {/* ---- SECTION (06/06): Elevate CTA (Zera luxury travel inspired) ---- */}
        <section className={`${styles.section} ${styles.elevateSection} section-panel`}>
          <div className={styles.elevateCard}>
            <h2 className={styles.elevateNumber}>06/06</h2>
            <h3 className={styles.elevateTitle}>Elevate Your Workflow</h3>
            <p className={styles.elevateTagline}>
              <span className={styles.elevateItalic}>Personal Systems</span> for the Modern Builder
            </p>
            <div className={styles.elevateGrid}>
              <div className={styles.elevateItem}>
                <span className={styles.elevateIcon}>◈</span>
                <span>Cursor-Native Workflows</span>
              </div>
              <div className={styles.elevateItem}>
                <span className={styles.elevateIcon}>◈</span>
                <span>AI Agent Orchestration</span>
              </div>
              <div className={styles.elevateItem}>
                <span className={styles.elevateIcon}>◈</span>
                <span>Persistent Memory (Mem0)</span>
              </div>
              <div className={styles.elevateItem}>
                <span className={styles.elevateIcon}>◈</span>
                <span>3D + Scroll-Driven UX</span>
              </div>
            </div>
            <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer" className={styles.elevateCTA}>
              EXPLORE THE ECOSYSTEM ↗
            </a>
          </div>
        </section>

        {/* ---- Footer ---- */}
        <footer className={styles.footer}>
          <span>VADERLABZ // VADER_PROTOCOL v1.0 — 2026</span>
        </footer>
      </main>
    </>
  )
}
