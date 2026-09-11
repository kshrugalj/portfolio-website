import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { profile, stats, currentProjects, pastProjects, experiences, education } from "../../data/content";

const BrowseMode: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShowIntro(false);
      return;
    }
    const t = setTimeout(() => setShowIntro(false), 3200);
    return () => clearTimeout(t);
  }, []);

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 700], [0, -70]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.98]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.85]);
  const giantParallaxY = useTransform(scrollY, [0, 700], [0, -110]);

  const [headerVisible, setHeaderVisible] = useState(true);
  useEffect(() => {
    if (showIntro) return;
    const hideTimer = setTimeout(() => setHeaderVisible(false), 1800);
    let lastY = 0;
    let hideTimeout: number | undefined;
    const handleMove = (e: MouseEvent) => {
      const y = e.clientY;
      const goingUp = y < lastY;
      lastY = y;
      if (y < 80) {
        setHeaderVisible(true);
        if (hideTimeout) window.clearTimeout(hideTimeout);
      } else if (y > 160 || (goingUp === false && y > 120)) {
        if (hideTimeout) window.clearTimeout(hideTimeout);
        hideTimeout = window.setTimeout(() => setHeaderVisible(false), 260) as unknown as number;
      } else if (goingUp && y < 160) {
        setHeaderVisible(true);
        if (hideTimeout) window.clearTimeout(hideTimeout);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.clearTimeout(hideTimer);
      if (hideTimeout) window.clearTimeout(hideTimeout);
    };
  }, [showIntro]);

  const totalProjects = currentProjects.length + pastProjects.length;

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* ─── INTRO — split vertically, KSHR|UGAL each ride their half off horizontally — full page ─── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0 } }}
            className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center bg-transparent"
            aria-hidden
          >
            {/* left half — carries KSHR, slides left — full page */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
              className="absolute inset-y-0 left-0 w-1/2 bg-black flex items-center justify-end overflow-hidden"
              aria-hidden
            >
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.45 } }}
                className="font-display font-black leading-[0.85] tracking-[-0.032em] text-white pr-[1px] whitespace-nowrap"
                style={{ fontSize: "clamp(52px, 14vw, 180px)" }}
              >
                KSHR
              </motion.div>
            </motion.div>
            {/* right half — carries UGAL, slides right — full page */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
              className="absolute inset-y-0 right-0 w-1/2 bg-black flex items-center justify-start overflow-hidden"
              aria-hidden
            >
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.45 } }}
                className="font-display font-black leading-[0.85] tracking-[-0.032em] text-white pl-[1px] whitespace-nowrap"
                style={{ fontSize: "clamp(52px, 14vw, 180px)" }}
              >
                UGAL
              </motion.div>
            </motion.div>
            {/* vertical seam */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-white/12 -translate-x-px z-10"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── TOP RULE — floating bar, appears when cursor goes toward top ─── */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: headerVisible ? 0 : -120, opacity: headerVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1280px] bg-white border-[3px] border-black will-change-transform"
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="font-mono text-[10px] leading-none tracking-[0.18em] uppercase">
            <div className="font-bold">Software Engineer</div>
            <div className="opacity-60">Digital Creator</div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-[0.14em] uppercase">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#experience" className="hover:underline underline-offset-4">Experience</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.12em] uppercase">Available for freelance</span>
            <span className="w-5 h-5 border-[2px] border-black flex items-center justify-center text-[10px] leading-none">✦</span>
          </div>
        </div>
      </motion.header>

      {/* ─── HERO — whole-screen portrait, pinned — below contents slide over cinematically — full viewport ─── */}
      <motion.section
        style={{ y: heroParallaxY, scale: heroScale, opacity: heroOpacity } as any}
        className="sticky top-0 z-10 bg-black text-white overflow-hidden border-b-[3px] border-black min-h-[100dvh] flex flex-col will-change-transform pt-[68px]"
      >
        {/* Giant first-name behind — near header — parallax slower than scroll */}
        <motion.div
          aria-hidden
          style={{ y: giantParallaxY } as any}
          className="absolute inset-x-0 top-3 lg:top-4 xl:top-5 flex justify-center select-none pointer-events-none overflow-hidden px-2 z-0 will-change-transform"
        >
          <span
            className="font-display font-black leading-[0.85] tracking-[-0.032em] whitespace-nowrap text-transparent"
            style={{
              fontSize: "clamp(72px, 16.5vw, 248px)",
              WebkitTextStroke: "1.4px rgba(255,255,255,0.92)",
              opacity: 0.96,
              WebkitTextFillColor: "transparent",
              maxWidth: "100vw",
            }}
          >
            KSHRUGAL
          </span>
        </motion.div>
        {/* subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/50 pointer-events-none z-0" />

        {/* PORTRAIT — whole-screen, behind content but in front of giant text — subtle parallax */}
        <motion.div
          style={{ y: heroParallaxY } as any}
          className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden will-change-transform"
        >
          <img
            src="/profile-cutout.png"
            alt="Kshrugal Jangalapalli"
            className="h-[86%] lg:h-[94%] xl:h-[96%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)] lg:translate-y-2"
            style={{ background: "transparent" }}
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <div className="relative w-full px-6 lg:px-10 xl:px-12 pt-6 md:pt-8 pb-6 lg:pb-10 z-20 flex-1 flex items-end">
          <div className="grid grid-cols-12 gap-4 lg:gap-6 items-end w-full">
            {/* LEFT COPY — flush to left viewport edge, over portrait — at bottom of screen but visible */}
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 pb-2 lg:pb-2 pt-2 lg:pt-6 z-20 lg:pl-0 lg:pr-6 lg:self-end">
              <div className="font-script italic text-[22px] leading-none text-white/90 mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Hello, I&apos;m
              </div>
              <h1 className="font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-white">
                <span className="block text-[44px] sm:text-[56px] lg:text-[64px]">KSHRUGAL</span>
                <span className="block text-[44px] sm:text-[56px] lg:text-[64px]">JANGALAPALLI</span>
              </h1>
              <div className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-white">
                <span className="text-white">CS @ Georgia Tech</span>
                <br />
                <span className="opacity-60">HackerHouse — S2 Resident</span>
              </div>
            </div>

            {/* spacer — portrait is absolute whole-screen, so no grid cell needed */}
            <div className="hidden lg:block lg:col-span-4 order-2 pointer-events-none" aria-hidden />

            {/* RIGHT META — 4×4 GRID compact — at bottom with left copy but still visible */}
            <div className="col-span-12 lg:col-span-3 order-3 flex flex-col justify-end pb-2 lg:pb-2 z-10 lg:pl-6 xl:pl-8 lg:self-end">
              {/* Desktop: 2×2 even squares — only cross, no outer borders */}
              <div className="hidden lg:grid grid-cols-2 gap-px bg-white/25 w-full max-w-[300px] ml-auto self-end">
                {/* Cell 1 — tagline */}
                <div className="bg-black aspect-square p-3 xl:p-4 flex flex-col justify-between">
                  <p className="font-mono text-[10px] xl:text-[11px] leading-[1.35] tracking-[0.07em] uppercase text-white/65">
                    Turning ideas
                    <br />
                    into powerful
                    <br />
                    digital experiences.
                  </p>
                  <span className="w-7 h-7 rounded-full border-[1.5px] border-white/25 flex items-center justify-center text-[10px] text-white">✦</span>
                </div>
                {/* Cell 2 — competitions */}
                <div className="bg-black aspect-square p-3 xl:p-4 flex flex-col justify-center text-right">
                  <div className="font-display text-[30px] xl:text-[34px] leading-[0.85] tracking-[-0.03em] text-white">{stats.competitions}<span className="text-white/40">+</span></div>
                  <div className="font-mono text-[9px] xl:text-[10px] tracking-[0.13em] uppercase text-white/45 leading-tight mt-1.5">
                    Competitions
                    <br />& Awards
                  </div>
                </div>
                {/* Cell 3 — {stats.projects}+ */}
                <div className="bg-black aspect-square p-3 xl:p-4 flex flex-col justify-center text-right lg:text-left">
                  <div className="font-display text-[30px] xl:text-[34px] leading-[0.85] tracking-[-0.03em] text-white">{stats.projects}<span className="text-white/40">+</span></div>
                  <div className="font-mono text-[9px] xl:text-[10px] tracking-[0.13em] uppercase text-white/45 leading-tight mt-1.5">
                    Projects
                    <br />
                    Completed
                  </div>
                </div>
                {/* Cell 4 — experiences */}
                <div className="bg-black aspect-square p-3 xl:p-4 flex flex-col justify-center text-right">
                  <div className="font-display text-[30px] xl:text-[34px] leading-[0.85] tracking-[-0.03em] text-white">{stats.experiences}<span className="text-white/40">+</span></div>
                  <div className="font-mono text-[9px] xl:text-[10px] tracking-[0.13em] uppercase text-white/45 leading-tight mt-1.5">
                    Happy
                    <br />
                    Clients
                  </div>
                </div>
              </div>

              {/* Mobile: keep simple row */}
              <div className="grid grid-cols-3 gap-4 lg:hidden border-t border-white/10 pt-4">
                <div>
                  <div className="font-display text-[28px] leading-none text-white">{stats.competitions}<span className="text-white/50">+</span></div>
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/50 leading-tight mt-1">Competitions<br />& Awards</div>
                </div>
                <div>
                  <div className="font-display text-[28px] leading-none text-white">{stats.projects}<span className="text-white/50">+</span></div>
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/50 leading-tight mt-1">Projects<br />Completed</div>
                </div>
                <div>
                  <div className="font-display text-[28px] leading-none text-white">{stats.experiences}<span className="text-white/50">+</span></div>
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/50 leading-tight mt-1">Happy<br />Clients</div>
                </div>
              </div>
              <div className="flex lg:hidden items-center gap-2 text-white/50 font-mono text-[10px] tracking-wide mt-4">
                <span>Turning ideas into powerful digital experiences.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── SELECTED PROJECTS — diptych, titles fully visible (rows auto-height) ─── */}
      <motion.section
        id="projects"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white border-b-[3px] border-black min-h-[100dvh] flex flex-col justify-center py-8 lg:py-12"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 lg:py-8 w-full">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-black pb-2">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">02 — Works</span>
              <h2 className="font-display text-[20px] md:text-[24px] leading-none tracking-[-0.02em] uppercase">Selected Projects</h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-50 hidden sm:inline">{totalProjects} builds · 2024 — 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2 mb-3">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40 mr-1">Filter —</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase bg-black text-white px-2 py-0.5 border-[2px] border-black">All 05</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase border-[2px] border-black px-2 py-0.5 bg-white opacity-60">Active 03</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase border-[2px] border-black px-2 py-0.5 bg-white opacity-60">Archive 02</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono text-[10px] tracking-wide underline underline-offset-4 decoration-black/20 hover:decoration-black hidden sm:inline">
              github.com/kshrugalj →
            </a>
          </div>

          {/* SPLIT DIPTYCH — rows auto-height so titles never clip */}
          <div className="border-[3px] border-black flex flex-col divide-y-[3px] divide-black">
            {[...currentProjects, ...pastProjects].map((p, idx) => {
              const isReverse = idx % 2 === 1;
              const isDarkCover = idx % 2 === 0;
              const initials = p.title.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || p.id.slice(0, 2).toUpperCase();
              return (
                <div
                  key={p.id}
                  className={["group flex min-h-[132px] lg:min-h-[148px]", isReverse ? "flex-row-reverse" : "flex-row", "hover:bg-black hover:text-white transition-colors"].join(" ")}
                >
                  {/* TEXT SIDE — 7/12 — titles fully visible, no truncate */}
                  <div className="flex-[7] min-w-0 p-3 lg:p-4 flex flex-col justify-center gap-1 border-black group-hover:border-white/15">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[14px] leading-none opacity-15 group-hover:opacity-100">0{idx + 1}</span>
                      <span className="font-mono text-[8px] tracking-[0.16em] uppercase border border-black px-1 py-0.5 leading-none group-hover:border-white group-hover:text-white">
                        {idx < currentProjects.length ? "● Active" : "◆ Archive"}
                      </span>
                      <span className="hidden sm:inline font-mono text-[8px] tracking-[0.12em] uppercase opacity-40 group-hover:text-white/50">— {p.id}</span>
                    </div>
                    <h3 className="font-display uppercase leading-[0.95] tracking-[-0.02em] text-[17px] lg:text-[20px] xl:text-[22px] group-hover:text-white break-words line-clamp-2">{p.title}</h3>
                    <div className="font-mono text-[8px] lg:text-[9px] tracking-[0.12em] uppercase opacity-50 group-hover:text-white/60 line-clamp-1">{p.award ?? (idx < currentProjects.length ? "Active build — in production" : "Completed")}</div>
                    <p className="font-sans text-[11px] lg:text-[12px] leading-[1.4] opacity-60 group-hover:text-white/70 line-clamp-1 hidden sm:block max-w-[60ch]">{p.description}</p>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="font-mono text-[7px] lg:text-[8px] tracking-wide border border-black/15 group-hover:border-white/20 px-1 py-0.5 leading-none group-hover:text-white">
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 4 && <span className="font-mono text-[7px] opacity-40 self-center">+{p.tags.length - 4}</span>}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {p.links.slice(0, 2).map((l) => (
                          <a
                            key={l.label}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[8px] tracking-[0.08em] uppercase underline underline-offset-4 decoration-1 text-[#0000FF] group-hover:text-white group-hover:decoration-white/40 hover:no-underline"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                        {!p.links.length && <span className="font-mono text-[8px] uppercase opacity-30 hidden lg:inline">Private</span>}
                        {p.links[0]?.url ? (
                          <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" className="w-6 h-6 border-[2px] border-black group-hover:border-white group-hover:bg-white group-hover:text-black flex items-center justify-center text-[10px] leading-none flex-shrink-0">
                            →
                          </a>
                        ) : (
                          <span className="w-6 h-6 border-[2px] border-black/20 group-hover:border-white/40 flex items-center justify-center text-[10px] leading-none opacity-20 group-hover:opacity-100 flex-shrink-0">→</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* COVER SIDE — 5/12, typographic */}
                  <div
                    className={[
                      "hidden lg:flex flex-[5] relative items-center justify-center overflow-hidden border-black group-hover:border-white/15",
                      isReverse ? "border-r-[3px]" : "border-l-[3px]",
                      isDarkCover ? "bg-black text-white" : "bg-white text-black group-hover:!bg-black group-hover:!text-white",
                    ].join(" ")}
                  >
                    <span className="font-display font-black leading-[0.85] tracking-[-0.03em] text-[48px] xl:text-[56px] opacity-[0.08] group-hover:opacity-[0.14] select-none pointer-events-none">
                      {initials}
                    </span>
                    <span className="absolute bottom-1.5 right-2 font-mono text-[8px] tracking-[0.14em] uppercase opacity-30">0{idx + 1} / 05</span>
                    <span className="absolute top-1.5 left-2 font-mono text-[7px] tracking-[0.14em] uppercase opacity-40 border border-current px-1 py-0.5">{p.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── EDUCATION & SKILLS / WORK PROCESS / QUOTE — cinematic stagger — full screen ─── */}
      <motion.section
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="relative z-20 bg-white border-b-[3px] border-black min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 lg:divide-x-[3px] lg:divide-black">
          {/* EDUCATION & SKILLS */}
          <div className="lg:col-span-4 p-4 md:p-6 border-b-[3px] lg:border-b-0 border-black">
            <h2 className="font-display text-[13px] tracking-[0.08em] border-b-[3px] border-black pb-3 mb-5">Education & Skills</h2>

            <div className="space-y-4">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-50">Education</div>
              {education.slice(0, 3).map((e) => (
                <div key={e.degree} className="border-l-[3px] border-black pl-3 py-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-sans text-[12px] font-bold leading-tight">{e.degree}</div>
                    <span className="font-mono text-[10px] whitespace-nowrap opacity-50">{e.period}</span>
                  </div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[#0000FF] hover:underline underline-offset-4">
                    {e.school}
                  </a>
                  <div className="font-sans text-[11px] leading-snug opacity-60 mt-1 line-clamp-2">{e.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-50 mb-3">Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Web Design",
                  "UI/UX Design",
                  "TypeScript",
                  "React / Next.js",
                  "Figma",
                  "Framer",
                  "Tailwind CSS",
                  "Python",
                  "FastAPI",
                  "Firebase",
                  "GSAP Animation",
                  "SEO Basics",
                ].map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] tracking-[0.08em] uppercase border-[2px] border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-50 mb-2">Competitions</div>
              <div className="space-y-2">
                {[
                  "1st Arvest Hackathon · 2024",
                  "2nd Congressional App Challenge · 2025",
                  "4th HogHacks — Best Implementation",
                  "Qualifier — NexHacks @ CMU",
                ].map((c) => (
                  <div key={c} className="font-mono text-[11px] leading-none flex gap-2">
                    <span>—</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WORK PROCESS */}
          <div className="lg:col-span-5 p-4 md:p-6 border-b-[3px] lg:border-b-0 border-black">
            <h2 className="font-display text-[13px] tracking-[0.08em] border-b-[3px] border-black pb-3 mb-5">Work Process</h2>
            <div className="space-y-4">
              {[
                {
                  n: "01",
                  title: "Discover",
                  desc: "Understanding goals, audience, and project requirements.",
                  icon: "◯",
                },
                {
                  n: "02",
                  title: "Ideate",
                  desc: "Planning, wireframing, and creating the right concept.",
                  icon: "◐",
                },
                {
                  n: "03",
                  title: "Design",
                  desc: "Crafting visual design with a focus on user experience.",
                  icon: "⬡",
                },
                {
                  n: "04",
                  title: "Develop",
                  desc: "Building fast, responsive, and high-performing websites.",
                  icon: "</>",
                },
                {
                  n: "05",
                  title: "Deliver",
                  desc: "Testing, optimizing, and launching with perfection.",
                  icon: "✈",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-3 group">
                  <div className="font-mono text-[11px] tracking-wide opacity-40 pt-2 w-6 flex-shrink-0">{step.n}</div>
                  <div className="w-9 h-9 rounded-full border-[2px] border-black flex items-center justify-center flex-shrink-0 text-[12px] group-hover:bg-black group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0 border-b border-black/10 pb-4 group-last:border-b-0">
                    <div className="font-display text-[12px] tracking-[0.04em] uppercase">{step.title}</div>
                    <div className="font-sans text-[12px] leading-snug opacity-60 mt-1">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUOTE — inverted block like reference's deep red */}
          <div className="lg:col-span-3 bg-black text-white p-6 md:p-8 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="font-display text-[36px] leading-none opacity-20">“</div>
              <blockquote className="font-sans text-[15px] leading-[1.5] font-medium mt-2">
                Good design is not just how it looks, but how it works.
              </blockquote>
              <div className="mt-6 font-script italic text-[18px] opacity-80" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Kshrugal
              </div>
            </div>
            <div className="mt-10">
              <div className="w-8 h-[2px] bg-white/30 mb-4" />
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase leading-tight opacity-70">
                Let&apos;s create
                <br />
                something great
                <br />
                together.
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-wide opacity-50">
                <span>✦</span>
                <span>Available for freelance</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── EXPERIENCE (expandable — brutalist) — cinematic — full screen ─── */}
      <motion.section
        id="experience"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white border-b-[3px] border-black min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex items-baseline justify-between border-b-[3px] border-black pb-3 mb-6">
            <h2 className="font-display text-[14px] md:text-[16px] tracking-[0.08em]">Experience</h2>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-50">{experiences.length} roles</span>
          </div>
          <div className="border-[3px] border-black divide-y-[3px] divide-black">
            {experiences.map((e, i) => {
              const isExpanded = expandedIdx === i;
              const hasBullets = !!e.bullets?.length;
              return (
                <div
                  key={e.company + i}
                  className={`bg-white ${hasBullets ? "cursor-pointer" : ""} hover:bg-black hover:text-white group transition-colors`}
                  onClick={() => hasBullets && setExpandedIdx(isExpanded ? null : i)}
                  role={hasBullets ? "button" : undefined}
                  tabIndex={hasBullets ? 0 : undefined}
                  onKeyDown={(ev) => {
                    if (hasBullets && (ev.key === "Enter" || ev.key === " ")) {
                      ev.preventDefault();
                      setExpandedIdx(isExpanded ? null : i);
                    }
                  }}
                >
                  <div className="flex gap-4 p-4 md:p-5">
                    <span className="hidden md:block font-mono text-[11px] tracking-wide opacity-50 w-[150px] flex-shrink-0 pt-0.5 group-hover:text-white/60">
                      {e.period}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-display text-[13px] leading-none tracking-[0.02em] uppercase">{e.title}</div>
                          <a
                            href={e.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(ev) => ev.stopPropagation()}
                            className="font-mono text-[11px] text-[#0000FF] group-hover:text-white underline underline-offset-4 decoration-1"
                          >
                            {e.company} ↗
                          </a>
                          <div className="md:hidden font-mono text-[10px] opacity-50 mt-1">{e.period}</div>
                          <div className="font-sans text-[12px] leading-snug opacity-70 group-hover:opacity-80 mt-2 max-w-[64ch]">
                            {e.description}
                          </div>
                        </div>
                        {hasBullets && (
                          <span
                            className={`w-8 h-8 border-[2px] flex items-center justify-center flex-shrink-0 text-[12px] transition-transform ${isExpanded ? "bg-white text-black border-white rotate-90 group-hover:bg-white" : "border-black group-hover:border-white group-hover:text-white"}`}
                            aria-hidden
                          >
                            ▸
                          </span>
                        )}
                      </div>
                      {hasBullets && isExpanded && (
                        <ul className="mt-4 space-y-2 border-t-[3px] border-black group-hover:border-white pt-4">
                          {e.bullets!.map((b, bi) => (
                            <li key={bi} className="flex gap-3 font-sans text-[12px] leading-relaxed">
                              <span className="mt-1 w-1.5 h-1.5 bg-black group-hover:bg-white flex-shrink-0" aria-hidden />
                              <span className="opacity-80 group-hover:opacity-100">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {hasBullets && !isExpanded && (
                        <div className="font-mono text-[10px] tracking-[0.1em] uppercase opacity-30 group-hover:opacity-60 mt-3">
                          Click to expand ▾
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── LET'S WORK TOGETHER — footer (inverted) — cinematic — full screen ─── */}
      <motion.section
        id="contact"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-black text-white border-b-[3px] border-black min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 p-6 md:p-8 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-white/15">
            <h2 className="font-display text-[22px] leading-none tracking-[-0.02em]">
              Let&apos;s Work
              <br />
              Together <span className="text-white/40">✦</span>
            </h2>
            <p className="font-sans text-[12px] leading-relaxed text-white/60 mt-3 max-w-[36ch]">
              I&apos;m currently open for new projects and collaborations. Let&apos;s create something amazing that drives results.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-3 border-[2px] border-white px-4 py-3 font-mono text-[10px] tracking-[0.14em] uppercase bg-white text-black hover:bg-black hover:text-white hover:border-white transition-colors"
            >
              <span className="w-6 h-6 border border-black flex items-center justify-center bg-black text-white">→</span>
              Available for freelance
            </a>
          </div>

          <div className="lg:col-span-4 p-6 md:p-8 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-white/15">
            <div className="space-y-4 font-mono text-[11px]">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 group">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-[12px]">
                  ✉
                </span>
                <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white">{profile.email}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-[12px]">
                  ◉
                </span>
                <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white">github.com/kshrugalj</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-[12px]">
                  in
                </span>
                <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white">linkedin.com/in/kshrugalj</span>
              </a>
              <div className="flex items-center gap-3 opacity-60">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[12px]">◎</span>
                <span>Fayetteville, Arkansas · Georgia Tech</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-6 md:p-4 flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* laptop mock — brutalsit */}
            <div className="relative w-full max-w-[320px] border-[3px] border-white bg-black p-2">
              <div className="border border-white/10 aspect-[16/10] bg-[#111] flex flex-col p-3">
                <div className="font-mono text-[8px] tracking-[0.16em] uppercase opacity-40">We design</div>
                <div className="font-display text-[18px] leading-none mt-1">
                  Digital
                  <br />
                  Experiences
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <span className="w-6 h-6 bg-white text-black flex items-center justify-center text-[10px] font-bold">R</span>
                  <span className="font-mono text-[8px] tracking-wide opacity-40">portfolio 2026</span>
                </div>
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[60%] h-1.5 bg-white/20" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] tracking-[0.08em] uppercase opacity-50">
          <span>© 2026 {profile.name} — Built with RawBlock</span>
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:underline underline-offset-4">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:underline underline-offset-4">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:opacity-100 hover:underline underline-offset-4">
              {profile.email}
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BrowseMode;
