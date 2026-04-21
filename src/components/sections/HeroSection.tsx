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
      {/* Hidden SVG distress filter */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="distress">
            <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed="2" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="threshNoise">
              <feFuncA type="discrete" tableValues="0 0 0 0 0 0 1 1" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="threshNoise" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/307a7106-8267-4453-b607-a8b56ec1617a/bucket/f653f245-35da-4c85-af19-6ea20f73c191.png')` }}
      />
      <div className="absolute inset-0 bg-zinc-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 w-full">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="text-soda-300 text-lg">★</span>
          <span className="text-soda-300/80 text-xs font-bold tracking-[0.3em] uppercase font-display">DayZ Standalone</span>
          <div className="flex-1 h-px bg-soda-500/40 max-w-[80px]" />
        </motion.div>

        {/* Main title — distressed military font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-2"
        >
          <h1
            className="font-display text-[clamp(80px,16vw,180px)] font-black leading-none tracking-wider text-white"
            style={{
              filter: "url(#distress)",
              textShadow: "3px 3px 0px rgba(0,0,0,0.9)",
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
          <span className="text-soda-300 font-display text-2xl md:text-3xl tracking-widest uppercase">PVP</span>
          <span className="text-zinc-300 font-display text-2xl md:text-3xl tracking-widest uppercase">SERVER</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-2xl font-display tracking-wide mb-10 uppercase"
        >
          <span className="text-zinc-100">ТЫ УЖЕ ЗДЕСЬ.&nbsp;</span>
          <span className="text-soda-300">ПРОСТО ЕЩЁ НЕ ОСОЗНАЛ.</span>
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
              <div className="w-9 h-9 rounded border border-soda-500/50 bg-soda-950/40 flex items-center justify-center group-hover:border-soda-300/70 transition-colors">
                <Icon name={f.icon} fallback="Star" size={16} className="text-soda-300" />
              </div>
              <div>
                <div className="text-xs font-display text-zinc-200 tracking-widest uppercase">{f.title}</div>
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
          <a
            href="dayz://connect/109.248.4.240:2402"
            className="group flex items-center gap-3 px-8 py-4 border-2 border-soda-500/70 bg-soda-950/50 hover:bg-soda-300 hover:border-soda-300 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Icon name="Server" size={18} className="text-soda-300 group-hover:text-zinc-900 transition-colors" />
            <span className="text-soda-200 group-hover:text-zinc-900 font-display tracking-[0.2em] uppercase text-sm transition-colors">
              Подключайся
            </span>
            <Icon name="ChevronRight" size={18} className="text-soda-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
          </a>

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
            className="w-2 h-2 rounded-full bg-soda-300"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-zinc-500 tracking-widest uppercase font-display">Сервер онлайн — присоединяйся прямо сейчас</span>
        </motion.div>
      </div>
    </section>
  )
}