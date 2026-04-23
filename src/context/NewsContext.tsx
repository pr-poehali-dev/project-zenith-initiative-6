import { createContext, useContext, useState, ReactNode } from "react"

export type NewsTag = "Update" | "Server" | "Shop" | "Event"

export interface NewsItem {
  id: number
  tag: NewsTag
  tagColor: string
  title: string
  date: string
  preview: string
  readTime: string
}

const TAG_COLORS: Record<NewsTag, string> = {
  Update: "text-green-400 bg-green-950/50 border-green-900/50",
  Event: "text-orange-400 bg-orange-950/50 border-orange-900/50",
  Server: "text-blue-400 bg-blue-950/50 border-blue-900/50",
  Shop: "text-red-400 bg-red-950/50 border-red-900/50",
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    tag: "Update",
    tagColor: TAG_COLORS.Update,
    title: "Patch 1.25 — new locations and loot balance",
    date: "April 18, 2026",
    preview: "Added three new military locations in the north of the map. Revised the loot spawn table — M4 is now rarer, making gear hunting more exciting.",
    readTime: "3 min",
  },
  {
    id: 2,
    tag: "Event",
    tagColor: TAG_COLORS.Event,
    title: "Event 'Survivor Hunt' — April 25",
    date: "April 15, 2026",
    preview: "Special event with unique rewards. One player is the target, everyone else are hunters. The winner gets an exclusive skin and 3000 coins.",
    readTime: "2 min",
  },
  {
    id: 3,
    tag: "Server",
    tagColor: TAG_COLORS.Server,
    title: "Maintenance April 20, 03:00–06:00",
    date: "April 12, 2026",
    preview: "Scheduled server maintenance. Core update, database optimization. We apologize for any inconvenience.",
    readTime: "1 min",
  },
  {
    id: 4,
    tag: "Shop",
    tagColor: TAG_COLORS.Shop,
    title: "New privileges in the shop",
    date: "April 8, 2026",
    preview: "Added Survivor and Raider ranks with unique bonuses. Special 20% discount on all packages until end of April.",
    readTime: "2 min",
  },
]

interface NewsContextType {
  news: NewsItem[]
  addNews: (item: Omit<NewsItem, "id" | "tagColor">) => void
  deleteNews: (id: number) => void
  TAG_COLORS: Record<NewsTag, string>
}

const NewsContext = createContext<NewsContextType | null>(null)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)

  function addNews(item: Omit<NewsItem, "id" | "tagColor">) {
    setNews((prev) => [
      {
        ...item,
        id: Date.now(),
        tagColor: TAG_COLORS[item.tag],
      },
      ...prev,
    ])
  }

  function deleteNews(id: number) {
    setNews((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NewsContext.Provider value={{ news, addNews, deleteNews, TAG_COLORS }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const ctx = useContext(NewsContext)
  if (!ctx) throw new Error("useNews must be inside NewsProvider")
  return ctx
}
