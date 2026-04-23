import { useState } from "react"
import Icon from "@/components/ui/icon"
import { useLang } from "@/context/LanguageContext"
import { AdminPanel } from "@/components/AdminPanel"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#rules", label: t.nav.rules },
    { href: "#news", label: t.nav.news },
    { href: "#killfeed", label: t.nav.killfeed },
    { href: "#banlist", label: t.nav.banlist },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 p-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-6 rounded-full bg-zinc-900/70 border border-zinc-800/50 backdrop-blur-md">
          <a href="/" className="font-display text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/307a7106-8267-4453-b607-a8b56ec1617a/bucket/5dea514f-d85e-4471-bb40-5c9279d52a73.png" alt="SODA" className="w-10 h-10 object-contain" /> SODA
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-sm rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}

            {/* Language switcher */}
            <div className="flex items-center gap-0.5 ml-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 p-0.5">
              <button
                onClick={() => setLang("ru")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "ru"
                    ? "bg-soda-300 text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="text-base leading-none">🇷🇺</span>
                <span className="font-display tracking-wider">RU</span>
              </button>
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "en"
                    ? "bg-soda-300 text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="text-base leading-none">🇬🇧</span>
                <span className="font-display tracking-wider">EN</span>
              </button>
            </div>

            {/* Admin button */}
            <button
              onClick={() => setAdminOpen(true)}
              className="ml-2 flex items-center gap-2 px-4 py-1.5 text-sm rounded-full bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-soda-500/50 hover:text-zinc-100 transition-all"
            >
              <Icon name="ShieldCheck" size={14} className="text-soda-300" />
              {t.nav.admin}
            </button>
          </div>
          <button className="md:hidden text-zinc-400" onClick={() => setOpen(!open)}>
            <Icon name={open ? "X" : "Menu"} size={20} />
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 max-w-5xl mx-auto rounded-2xl bg-zinc-900/95 border border-zinc-800 p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 rounded-xl hover:bg-zinc-800 transition-colors">
                {link.label}
              </a>
            ))}
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 px-4 py-2">
              <button
                onClick={() => setLang("ru")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lang === "ru" ? "bg-soda-300 text-zinc-900" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <span className="text-base">🇷🇺</span> RU
              </button>
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lang === "en" ? "bg-soda-300 text-zinc-900" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <span className="text-base">🇬🇧</span> EN
              </button>
            </div>
            <button
              onClick={() => { setAdminOpen(true); setOpen(false) }}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors mt-1"
            >
              <Icon name="ShieldCheck" size={14} className="text-soda-300" />
              {t.nav.admin}
            </button>
          </div>
        )}
      </header>
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </>
  )
}
