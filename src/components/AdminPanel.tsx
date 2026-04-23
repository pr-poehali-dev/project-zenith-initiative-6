import { useState } from "react"
import { useLang } from "@/context/LanguageContext"
import Icon from "@/components/ui/icon"

const ADMIN_LOGIN = "soda_admin"
const ADMIN_PASSWORD = "DayZ2024!"

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const { t } = useLang()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError(t.admin.wrongCredentials)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={20} className="text-soda-300" />
            <span className="font-display text-zinc-100 tracking-widest uppercase text-sm">{t.admin.title}</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6">
          {!isLoggedIn ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{t.admin.login}</label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors"
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{t.admin.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors"
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}
              <button
                type="submit"
                className="mt-2 px-6 py-2.5 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors"
              >
                {t.admin.submit}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soda-950 border border-soda-500/50 flex items-center justify-center">
                  <Icon name="User" size={18} className="text-soda-300" />
                </div>
                <div>
                  <div className="text-zinc-100 text-sm font-display tracking-wide">{t.admin.welcome}</div>
                  <div className="text-zinc-500 text-xs">SODA DayZ — Admin</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Newspaper", label: "Новости" },
                  { icon: "ScrollText", label: "Правила" },
                  { icon: "Skull", label: "Килл-лента" },
                  { icon: "Ban", label: "Бан-лист" },
                  { icon: "Users", label: "Игроки" },
                  { icon: "Settings", label: "Настройки" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-soda-500/50 hover:bg-zinc-750 transition-all text-left"
                  >
                    <Icon name={item.icon} fallback="Settings" size={16} className="text-soda-300" />
                    <span className="text-zinc-300 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setIsLoggedIn(false); setLogin(""); setPassword("") }}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
              >
                <Icon name="LogOut" size={14} />
                {t.admin.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
