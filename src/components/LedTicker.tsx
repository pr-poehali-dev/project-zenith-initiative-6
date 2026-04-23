import { useEffect, useRef } from "react"

interface LedTickerProps {
  text: string
}

export function LedTicker({ text }: LedTickerProps) {
  const innerRef = useRef<HTMLDivElement>(null)

  const repeated = `${text}   ★   ${text}   ★   ${text}   ★   ${text}   ★   `

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        background: "radial-gradient(ellipse at center, #1a0000 0%, #0d0000 60%, #000000 100%)",
        border: "2px solid #3a0000",
        boxShadow: "0 0 20px rgba(200,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.8)",
        height: "52px",
      }}
    >
      {/* LED dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.85) 40%, transparent 41%)`,
          backgroundSize: "6px 6px",
        }}
      />
      {/* Scanline glow */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "linear-gradient(transparent 48%, rgba(255,0,0,0.04) 50%, transparent 52%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Scrolling text */}
      <div className="absolute inset-0 flex items-center z-30">
        <div
          ref={innerRef}
          className="whitespace-nowrap animate-led-scroll"
          style={{
            fontFamily: "'Share Tech Mono', 'Courier New', monospace",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            color: "#ff2200",
            textShadow: "0 0 6px #ff2200, 0 0 12px #ff0000, 0 0 24px rgba(255,0,0,0.5)",
            textTransform: "uppercase",
          }}
        >
          {repeated}
        </div>
      </div>
    </div>
  )
}
