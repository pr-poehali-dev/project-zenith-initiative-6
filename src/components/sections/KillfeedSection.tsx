import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"

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
  { id: 1, killer: "GhostRaider", victim: "NewSurvivor22", weapon: "M4A1", distance: 187, time: "2 мин назад", type: "pvp" },
  { id: 2, killer: "DarkWolf", victim: "SodaPlayer99", weapon: "SVD", distance: 312, time: "5 мин назад", type: "pvp" },
  { id: 3, killer: "Zombie", victim: "LootRunner", weapon: "Укус", time: "7 мин назад", type: "zombie" },
  { id: 4, killer: "RedFox", victim: "BunkerKing", weapon: "AKM", distance: 54, time: "12 мин назад", type: "pvp" },
  { id: 5, killer: "IronGhost", victim: "SurvivalAce", weapon: "MP5K", distance: 28, time: "15 мин назад", type: "pvp" },
  { id: 6, killer: "Голод", victim: "Drifter88", weapon: "—", time: "18 мин назад", type: "environment" },
  { id: 7, killer: "NightStalker", victim: "GhostRaider", weapon: "Blaze 95", distance: 201, time: "22 мин назад", type: "pvp" },
  { id: 8, killer: "StormBear", victim: "LoneWolf7", weapon: "Mosin", distance: 498, time: "28 мин назад", type: "pvp" },
]

const weapons = ["M4A1", "AKM", "SVD", "MP5K", "Mosin", "Blaze 95", "Glock 19", "Кулак"]
const names = ["Survivor", "DarkHunter", "RedWolf", "NightOwl", "SodaFan", "Raider", "Ghost", "Iron"]

function randomName() { return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99) }
function randomWeapon() { return weapons[Math.floor(Math.random() * weapons.length)] }

export function KillfeedSection() {
  const [kills, setKills] = useState<KillEntry[]>(initialKills)

  useEffect(() => {
    const interval = setInterval(() => {
      const newKill: KillEntry = {
        id: Date.now(),
        killer: randomName(),
        victim: randomName(),
        weapon: randomWeapon(),
        distance: Math.random() > 0.3 ? Math.floor(Math.random() * 500) + 10 : undefined,
        time: "только что",
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
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Килфид</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Лента убийств
          </h2>
          <p className="text-zinc-500">Что происходит на сервере прямо сейчас</p>
        </motion.div>

        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-soda-300"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-zinc-300">Live Feed</span>
            </div>
            <span className="text-xs text-zinc-600 flex items-center gap-1.5">
              <Icon name="RefreshCw" size={12} />
              Обновляется в реальном времени
            </span>
          </div>

          {/* Kill list */}
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
                  {/* Type icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    kill.type === "pvp" ? "bg-soda-950" : kill.type === "zombie" ? "bg-zinc-800" : "bg-zinc-800"
                  }`}>
                    {kill.type === "pvp" && <Icon name="Crosshair" size={14} className="text-soda-300" />}
                    {kill.type === "zombie" && <span className="text-xs">🧟</span>}
                    {kill.type === "environment" && <Icon name="Skull" size={14} className="text-zinc-400" />}
                  </div>

                  {/* Kill info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-zinc-100 font-medium text-sm">{kill.killer}</span>
                      <span className="text-zinc-600 text-xs">убил</span>
                      <span className="text-zinc-400 text-sm">{kill.victim}</span>
                      <span className="text-zinc-600 text-xs">из</span>
                      <span className="text-soda-300 text-sm font-medium">{kill.weapon}</span>
                      {kill.distance && (
                        <>
                          <span className="text-zinc-600 text-xs">с</span>
                          <span className="text-zinc-300 text-xs font-mono">{kill.distance}м</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Time */}
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