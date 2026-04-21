import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const bans = [
  { id: 1, player: "HackMaster666", reason: "Читы (ESP + Aimbot)", date: "19.04.2026", duration: "Навсегда", severity: "perm" },
  { id: 2, player: "DupeFarm99", reason: "Дюп предметов", date: "18.04.2026", duration: "30 дней", severity: "long" },
  { id: 3, player: "ToxicRager", reason: "Систематические оскорбления", date: "17.04.2026", duration: "7 дней", severity: "mid" },
  { id: 4, player: "WallWalker", reason: "Эксплойт сквозь стены", date: "16.04.2026", duration: "Навсегда", severity: "perm" },
  { id: 5, player: "BaseCamper22", reason: "Нарушение правил рейда", date: "15.04.2026", duration: "3 дня", severity: "short" },
  { id: 6, player: "SafeZoneKiller", reason: "Убийство в сейф-зоне", date: "14.04.2026", duration: "7 дней", severity: "mid" },
  { id: 7, player: "FloodSpammer", reason: "Спам в чате", date: "13.04.2026", duration: "1 день", severity: "short" },
  { id: 8, player: "InvisCheat", reason: "Чит-программа", date: "12.04.2026", duration: "Навсегда", severity: "perm" },
]

const severityConfig = {
  perm: { label: "Навсегда", color: "text-red-400 bg-red-950/50 border-red-900/50" },
  long: { label: "Длительный", color: "text-orange-400 bg-orange-950/50 border-orange-900/50" },
  mid: { label: "Средний", color: "text-yellow-400 bg-yellow-950/50 border-yellow-900/50" },
  short: { label: "Короткий", color: "text-blue-400 bg-blue-950/50 border-blue-900/50" },
}

export function BanListSection() {
  const [search, setSearch] = useState("")

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
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Бан-лист</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Нарушители
          </h2>
          <p className="text-zinc-500">Мы не терпим читеров и токсиков. Все баны публичны.</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-6"
        >
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Поиск по нику или причине бана..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-300 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-800/50 overflow-hidden"
        >
          {/* Table header */}
          <div className="px-6 py-3 bg-zinc-900/80 border-b border-zinc-800/50 grid grid-cols-12 gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
            <span className="col-span-3">Игрок</span>
            <span className="col-span-4">Причина</span>
            <span className="col-span-2 hidden md:block">Дата</span>
            <span className="col-span-3">Срок</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-zinc-800/30">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 text-sm">Ничего не найдено</div>
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
          Показано {filtered.length} из {bans.length} записей · Обновляется ежедневно
        </div>
      </div>
    </section>
  )
}
