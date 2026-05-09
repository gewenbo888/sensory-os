"use client";

import { useApp, t } from "@/contexts/Providers";
import { SYSTEM_BY_ID, SYSTEMS } from "@/data/spec";
import { SYSTEM_ID } from "@/data/self";
import { SUBDOMAIN_FOR } from "@/components/Chrome";
import { motion } from "framer-motion";

export default function SystemPage() {
  const { lang } = useApp();
  const s = SYSTEM_BY_ID[SYSTEM_ID];

  return (
    <>
      {/* HERO */}
      <section id="overview" className="relative">
        <div className="absolute inset-0 pointer-events-none opacity-25"
          style={{ background: `radial-gradient(circle at 30% 30%, ${s.hue} 0%, transparent 55%)` }} />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-16">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5 flex flex-wrap gap-x-3 gap-y-1 items-center">
            <span style={{ color: s.hue }}>{t(s.agent, lang)}</span>
            <span className="text-[var(--ink-soft)]">·</span>
            <span className="text-[var(--ink-soft)]">{s.slug}.psyverse.fun</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl xl:text-8xl leading-[1.02] tracking-tight max-w-5xl">
            <span style={{ color: s.hue }}>{s.glyph}</span>{" "}
            {t(s.name, lang)}
          </h1>
          <p className="mt-8 max-w-3xl font-display italic text-xl md:text-2xl text-[var(--ink-soft)] leading-snug">
            {t(s.oneLine, lang)}
          </p>
          <div className="mt-8 max-w-3xl font-body text-base md:text-lg leading-relaxed">
            {t(s.body, lang).split("\n\n").map((p, i) => <p key={i} className="mb-4">{p}</p>)}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "模块" : "Modules"}</div>
          <h2 className="font-display text-3xl md:text-4xl mb-10">
            {lang === "zh" ? `${s.modules.length} 个模块组成本系统。` : `${s.modules.length} modules compose this system.`}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)]">
            {s.modules.map((m, i) => (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-[var(--bg)] p-6 flex flex-col gap-3 min-h-[12rem]"
              >
                <div className="font-mono text-[11px] tracking-wider uppercase" style={{ color: s.hue }}>
                  {String(i + 1).padStart(2, "0")} · {m.id}
                </div>
                <h3 className="font-display text-xl leading-tight">{t(m.name, lang)}</h3>
                <p className="font-body text-sm text-[var(--ink-soft)] leading-relaxed">{t(m.body, lang)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* DATA MODEL */}
      <section id="data-model" className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "数据模型" : "Data model"}</div>
          <h2 className="font-display text-3xl md:text-4xl mb-8">{t(s.dataModel.name, lang)}</h2>
          <div className="border border-[var(--rule)]">
            <div className="grid grid-cols-[160px_140px_1fr] font-mono text-[10px] uppercase tracking-wider bg-[var(--bg-alt)]/50 border-b border-[var(--rule)]">
              <div className="px-4 py-3 text-[var(--ink-soft)]">{lang === "zh" ? "字段" : "field"}</div>
              <div className="px-4 py-3 text-[var(--ink-soft)] border-l border-[var(--rule)]">{lang === "zh" ? "类型" : "type"}</div>
              <div className="px-4 py-3 text-[var(--ink-soft)] border-l border-[var(--rule)]">{lang === "zh" ? "说明" : "note"}</div>
            </div>
            {s.dataModel.fields.map((f, i) => (
              <div key={i} className="grid grid-cols-[160px_140px_1fr] border-b border-[var(--rule)] last:border-b-0">
                <div className="px-4 py-3 font-mono text-sm" style={{ color: s.hue }}>{f.key}</div>
                <div className="px-4 py-3 font-mono text-xs text-[var(--ink-soft)] border-l border-[var(--rule)]">{f.type}</div>
                <div className="px-4 py-3 font-body text-sm border-l border-[var(--rule)]">{t(f.note, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API */}
      <section id="api" className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "对外接口" : "Outbound APIs"}</div>
          <h2 className="font-display text-3xl md:text-4xl mb-8">
            {lang === "zh" ? "本系统需要别人提供什么。" : "What this system asks of its neighbors."}
          </h2>
          <div className="space-y-4">
            {s.apis.map((a, i) => {
              const target = SYSTEMS.find((x) => x.id === a.to);
              return (
                <article key={i} className="grid md:grid-cols-[200px_1fr] gap-px bg-[var(--rule)]">
                  <div className="bg-[var(--bg)] p-4 flex flex-col gap-1">
                    <div className="font-mono text-[10px] tracking-wider uppercase text-[var(--ink-soft)]">→ {a.to}</div>
                    {target ? (
                      <a href={SUBDOMAIN_FOR[target.id]} className="font-display text-lg hover:text-[var(--accent)]" style={{ color: target.hue }}>
                        {target.glyph} {t(target.name, lang)}
                      </a>
                    ) : (
                      <span className="font-display text-lg text-[var(--ink-soft)]">{a.to === "*" ? "any system" : a.to}</span>
                    )}
                  </div>
                  <div className="bg-[var(--bg)] p-4 flex flex-col gap-3">
                    <p className="font-body text-sm leading-relaxed">{t(a.contract, lang)}</p>
                    <code className="font-mono text-[12px] bg-[var(--bg-alt)]/60 px-3 py-2 self-start max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
                      {a.signature}
                    </code>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EQUATIONS */}
      <section id="equations" className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "方程与原理" : "Equations & principles"}</div>
          <h2 className="font-display text-3xl md:text-4xl mb-8">{lang === "zh" ? "本系统所信的——以及为何。" : "What this system believes — and why."}</h2>
          <div className="space-y-5">
            {s.equations.map((e, i) => (
              <article key={i} className="border border-[var(--rule)] p-5 md:p-6">
                <code className="block font-mono text-base md:text-lg" style={{ color: s.hue }}>{e.expr}</code>
                <p className="font-body text-sm md:text-base text-[var(--ink-soft)] mt-3 leading-relaxed">{t(e.caption, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UI SCREENS */}
      <section id="ui" className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "示例 UI" : "Example UI screens"}</div>
          <h2 className="font-display text-3xl md:text-4xl mb-8">{lang === "zh" ? "如果它有界面，会长这样。" : "If it had a UI, it would look like this."}</h2>
          <ol className="space-y-3">
            {s.uiScreens.map((u, i) => (
              <li key={i} className="flex gap-4 border-b border-[var(--rule)] pb-3">
                <span className="font-mono text-[12px] text-[var(--accent)] pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg leading-snug">{t(u, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
