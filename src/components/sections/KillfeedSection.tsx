import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"
import { useSite } from "@/context/SiteContext"
import { useLang } from "@/context/LanguageContext"

interface KillEntry {
  id: number
  killer: string
  victim: string
  weapon: string
  distance?: number
  time: string
  type: "pvp" | "zombie" | "environment"
}

const initialKills: KillEntry[] = [
  { id: 1, killer: "GhostRaider", victim: "NewSurvivor22", weapon: "M4A1", distance: 187, time: "2 min ago", type: "pvp" },
  { id: 2, killer: "DarkWolf", victim: "SodaPlayer99", weapon: "SVD", distance: 312, time: "5 min ago", type: "pvp" },
  { id: 3, killer: "Zombie", victim: "LootRunner", weapon: "Bite", time: "7 min ago", type: "zombie" },
  { id: 4, killer: "RedFox", victim: "BunkerKing", weapon: "AKM", distance: 54, time: "12 min ago", type: "pvp" },
  { id: 5, killer: "IronGhost", victim: "SurvivalAce", weapon: "MP5K", distance: 28, time: "15 min ago", type: "pvp" },
  { id: 6, killer: "Starvation", victim: "Drifter88", weapon: "—", time: "18 min ago", type: "environment" },
  { id: 7, killer: "NightStalker", victim: "GhostRaider", weapon: "Blaze 95", distance: 201, time: "22 min ago", type: "pvp" },
  { id: 8, killer: "StormBear", victim: "LoneWolf7", weapon: "Mosin", distance: 498, time: "28 min ago", type: "pvp" },
]

const weapons = ["M4A1", "AKM", "SVD", "MP5K", "Mosin", "Blaze 95", "Glock 19", "Fists"]
const names = ["Survivor", "DarkHunter", "RedWolf", "NightOwl", "SodaFan", "Raider", "Ghost", "Iron"]

function randomName() { return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99) }
function randomWeapon() { return weapons[Math.floor(Math.random() * weapons.length)] }

const RANK_MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

export function KillfeedSection() {
  const [kills, setKills] = useState<KillEntry[]>(initialKills)
  const { leaderboard, weekLabel } = useSite()
  const { t } = useLang()

  useEffect(() => {
    const interval = setInterval(() => {
      const newKill: KillEntry = {
        id: Date.now(),
        killer: randomName(),
        victim: randomName(),
        weapon: randomWeapon(),
        distance: Math.random() > 0.3 ? Math.floor(Math.random() * 500) + 10 : undefined,
        time: "just now",
        type: "pvp",
      }
      setKills(prev => [newKill, ...prev.slice(0, 9)])
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="killfeed" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{t.killfeed.subtitle}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            {t.killfeed.title}
          </h2>
          <p className="text-zinc-500">{t.killfeed.desc}</p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Trophy" size={18} className="text-yellow-400" />
              <span className="text-sm font-medium text-zinc-100 font-display tracking-wide uppercase">{t.killfeed.leaderboard}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Icon name="CalendarDays" size={12} />
              <span>{weekLabel}</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">{t.killfeed.resetNote}</span>
            </div>
          </div>

          {/* Table header */}
          <div className="px-6 py-2 bg-zinc-900/80 border-b border-zinc-800/30 grid grid-cols-12 gap-2 text-xs font-medium text-zinc-600 uppercase tracking-wider">
            <span className="col-span-1">{t.killfeed.rank}</span>
            <span className="col-span-5">{t.killfeed.player}</span>
            <span className="col-span-3 text-center">{t.killfeed.kills}</span>
            <span className="col-span-3 hidden md:block">{t.killfeed.server}</span>
          </div>

          <div className="divide-y divide-zinc-800/20">
            {leaderboard.slice(0, 10).map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`px-6 py-3 grid grid-cols-12 gap-2 items-center transition-colors ${
                  entry.rank === 1 ? "bg-yellow-950/10" : entry.rank === 2 ? "bg-zinc-800/10" : entry.rank === 3 ? "bg-orange-950/10" : "hover:bg-zinc-800/10"
                }`}
              >
                <span className="col-span-1 text-sm font-bold">
                  {RANK_MEDALS[entry.rank] ?? <span className="text-zinc-500">{entry.rank}</span>}
                </span>
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                    <Icon name="User" size={13} className="text-zinc-500" />
                  </div>
                  <span className={`text-sm font-medium truncate ${entry.rank <= 3 ? "text-zinc-100" : "text-zinc-300"}`}>{entry.player}</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className={`text-sm font-mono font-bold ${entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-zinc-300" : entry.rank === 3 ? "text-orange-400" : "text-soda-300"}`}>
                    {entry.kills}
                  </span>
                </div>
                <span className="col-span-3 hidden md:block text-xs text-zinc-500">{entry.server}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Kill Feed */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-soda-300"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-zinc-300">{t.killfeed.live}</span>
            </div>
            <span className="text-xs text-zinc-600 flex items-center gap-1.5">
              <Icon name="RefreshCw" size={12} />
              {t.killfeed.realtime}
            </span>
          </div>

          <div className="divide-y divide-zinc-800/30">
            <AnimatePresence initial={false}>
              {kills.map((kill, i) => (
                <motion.div
                  key={kill.id}
                  initial={{ opacity: 0, x: -20, backgroundColor: "rgba(220,38,38,0.1)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i === 0 ? 0 : 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-zinc-800/20 transition-colors"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    kill.type === "pvp" ? "bg-soda-950" : "bg-zinc-800"
                  }`}>
                    {kill.type === "pvp" && <Icon name="Crosshair" size={14} className="text-soda-300" />}
                    {kill.type === "zombie" && <span className="text-xs">🧟</span>}
                    {kill.type === "environment" && <Icon name="Skull" size={14} className="text-zinc-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-zinc-100 font-medium text-sm">{kill.killer}</span>
                      <span className="text-zinc-600 text-xs">{t.killfeed.killed}</span>
                      <span className="text-zinc-400 text-sm">{kill.victim}</span>
                      <span className="text-zinc-600 text-xs">{t.killfeed.with}</span>
                      <span className="text-soda-300 text-sm font-medium">{kill.weapon}</span>
                      {kill.distance && (
                        <>
                          <span className="text-zinc-600 text-xs">{t.killfeed.from}</span>
                          <span className="text-zinc-300 text-xs font-mono">{kill.distance}m</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-xs text-zinc-600">{kill.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}