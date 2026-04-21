import { motion } from "framer-motion"

const socials = [
  {
    name: "Discord",
    description: "Живой чат, события, обсуждения",
    color: "from-indigo-600 to-indigo-800",
    borderColor: "border-indigo-800/50 hover:border-indigo-600/60",
    bgGlow: "bg-indigo-600/10",
    icon: "💬",
    href: "#",
    members: "1,200+",
    label: "участников",
  },
  {
    name: "VK",
    description: "Новости, скриншоты, объявления",
    color: "from-blue-600 to-blue-800",
    borderColor: "border-blue-800/50 hover:border-blue-600/60",
    bgGlow: "bg-blue-600/10",
    icon: "🔵",
    href: "#",
    members: "3,400+",
    label: "подписчиков",
  },
  {
    name: "Онлайн-магазин",
    description: "Привилегии, кейсы, кастомизация",
    color: "from-red-600 to-red-800",
    borderColor: "border-red-800/50 hover:border-red-600/60",
    bgGlow: "bg-red-600/10",
    icon: "🛒",
    href: "#shop",
    members: "500+",
    label: "товаров",
  },
  {
    name: "WarGM",
    description: "Боевые миссии и турниры",
    color: "from-orange-600 to-orange-800",
    borderColor: "border-orange-800/50 hover:border-orange-600/60",
    bgGlow: "bg-orange-600/10",
    icon: "⚔️",
    href: "#",
    members: "TOP",
    label: "сервер",
  },
]

export function SocialSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">Сообщество</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100">
            Присоединяйся к нам
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target={s.href !== "#shop" ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative rounded-2xl border ${s.borderColor} bg-zinc-900/50 p-6 flex flex-col gap-4 transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 ${s.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className={`inline-block text-sm font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>
                  {s.name}
                </div>
                <p className="text-zinc-500 text-xs">{s.description}</p>
              </div>

              <div className="relative z-10 mt-auto pt-3 border-t border-zinc-800/50">
                <span className="text-zinc-100 font-bold text-lg">{s.members}</span>
                <span className="text-zinc-500 text-xs ml-2">{s.label}</span>
              </div>

              {/* Arrow */}
              <motion.div
                className="absolute top-4 right-4 text-zinc-600 group-hover:text-zinc-300 transition-colors"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                →
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
