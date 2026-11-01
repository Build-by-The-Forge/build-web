"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Geometry exported from idea_bulb.blend (see public/bulb.json). */
type BulbData = {
  m: { p: string; i: string }[]; // meshes: int16 positions (/4000) + uint16 indices, base64
  c: [number, number, number[][]][]; // curves: [material 0 support | 1 filament | 2 artwork, radius, splines[[closed, x,y,z,...]]]
};

type Art = { g: THREE.Group; c: THREE.Vector3; dir: THREE.Vector3; dist: number; s1: number; s2: number; ph: number };

function bytes(s: string): ArrayBuffer {
  const bin = atob(s);
  const u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u.buffer;
}

function meshFrom(o: { p: string; i: string }, mat: THREE.Material): THREE.Mesh {
  const p = new Int16Array(bytes(o.p));
  const f = new Float32Array(p.length);
  for (let i = 0; i < p.length; i++) f[i] = p[i] / 4000;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(f, 3));
  g.setIndex(new THREE.BufferAttribute(new Uint16Array(bytes(o.i)), 1));
  g.computeVertexNormals();
  return new THREE.Mesh(g, mat);
}

/** Square-section tube along a polyline (flat array of xyz). */
function tube(P: number[], closed: boolean, r: number): THREE.BufferGeometry {
  const n = P.length / 3;
  const pos: number[] = [];
  const idx: number[] = [];
  const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  let b = 0;
  const segs = closed ? n : n - 1;
  for (let s = 0; s < segs; s++) {
    const a = s * 3;
    const c = ((s + 1) % n) * 3;
    const A = new THREE.Vector3(P[a], P[a + 1], P[a + 2]);
    const B = new THREE.Vector3(P[c], P[c + 1], P[c + 2]);
    const d = B.clone().sub(A);
    if (d.lengthSq() < 1e-9) continue;
    d.normalize();
    const ref = Math.abs(d.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const u = new THREE.Vector3().crossVectors(d, ref).normalize().multiplyScalar(r);
    const v = new THREE.Vector3().crossVectors(d, u).normalize().multiplyScalar(r);
    for (const E of [A, B]) {
      for (const k of corners) {
        pos.push(E.x + u.x * k[0] + v.x * k[1], E.y + u.y * k[0] + v.y * k[1], E.z + u.z * k[0] + v.z * k[1]);
      }
    }
    for (let k = 0; k < 4; k++) {
      const k2 = (k + 1) % 4;
      idx.push(b + k, b + k2, b + 4 + k2, b + k, b + 4 + k2, b + 4 + k);
    }
    b += 8;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export default function BulbCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;
    let raf = 0;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
    } catch {
      return; // no WebGL: the page still works without the bulb
    }
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(28, 0.7, 0.1, 100);

    // Small studio for reflections
    const pm = new THREE.PMREMGenerator(renderer);
    const studio = new THREE.Scene();
    studio.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x2b2118, side: THREE.BackSide })));
    const panels: [number, number, number, number, number, number][] = [
      [-8, 6, 6, 0xfff1d6, 6, 9], [8, 3, 5, 0xffffff, 3, 10], [0, 13, 0, 0xffe0b0, 12, 3], [0, -3, 8, 0x7a8a60, 14, 3],
    ];
    for (const [x, y, z, col, w, h] of panels) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
      m.position.set(x, y, z);
      m.lookAt(0, 0, 0);
      studio.add(m);
    }
    scene.environment = pm.fromScene(studio, 0.03).texture;

    const M = {
      glass: new THREE.MeshStandardMaterial({ color: 0xffb45e, emissive: 0xff8a20, emissiveIntensity: 0, transparent: true, opacity: 0.17, roughness: 0.04, metalness: 0, envMapIntensity: 1.1, side: THREE.DoubleSide, depthWrite: false }),
      brass: new THREE.MeshStandardMaterial({ color: 0x9a6a1c, metalness: 0.9, roughness: 0.32, envMapIntensity: 1.7 }),
      black: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.55, metalness: 0.2 }),
      sup: new THREE.MeshStandardMaterial({ color: 0x8a8272, metalness: 0.85, roughness: 0.4, envMapIntensity: 1.4 }),
      fil: new THREE.MeshStandardMaterial({ color: 0xffb050, emissive: 0xff8a1a, emissiveIntensity: 1, roughness: 0.4 }),
      art: new THREE.MeshStandardMaterial({ color: 0xe23a1c, emissive: 0x9a1604, emissiveIntensity: 1, roughness: 0.5 }),
    };

    const root = new THREE.Group();
    const glass = new THREE.Group();
    const baseG = new THREE.Group();
    const inner = new THREE.Group();
    root.add(inner, baseG, glass);
    scene.add(root);

    // lights (three r155+ uses physical units, so ×π vs. the old scale)
    scene.add(new THREE.HemisphereLight(0xfff0dc, 0x201408, 0.7 * Math.PI));
    const d1 = new THREE.DirectionalLight(0xffffff, Math.PI);
    d1.position.set(-3, 6, 6);
    const d2 = new THREE.DirectionalLight(0xffe2bd, 0.7 * Math.PI);
    d2.position.set(3, 4, 4);
    scene.add(d1, d2);
    const pl = new THREE.PointLight(0xffa640, 0, 10, 2);
    pl.position.set(0, 3.8, 0);
    scene.add(pl);

    const gc = document.createElement("canvas");
    gc.width = gc.height = 128;
    const x = gc.getContext("2d")!;
    const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(255,215,130,1)");
    gr.addColorStop(0.35, "rgba(255,160,60,.45)");
    gr.addColorStop(1, "rgba(255,140,40,0)");
    x.fillStyle = gr;
    x.fillRect(0, 0, 128, 128);
    const gtex = new THREE.CanvasTexture(gc);
    gtex.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: gtex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    sprite.position.set(0, 3.9, 0.3);
    sprite.renderOrder = 10;
    scene.add(sprite);

    // BUILD logo floating inside the bulb (always faces the camera)
    const logoTex = new THREE.TextureLoader().load("/logo.webp");
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, depthWrite: false, toneMapped: false });
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9 / 0.8214), logoMat);
    logo.renderOrder = 3;
    logo.position.set(0, 3.75, -0.1);
    root.add(logo);

    const resize = () => {
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    const target: Record<string, [number, number]> = { solid: [0, 0.3], wire: [1, 1], explode: [0.8, 0.75], none: [0, 0] };
    let k = 0, gl = 0;

    // Inner support stems, glowing filament rings & floating 3D knowledge nodes
    const stemL = new THREE.Mesh(
      tube([-0.38, 1.55, 0, -0.46, 2.35, 0, -0.68, 2.95, 0], false, 0.032),
      M.sup
    );
    const stemR = new THREE.Mesh(
      tube([0.38, 1.55, 0, 0.46, 2.35, 0, 0.68, 2.95, 0], false, 0.032),
      M.sup
    );
    inner.add(stemL, stemR);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.024, 12, 64), M.fil);
    ring1.position.set(0, 3.75, -0.12);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.016, 10, 64), M.fil);
    ring2.position.set(0, 3.75, -0.12);
    ring2.rotation.x = 0.55;
    ring2.rotation.y = 0.35;
    inner.add(ring1, ring2);

    const arts: Art[] = [];
    const nodePositions: [number, number, number, number][] = [
      [-1.45, 4.45, 0.45, 0],
      [1.48, 4.35, 0.4, 1],
      [-1.55, 3.2, 0.35, 1],
      [1.55, 3.15, 0.38, 0],
      [-0.85, 5.15, 0.25, 1],
      [0.9, 5.1, 0.28, 0],
      [0, 5.35, -0.2, 1],
      [0, 2.55, 0.55, 0],
    ];
    nodePositions.forEach(([nx, ny, nz, kind], idx) => {
      const g = new THREE.Group();
      const geom =
        kind === 0
          ? new THREE.OctahedronGeometry(0.13, 0)
          : new THREE.TorusGeometry(0.11, 0.032, 8, 20);
      const mesh = new THREE.Mesh(geom, idx % 2 === 0 ? M.fil : M.art);
      g.add(mesh);
      const c = new THREE.Vector3(nx * 0.72, ny, nz * 0.72);
      const dir = new THREE.Vector3(nx, (ny - 3.75) * 0.75, nz).normalize();
      g.position.copy(c);
      inner.add(g);
      arts.push({
        g,
        c,
        dir,
        dist: 0.75 + (idx % 3) * 0.28,
        s1: 0.7 + idx * 0.15,
        s2: 0.9 + idx * 0.12,
        ph: idx * 1.1,
      });
    });

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const st = document.body.dataset.o || "none";
      if (st === "none" && k < 0.003 && gl < 0.003) return;
      if (!cv.clientWidth) return;
      const tg = target[st] ?? target.none;
      k += (tg[0] - k) * (rm ? 1 : 0.045);
      gl += (tg[1] - gl) * (rm ? 1 : 0.06);
      const y = window.scrollY;
      const s = rm ? 0 : t / 1000;
      const e = k * k * (3 - 2 * k);
      const fl = rm ? 1 : 1 + Math.sin(s * 7) * 0.05 + Math.sin(s * 13.1) * 0.04;

      root.rotation.y = s * 0.2 + Math.sin(y / 520) * 0.6;
      root.rotation.z = Math.sin(y / 700) * 0.04;
      root.position.y = Math.sin(s * 1.2) * 0.08;
      glass.position.y = e * 3.4;
      glass.rotation.z = e * 0.22;
      glass.rotation.x = -e * 0.1;
      baseG.position.y = -e * 0.5;
      logo.position.set(0, 3.75 + e * 1.3, -0.1 + e * 0.5);
      logo.scale.setScalar(1 + e * 0.45);
      logo.rotation.y = -root.rotation.y;
      logoMat.color.setRGB(1 + gl * 0.3, 1 + gl * 0.3, 1 + gl * 0.3);

      ring1.position.set(0, 3.75 + e * 1.3, -0.14 + e * 0.35);
      ring1.scale.setScalar(1 + e * 0.38);
      ring1.rotation.z = s * 0.35;
      ring2.position.set(0, 3.75 + e * 1.3, -0.14 + e * 0.35);
      ring2.scale.setScalar(0.85 + e * 0.55);
      ring2.rotation.x = 0.55 + s * 0.45;
      ring2.rotation.y = 0.35 + s * 0.3;

      for (const a of arts) {
        const bob = rm ? 0 : Math.sin(s * 1.8 + a.ph) * 0.12;
        a.g.position
          .copy(a.c)
          .addScaledVector(a.dir, e * a.dist * 1.45)
          .add({ x: 0, y: e * 1.15 + bob, z: 0 } as THREE.Vector3);
        a.g.scale.setScalar(0.55 + e * 0.75);
        a.g.rotation.x = s * a.s1;
        a.g.rotation.y = s * a.s2;
      }

      M.fil.emissiveIntensity = (0.5 + gl * 3.4) * fl;
      M.art.emissiveIntensity = 1 + gl * 0.9;
      M.glass.emissiveIntensity = gl * 0.22;
      pl.intensity = gl * 30 * fl;
      sprite.scale.setScalar(2 + gl * 6.5 * fl);
      sprite.material.opacity = Math.min(1, gl * 0.95);
      cam.position.set(0, 3.3 + e * 1.5, 15.5 + e * 6.5);
      cam.lookAt(0, 3.4 + e * 1.2, 0);
      renderer.render(scene, cam);
    };

    fetch("/bulb.json")
      .then((r) => r.json() as Promise<BulbData>)
      .then((D) => {
        if (!alive) return;
        const gm = meshFrom(D.m[0], M.glass);
        gm.renderOrder = 5;
        glass.add(gm);
        baseG.add(meshFrom(D.m[1], M.brass), meshFrom(D.m[2], M.black));

        raf = requestAnimationFrame(loop);
      })
      .catch(() => {});

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} id="obj" aria-hidden="true" />;
}
