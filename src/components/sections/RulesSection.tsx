import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const ruleCategories = [
  {
    id: "general",
    title: "General Rules",
    icon: "BookOpen",
    rules: [
      "Respectful treatment of all players and administration.",
      "Racism, insults, and discrimination in any form are forbidden.",
      "Cheats, hacks, dupes and any exploits are forbidden.",
      "Intentionally ruining other players' experience is forbidden.",
      "Nicknames must not contain profanity or insults.",
      "Administration reserves the right to ban without warning for serious violations.",
    ],
  },
  {
    id: "pvp",
    title: "PvP Rules",
    icon: "Crosshair",
    rules: [
      "KOS (Kill on Sight) is allowed only in designated PvP zones.",
      "Killing players in safe zones and at traders is forbidden.",
      "Interaction (text or voice) is required before robbery.",
      "Killing a hostage after all conditions are met is forbidden.",
      "Unjustified KOS of new players (bambis) in safe zones is forbidden.",
    ],
  },
  {
    id: "base",
    title: "Bases & Construction",
    icon: "Home",
    rules: [
      "Building at spawn points and near traders (within 200m) is forbidden.",
      "Maximum base size is 20×20 blocks.",
      "Construction blocking loot spots and passages is forbidden.",
      "Bases inactive for 14 days may be removed by administration.",
      "Raids are only allowed during game hours (10:00–00:00 MSK).",
    ],
  },
  {
    id: "rp",
    title: "Roleplay Rules",
    icon: "MessageSquare",
    rules: [
      "Follow RP norms — they are part of the server atmosphere.",
      "Exiting the game during RP scenes or robberies is forbidden.",
      "Meta-gaming (using out-of-game information) results in a ban.",
      "Referencing the real world in roleplay situations is forbidden.",
    ],
  },
]

export function RulesSection() {
  const [activeCategory, setActiveCategory] = useState("general")
  const active = ruleCategories.find(c => c.id === activeCategory)!

  return (
    <section id="rules" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Rules</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            SODA Server Rules
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Violating the rules results in a ban without warning. Ignorance of the rules is not an excuse.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {ruleCategories.map((cat) => (
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/30"
        >
          <Icon name="AlertTriangle" fallback="Star" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-500">
            <span className="text-red-400 font-medium">Important:</span> Administration reserves the right to change rules without notice. Follow updates on Discord.
          </p>
        </motion.div>
      </div>
    </section>
  )
}