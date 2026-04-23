import { useSite } from "@/context/SiteContext"

export function LedTicker() {
  const { ticker } = useSite()
  const { text, textColor, borderColor, glowColor } = ticker

  const repeated = `${text}   ★   ${text}   ★   ${text}   ★   ${text}   ★   `

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        background: "radial-gradient(ellipse at center, #1a0000 0%, #0d0000 60%, #000000 100%)",
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 20px ${glowColor}55, inset 0 0 30px rgba(0,0,0,0.8)`,
        height: "52px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.85) 40%, transparent 41%)`,
          backgroundSize: "6px 6px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `linear-gradient(transparent 48%, ${glowColor}08 50%, transparent 52%)`,
          backgroundSize: "100% 4px",
        }}
      />
      <div className="absolute inset-0 flex items-center z-30">
        <div
          className="whitespace-nowrap animate-led-scroll"
          style={{
            fontFamily: "'Share Tech Mono', 'Courier New', monospace",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            color: textColor,
            textShadow: `0 0 6px ${textColor}, 0 0 12px ${glowColor}, 0 0 24px ${glowColor}80`,
            textTransform: "uppercase",
          }}
        >
          {repeated}
        </div>
      </div>
    </div>
  )
}
