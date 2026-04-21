import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const features = [
  {
    icon: "Map",
    title: "Chernarus 2024",
    desc: "Полностью кастомизированная карта с новыми локациями, схронами и уникальными точками интереса.",
  },
  {
    icon: "Zap",
    title: "Высокий лут",
    desc: "Сбалансированная экономика предметов — каждый рейд имеет смысл, хороший лут не банальщина.",
  },
  {
    icon: "Shield",
    title: "Античит",
    desc: "Постоянный мониторинг, быстрые баны, нулевая терпимость к читерам и токсикам.",
  },
  {
    icon: "Users",
    title: "Живое сообщество",
    desc: "Активный Discord, регулярные ивенты, турниры и сезонные события от администрации.",
  },
  {
    icon: "Crosshair",
    title: "PvP-зоны",
    desc: "Специальные hot-зоны для интенсивного PvP — всегда есть где сразиться.",
  },
  {
    icon: "Package",
    title: "Торговля",
    desc: "Система трейдеров и игрового рынка. Зарабатывай на крафте и торговле.",
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
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">О сервере</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Почему именно SODA?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Мы не просто сервер. Мы — место, где выживание превращается в настоящую историю.
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
