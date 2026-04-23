import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// ─── Ban List ───────────────────────────────────────────────────────────────
export type BanSeverity = "perm" | "long" | "mid" | "short"

export interface BanEntry {
  id: number
  player: string
  reason: string
  date: string
  duration: string
  severity: BanSeverity
}

const initialBans: BanEntry[] = [
  { id: 1, player: "HackMaster666", reason: "Читы (ESP + Aimbot)", date: "19.04.2026", duration: "Навсегда", severity: "perm" },
  { id: 2, player: "DupeFarm99", reason: "Дюп предметов", date: "18.04.2026", duration: "30 дней", severity: "long" },
  { id: 3, player: "ToxicRager", reason: "Систематические оскорбления", date: "17.04.2026", duration: "7 дней", severity: "mid" },
  { id: 4, player: "WallWalker", reason: "Эксплойт сквозь стены", date: "16.04.2026", duration: "Навсегда", severity: "perm" },
  { id: 5, player: "BaseCamper22", reason: "Нарушение правил рейда", date: "15.04.2026", duration: "3 дня", severity: "short" },
  { id: 6, player: "SafeZoneKiller", reason: "Убийство в сейф-зоне", date: "14.04.2026", duration: "7 дней", severity: "mid" },
  { id: 7, player: "FloodSpammer", reason: "Спам в чате", date: "13.04.2026", duration: "1 день", severity: "short" },
  { id: 8, player: "InvisCheat", reason: "Чит-программа", date: "12.04.2026", duration: "Навсегда", severity: "perm" },
]

// ─── Rules ─────────────────────────────────────────────────────────────────
export interface RuleCategory {
  id: string
  title: string
  icon: string
  rules: string[]
}

const initialRules: RuleCategory[] = [
  {
    id: "general",
    title: "General Rules",
    icon: "BookOpen",
    rules: [
      "Respectful treatment of all players and administration.",
      "Racism, insults, and discrimination in any form are forbidden.",
      "Cheats, hacks, dupes and any exploits are forbidden.",
      "Intentionally ruining other players' experience is forbidden.",
      "Nicknames must not contain profanity or insults.",
      "Administration reserves the right to ban without warning for serious violations.",
    ],
  },
  {
    id: "pvp",
    title: "PvP Rules",
    icon: "Crosshair",
    rules: [
      "KOS (Kill on Sight) is allowed only in designated PvP zones.",
      "Killing players in safe zones and at traders is forbidden.",
      "Interaction (text or voice) is required before robbery.",
      "Killing a hostage after all conditions are met is forbidden.",
      "Unjustified KOS of new players (bambis) in safe zones is forbidden.",
    ],
  },
  {
    id: "base",
    title: "Bases & Construction",
    icon: "Home",
    rules: [
      "Building at spawn points and near traders (within 200m) is forbidden.",
      "Maximum base size is 20×20 blocks.",
      "Construction blocking loot spots and passages is forbidden.",
      "Bases inactive for 14 days may be removed by administration.",
      "Raids are only allowed during game hours (10:00–00:00 MSK).",
    ],
  },
  {
    id: "rp",
    title: "Roleplay Rules",
    icon: "MessageSquare",
    rules: [
      "Follow RP norms — they are part of the server atmosphere.",
      "Exiting the game during RP scenes or robberies is forbidden.",
      "Meta-gaming (using out-of-game information) results in a ban.",
      "Referencing the real world in roleplay situations is forbidden.",
    ],
  },
]

// ─── Ticker ─────────────────────────────────────────────────────────────────
export interface TickerConfig {
  text: string
  textColor: string
  borderColor: string
  glowColor: string
}

