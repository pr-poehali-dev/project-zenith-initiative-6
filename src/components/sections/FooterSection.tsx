import Icon from "@/components/ui/icon"

export function FooterSection() {
  return (
    <footer className="px-6 py-12 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-display text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span className="text-red-500">☢</span> SODA
            </a>
            <p className="mt-4 text-sm text-zinc-500 max-w-xs">
              DayZ сервер для тех, кто выживает по-настоящему. Без компромиссов.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-colors" aria-label="Discord">
                <Icon name="MessageCircle" size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-colors" aria-label="VK">
                <Icon name="Users" size={16} />
              </a>
              <a href="#shop" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-colors" aria-label="Магазин">
                <Icon name="ShoppingBag" size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-zinc-100 mb-4">Сервер</h4>
            <ul className="space-y-3">
              {[
                { label: "О сервере", href: "#about" },
                { label: "Правила", href: "#rules" },
                { label: "Бан-лист", href: "#banlist" },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-zinc-100 mb-4">Сообщество</h4>
            <ul className="space-y-3">
              {[
                { label: "Новости", href: "#news" },
                { label: "Килфид", href: "#killfeed" },
                { label: "Discord", href: "#" },
                { label: "VK", href: "#" },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-zinc-100 mb-4">Магазин</h4>
            <ul className="space-y-3">
              {[
                { label: "Привилегии", href: "#shop" },
                { label: "Кейсы", href: "#shop" },
                { label: "WarGM", href: "#" },
                { label: "Поддержка", href: "#" },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">© {new Date().getFullYear()} SODA DayZ Server. Все права защищены.</p>
          <p className="text-xs text-zinc-700">DayZ® — зарегистрированная торговая марка Bohemia Interactive.</p>
        </div>
      </div>
    </footer>
  )
}
