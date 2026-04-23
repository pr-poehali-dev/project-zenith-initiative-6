import { createContext, useContext, useState, ReactNode } from "react"

type Lang = "en" | "ru"

interface Translations {
  nav: {
    about: string
    rules: string
    news: string
    killfeed: string
    banlist: string
    admin: string
  }
  hero: {
    tagline1: string
    tagline2: string
    connect: string
    serverOnline: string
  }
  online: {
    playersOnline: string
    serverCapacity: string
    serverNormal: string
    map: string
    version: string
    type: string
    connect: string
  }
  social: {
    title: string
    subtitle: string
    discord: { desc: string; label: string }
    vk: { desc: string; label: string }
    shop: { desc: string; label: string }
    wargm: { desc: string; label: string }
  }
  about: {
    subtitle: string
    title: string
    desc: string
    features: {
      map: { title: string; desc: string }
      loot: { title: string; desc: string }
      anticheat: { title: string; desc: string }
      community: { title: string; desc: string }
      pvp: { title: string; desc: string }
      trading: { title: string; desc: string }
    }
  }
  rules: {
    subtitle: string
    title: string
    desc: string
    important: string
    importantText: string
    categories: {
      general: { title: string }
      pvp: { title: string }
      base: { title: string }
      rp: { title: string }
    }
  }
  news: {
    subtitle: string
    title: string
    allNews: string
    readMore: string
  }
  killfeed: {
    subtitle: string
    title: string
    desc: string
    live: string
    realtime: string
    leaderboard: string
    resetNote: string
    killed: string
    with: string
    from: string
    rank: string
    player: string
    kills: string
    server: string
  }
  banlist: {
    subtitle: string
    title: string
    desc: string
    search: string
    player: string
    reason: string
    date: string
    duration: string
    notFound: string
    total: string
    updated: string
  }
  footer: {
    tagline: string
    server: string
    community: string
    about: string
    rules: string
    banlist: string
    news: string
    killfeed: string
    discord: string
    vk: string
    rights: string
    trademark: string
  }
  admin: {
    title: string
    login: string
    password: string
    submit: string
    logout: string
    welcome: string
    wrongCredentials: string
  }
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      about: "About",
      rules: "Rules",
      news: "News",
      killfeed: "Killfeed",
      banlist: "Ban list",
      admin: "Admin",
    },
    hero: {
      tagline1: "YOU'RE ALREADY HERE.",
      tagline2: "YOU JUST DON'T REALIZE IT YET.",
      connect: "Connect",
      serverOnline: "Server online — join right now",
    },
    online: {
      playersOnline: "players online",
      serverCapacity: "Server capacity",
      serverNormal: "Server operating normally",
      map: "Map",
      version: "Version",
      type: "Type",
      connect: "Connect",
    },
    social: {
      title: "Community",
      subtitle: "Join us",
      discord: { desc: "Live chat, events, discussions", label: "members" },
      vk: { desc: "News, screenshots, announcements", label: "subscribers" },
      shop: { desc: "Privileges, cases, customization", label: "items" },
      wargm: { desc: "Combat missions and tournaments", label: "server" },
    },
    about: {
      subtitle: "About the server",
      title: "Why exactly SODA?",
      desc: "We're not just a server. We're a place where survival becomes a real story.",
      features: {
        map: { title: "Chernarus 2024", desc: "Fully customized map with new locations, caches, and unique points of interest." },
        loot: { title: "High Loot", desc: "Balanced item economy — every raid matters, good loot is never trivial." },
        anticheat: { title: "Anti-Cheat", desc: "Constant monitoring, quick bans, zero tolerance for cheaters and toxic players." },
        community: { title: "Active Community", desc: "Active Discord, regular events, tournaments and seasonal events from administration." },
        pvp: { title: "PvP Zones", desc: "Special hot zones for intense PvP — there's always somewhere to fight." },
        trading: { title: "Trading", desc: "Trader system and in-game market. Earn through crafting and trading." },
      },
    },
    rules: {
      subtitle: "Rules",
      title: "SODA Server Rules",
      desc: "Violating the rules results in a ban without warning. Ignorance of the rules is not an excuse.",
      important: "Important:",
      importantText: "Administration reserves the right to change rules without notice. Follow updates on Discord.",
      categories: {
        general: { title: "General Rules" },
        pvp: { title: "PvP Rules" },
        base: { title: "Bases & Construction" },
        rp: { title: "Roleplay Rules" },
      },
    },
    news: {
      subtitle: "News",
      title: "What's new on SODA",
      allNews: "All news",
      readMore: "Read more",
    },
    killfeed: {
      subtitle: "Killfeed",
      title: "Kill Feed",
      desc: "What's happening on the server right now",
      live: "Live Feed",
      realtime: "Updates in real time",
      leaderboard: "Leaderboard",
      resetNote: "Resets on Sunday",
      killed: "killed",
      with: "with",
      from: "from",
      rank: "#",
      player: "Player",
      kills: "Kills",
      server: "Server",
    },
    banlist: {
      subtitle: "Ban list",
      title: "Violators",
      desc: "We don't tolerate cheaters or toxic players. All bans are public.",
      search: "Search by nickname or ban reason...",
      player: "Player",
      reason: "Reason",
      date: "Date",
      duration: "Duration",
      notFound: "Nothing found",
      total: "Showing",
      updated: "Updated daily",
    },
    footer: {
      tagline: "DayZ server for those who survive for real. No compromises.",
      server: "Server",
      community: "Community",
      about: "About",
      rules: "Rules",
      banlist: "Ban list",
      news: "News",
      killfeed: "Killfeed",
      discord: "Discord",
      vk: "VK",
      rights: "SODA DayZ Server. All rights reserved.",
      trademark: "DayZ® is a registered trademark of Bohemia Interactive.",
    },
    admin: {
      title: "Admin Panel",
      login: "Login",
      password: "Password",
      submit: "Sign in",
      logout: "Log out",
      welcome: "Welcome, Administrator",
      wrongCredentials: "Invalid login or password",
    },
  },

  ru: {
    nav: {
      about: "О нас",
      rules: "Правила",
      news: "Новости",
      killfeed: "Килл-лента",
      banlist: "Бан-лист",
      admin: "Админ",
    },
    hero: {
      tagline1: "ТЫ УЖЕ ЗДЕСЬ.",
      tagline2: "ТЫ ПРОСТО ЕЩЁ НЕ ПОНЯЛ ЭТОГО.",
      connect: "Подключиться",
      serverOnline: "Сервер онлайн — заходи прямо сейчас",
    },
    online: {
      playersOnline: "игроков онлайн",
      serverCapacity: "Загрузка сервера",
      serverNormal: "Сервер работает в штатном режиме",
      map: "Карта",
      version: "Версия",
      type: "Тип",
      connect: "Подключиться",
    },
    social: {
      title: "Сообщество",
      subtitle: "Присоединяйся",
      discord: { desc: "Живой чат, ивенты, обсуждения", label: "участников" },
      vk: { desc: "Новости, скриншоты, анонсы", label: "подписчиков" },
      shop: { desc: "Привилегии, кейсы, кастомизация", label: "предметов" },
      wargm: { desc: "Боевые миссии и турниры", label: "сервер" },
    },
    about: {
      subtitle: "О сервере",
      title: "Почему именно SODA?",
      desc: "Мы не просто сервер. Мы — место, где выживание становится настоящей историей.",
      features: {
        map: { title: "Чернарусь 2024", desc: "Полностью кастомизированная карта с новыми локациями, тайниками и уникальными точками интереса." },
        loot: { title: "Богатый лут", desc: "Сбалансированная экономика предметов — каждый рейд важен, хороший лут никогда не достаётся просто так." },
        anticheat: { title: "Античит", desc: "Постоянный мониторинг, быстрые баны, нулевая терпимость к читерам и токсичным игрокам." },
        community: { title: "Активное комьюнити", desc: "Активный Discord, регулярные ивенты, турниры и сезонные мероприятия от администрации." },
        pvp: { title: "PvP-зоны", desc: "Специальные горячие зоны для интенсивного PvP — всегда есть где сразиться." },
        trading: { title: "Торговля", desc: "Система трейдеров и внутриигровой рынок. Зарабатывай через крафт и торговлю." },
      },
    },
    rules: {
      subtitle: "Правила",
      title: "Правила сервера SODA",
      desc: "Нарушение правил — бан без предупреждения. Незнание правил не является оправданием.",
      important: "Важно:",
      importantText: "Администрация оставляет за собой право менять правила без уведомления. Следите за обновлениями в Discord.",
      categories: {
        general: { title: "Общие правила" },
        pvp: { title: "Правила PvP" },
        base: { title: "Базы и строительство" },
        rp: { title: "Правила ролеплея" },
      },
    },
    news: {
      subtitle: "Новости",
      title: "Что нового на SODA",
      allNews: "Все новости",
      readMore: "Читать далее",
    },
    killfeed: {
      subtitle: "Килл-лента",
      title: "Kill Feed",
      desc: "Что происходит на сервере прямо сейчас",
      live: "Live Feed",
      realtime: "Обновляется в реальном времени",
      leaderboard: "Таблица лидеров",
      resetNote: "Сброс в воскресенье",
      killed: "убил",
      with: "с помощью",
      from: "с расстояния",
      rank: "#",
      player: "Игрок",
      kills: "Убийств",
      server: "Сервер",
    },
    banlist: {
      subtitle: "Бан-лист",
      title: "Нарушители",
      desc: "Мы не терпим читеров и токсиков. Все баны публичны.",
      search: "Поиск по нику или причине бана...",
      player: "Игрок",
      reason: "Причина",
      date: "Дата",
      duration: "Срок",
      notFound: "Ничего не найдено",
      total: "Показано",
      updated: "Обновляется ежедневно",
    },
    footer: {
      tagline: "DayZ-сервер для тех, кто выживает по-настоящему. Без компромиссов.",
      server: "Сервер",
      community: "Комьюнити",
      about: "О нас",
      rules: "Правила",
      banlist: "Бан-лист",
      news: "Новости",
      killfeed: "Килл-лента",
      discord: "Discord",
      vk: "VK",
      rights: "SODA DayZ Server. Все права защищены.",
      trademark: "DayZ® — зарегистрированный товарный знак Bohemia Interactive.",
    },
    admin: {
      title: "Панель администратора",
      login: "Логин",
      password: "Пароль",
      submit: "Войти",
      logout: "Выйти",
      welcome: "Добро пожаловать, Администратор",
      wrongCredentials: "Неверный логин или пароль",
    },
  },
}

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be inside LanguageProvider")
  return ctx
}
