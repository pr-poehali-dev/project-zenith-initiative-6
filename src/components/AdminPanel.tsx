import { useState } from "react"
import { useLang } from "@/context/LanguageContext"
import { useNews, NewsTag } from "@/context/NewsContext"
import { useSite, BanSeverity, BanEntry } from "@/context/SiteContext"
import Icon from "@/components/ui/icon"

const ADMIN_LOGIN = "Sodawstaff7665"
const ADMIN_PASSWORD = "UnitSpass873!admin"

const NEWS_TAGS: { tag: NewsTag; icon: string; color: string }[] = [
  { tag: "Update", icon: "RefreshCw", color: "border-green-700 bg-green-950/60 text-green-300" },
  { tag: "Server", icon: "Server", color: "border-blue-700 bg-blue-950/60 text-blue-300" },
  { tag: "Shop", icon: "ShoppingBag", color: "border-red-700 bg-red-950/60 text-red-300" },
  { tag: "Event", icon: "Zap", color: "border-orange-700 bg-orange-950/60 text-orange-300" },
]

const SEVERITY_OPTIONS: { value: BanSeverity; label: string }[] = [
  { value: "perm", label: "Навсегда" },
  { value: "long", label: "Длительный" },
  { value: "mid", label: "Средний" },
  { value: "short", label: "Короткий" },
]

