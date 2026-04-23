import { useState } from "react"
import { useLang } from "@/context/LanguageContext"
import { useNews, NewsTag } from "@/context/NewsContext"
import Icon from "@/components/ui/icon"

const ADMIN_LOGIN = "soda_admin"
const ADMIN_PASSWORD = "DayZ2024!"

const NEWS_TAGS: { tag: NewsTag; icon: string; color: string; label: string }[] = [
  { tag: "Update", icon: "RefreshCw", color: "border-green-700 bg-green-950/60 text-green-300", label: "Update" },
  { tag: "Server", icon: "Server", color: "border-blue-700 bg-blue-950/60 text-blue-300", label: "Server" },
  { tag: "Shop", icon: "ShoppingBag", color: "border-red-700 bg-red-950/60 text-red-300", label: "Shop" },
  { tag: "Event", icon: "Zap", color: "border-orange-700 bg-orange-950/60 text-orange-300", label: "Event" },
]

interface AdminPanelProps {
  onClose: () => void
}

type Screen = "dashboard" | "news-list" | "news-create"

export function AdminPanel({ onClose }: AdminPanelProps) {
  const { t } = useLang()
  const { news, addNews, deleteNews } = useNews()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [screen, setScreen] = useState<Screen>("dashboard")

  // News form state
  const [selectedTag, setSelectedTag] = useState<NewsTag | null>(null)
  const [newsTitle, setNewsTitle] = useState("")
  const [newsPreview, setNewsPreview] = useState("")
  const [newsSuccess, setNewsSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError(t.admin.wrongCredentials)
    }
  }

  function handleCreateNews(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedTag || !newsTitle.trim() || !newsPreview.trim()) return

    const wordCount = newsPreview.trim().split(/\s+/).length
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

    addNews({ tag: selectedTag, title: newsTitle.trim(), preview: newsPreview.trim(), date, readTime })

    setNewsTitle("")
    setNewsPreview("")
    setSelectedTag(null)
    setNewsSuccess(true)
    setTimeout(() => {
      setNewsSuccess(false)
      setScreen("news-list")
    }, 1200)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setLogin("")
    setPassword("")
    setScreen("dashboard")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            {isLoggedIn && screen !== "dashboard" && (
              <button onClick={() => setScreen(screen === "news-create" ? "news-list" : "dashboard")} className="text-zinc-500 hover:text-zinc-200 transition-colors mr-1">
                <Icon name="ChevronLeft" size={18} />
              </button>
            )}
            <Icon name="ShieldCheck" size={20} className="text-soda-300" />
            <span className="font-display text-zinc-100 tracking-widest uppercase text-sm">
              {screen === "news-list" ? "Новости" : screen === "news-create" ? "Создать новость" : t.admin.title}
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
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
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                className="mt-2 px-6 py-2.5 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors"
              >
                {t.admin.submit}
              </button>
            </form>

          ) : screen === "dashboard" ? (
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
                <button
                  onClick={() => setScreen("news-list")}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-soda-500/50 transition-all text-left"
                >
                  <Icon name="Newspaper" size={16} className="text-soda-300" />
                  <span className="text-zinc-300 text-sm">Новости</span>
                </button>
                {[
                  { icon: "ScrollText", label: "Правила" },
                  { icon: "Skull", label: "Килл-лента" },
                  { icon: "Ban", label: "Бан-лист" },
                  { icon: "Users", label: "Игроки" },
                  { icon: "Settings", label: "Настройки" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-soda-500/50 transition-all text-left"
                  >
                    <Icon name={item.icon} fallback="Settings" size={16} className="text-soda-300" />
                    <span className="text-zinc-300 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
              >
                <Icon name="LogOut" size={14} />
                {t.admin.logout}
              </button>
            </div>

          ) : screen === "news-list" ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setScreen("news-create")}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-soda-500/50 text-soda-300 hover:bg-soda-950/30 transition-all text-sm font-medium"
              >
                <Icon name="Plus" size={16} />
                Создать новость
              </button>

              <div className="flex flex-col gap-3">
                {news.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-200 text-sm font-medium truncate">{item.title}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{item.date}</p>
                    </div>
                    <button
                      onClick={() => deleteNews(item.id)}
                      className="shrink-0 text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          ) : screen === "news-create" ? (
            <form onSubmit={handleCreateNews} className="flex flex-col gap-5">
              {/* Tag selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Тип новости</label>
                <div className="grid grid-cols-2 gap-2">
                  {NEWS_TAGS.map(({ tag, icon, color, label }) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                        selectedTag === tag
                          ? color + " ring-2 ring-offset-2 ring-offset-zinc-900 ring-soda-400"
                          : "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      <Icon name={icon} fallback="Tag" size={15} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Заголовок</label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="Введите заголовок новости..."
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors placeholder:text-zinc-600"
                />
              </div>

              {/* Preview text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Текст</label>
                <textarea
                  value={newsPreview}
                  onChange={(e) => setNewsPreview(e.target.value)}
                  placeholder="Напишите текст новости..."
                  rows={4}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors resize-none placeholder:text-zinc-600"
                />
              </div>

              {newsSuccess ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-950/50 border border-green-800 text-green-400 text-sm">
                  <Icon name="CheckCircle" size={16} />
                  Новость опубликована!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!selectedTag || !newsTitle.trim() || !newsPreview.trim()}
                  className="py-3 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Опубликовать
                </button>
              )}
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}
