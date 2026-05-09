"use client";

import { useApp, t } from "@/contexts/Providers";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEMS, SYSTEM_BY_ID } from "@/data/spec";
import { SYSTEM_ID } from "@/data/self";

const HUB_URL = "https://civos.psyverse.fun";

const SUBDOMAIN_FOR: Record<string, string> = {
  "civilization-os":      "https://civilization-os.psyverse.fun",
  "idea-evolution":       "https://idea-evolution.psyverse.fun",
  "material-civilization":"https://material-civilization.psyverse.fun",
  "psy-protocol-spec":    "https://psy-protocol-spec.psyverse.fun",
  "clan-civilization":    "https://clan-civilization.psyverse.fun",
  "sensory-os":           "https://sensory-os.psyverse.fun",
  "reality-kernel":       "https://reality-kernel.psyverse.fun",
  "decision-os":          "https://decision-os.psyverse.fun",
  "cycle-engine":         "https://cycle-engine.psyverse.fun",
  "life-os":              "https://life-os.psyverse.fun",
};

export { SUBDOMAIN_FOR, HUB_URL };

export default function Chrome({ children }: { children: React.ReactNode }) {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const self = SYSTEM_BY_ID[SYSTEM_ID];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--rule)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <span className="font-display text-xl" style={{ color: self.hue }}>{self.glyph}</span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-base tracking-tight">{t(self.name, lang)}</span>
              <span className="font-mono text-[10px] text-[var(--ink-soft)]">{self.slug}.psyverse.fun</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-5 font-mono text-[12px] uppercase tracking-wider">
            <a href="#overview"   className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "概览" : "Overview"}</a>
            <a href="#modules"    className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "模块" : "Modules"}</a>
            <a href="#data-model" className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "数据" : "Data"}</a>
            <a href="#api"        className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "接口" : "API"}</a>
            <a href="#equations"  className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "方程" : "Equations"}</a>
            <a href="#ui"         className="text-[var(--ink-soft)] hover:text-[var(--accent)]">{lang === "zh" ? "界面" : "UI"}</a>
            <a href={HUB_URL}     className="text-[var(--accent)] hover:underline">civos ↗</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")} className="font-mono text-[11px] tracking-wider px-2.5 py-1 border border-[var(--rule)] hover:border-[var(--accent)] uppercase">
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button onClick={toggleTheme} className="font-mono text-[11px] px-2.5 py-1 border border-[var(--rule)] hover:border-[var(--accent)]">
              {theme === "dark" ? "☾" : "☀"}
            </button>
            <button onClick={() => setOpen(true)} className="lg:hidden font-mono text-[11px] px-2.5 py-1 border border-[var(--rule)]">☰</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg)]/95 backdrop-blur-lg" onClick={() => setOpen(false)}
          >
            <div className="max-w-md mx-auto px-8 pt-24" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 px-3 py-1 border border-[var(--rule)] font-mono text-xs">✕</button>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "本系统" : "This system"}</div>
              <ul className="space-y-2 mb-8">
                {[
                  { href: "#overview",   l: { en: "Overview",  zh: "概览" } },
                  { href: "#modules",    l: { en: "Modules",   zh: "模块" } },
                  { href: "#data-model", l: { en: "Data model",zh: "数据模型" } },
                  { href: "#api",        l: { en: "API",       zh: "接口" } },
                  { href: "#equations",  l: { en: "Equations", zh: "方程与原理" } },
                  { href: "#ui",         l: { en: "UI screens",zh: "界面" } },
                ].map((it) => (
                  <li key={it.href}>
                    <a href={it.href} onClick={() => setOpen(false)} className="block py-1 font-display text-xl border-b border-[var(--rule)]">
                      {t(it.l, lang)}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "其他系统" : "Other systems"}</div>
              <ul className="space-y-1">
                {SYSTEMS.filter((s) => s.id !== SYSTEM_ID).map((s) => (
                  <li key={s.id}>
                    <a href={SUBDOMAIN_FOR[s.id]} className="flex items-baseline justify-between py-1 border-b border-[var(--rule)]">
                      <span><span style={{ color: s.hue }}>{s.glyph}</span> <span className="font-display">{t(s.name, lang)}</span></span>
                      <span className="font-mono text-[10px] text-[var(--ink-soft)]">{s.slug}</span>
                    </a>
                  </li>
                ))}
                <li><a href={HUB_URL} className="block py-1 font-mono text-[var(--accent)]">civos ↗</a></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-[80vh]">{children}</main>

      <footer className="border-t border-[var(--rule)] mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 font-mono text-[11px] text-[var(--ink-soft)] grid md:grid-cols-3 gap-4">
          <div>
            <div className="font-display text-base text-[var(--ink)]">{t(self.name, lang)}</div>
            <div className="opacity-70 mt-1">{self.slug}.psyverse.fun</div>
          </div>
          <div>
            <div className="uppercase tracking-wider mb-1.5">{lang === "zh" ? "属于" : "Part of"}</div>
            <a href={HUB_URL} className="hover:text-[var(--accent)] underline underline-offset-2">civos · civilization-os ecosystem</a>
          </div>
          <div className="md:text-right">
            <a href="https://psyverse.fun" className="hover:text-[var(--accent)]">psyverse.fun</a>
          </div>
        </div>
      </footer>
    </>
  );
}
