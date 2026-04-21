import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const news = [
  {
    id: 1,
    tag: "Update",
    tagColor: "text-green-400 bg-green-950/50 border-green-900/50",
    title: "Patch 1.25 — new locations and loot balance",
    date: "April 18, 2026",
    preview: "Added three new military locations in the north of the map. Revised the loot spawn table — M4 is now rarer, making gear hunting more exciting.",
    readTime: "3 min",
  },
  {
    id: 2,
    tag: "Event",
    tagColor: "text-orange-400 bg-orange-950/50 border-orange-900/50",
    title: "Event 'Survivor Hunt' — April 25",
    date: "April 15, 2026",
    preview: "Special event with unique rewards. One player is the target, everyone else are hunters. The winner gets an exclusive skin and 3000 coins.",
    readTime: "2 min",
  },
  {
    id: 3,
    tag: "Server",
    tagColor: "text-blue-400 bg-blue-950/50 border-blue-900/50",
    title: "Maintenance April 20, 03:00–06:00",
    date: "April 12, 2026",
    preview: "Scheduled server maintenance. Core update, database optimization. We apologize for any inconvenience.",
    readTime: "1 min",
  },
  {
    id: 4,
    tag: "Shop",
    tagColor: "text-red-400 bg-red-950/50 border-red-900/50",
    title: "New privileges in the shop",
    date: "April 8, 2026",
    preview: "Added Survivor and Raider ranks with unique bonuses. Special 20% discount on all packages until end of April.",
    readTime: "2 min",
  },
]

export function NewsSection() {
  return (
    <section id="news" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">News</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100">
              What's new on SODA
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            All news
            <Icon name="ArrowRight" size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group cursor-pointer rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-3 text-zinc-600 text-xs">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {item.readTime}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{item.preview}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>Read more</span>
                  <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}