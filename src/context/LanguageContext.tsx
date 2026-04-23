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
