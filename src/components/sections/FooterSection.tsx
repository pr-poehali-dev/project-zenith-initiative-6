import Icon from "@/components/ui/icon"
import { useLang } from "@/context/LanguageContext"

export function FooterSection() {
  const { t } = useLang()
  return (
    <footer className="px-6 py-12 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-display text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <img src="https://cdn.poehali.dev/projects/307a7106-8267-4453-b607-a8b56ec1617a/bucket/5dea514f-d85e-4471-bb40-5c9279d52a73.png" alt="SODA" className="w-10 h-10 object-contain" /> SODA
            </a>
            <p className="mt-4 text-sm text-zinc-500 max-w-xs">
              {t.footer.tagline}
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
            <h4 className="font-heading text-sm font-semibold text-zinc-100 mb-4">{t.footer.server}</h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.about, href: "#about" },
                { label: t.footer.rules, href: "#rules" },
                { label: t.footer.banlist, href: "#banlist" },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-zinc-100 mb-4">{t.footer.community}</h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.news, href: "#news" },
                { label: t.footer.killfeed, href: "#killfeed" },
                { label: t.footer.discord, href: "#" },
                { label: t.footer.vk, href: "#" },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="text-xs text-zinc-700">{t.footer.trademark}</p>
        </div>
      </div>
    </footer>
  )
}