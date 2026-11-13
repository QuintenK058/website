'use client';

/**
 * WebGL flow-field achter de hero. Raw WebGL (geen library, ±3 kB).
 * - start in idle-tijd (requestIdleCallback), na first paint
 * - DPR max 1.5 (desktop) / 1 (mobiel), renderresolutie ×0.6
 * - rendert alleen als in beeld (IntersectionObserver, 200px marge)
 * - reduced motion of geen WebGL: alleen de CSS-poster
 * - wordt opgeruimd bij unmount (route-wissel)
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 c1;uniform vec3 c2;uniform float s;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*2.2;
vec2 mo=(m-.5)*.6;float tt=t*.06;
vec2 q=vec2(fbm(p+tt+mo),fbm(p-tt+vec2(5.2,1.3)));
vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+tt*1.4),fbm(p+3.*q+vec2(8.3,2.8)-tt));
float f=fbm(p+3.5*w+s*.4);
float lines=smoothstep(.0,.02,abs(fract(f*9.)-.5)-.44);
vec3 col=mix(c2,c1,smoothstep(.35,.85,f))*smoothstep(.25,1.,f)*.9;
col+=c1*(1.-lines)*.18*smoothstep(.4,.9,f);
float vign=smoothstep(1.25,.2,length(uv-vec2(.72,.62)));
gl_FragColor=vec4(col*vign,1.);}`;

function hex(v: string): [number, number, number] {
  const h = v.trim().replace('#', '');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Mobiel (touch of < 768px) en reduced motion: alleen de poster. Bespaart CPU en batterij.
    if (matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 767px)').matches) return;
    const canvas = canvasRef.current!;
    let cleanup = () => {};
    const start = () => {
      const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
      if (!gl) return;
      const sh = (type: number, src: string) => {
        const o = gl.createShader(type)!;
        gl.shaderSource(o, src);
        gl.compileShader(o);
        return o;
      };
      const pr = gl.createProgram()!;
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
      gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
      gl.useProgram(pr);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const u = Object.fromEntries(['r', 't', 'm', 'c1', 'c2', 's'].map((k) => [k, gl.getUniformLocation(pr, k)]));
      const cs = getComputedStyle(document.documentElement);
      gl.uniform3fv(u.c1, hex(cs.getPropertyValue('--color-accent') || '#4de1ff'));
      gl.uniform3fv(u.c2, hex(cs.getPropertyValue('--color-accent-2') || '#7a5cff'));

      const coarse = matchMedia('(pointer: coarse)').matches;
      const dpr = Math.min(devicePixelRatio || 1, coarse ? 1 : 1.5) * (coarse ? 0.5 : 0.6);
      const resize = () => {
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u.r, canvas.width, canvas.height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const mouse = { x: 0.5, y: 0.5 };
      const target = { x: 0.5, y: 0.5 };
      const onMove = (e: PointerEvent) => {
        target.x = e.clientX / innerWidth;
        target.y = 1 - e.clientY / innerHeight;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '200px' });
      io.observe(canvas);

      const render = (time: number) => {
        if (!visible || document.documentElement.classList.contains('motion-paused')) return;
        mouse.x += (target.x - mouse.x) * 0.04;
        mouse.y += (target.y - mouse.y) * 0.04;
        gl.uniform1f(u.t, time);
        gl.uniform2f(u.m, mouse.x, mouse.y);
        gl.uniform1f(u.s, scrollY / innerHeight);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      gsap.ticker.add(render);
      canvas.dataset.on = 'true';

      cleanup = () => {
        gsap.ticker.remove(render);
        window.removeEventListener('pointermove', onMove);
        io.disconnect();
        ro.disconnect();
        gl.deleteBuffer(buf);
        gl.deleteProgram(pr);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    };
    const hasIdle = 'requestIdleCallback' in window;
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 300);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      cleanup();
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/* Poster: altijd aanwezig (fallback + eerste frame) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_25%,rgb(77_225_255/0.2),transparent_65%),radial-gradient(ellipse_50%_50%_at_10%_90%,rgb(122_92_255/0.14),transparent_65%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-0 transition-opacity duration-[1200ms] data-[on=true]:opacity-100" />
    </div>
  );
}
