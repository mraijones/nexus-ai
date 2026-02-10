

/*
================================================================================
📦 ZEUS — ATLAS VISUAL HANDOFF (CANON, LOCKED)

ATLAS is not an AI character, assistant, or interface.
ATLAS is infrastructure under load.

Visual metaphor: The Greek Titan Atlas bearing immense weight.
Static, monumental, timeless, inevitable.

Do NOT include:
  - No glow
  - No animation
  - No motion or strain
  - No futuristic or sci-fi elements
  - No friendly or expressive face
  - No UI overlays

Must feel:
  - Heavy
  - Permanent
  - Ancient
  - Calm under extreme load

Canonical concept:
“ATLAS holds the weight of decisions without choosing the world they create.”

IMAGE GENERATION PROMPT (USE AS-IS):
A monumental stone sculpture of the Greek Titan Atlas bearing an immense celestial sphere.
The figure is carved from ancient, weathered stone, showing extreme weight and compression.
Atlas is completely still, grounded, and enduring — no heroic motion, no strain, no emotion.
Lighting is dark and architectural, with deep shadows and subtle highlights emphasizing mass and permanence.
Background is minimal, dark, and timeless with no environmental detail.
Color palette limited to obsidian, charcoal, slate, and muted stone tones.
Texture is rough stone, aged, cracked, architectural.
Mood is heavy, inevitable, calm under unbearable load.
No modern elements, no technology, no glow, no neon, no futurism.
Cinematic, ultra-realistic sculpture photography.
Aspect ratio 16:9.

PLACEMENT RULES:
  - Used only on ATLAS standalone page
  - No animation, parallax, or hover effects
  - Text overlay (minimal only):
      ATLAS
      Decision Integrity Infrastructure
  - Nothing else.

ONE-LINE EXECUTION SUMMARY:
“Make ATLAS look like a permanent structure under unbearable weight — not an AI, not a tool, not a character.”
================================================================================
*/


// ATLAS Standalone Visual (Canon-Locked)
export default function Atlas() {
  return (
    <main
      className="atlas-canon bg-neutral-900 min-h-screen flex flex-col items-center justify-center"
      style={{ fontFamily: 'serif', letterSpacing: '0.01em', background: '#18181b' }}
    >
      {/*
        Place the generated ATLAS image here (see canon above).
        No animation, no overlays, no interactivity.
      */}
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-neutral-100 mb-2 tracking-tight" style={{ letterSpacing: '-0.01em' }}>ATLAS</h1>
        <div className="text-xl text-neutral-400 font-medium tracking-wide mb-2">Decision Integrity Infrastructure</div>
      </div>
    </main>
  );
}
