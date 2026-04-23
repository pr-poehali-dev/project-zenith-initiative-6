import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"
import { useLang } from "@/context/LanguageContext"

export function OnlineSection() {
  const { t } = useLang()
  const [online, setOnline] = useState(42)
  const [maxSlots] = useState(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(prev => Math.max(1, Math.min(60, prev + Math.floor(Math.random() * 5) - 2)))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const percent = Math.round((online / maxSlots) * 100)

  return (
    <section className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-soda-500/30 bg-zinc-900/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-zinc-800 flex items-center justify-center bg-zinc-950">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-soda-300 to-soda-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-zinc-950"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-zinc-100">
                <motion.span key={online} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {online}
                </motion.span>
                <span className="text-zinc-500 text-2xl">/{maxSlots}</span>
              </div>
              <div className="text-zinc-400 text-sm">{t.online.playersOnline}</div>
            </div>
          </div>

          <div className="h-px md:h-16 w-full md:w-px bg-zinc-800" />

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-400 font-medium">{t.online.serverCapacity}</span>
              <span className="text-sm text-zinc-300 font-bold">{percent}%</span>
            </div>
            <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-soda-600 to-soda-300"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-zinc-500">{t.online.serverNormal}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-shrink-0">
            {[
              { label: t.online.map, value: "Chernarus" },
              { label: t.online.version, value: "1.25" },
              { label: t.online.type, value: "PvP/RP" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 w-16">{item.label}</span>
                <span className="text-xs text-zinc-300 font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          <a
            href="dayz://connect/109.248.4.240:2402"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-soda-300 hover:bg-soda-200 text-zinc-900 text-sm font-bold transition-all hover:scale-105 active:scale-95 font-display tracking-widest uppercase"
          >
            <Icon name="Play" size={16} />
            {t.online.connect}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
