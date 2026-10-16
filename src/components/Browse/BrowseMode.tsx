import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { profile, stats, currentProjects, pastProjects, experiences, education, competitions } from "../../data/content";

// ─── RawBlock platform logos — monochrome, square, 2px border, hover inversion ───
const PlatformIcon: React.FC<{ label: string }> = ({ label }) => {
  const l = label.toLowerCase();
  if (l.includes("github"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  if (l.includes("linkedin"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452z" />
      </svg>
    );
  if (l.includes("instagram"))
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  if (l.includes("website"))
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a10 10 0 000 18M12 3a10 10 0 010 18" />
      </svg>
    );
  if (l.includes("devpost"))
    return <span className="font-mono font-black text-[11px] leading-none tracking-[-0.02em]">D</span>;
  if (l.includes("article"))
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h11M8 17h11" />
      </svg>
    );
  if (l.includes("video") || l.includes("youtube"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
        <path d="M8 5.14v14l11-7z" />
      </svg>
    );
  // fallback — generic external link
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3 h-3" aria-hidden>
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
};

// ─── Skills — RawBlock chips, 2px border, hover inversion ───
const skills = [
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
];

const BrowseMode: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(0);
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

  const allProjects = [...currentProjects, ...pastProjects];
  const totalProjects = allProjects.length;
  const activeCount = allProjects.filter((p) => p.status === "active").length;
  const archiveCount = totalProjects - activeCount;

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
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#experience" className="hover:underline underline-offset-4">Experience</a>
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
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

      {/* ─── EDUCATION — ledger, skills, competitions ─── */}
      <motion.section
        id="education"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white border-b-[3px] border-black"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-black pb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">02 — Education</span>
              <h2 className="font-display text-[22px] md:text-[28px] leading-none tracking-[-0.02em] uppercase">Education</h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-50">
              {education.length} programs · {skills.length} skills
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-5">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40">{profile.education}</span>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40">2022 — 2029</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x-[3px] lg:divide-black border-[3px] border-black">
            {/* ─── LEFT — the ledger ─── */}
            <div className="lg:col-span-7 p-4 md:p-6">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-4">Programs — {education.length}</div>
              <div className="flex flex-col gap-4">
                {education.map((e) => (
                  <div key={e.degree} className="border-l-[3px] border-black pl-3 py-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-sans text-[14px] font-bold leading-tight">{e.degree}</div>
                      <span className="font-mono text-[10px] whitespace-nowrap opacity-50 flex-shrink-0 pt-0.5">{e.period}</span>
                    </div>
                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[#0000FF] hover:underline underline-offset-4">
                      {e.school}
                    </a>
                    <div className="font-sans text-[12px] leading-snug opacity-60 mt-1 max-w-[68ch]">{e.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT — skills, then every competition ─── */}
            <div className="lg:col-span-5 border-t-[3px] lg:border-t-0 border-black">
              <div className="p-4 md:p-6">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-3">Skills — {skills.length}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-[0.08em] uppercase border-[2px] border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6 border-t-[3px] border-black">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-3">Competitions & Awards — {competitions.length}</div>
                <div className="border-[2px] border-black divide-y-[2px] divide-black">
                  {competitions.map((c) => (
                    <div key={c.title + c.date} className="flex items-baseline gap-3 px-3 py-2">
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase opacity-40 flex-shrink-0 w-[54px]">{c.date}</span>
                      <span className="font-sans text-[12px] leading-snug flex-1 min-w-0">{c.title}</span>
                      <span className="font-mono text-[10px] tracking-[0.08em] uppercase opacity-70 flex-shrink-0">{c.award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── EXPERIENCE — each role expands in place ─── */}
      <motion.section
        id="experience"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white border-b-[3px] border-black"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-black pb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">03 — Experience</span>
              <h2 className="font-display text-[22px] md:text-[28px] leading-none tracking-[-0.02em] uppercase">Experience</h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-50">{experiences.length} roles · 2025 — 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-5">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40">Expand a role for the detail</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-wide underline underline-offset-4 decoration-black/20 hover:decoration-black"
            >
              linkedin.com/in/kshrugalj →
            </a>
          </div>

          <div className="border-[3px] border-black divide-y-[3px] divide-black">
            {experiences.map((e, i) => {
              const isOpen = expandedIdx === i;
              const hasBullets = !!e.bullets?.length;
              const hasLink = !!e.link && e.link !== "#";
              return (
                <div key={e.company + i} className="bg-white">
                  <div
                    onClick={() => hasBullets && setExpandedIdx(isOpen ? null : i)}
                    className={[
                      "group flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-5 transition-colors",
                      hasBullets ? "cursor-pointer" : "",
                      isOpen ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white",
                    ].join(" ")}
                  >
                    <span className="font-mono text-[11px] tabular-nums opacity-40 flex-shrink-0 w-5 group-hover:opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display uppercase leading-none tracking-[-0.02em] text-[16px] md:text-[20px] truncate">{e.title}</h3>
                      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {hasLink ? (
                          <a
                            href={e.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(ev) => ev.stopPropagation()}
                            className="font-mono text-[11px] text-[#0000FF] group-hover:text-white underline underline-offset-4 decoration-1"
                          >
                            {e.company} ↗
                          </a>
                        ) : (
                          <span className="font-mono text-[11px] group-hover:text-white/80">{e.company}</span>
                        )}
                        <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-50 group-hover:opacity-70 lg:hidden">{e.period}</span>
                      </div>
                    </div>

                    <span className="hidden lg:inline font-mono text-[10px] tracking-[0.12em] uppercase opacity-40 flex-shrink-0 group-hover:opacity-60">
                      {e.period}
                    </span>

                    {hasBullets && (
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setExpandedIdx(isOpen ? null : i);
                        }}
                        aria-expanded={isOpen}
                        aria-controls={`role-panel-${i}`}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${e.title} at ${e.company}`}
                        className={[
                          "w-8 h-8 border-[2px] flex items-center justify-center flex-shrink-0 text-[12px] transition-transform",
                          isOpen ? "border-white bg-white text-black rotate-90" : "border-black group-hover:border-white group-hover:text-white",
                        ].join(" ")}
                      >
                        ▸
                      </button>
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {hasBullets && isOpen && (
                      <motion.div
                        key={`role-panel-${i}`}
                        id={`role-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-white text-black border-t-[3px] border-black"
                      >
                        <div className="px-4 md:px-6 py-5">
                          <p className="font-sans text-[13px] md:text-[14px] leading-[1.65] text-black/70 max-w-[80ch]">{e.description}</p>
                          <ul className="mt-4 flex flex-col gap-3">
                            {e.bullets!.map((b, bi) => (
                              <li key={bi} className="flex gap-3 font-sans text-[13px] md:text-[14px] leading-[1.65]">
                                <span className="mt-[8px] w-1.5 h-1.5 bg-black flex-shrink-0" aria-hidden />
                                <span className="max-w-[88ch]">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── SELECTED PROJECTS — archive list, each row expands in place ─── */}
      <motion.section
        id="projects"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white border-b-[3px] border-black"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-black pb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-40">04 — Works</span>
              <h2 className="font-display text-[22px] md:text-[28px] leading-none tracking-[-0.02em] uppercase">Selected Projects</h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-50">
              {totalProjects} builds · {activeCount} active · {archiveCount} archive
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-5">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40">2024 — 2026 · expand a row for the full build</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-wide underline underline-offset-4 decoration-black/20 hover:decoration-black"
            >
              github.com/kshrugalj →
            </a>
          </div>

          <div className="border-[3px] border-black divide-y-[3px] divide-black">
            {allProjects.map((p, idx) => {
              const isOpen = openProjectIdx === idx;
              const isActive = p.status === "active";
              return (
                <div key={p.id} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenProjectIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`project-panel-${p.id}`}
                    className={[
                      "group w-full text-left flex items-center gap-3 md:gap-4 px-3 md:px-5 py-4 md:py-5 transition-colors",
                      isOpen ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white",
                    ].join(" ")}
                  >
                    <span className="font-mono text-[11px] tabular-nums opacity-40 flex-shrink-0 w-5 group-hover:opacity-60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* status chip — colour only when the row is at rest, white on inversion */}
                    <span
                      className={[
                        "font-mono text-[10px] tracking-[0.12em] uppercase leading-none border-[2px] px-1.5 py-1 flex-shrink-0 whitespace-nowrap transition-colors",
                        isActive
                          ? isOpen
                            ? "border-white text-white bg-black"
                            : "border-raw-green text-raw-green bg-white group-hover:border-white group-hover:text-white group-hover:bg-black"
                          : isOpen
                            ? "border-white text-black bg-white"
                            : "border-black text-black bg-white group-hover:border-white group-hover:text-white group-hover:bg-black",
                      ].join(" ")}
                    >
                      {isActive ? "● Active" : "◆ Archive"}
                    </span>

                    <span className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                      <h3 className="font-display uppercase leading-none tracking-[-0.02em] text-[17px] md:text-[21px] truncate">{p.title}</h3>
                      {!!p.awards?.length && (
                        <span className="hidden md:flex items-baseline gap-2 min-w-0 max-w-[240px] lg:max-w-[440px] border-l-[2px] border-raw-orange pl-3 font-mono text-[10px] tracking-[0.1em] uppercase leading-none opacity-50 group-hover:opacity-80">
                          <span className="truncate">{p.awards[0]}</span>
                          {p.awards.length > 1 && <span className="flex-shrink-0 opacity-70">+{p.awards.length - 1}</span>}
                        </span>
                      )}
                    </span>

                    <span className="hidden xl:inline font-mono text-[10px] tracking-[0.08em] uppercase opacity-35 flex-shrink-0 truncate max-w-[260px]">
                      {p.tags.slice(0, 3).join(" / ")}
                    </span>

                    <span className="hidden md:inline font-mono text-[10px] tracking-[0.12em] uppercase opacity-30 flex-shrink-0">/{p.id}</span>

                    <span
                      className={[
                        "w-8 h-8 border-[2px] flex items-center justify-center flex-shrink-0 text-[12px] transition-transform",
                        isOpen
                          ? "border-white bg-white text-black rotate-90"
                          : "border-black group-hover:border-white group-hover:text-white",
                      ].join(" ")}
                      aria-hidden
                    >
                      ▸
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`panel-${p.id}`}
                        id={`project-panel-${p.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-white text-black"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 border-t-[3px] border-black">
                          {/* left — what it is, the award, the whole stack */}
                          <div className="lg:col-span-8 p-4 md:p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black">
                            {!!p.awards?.length && (
                              <div className="flex flex-col gap-2 mb-5">
                                {p.awards.map((award, ai, all) => (
                                  <div key={award} className="border-[3px] border-black">
                                    <div className="bg-raw-orange text-black px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase">
                                      ◆ Award{all.length > 1 ? ` ${ai + 1}` : ""}
                                    </div>
                                    <div className="px-3 py-2.5 font-sans text-[13px] font-semibold leading-snug">{award}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-2">What it is</div>
                            <p className="font-sans text-[14px] md:text-[15px] leading-[1.7] max-w-[70ch]">{p.description}</p>

                            <div className="mt-6 pt-4 border-t-[3px] border-black/10">
                              <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-3">Stack — {p.tags.length}</div>
                              <div className="flex flex-wrap gap-1.5">
                                {p.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="font-mono text-[10px] tracking-[0.08em] uppercase border-[2px] border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors cursor-default"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* right — every link, then the record's own metadata */}
                          <div className="lg:col-span-4 p-4 md:p-6 flex flex-col">
                            <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40 mb-3">Links — {p.links.length}</div>

                            {p.links.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {p.links.map((l) => (
                                  <a
                                    key={l.label}
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between gap-3 border-[3px] border-black px-3 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase bg-white hover:bg-black hover:text-white transition-colors"
                                  >
                                    <span className="flex items-center gap-2.5 min-w-0">
                                      <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                                        <PlatformIcon label={l.label} />
                                      </span>
                                      <span className="truncate">{l.label}</span>
                                    </span>
                                    <span className="flex-shrink-0">→</span>
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <div className="border-[2px] border-black/25 px-3 py-2 font-mono text-[10px] tracking-[0.12em] uppercase opacity-50 self-start">
                                Private build — no public links
                              </div>
                            )}

                            <div className="mt-auto pt-6">
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-40 leading-loose">
                                id — {p.id}
                                <br />
                                status — {isActive ? "in production" : "shipped"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
