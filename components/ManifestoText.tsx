"use client";

const MANIFESTO_TEXT =
  "Every student deserves an academic companion that knows the curriculum, shows its sources, and keeps working when the network doesn’t. BUILD is that companion.";

export default function ManifestoText() {
  const words = MANIFESTO_TEXT.split(" ");
  return (
    <p className="big" id="big">
      {words.map((word, wIdx) => (
        <span key={wIdx}>
          <span className="w">
            {word.split("").map((char, cIdx) => (
              <span className="c" key={cIdx}>
                {char}
              </span>
            ))}
          </span>
          {wIdx < words.length - 1 ? "\u00A0 " : ""}
        </span>
      ))}
    </p>
  );
}
