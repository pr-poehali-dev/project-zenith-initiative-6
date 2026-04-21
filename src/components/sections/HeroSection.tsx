import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const features = [
  { icon: "Shield", title: "СТАБИЛЬНОСТЬ", sub: "24/7 работа сервера" },
  { icon: "Crosshair", title: "ЧЕСТНАЯ ИГРА", sub: "Без читов" },
  { icon: "Users", title: "СООБЩЕСТВО", sub: "Помощь новичкам" },
  { icon: "Settings", title: "БАЛАНСНЫЕ МОДЫ", sub: "Для комфортной игры" },
  { icon: "Swords", title: "PVP", sub: "Жёсткие схватки" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-zinc-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/307a7106-8267-4453-b607-a8b56ec1617a/bucket/a88e331e-b821-4dcf-97f9-a94a98f5ed94.png')` }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-zinc-950/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 w-full">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="text-yellow-500 text-lg">★</span>
          <span className="text-yellow-500/80 text-xs font-bold tracking-[0.3em] uppercase">DayZ Standalone</span>
          <div className="flex-1 h-px bg-yellow-800/40 max-w-[80px]" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-2"
        >
          <h1
            className="font-display text-[clamp(80px,16vw,180px)] font-black leading-none tracking-wider text-white"
            style={{
              textShadow: "4px 4px 0px rgba(0,0,0,0.8), 0 0 60px rgba(212,175,55,0.15)",
              WebkitTextStroke: "1px rgba(212,175,55,0.3)",
            }}
          >
            SODA
          </h1>
        </motion.div>

        {/* PVP Server */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-baseline gap-4 mb-6"
        >
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest uppercase">PVP</span>
          <span className="text-zinc-300 font-bold text-2xl md:text-3xl tracking-widest uppercase">SERVER</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-2xl font-bold tracking-wide mb-10 uppercase"
        >
          <span className="text-zinc-100">ТЫ УЖЕ ЗДЕСЬ.&nbsp;</span>
          <span className="text-yellow-400">ПРОСТО ЕЩЁ НЕ ОСОЗНАЛ.</span>
        </motion.p>

        {/* Feature icons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-6 mb-10"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded border border-yellow-700/40 bg-yellow-950/30 flex items-center justify-center group-hover:border-yellow-500/60 transition-colors">
                <Icon name={f.icon} fallback="Star" size={16} className="text-yellow-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-200 tracking-widest uppercase">{f.title}</div>
                <div className="text-xs text-zinc-500">{f.sub}</div>
              </div>
              {i < features.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-zinc-700/50 ml-3" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          {/* Primary button */}
          <a
            href="dayz://connect/109.248.4.240:2402"
            className="group flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/70 bg-yellow-950/40 hover:bg-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Icon name="Server" size={18} className="text-yellow-400 group-hover:text-zinc-900 transition-colors" />
            <span className="text-yellow-300 group-hover:text-zinc-900 font-black tracking-[0.2em] uppercase text-sm transition-colors">
              Подключайся
            </span>
            <Icon name="ChevronRight" size={18} className="text-yellow-500 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
          </a>

          {/* IP button */}
          <div className="flex items-center gap-3 px-8 py-4 border border-zinc-700/60 bg-zinc-900/60 backdrop-blur-sm">
            <Icon name="Globe" size={18} className="text-zinc-500" />
            <span className="text-zinc-300 font-mono text-sm tracking-widest">109.248.4.240:2402</span>
          </div>
        </motion.div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 mt-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-yellow-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-zinc-500 tracking-widest uppercase">Сервер онлайн — присоединяйся прямо сейчас</span>
        </motion.div>
      </div>
    </section>
  )
}
