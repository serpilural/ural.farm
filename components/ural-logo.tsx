"use client"

export function UralLogo() {
  return (
    <svg
      width="120"
      height="36"
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ural"
    >
      {/* Filigran leaf — single pistachio leaf, minimalist */}
      <g transform="translate(0, 2)">
        {/* Stem */}
        <line x1="13" y1="28" x2="13" y2="18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
        {/* Leaf shape — pointed oval, slightly tilted */}
        <path
          d="M13 18 C9 13 5 10 7 6 C9 2 16 3 17 8 C18 12 15 16 13 18Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Leaf midrib */}
        <line x1="13" y1="18" x2="11" y2="7" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
        {/* Filigran vein detail left */}
        <path d="M11 13 C9.5 12 8.5 11 8 10" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.45"/>
        {/* Filigran vein detail right */}
        <path d="M12 10 C13 9 14 8.5 15 8" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.45"/>
        {/* Small decorative pistachio nut at base of leaf */}
        <ellipse cx="13" cy="29.5" rx="2.2" ry="1.4" stroke="currentColor" strokeWidth="0.7" fill="none"/>
        <line x1="13" y1="28.1" x2="13" y2="31" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"/>
      </g>

      {/* Wordmark — "Ural" in serif style via text */}
      <text
        x="24"
        y="26"
        fontFamily="var(--font-playfair), 'Playfair Display', Georgia, serif"
        fontSize="22"
        letterSpacing="0.08em"
        fill="currentColor"
        fontWeight="400"
      >
        Ural
      </text>
    </svg>
  )
}
