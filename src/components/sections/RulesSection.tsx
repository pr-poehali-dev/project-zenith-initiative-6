import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const ruleCategories = [
  {
    id: "general",
    title: "Общие правила",
    icon: "BookOpen",
    rules: [
      "Уважительное отношение ко всем игрокам и администрации.",
      "Запрещён расизм, оскорбления, дискриминация в любой форме.",
      "Запрещены читы, хаки, дюпы и любые эксплойты.",
      "Запрещено намеренно разрушать игровой опыт других игроков.",
      "Никнейм не должен содержать нецензурную лексику или оскорбления.",
      "Администрация оставляет за собой право вынести бан без предупреждения при грубых нарушениях.",
    ],
  },
  {
    id: "pvp",
    title: "PvP правила",
    icon: "Crosshair",
    rules: [
      "KOS (Kill on Sight) разрешён только в обозначенных PvP-зонах.",
      "Запрещено убивать игроков в сейф-зонах и у трейдеров.",
      "Перед ограблением обязательно взаимодействие (текстом или голосом).",
      "Запрещено убивать заложника, если выполнены все условия.",
      "Запрещён беспричинный KOS новых игроков (bambis) в безопасных зонах.",
    ],
  },
  {
    id: "base",
    title: "Базы и строительство",
    icon: "Home",
    rules: [
      "Запрещено строить на спавн-точках и у трейдеров (ближе 200 м).",
      "Максимальный размер базы — 20×20 блоков.",
      "Запрещена постройка, блокирующая лут-споты и проходы.",
      "Базы без активности 14 дней могут быть снесены администрацией.",
      "Рейды только в игровое время (10:00–00:00 по МСК).",
    ],
  },
  {
    id: "rp",
    title: "Ролевые правила",
    icon: "MessageSquare",
    rules: [
      "Соблюдайте RP-нормы — это часть атмосферы сервера.",
      "Запрещён выход из игры во время RP-сцены или ограбления.",
      "Meta-gaming (использование информации вне игры) — бан.",
      "Нельзя ссылаться на реальный мир в ролевых ситуациях.",
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
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Правила</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Правила сервера SODA
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Нарушение правил ведёт к бану без предупреждения. Незнание правил — не оправдание.
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
            <span className="text-red-400 font-medium">Важно:</span> Администрация оставляет за собой право изменять правила без уведомления. Следите за обновлениями в Discord.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
