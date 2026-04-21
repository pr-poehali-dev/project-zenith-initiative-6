import { useState } from "react"
import Icon from "@/components/ui/icon"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#rules", label: "Rules" },
  { href: "#news", label: "News" },
  { href: "#killfeed", label: "Killfeed" },
  { href: "#banlist", label: "Ban list" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
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
          <a
            href="#shop"
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-soda-300 text-zinc-900 font-medium hover:bg-soda-200 transition-colors"
          >
            Shop
          </a>
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
          <a href="#shop" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-center rounded-xl bg-soda-300 text-zinc-900 font-medium hover:bg-soda-200 transition-colors mt-1">
            Shop
          </a>
        </div>
      )}
    </header>
  )
}