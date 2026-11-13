'use client';

/**
 * Image-displacement-hover: een WebGL-fragmentshader mengt de afbeelding met
 * een vervormde, accent-getinte versie via een noise-map. GSAP stuurt de
 * `progress`-uniform aan. Alleen desktop (pointer: fine), lazy (pas bij eerste
 * hover), opgeruimd bij unmount. Zonder WebGL of bij reduced motion: gewone afbeelding.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { mq } from '@/lib/motion';

const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0.,1.);}';
const FS = `precision mediump float;varying vec2 v;uniform sampler2D tex;uniform float progress;uniform float t;uniform vec3 accent;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){float nz=n(v*6.+t*.4);vec2 d=vec2(nz-.5)*.08*progress;
vec4 a=texture2D(tex,v);vec4 b=texture2D(tex,v+d);
float m=smoothstep(progress-.2,progress+.2,nz);
vec3 col=mix(a.rgb,mix(b.rgb,accent,.18),progress*(1.-m*.5));
gl_FragColor=vec4(col,1.);}`;

export function DisplacementHover({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matchMedia(mq.desktop).matches) return;
    const el = wrap.current!;
    const card = el.closest('a,article') ?? el;
    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    const state = { progress: 0 };
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let ready = false;

    const init = () => {
      const canvas = canvasRef.current!;
      gl = canvas.getContext('webgl', { premultipliedAlpha: false });
      if (!gl) return;
      const g = gl;
      const sh = (type: number, s: string) => { const o = g.createShader(type)!; g.shaderSource(o, s); g.compileShader(o); return o; };
      const pr = g.createProgram()!;
      g.attachShader(pr, sh(g.VERTEX_SHADER, VS));
      g.attachShader(pr, sh(g.FRAGMENT_SHADER, FS));
      g.linkProgram(pr);
      g.useProgram(pr);
      const b = g.createBuffer();
      g.bindBuffer(g.ARRAY_BUFFER, b);
      g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
      const loc = g.getAttribLocation(pr, 'p');
      g.enableVertexAttribArray(loc);
      g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['progress', 't', 'accent'].map((k) => [k, g.getUniformLocation(pr, k)]));
      g.uniform3f(uniforms.accent, 0.3, 0.88, 1);
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const tex = g.createTexture();
        g.bindTexture(g.TEXTURE_2D, tex);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img);
        canvas.width = el.clientWidth;
        canvas.height = el.clientHeight;
        g.viewport(0, 0, canvas.width, canvas.height);
        ready = true;
      };
      img.src = src;
    };

    const loop = (time: number) => {
      if (gl && ready) {
        gl.uniform1f(uniforms.progress, state.progress);
        gl.uniform1f(uniforms.t, time / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (state.progress > 0.001) raf = requestAnimationFrame(loop);
    };
    const enter = () => {
      if (!gl) init();
      canvasRef.current!.style.opacity = '1';
      gsap.to(state, { progress: 1, duration: 0.8, ease: 'expo.out' });
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      gsap.to(state, { progress: 0, duration: 0.6, ease: 'power3.out', onComplete: () => { if (canvasRef.current) canvasRef.current.style.opacity = '0'; } });
    };
    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointerleave', leave);
    return () => {
      card.removeEventListener('pointerenter', enter);
      card.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
      (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [src]);

  return (
    <div ref={wrap} className="absolute inset-0">
      {children}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-200" />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
