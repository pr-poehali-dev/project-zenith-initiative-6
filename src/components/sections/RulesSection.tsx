import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { useSite } from "@/context/SiteContext"
import { useLang } from "@/context/LanguageContext"

export function RulesSection() {
  const { rules } = useSite()
  const { t } = useLang()
  const [activeCategory, setActiveCategory] = useState("general")
  const active = rules.find(c => c.id === activeCategory) ?? rules[0]

  return (
    <section id="rules" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{t.rules.subtitle}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            {t.rules.title}
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">{t.rules.desc}</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {rules.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <Icon name={cat.icon} fallback="Star" size={14} />
              {cat.title}
            </button>
          ))}
        </div>

        {active && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-zinc-800/50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950 flex items-center justify-center">
                <Icon name={active.icon} fallback="Star" size={18} className="text-red-400" />
              </div>
              <h3 className="font-heading font-semibold text-zinc-100">{active.title}</h3>
            </div>
            <div className="p-6 space-y-3">
              {active.rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 group-hover:bg-red-950 flex items-center justify-center text-xs text-zinc-500 group-hover:text-red-400 font-bold transition-colors mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{rule}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/30"
        >
          <Icon name="AlertTriangle" fallback="Star" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-500">
            <span className="text-red-400 font-medium">{t.rules.important}</span> {t.rules.importantText}
          </p>
        </motion.div>
      </div>
    </section>
  )
}