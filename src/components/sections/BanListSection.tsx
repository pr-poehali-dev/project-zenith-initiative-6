import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { useSite } from "@/context/SiteContext"
import { useLang } from "@/context/LanguageContext"

export const severityConfig = {
  perm: { label: "Навсегда", color: "text-red-400 bg-red-950/50 border-red-900/50" },
  long: { label: "Длительный", color: "text-orange-400 bg-orange-950/50 border-orange-900/50" },
  mid: { label: "Средний", color: "text-soda-300 bg-soda-950/50 border-soda-700/50" },
  short: { label: "Короткий", color: "text-blue-400 bg-blue-950/50 border-blue-900/50" },
}

export function BanListSection() {
  const [search, setSearch] = useState("")
  const { bans } = useSite()
  const { t } = useLang()

  const filtered = bans.filter(
    b => b.player.toLowerCase().includes(search.toLowerCase()) || b.reason.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="banlist" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{t.banlist.subtitle}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            {t.banlist.title}
          </h2>
          <p className="text-zinc-500">{t.banlist.desc}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-6"
        >
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder={t.banlist.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-300 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-800/50 overflow-hidden"
        >
          <div className="px-6 py-3 bg-zinc-900/80 border-b border-zinc-800/50 grid grid-cols-12 gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
            <span className="col-span-3">{t.banlist.player}</span>
            <span className="col-span-4">{t.banlist.reason}</span>
            <span className="col-span-2 hidden md:block">{t.banlist.date}</span>
            <span className="col-span-3">{t.banlist.duration}</span>
          </div>

          <div className="divide-y divide-zinc-800/30">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 text-sm">{t.banlist.notFound}</div>
            ) : (
              filtered.map((ban, i) => (
                <motion.div
                  key={ban.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-zinc-800/20 transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={14} className="text-zinc-500" />
                    </div>
                    <span className="text-zinc-300 text-sm font-medium truncate">{ban.player}</span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-zinc-500 text-sm">{ban.reason}</span>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="text-zinc-600 text-xs">{ban.date}</span>
                  </div>
                  <div className="col-span-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityConfig[ban.severity].color}`}>
                      {ban.duration}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <div className="mt-4 text-center text-xs text-zinc-600">
          {t.banlist.total} {filtered.length} / {bans.length} · {t.banlist.updated}
        </div>
      </div>
    </section>
  )
}