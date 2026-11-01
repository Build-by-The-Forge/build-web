"use client";

import { useEffect } from "react";

type Theme = [string, string, string, string];

const THEMES: Record<string, Theme> = {
  hero: ["#7fb042", "#2f5716", "#ffffff", "rgba(182, 232, 108, 0.25)"],
  pale: ["#eef3fa", "#cfdff2", "#0b0f17", "rgba(255, 255, 255, 0.85)"],
  blue: ["#194eb8", "#050d24", "#f4f7fc", "rgba(31, 95, 255, 0.28)"],
  black: ["#050811", "#020307", "#f4f7fc", "rgba(31, 95, 255, 0.22)"],
  mani: ["#1749a8", "#071638", "#ffffff", "rgba(79, 145, 255, 0.28)"],
  pale2: ["#edf2f9", "#d2dff0", "#0b0f17", "rgba(255, 255, 255, 0.8)"],
  foot: ["#133e94", "#030c24", "#ffffff", "rgba(31, 95, 255, 0.25)"],
  price: ["#090c14", "#04060b", "#f4f7fc", "rgba(31, 95, 255, 0.2)"],
  cta: ["#04070f", "#000000", "#ffffff", "rgba(255, 201, 60, 0.15)"],
};

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

/**
 * Drives every scroll-linked effect: hero landing, background theme per
 * section, focus fade on items, the letter-by-letter paragraph, and the
 * data-o state the 3D bulb listens to. Renders nothing itself.
 */
export default function ScrollEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.getElementById("hero") as HTMLElement;
    const heroWrap = document.querySelector(".heroWrap") as HTMLElement;
    const lady = document.getElementById("moon") as HTMLElement;
    const word = document.getElementById("word") as HTMLElement;
    const big = document.getElementById("big") as HTMLElement;
    const mani = document.getElementById("mani") as HTMLElement;
    const stars = document.getElementById("stars") as HTMLElement;
    const wave = document.getElementById("wave") as HTMLElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-t],footer[data-t]"));
    const items = Array.from(document.querySelectorAll<HTMLElement>(".item"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav .pills a[href^='#']"));
    let current = "";

    const setTheme = (k: string) => {
      if (k === current) return;
      current = k;
      const t = THEMES[k] ?? THEMES.pale;
      root.style.setProperty("--b1", t[0]);
      root.style.setProperty("--b2", t[1]);
      root.style.setProperty("--ink", t[2]);
      root.style.setProperty("--hz", t[3]);
      body.dataset.theme = k;
    };

    // Manifesto characters for scroll-driven typewriter illumination
    const getChars = () => Array.from(document.querySelectorAll<HTMLElement>("#big .c"));
    let chars: HTMLElement[] = getChars();

    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const p = clamp(y / (heroWrap.offsetHeight - vh), 0, 1);

      if (!rm) {
        lady.style.transform = `translate(-50%, ${p * vh * 0.08}px) scale(${1 + p * 0.3})`;
        word.style.transform = `translateY(${-p * vh * 0.2}px) scale(${1 + p * 0.25})`;
        hero.style.opacity = String(1 - clamp((p - 0.62) / 0.38, 0, 1));
      }
      hero.style.pointerEvents = p > 0.9 ? "none" : "";
      body.classList.toggle("past", p > 0.8);

      const mid = vh * 0.5;
      if (p < 0.8) {
        setTheme("hero");
        body.dataset.o = "none";
        navLinks.forEach((a) => a.classList.remove("active"));
      } else {
        let active: HTMLElement | null = null;
        for (const s of sections) {
          const r = s.getBoundingClientRect();
          if (r.top <= mid && r.bottom > mid) active = s;
        }
        if (!active) active = sections[0];
        setTheme(active.dataset.t ?? "pale");
        body.dataset.o = active.dataset.o ?? "none";
        const activeId = `#${active.id}`;
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === activeId);
        });
      }

      for (const it of items) {
        const r = it.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid) / vh;
        it.style.opacity = rm ? "1" : String(clamp(1.25 - d * 2.6, 0.16, 1));
      }

      if (!rm) {
        if (!chars.length) chars = getChars();
        const mr = mani.getBoundingClientRect();
        // mp tracks scroll progress from when #mani starts entering into view until it pins and unpins
        const totalScrollable = mr.height - vh * 0.4;
        const mp = clamp(-mr.top / (totalScrollable > 0 ? totalScrollable : 1), 0, 1);
        const lit = mp * chars.length * 1.08;
        chars.forEach((c, i) => {
          c.style.opacity = i < lit - 2 ? "1" : i <= lit && mp > 0 && mp < 1 && i % 3 ? "0" : ".22";
        });
      } else {
        if (!chars.length) chars = getChars();
        chars.forEach((c) => {
          c.style.opacity = "1";
        });
      }
    };

    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#'], [data-go], [data-top]");
      if (!anchor) return;

      if (anchor.hasAttribute("data-top") || anchor.getAttribute("href") === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: rm ? "auto" : "smooth" });
        return;
      }

      const targetId = anchor.dataset.go || anchor.getAttribute("href")?.replace(/^#/, "");
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: rm ? "auto" : "smooth" });
        }
      }
    };

    let drifting = !rm;
    stars.classList.toggle("drifting", drifting);
    wave.classList.toggle("active", drifting);
    const onWave = () => {
      drifting = !drifting;
      stars.classList.toggle("drifting", drifting);
      wave.classList.toggle("active", drifting);
      stars.style.transition = "transform 8s linear, opacity .6s";
      stars.style.transform = drifting ? "translateY(-80px)" : "none";
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    document.addEventListener("click", onClick);
    wave.addEventListener("click", onWave);
    frame();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      document.removeEventListener("click", onClick);
      wave.removeEventListener("click", onWave);
    };
  }, []);

  return null;
}
