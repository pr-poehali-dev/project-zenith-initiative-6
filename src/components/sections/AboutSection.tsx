import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const features = [
  {
    icon: "Map",
    title: "Chernarus 2024",
    desc: "Fully customized map with new locations, caches, and unique points of interest.",
  },
  {
    icon: "Zap",
    title: "High Loot",
    desc: "Balanced item economy — every raid matters, good loot is never trivial.",
  },
  {
    icon: "Shield",
    title: "Anti-Cheat",
    desc: "Constant monitoring, quick bans, zero tolerance for cheaters and toxic players.",
  },
  {
    icon: "Users",
    title: "Active Community",
    desc: "Active Discord, regular events, tournaments and seasonal events from administration.",
  },
  {
    icon: "Crosshair",
    title: "PvP Zones",
    desc: "Special hot zones for intense PvP — there's always somewhere to fight.",
  },
  {
    icon: "Package",
    title: "Trading",
    desc: "Trader system and in-game market. Earn through crafting and trading.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">About the server</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Why exactly SODA?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            We're not just a server. We're a place where survival becomes a real story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="group h-full border-zinc-800/50 bg-zinc-900/50 hover:border-red-900/40 hover:bg-zinc-900/80 transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-red-950 flex items-center justify-center mb-4 transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon name={f.icon} fallback="Star" size={20} className="text-zinc-400 group-hover:text-red-400 transition-colors" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-zinc-100 mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}