type Screen =
  | "dashboard"
  | "news-list" | "news-create"
  | "ban-list" | "ban-create" | "ban-edit"
  | "rules"
  | "ticker"

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const { t } = useLang()
  const { news, addNews, deleteNews } = useNews()
  const { bans, addBan, updateBan, deleteBan, rules, updateRuleCategory, addRuleToCategory, deleteRuleFromCategory, ticker, updateTicker } = useSite()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [screen, setScreen] = useState<Screen>("dashboard")

  // News form
  const [selectedTag, setSelectedTag] = useState<NewsTag | null>(null)
  const [newsTitle, setNewsTitle] = useState("")
  const [newsPreview, setNewsPreview] = useState("")
  const [newsSuccess, setNewsSuccess] = useState(false)

  // Ban form
  const [editingBan, setEditingBan] = useState<BanEntry | null>(null)
  const [banPlayer, setBanPlayer] = useState("")
  const [banReason, setBanReason] = useState("")
  const [banDate, setBanDate] = useState("")
  const [banDuration, setBanDuration] = useState("")
  const [banSeverity, setBanSeverity] = useState<BanSeverity>("perm")

  // Rules
  const [activeRuleCat, setActiveRuleCat] = useState(rules[0]?.id ?? "")
  const [newRule, setNewRule] = useState("")
  const [editingRuleIdx, setEditingRuleIdx] = useState<number | null>(null)
  const [editingRuleText, setEditingRuleText] = useState("")

  // Ticker
  const [tickerText, setTickerText] = useState(ticker.text)
  const [tickerTextColor, setTickerTextColor] = useState(ticker.textColor)
  const [tickerBorderColor, setTickerBorderColor] = useState(ticker.borderColor)
  const [tickerGlowColor, setTickerGlowColor] = useState(ticker.glowColor)
  const [tickerSaved, setTickerSaved] = useState(false)

  const SCREENS_TITLE: Record<Screen, string> = {
    dashboard: t.admin.title,
    "news-list": "Новости",
    "news-create": "Создать новость",
    "ban-list": "Бан-лист",
    "ban-create": "Добавить бан",
    "ban-edit": "Редактировать бан",
    rules: "Правила",
    ticker: "Бегущая строка",
  }

  const BACK_MAP: Partial<Record<Screen, Screen>> = {
    "news-create": "news-list",
    "news-list": "dashboard",
    "ban-create": "ban-list",
    "ban-edit": "ban-list",
    "ban-list": "dashboard",
    rules: "dashboard",
    ticker: "dashboard",
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true); setError("")
    } else {
      setError(t.admin.wrongCredentials)
    }
  }

  function handleLogout() {
    setIsLoggedIn(false); setLogin(""); setPassword(""); setScreen("dashboard")
  }

  function goTo(s: Screen) { setScreen(s) }

  function goBack() {
    const back = BACK_MAP[screen]
    if (back) setScreen(back)
  }

  function handleCreateNews(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedTag || !newsTitle.trim() || !newsPreview.trim()) return
    const wordCount = newsPreview.trim().split(/\s+/).length
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    addNews({ tag: selectedTag, title: newsTitle.trim(), preview: newsPreview.trim(), date, readTime })
    setNewsTitle(""); setNewsPreview(""); setSelectedTag(null)
    setNewsSuccess(true)
    setTimeout(() => { setNewsSuccess(false); setScreen("news-list") }, 1200)
  }

  function openCreateBan() {
    setEditingBan(null)
    setBanPlayer(""); setBanReason("")
    setBanDate(new Date().toLocaleDateString("ru-RU"))
    setBanDuration("Навсегда"); setBanSeverity("perm")
    goTo("ban-create")
  }

  function openEditBan(ban: BanEntry) {
    setEditingBan(ban)
    setBanPlayer(ban.player); setBanReason(ban.reason); setBanDate(ban.date)
    setBanDuration(ban.duration); setBanSeverity(ban.severity)
    goTo("ban-edit")
  }

  function handleSaveBan(e: React.FormEvent) {
    e.preventDefault()
    if (!banPlayer.trim() || !banReason.trim()) return
    const entry = { player: banPlayer.trim(), reason: banReason.trim(), date: banDate, duration: banDuration, severity: banSeverity }
    if (editingBan) {
      updateBan({ ...entry, id: editingBan.id })
    } else {
      addBan(entry)
    }
    goTo("ban-list")
  }

  function handleSaveTicker() {
    updateTicker({ text: tickerText, textColor: tickerTextColor, borderColor: tickerBorderColor, glowColor: tickerGlowColor })
    setTickerSaved(true)
    setTimeout(() => setTickerSaved(false), 1500)
  }

  const activeRuleCatData = rules.find(c => c.id === activeRuleCat) ?? rules[0]

  function handleAddRule() {
    if (!newRule.trim()) return
    addRuleToCategory(activeRuleCat, newRule.trim())
    setNewRule("")
  }

  function startEditRule(idx: number, text: string) {
    setEditingRuleIdx(idx); setEditingRuleText(text)
  }

  function saveEditRule(catId: string, idx: number) {
    if (!editingRuleText.trim()) return
    const cat = rules.find(c => c.id === catId)
    if (!cat) return
    const updated = cat.rules.map((r, i) => i === idx ? editingRuleText.trim() : r)
    updateRuleCategory({ ...cat, rules: updated })
    setEditingRuleIdx(null); setEditingRuleText("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            {isLoggedIn && screen !== "dashboard" && (
              <button onClick={goBack} className="text-zinc-500 hover:text-zinc-200 transition-colors">
                <Icon name="ChevronLeft" size={18} />
              </button>
            )}
            <Icon name="ShieldCheck" size={20} className="text-soda-300" />
            <span className="font-display text-zinc-100 tracking-widest uppercase text-sm">
              {SCREENS_TITLE[screen]}
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">

          {!isLoggedIn && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{t.admin.login}</label>
                <input type="text" value={login} onChange={e => setLogin(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors" autoComplete="username" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{t.admin.password}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors" autoComplete="current-password" />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit"
                className="mt-2 px-6 py-2.5 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors">
                {t.admin.submit}
              </button>
            </form>
          )}

          {isLoggedIn && screen === "dashboard" && (
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
                {([
                  { icon: "Newspaper", label: "Новости", s: "news-list" },
                  { icon: "Ban", label: "Бан-лист", s: "ban-list" },
                  { icon: "ScrollText", label: "Правила", s: "rules" },
                  { icon: "Tv2", label: "Бегущая строка", s: "ticker" },
                  { icon: "Skull", label: "Килл-лента", s: null },
                  { icon: "Settings", label: "Настройки", s: null },
                ] as { icon: string; label: string; s: Screen | null }[]).map(item => (
                  <button key={item.label}
                    onClick={() => item.s && goTo(item.s)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-soda-500/50 transition-all text-left">
                    <Icon name={item.icon} fallback="Settings" size={16} className="text-soda-300" />
                    <span className="text-zinc-300 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                <Icon name="LogOut" size={14} />
                {t.admin.logout}
              </button>
            </div>
          )}

          {isLoggedIn && screen === "news-list" && (
            <div className="flex flex-col gap-4">
              <button onClick={() => goTo("news-create")}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-soda-500/50 text-soda-300 hover:bg-soda-950/30 transition-all text-sm font-medium">
                <Icon name="Plus" size={16} /> Создать новость
              </button>
              <div className="flex flex-col gap-2">
                {news.map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${item.tagColor}`}>{item.tag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-200 text-sm font-medium truncate">{item.title}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{item.date}</p>
                    </div>
                    <button onClick={() => deleteNews(item.id)} className="shrink-0 text-zinc-600 hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoggedIn && screen === "news-create" && (
            <form onSubmit={handleCreateNews} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Тип новости</label>
                <div className="grid grid-cols-2 gap-2">
                  {NEWS_TAGS.map(({ tag, icon, color }) => (
                    <button key={tag} type="button" onClick={() => setSelectedTag(tag)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${selectedTag === tag ? color + " ring-2 ring-offset-2 ring-offset-zinc-900 ring-soda-400" : "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:border-zinc-600"}`}>
                      <Icon name={icon} fallback="Tag" size={15} /> {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Заголовок</label>
                <input type="text" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} placeholder="Введите заголовок новости..."
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors placeholder:text-zinc-600" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Текст</label>
                <textarea value={newsPreview} onChange={e => setNewsPreview(e.target.value)} placeholder="Напишите текст новости..." rows={4}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors resize-none placeholder:text-zinc-600" />
              </div>
              {newsSuccess ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-950/50 border border-green-800 text-green-400 text-sm">
                  <Icon name="CheckCircle" size={16} /> Новость опубликована!
                </div>
              ) : (
                <button type="submit" disabled={!selectedTag || !newsTitle.trim() || !newsPreview.trim()}
                  className="py-3 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Опубликовать
                </button>
              )}
            </form>
          )}

          {isLoggedIn && screen === "ban-list" && (
            <div className="flex flex-col gap-3">
              <button onClick={openCreateBan}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-red-500/40 text-red-400 hover:bg-red-950/20 transition-all text-sm font-medium">
                <Icon name="Plus" size={16} /> Добавить бан
              </button>
              <div className="flex flex-col gap-2">
                {bans.map(ban => (
                  <div key={ban.id} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-200 text-sm font-medium truncate">{ban.player}</p>
                      <p className="text-zinc-500 text-xs truncate">{ban.reason} · {ban.duration}</p>
                    </div>
                    <button onClick={() => openEditBan(ban)} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                      <Icon name="Pencil" size={14} />
                    </button>
                    <button onClick={() => deleteBan(ban.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoggedIn && (screen === "ban-create" || screen === "ban-edit") && (
            <form onSubmit={handleSaveBan} className="flex flex-col gap-4">
              {([
                { label: "Ник игрока", value: banPlayer, setter: setBanPlayer, placeholder: "HackerName123" },
                { label: "Причина", value: banReason, setter: setBanReason, placeholder: "Читы / Эксплойт / ..." },
                { label: "Дата", value: banDate, setter: setBanDate, placeholder: "22.04.2026" },
                { label: "Срок", value: banDuration, setter: setBanDuration, placeholder: "Навсегда / 7 дней / ..." },
              ] as { label: string; value: string; setter: (v: string) => void; placeholder: string }[]).map(f => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{f.label}</label>
                  <input type="text" value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors placeholder:text-zinc-600" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Тип бана</label>
                <div className="grid grid-cols-2 gap-2">
                  {SEVERITY_OPTIONS.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setBanSeverity(opt.value)}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${banSeverity === opt.value ? "bg-soda-300 border-soda-300 text-zinc-900" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={!banPlayer.trim() || !banReason.trim()}
                className="py-3 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors disabled:opacity-40">
                {screen === "ban-edit" ? "Сохранить" : "Добавить"}
              </button>
            </form>
          )}

          {isLoggedIn && screen === "rules" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {rules.map(cat => (
                  <button key={cat.id} onClick={() => setActiveRuleCat(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeRuleCat === cat.id ? "bg-red-600 text-white" : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>
                    {cat.title}
                  </button>
                ))}
              </div>
              {activeRuleCatData && (
                <div className="flex flex-col gap-2">
                  {activeRuleCatData.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                      {editingRuleIdx === idx ? (
                        <>
                          <input value={editingRuleText} onChange={e => setEditingRuleText(e.target.value)} autoFocus
                            className="flex-1 bg-zinc-700 border border-zinc-600 rounded px-2 py-1 text-zinc-100 text-sm outline-none focus:border-soda-400" />
                          <button onClick={() => saveEditRule(activeRuleCat, idx)} className="text-green-400 hover:text-green-300">
                            <Icon name="Check" size={14} />
                          </button>
                          <button onClick={() => setEditingRuleIdx(null)} className="text-zinc-500 hover:text-zinc-300">
                            <Icon name="X" size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 mt-0.5">{idx + 1}</span>
                          <p className="flex-1 text-zinc-300 text-sm leading-relaxed">{rule}</p>
                          <button onClick={() => startEditRule(idx, rule)} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                            <Icon name="Pencil" size={13} />
                          </button>
                          <button onClick={() => deleteRuleFromCategory(activeRuleCat, idx)} className="text-zinc-600 hover:text-red-400 transition-colors">
                            <Icon name="Trash2" size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2 mt-1">
                    <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="Новое правило..."
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddRule())}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors placeholder:text-zinc-600" />
                    <button onClick={handleAddRule} disabled={!newRule.trim()}
                      className="px-4 py-2 rounded-lg bg-soda-300 text-zinc-900 text-sm font-medium hover:bg-soda-200 transition-colors disabled:opacity-40">
                      Добавить
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && screen === "ticker" && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display mb-2 block">Превью</label>
                <div className="relative overflow-hidden rounded-lg" style={{
                  background: "radial-gradient(ellipse at center, #1a0000 0%, #0d0000 60%, #000 100%)",
                  border: `2px solid ${tickerBorderColor}`,
                  boxShadow: `0 0 16px ${tickerGlowColor}44`,
                  height: "48px",
                }}>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.85) 40%, transparent 41%)",
                    backgroundSize: "6px 6px",
                  }} />
                  <div className="absolute inset-0 flex items-center px-4 overflow-hidden">
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "0.15em",
                      color: tickerTextColor,
                      textShadow: `0 0 6px ${tickerTextColor}, 0 0 12px ${tickerGlowColor}`,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {tickerText || "ТЕКСТ БЕГУЩЕЙ СТРОКИ"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">Текст строки</label>
                <input type="text" value={tickerText} onChange={e => setTickerText(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-soda-400 transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { label: "Цвет текста", value: tickerTextColor, setter: setTickerTextColor },
                  { label: "Рамка", value: tickerBorderColor, setter: setTickerBorderColor },
                  { label: "Свечение", value: tickerGlowColor, setter: setTickerGlowColor },
                ] as { label: string; value: string; setter: (v: string) => void }[]).map(f => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-400 uppercase tracking-widest font-display">{f.label}</label>
                    <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                      <input type="color" value={f.value} onChange={e => f.setter(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer bg-transparent border-0" />
                      <span className="text-zinc-400 text-xs font-mono truncate">{f.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              {tickerSaved ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-950/50 border border-green-800 text-green-400 text-sm">
                  <Icon name="CheckCircle" size={16} /> Применено!
                </div>
              ) : (
                <button onClick={handleSaveTicker}
                  className="py-3 rounded-lg bg-soda-300 text-zinc-900 font-display text-sm tracking-widest uppercase font-medium hover:bg-soda-200 transition-colors">
                  Применить
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