const initialTicker: TickerConfig = {
  text: "Server online — join right now",
  textColor: "#ff2200",
  borderColor: "#3a0000",
  glowColor: "#ff0000",
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export interface LeaderEntry {
  id: number
  rank: number
  player: string
  kills: number
  server: string
}

const WEEK_KEY = "soda_lb_week"
const LB_KEY = "soda_leaderboard"

function getCurrentWeek(): string {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${week}`
}

const initialLeaderboard: LeaderEntry[] = [
  { id: 1, rank: 1, player: "GhostRaider", kills: 142, server: "SODA #1" },
  { id: 2, rank: 2, player: "NightStalker", kills: 118, server: "SODA #1" },
  { id: 3, rank: 3, player: "DarkWolf", kills: 97, server: "SODA #2" },
  { id: 4, rank: 4, player: "StormBear", kills: 84, server: "SODA #1" },
  { id: 5, rank: 5, player: "IronGhost", kills: 71, server: "SODA #2" },
]

function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
interface SiteContextType {
  // Bans
  bans: BanEntry[]
  addBan: (b: Omit<BanEntry, "id">) => void
  updateBan: (b: BanEntry) => void
  deleteBan: (id: number) => void
  // Rules
  rules: RuleCategory[]
  updateRuleCategory: (cat: RuleCategory) => void
  addRuleToCategory: (catId: string, rule: string) => void
  deleteRuleFromCategory: (catId: string, idx: number) => void
  // Ticker
  ticker: TickerConfig
  updateTicker: (t: TickerConfig) => void
  // Leaderboard
  leaderboard: LeaderEntry[]
  addKill: (player: string, server: string) => void
  resetLeaderboard: () => void
  weekLabel: string
}

const SiteContext = createContext<SiteContextType | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [bans, setBans] = useState<BanEntry[]>(() => loadLS(LB_KEY + "_bans", initialBans))
  const [rules, setRules] = useState<RuleCategory[]>(() => loadLS("soda_rules", initialRules))
  const [ticker, setTicker] = useState<TickerConfig>(() => loadLS("soda_ticker", initialTicker))

  // Leaderboard with weekly reset
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>(() => {
    const savedWeek = loadLS<string>(WEEK_KEY, "")
    const currentWeek = getCurrentWeek()
    if (savedWeek !== currentWeek) {
      localStorage.setItem(WEEK_KEY, currentWeek)
      localStorage.removeItem(LB_KEY)
      return initialLeaderboard
    }
    return loadLS(LB_KEY, initialLeaderboard)
  })

  const weekLabel = (() => {
    const now = new Date()
    const day = now.getDay() || 7
    const mon = new Date(now)
    mon.setDate(now.getDate() - day + 1)
    const sun = new Date(mon)
    sun.setDate(mon.getDate() + 6)
    const fmt = (d: Date) => d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
    return `${fmt(mon)} – ${fmt(sun)}`
  })()

  useEffect(() => { localStorage.setItem(LB_KEY + "_bans", JSON.stringify(bans)) }, [bans])
  useEffect(() => { localStorage.setItem("soda_rules", JSON.stringify(rules)) }, [rules])
  useEffect(() => { localStorage.setItem("soda_ticker", JSON.stringify(ticker)) }, [ticker])
  useEffect(() => { localStorage.setItem(LB_KEY, JSON.stringify(leaderboard)) }, [leaderboard])

  // Bans
  function addBan(b: Omit<BanEntry, "id">) {
    setBans(prev => [{ ...b, id: Date.now() }, ...prev])
  }
  function updateBan(b: BanEntry) {
    setBans(prev => prev.map(x => x.id === b.id ? b : x))
  }
  function deleteBan(id: number) {
    setBans(prev => prev.filter(x => x.id !== id))
  }

  // Rules
  function updateRuleCategory(cat: RuleCategory) {
    setRules(prev => prev.map(c => c.id === cat.id ? cat : c))
  }
  function addRuleToCategory(catId: string, rule: string) {
    setRules(prev => prev.map(c => c.id === catId ? { ...c, rules: [...c.rules, rule] } : c))
  }
  function deleteRuleFromCategory(catId: string, idx: number) {
    setRules(prev => prev.map(c => c.id === catId ? { ...c, rules: c.rules.filter((_, i) => i !== idx) } : c))
  }

  // Ticker
  function updateTicker(t: TickerConfig) {
    setTicker(t)
  }

  // Leaderboard
  function addKill(player: string, server: string) {
    setLeaderboard(prev => {
      const existing = prev.find(e => e.player === player)
      let updated: LeaderEntry[]
      if (existing) {
        updated = prev.map(e => e.player === player ? { ...e, kills: e.kills + 1 } : e)
      } else {
        updated = [...prev, { id: Date.now(), rank: 0, player, kills: 1, server }]
      }
      return updated
        .sort((a, b) => b.kills - a.kills)
        .map((e, i) => ({ ...e, rank: i + 1 }))
    })
  }

  function resetLeaderboard() {
    setLeaderboard(initialLeaderboard.map(e => ({ ...e, kills: 0 })))
    localStorage.setItem(WEEK_KEY, getCurrentWeek())
  }

  return (
    <SiteContext.Provider value={{
      bans, addBan, updateBan, deleteBan,
      rules, updateRuleCategory, addRuleToCategory, deleteRuleFromCategory,
      ticker, updateTicker,
      leaderboard, addKill, resetLeaderboard, weekLabel,
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be inside SiteProvider")
  return ctx
}
