import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  LinearFilter,
  Clock,
  TextureLoader,
  WebGLRenderTarget,
  OrthographicCamera,
  HalfFloatType,
  RGBAFormat,
} from 'three';

export interface HoverMaskRevealProps {
  imageBase: { src: string; alt?: string; positionX?: string; positionY?: string };
  imageHover: { src: string; alt?: string; positionX?: string; positionY?: string };
  borderRadius?: string | number;
  radius?: number;
  blur?: number;
  circleBoost?: number;
  texture?: number;
  timeSpeed?: number;
  splatRadius?: number;
  velocityDissipation?: number;
  shrinkTimeSeconds?: number;
  curl?: number;
  pressureIterations?: number;
  parallax?: boolean;
  parallaxAmount?: number;
  parallaxSmoothing?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function HoverMaskReveal({
  imageBase,
  imageHover,
  borderRadius = '16px',
  radius = 120,
  blur = 0.5,
  circleBoost = 0.8,
  texture = 0.35,
  timeSpeed = 5,
  splatRadius = 0.12,
  velocityDissipation = 0.98,
  shrinkTimeSeconds = 1.2,
  curl = 30,
  pressureIterations = 25,
  parallax = true,
  parallaxAmount = 30,
  parallaxSmoothing = 0.1,
  className = '',
  style = {},
}: HoverMaskRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: any }> | null>(null);

  const [debouncedProps, setDebouncedProps] = useState({
    radius,
    blur,
    circleBoost,
    texture,
    timeSpeed,
    splatRadius,
    velocityDissipation,
    shrinkTimeSeconds,
    curl,
    pressureIterations,
    parallax,
    parallaxAmount,
    parallaxSmoothing,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedProps({
        radius,
        blur,
        circleBoost,
        texture,
        timeSpeed,
        splatRadius,
        velocityDissipation,
        shrinkTimeSeconds,
        curl,
        pressureIterations,
        parallax,
        parallaxAmount,
        parallaxSmoothing,
      });
    }, 80);
    return () => clearTimeout(timeoutId);
  }, [
    radius,
    blur,
    circleBoost,
    texture,
    timeSpeed,
    splatRadius,
    velocityDissipation,
    shrinkTimeSeconds,
    curl,
    pressureIterations,
    parallax,
    parallaxAmount,
    parallaxSmoothing,
  ]);

  const mapRadius = useCallback((normalizedRadius: number) => {
    return 10 + (normalizedRadius - 10) * (190 / 990);
  }, []);

  const mapBlur = useCallback((normalizedBlur: number) => {
    return 0.2 + normalizedBlur * 2.8;
  }, []);

  const mapCircleBoost = useCallback((normalizedCircleBoost: number) => {
    return 0.5 + normalizedCircleBoost * 3.5;
  }, []);

  const mapTimeSpeed = useCallback((normalizedTimeSpeed: number) => {
    return normalizedTimeSpeed * 0.1;
  }, []);

  const mapTexture = useCallback((normalizedTexture: number) => {
    const freq = 2 + normalizedTexture * 12;
    const strength = normalizedTexture * 3;
    const size = 1 - normalizedTexture * 0.7;
    return { freq, strength, size };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const imgEl = imgRef.current;
    const container = containerRef.current;
    if (!canvas || !imgEl || !container) return;

    let isAnimating = false;
    const scene = new Scene();
    const perspective = 800;
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0, 0);

    const initialWidth = Math.max(container.clientWidth, 200);
    const initialHeight = Math.max(container.clientHeight, 200);
    renderer.setSize(initialWidth, initialHeight);

    const computeFov = () => {
      return (180 * (2 * Math.atan(container.clientHeight / 2 / perspective))) / Math.PI;
    };

    const camera = new PerspectiveCamera(computeFov(), initialWidth / initialHeight, 1, 5000);
    camera.position.set(0, 0, perspective);

    const loader = new TextureLoader();
    loader.setCrossOrigin('anonymous');
    const frontSrc = imageHover?.src || imageBase?.src;
    const frontTexture = loader.load(frontSrc, () => {
      if (frontTexture.image) {
        const imageAspect = frontTexture.image.width / frontTexture.image.height;
        uniforms.u_frontImageAspect.value = imageAspect;
        if (isAnimating) {
          renderer.render(scene, camera);
        }
      }
    });
    frontTexture.minFilter = LinearFilter;

    const textureParams = mapTexture(debouncedProps.texture);

    const simScale = 0.5;
    let simWidth = Math.max(1, Math.floor(initialWidth * simScale));
    let simHeight = Math.max(1, Math.floor(initialHeight * simScale));

    const fboOptions = {
      type: HalfFloatType,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      generateMipmaps: false,
      depthBuffer: false,
      stencilBuffer: false,
    };

    const createFluidFBO = (w: number, h: number) => new WebGLRenderTarget(w, h, fboOptions);

    let velFBO0 = createFluidFBO(simWidth, simHeight);
    let velFBO1 = createFluidFBO(simWidth, simHeight);
    let divFBO = createFluidFBO(simWidth, simHeight);
    let pressureFBO0 = createFluidFBO(simWidth, simHeight);
    let pressureFBO1 = createFluidFBO(simWidth, simHeight);
    let densityFBO0 = createFluidFBO(simWidth, simHeight);
    let densityFBO1 = createFluidFBO(simWidth, simHeight);

    const disposeFluidFBOs = () => {
      velFBO0.dispose();
      velFBO1.dispose();
      divFBO.dispose();
      pressureFBO0.dispose();
      pressureFBO1.dispose();
      densityFBO0.dispose();
      densityFBO1.dispose();
    };

    const resizeFluidFBOs = (w: number, h: number) => {
      const newSimWidth = Math.max(1, Math.floor(w * simScale));
      const newSimHeight = Math.max(1, Math.floor(h * simScale));
      if (newSimWidth === simWidth && newSimHeight === simHeight) return;
      simWidth = newSimWidth;
      simHeight = newSimHeight;
      disposeFluidFBOs();
      velFBO0 = createFluidFBO(simWidth, simHeight);
      velFBO1 = createFluidFBO(simWidth, simHeight);
      divFBO = createFluidFBO(simWidth, simHeight);
      pressureFBO0 = createFluidFBO(simWidth, simHeight);
      pressureFBO1 = createFluidFBO(simWidth, simHeight);
      densityFBO0 = createFluidFBO(simWidth, simHeight);
      densityFBO1 = createFluidFBO(simWidth, simHeight);
    };

    const orthoCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeometry = new PlaneGeometry(2, 2, 1, 1);

    let lastMouseUV = { x: 0.5, y: 0.5 };
    const mouseVelocity = { x: 0, y: 0 };

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_progress: { value: 0 },
      u_planeRes: { value: new Vector2(1, 1) },
      u_radius: { value: mapRadius(debouncedProps.radius) },
      u_blur: { value: mapBlur(debouncedProps.blur) },
      u_circleBoost: { value: mapCircleBoost(debouncedProps.circleBoost) },
      u_noiseFreq: { value: textureParams.freq },
      u_noiseStrength: { value: textureParams.strength },
      u_noiseSize: { value: textureParams.size },
      u_timeSpeed: { value: mapTimeSpeed(debouncedProps.timeSpeed) },
      u_frontImage: { value: frontTexture },
      u_frontImageAspect: { value: 1 },
      u_containerAspect: { value: 1 },
      u_parallaxOffset: { value: new Vector2(0, 0) },
      u_parallaxMax: {
        value: debouncedProps.parallax
          ? Math.max(0, Math.min(200, debouncedProps.parallaxAmount ?? 0))
          : 0,
      },
      u_windowSize: { value: new Vector2(window.innerWidth, window.innerHeight) },
      u_containerOffset: { value: new Vector2(0, 0) },
      u_simResolution: { value: new Vector2(simWidth, simHeight) },
      u_densityTex: { value: densityFBO0.texture },
    };
    uniformsRef.current = uniforms;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const vertexShaderQuad = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const splatFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_point;
      uniform vec2 u_splatColor;
      uniform float u_radius;
      uniform float u_aspectRatio;
      uniform sampler2D u_target;
      void main() {
        vec2 p = vUv - u_point;
        p.x *= max(u_aspectRatio, 1.0);
        p.y *= max(1.0 / u_aspectRatio, 1.0);
        float splat = exp(-dot(p, p) / (u_radius * u_radius));
        vec4 base = texture2D(u_target, vUv);
        base.xy += splat * u_splatColor;
        gl_FragColor = base;
      }
    `;

    const splatDensityFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_point;
      uniform float u_radius;
      uniform float u_aspectRatio;
      uniform float u_densityAmount;
      uniform sampler2D u_target;
      void main() {
        vec2 p = vUv - u_point;
        p.x *= max(u_aspectRatio, 1.0);
        p.y *= max(1.0 / u_aspectRatio, 1.0);
        float splat = exp(-dot(p, p) / (u_radius * u_radius));
        float base = texture2D(u_target, vUv).r;
        gl_FragColor = vec4(base + splat * u_densityAmount, 0.0, 0.0, 1.0);
      }
    `;

    const advectFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_velocity;
      uniform sampler2D u_source;
      uniform vec2 u_texelSize;
      uniform float u_dt;
      uniform float u_dissipationMultiply;
      void main() {
        vec2 vel = texture2D(u_velocity, vUv).xy;
        vec2 pos = vUv - vel * u_texelSize * u_dt;
        gl_FragColor = texture2D(u_source, pos) * u_dissipationMultiply;
      }
    `;

    const divergenceFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_velocity;
      uniform vec2 u_texelSize;
      void main() {
        float L = texture2D(u_velocity, vUv - vec2(u_texelSize.x, 0.0)).x;
        float R = texture2D(u_velocity, vUv + vec2(u_texelSize.x, 0.0)).x;
        float T = texture2D(u_velocity, vUv + vec2(0.0, u_texelSize.y)).y;
        float B = texture2D(u_velocity, vUv - vec2(0.0, u_texelSize.y)).y;
        float div = 0.5 * ((R - L) + (T - B));
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_pressure;
      uniform sampler2D u_divergence;
      uniform vec2 u_texelSize;
      void main() {
        float L = texture2D(u_pressure, vUv - vec2(u_texelSize.x, 0.0)).r;
        float R = texture2D(u_pressure, vUv + vec2(u_texelSize.x, 0.0)).r;
        float T = texture2D(u_pressure, vUv + vec2(0.0, u_texelSize.y)).r;
        float B = texture2D(u_pressure, vUv - vec2(0.0, u_texelSize.y)).r;
        float C = texture2D(u_divergence, vUv).r;
        float p = (L + R + T + B - C) * 0.25;
        gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
      }
    `;

    const curlFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_velocity;
      uniform vec2 u_texelSize;
      uniform float u_curl;
      void main() {
        float vL = texture2D(u_velocity, vUv - vec2(u_texelSize.x, 0.0)).y;
        float vR = texture2D(u_velocity, vUv + vec2(u_texelSize.x, 0.0)).y;
        float vT = texture2D(u_velocity, vUv + vec2(0.0, u_texelSize.y)).x;
        float vB = texture2D(u_velocity, vUv - vec2(0.0, u_texelSize.y)).x;
        float curl = (vR - vL) - (vT - vB);
        vec2 vel = texture2D(u_velocity, vUv).xy;
        float strength = u_curl * 0.00015;
        vel.x += strength * (vT - vB);
        vel.y += strength * (vL - vR);
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;

    const gradientFrag = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_velocity;
      uniform sampler2D u_pressure;
      uniform vec2 u_texelSize;
      void main() {
        float L = texture2D(u_pressure, vUv - vec2(u_texelSize.x, 0.0)).r;
        float R = texture2D(u_pressure, vUv + vec2(u_texelSize.x, 0.0)).r;
        float T = texture2D(u_pressure, vUv + vec2(0.0, u_texelSize.y)).r;
        float B = texture2D(u_pressure, vUv - vec2(0.0, u_texelSize.y)).r;
        vec2 vel = texture2D(u_velocity, vUv).xy;
        vel.x -= 0.5 * (R - L);
        vel.y -= 0.5 * (T - B);
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_progress;
      uniform vec2 u_planeRes;
      uniform float u_radius;
      uniform float u_blur;
      uniform float u_circleBoost;
      uniform float u_noiseFreq;
      uniform float u_noiseStrength;
      uniform float u_noiseSize;
      uniform float u_timeSpeed;
      uniform sampler2D u_frontImage;
      uniform float u_frontImageAspect;
      uniform float u_containerAspect;
      uniform vec2 u_windowSize;
      uniform vec2 u_containerOffset;
      uniform vec2 u_parallaxOffset;
      uniform float u_parallaxMax;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      uniform sampler2D u_densityTex;

      void main() {
        vec2 uv = vUv;
        float density = texture2D(u_densityTex, uv).r * u_circleBoost * u_progress;

        float offx = uv.x + (u_time * u_timeSpeed * 0.1) + sin(uv.y + u_time * u_timeSpeed * 0.1);
        float offy = uv.y - cos(u_time * u_timeSpeed * 0.001) * 0.01;
        float effectiveNoiseFreq = u_noiseFreq / u_noiseSize;
        float n1 = snoise(vec3(offx * effectiveNoiseFreq, offy * effectiveNoiseFreq, u_time * u_timeSpeed)) - 1.0;
        float n2 = snoise(vec3(offx * effectiveNoiseFreq * 0.5, offy * effectiveNoiseFreq * 0.5, u_time * u_timeSpeed * 0.7)) - 1.0;
        float n = (n1 + n2 * 0.5) * 0.7;

        float finalMask = smoothstep(0.35, 0.55, (n * u_noiseStrength) + pow(density, 1.5));

        vec2 responsiveUV = uv;
        if (u_frontImageAspect > 0.0 && u_containerAspect > 0.0) {
          if (u_frontImageAspect > u_containerAspect) {
            float scale = u_frontImageAspect / u_containerAspect;
            responsiveUV.x = (uv.x - 0.5) / scale + 0.5;
          } else {
            float scale = u_containerAspect / u_frontImageAspect;
            responsiveUV.y = (uv.y - 0.5) / scale + 0.5;
          }
        }

        vec2 inset = u_parallaxMax / u_planeRes;
        vec2 baseUV = inset + responsiveUV * (1.0 - 2.0 * inset);
        vec2 parallaxUV = u_parallaxOffset / u_planeRes;
        vec2 sampleUV = baseUV + parallaxUV;

        vec4 frontColor = texture2D(u_frontImage, sampleUV);
        float outAlpha = frontColor.a * finalMask;
        if (outAlpha < 0.01) outAlpha = 0.0;

        gl_FragColor = vec4(frontColor.rgb, outAlpha);
      }
    `;

    const geometry = new PlaneGeometry(1, 1, 1, 1);
    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const fluidScene = new Scene();
    const texelSize = new Vector2(1 / simWidth, 1 / simHeight);

    const splatVelMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: splatFrag,
      uniforms: {
        u_point: { value: new Vector2(0.5, 0.5) },
        u_splatColor: { value: new Vector2(0, 0) },
        u_radius: { value: 0.02 },
        u_aspectRatio: { value: 1 },
        u_target: { value: velFBO0.texture },
      },
      depthWrite: false,
    });
    const quadMesh = new Mesh(quadGeometry, splatVelMaterial);
    fluidScene.add(quadMesh);

    const splatDensityMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: splatDensityFrag,
      uniforms: {
        u_point: { value: new Vector2(0.5, 0.5) },
        u_radius: { value: 0.02 },
        u_aspectRatio: { value: 1 },
        u_densityAmount: { value: 1 },
        u_target: { value: densityFBO0.texture },
      },
      depthWrite: false,
    });

    const advectMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: advectFrag,
      uniforms: {
        u_velocity: { value: velFBO0.texture },
        u_source: { value: velFBO0.texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipationMultiply: { value: 0.99 },
      },
      depthWrite: false,
    });

    const divergenceMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: divergenceFrag,
      uniforms: {
        u_velocity: { value: velFBO0.texture },
        u_texelSize: { value: texelSize.clone() },
      },
      depthWrite: false,
    });

    const pressureMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: pressureFrag,
      uniforms: {
        u_pressure: { value: pressureFBO0.texture },
        u_divergence: { value: divFBO.texture },
        u_texelSize: { value: texelSize.clone() },
      },
      depthWrite: false,
    });

    const gradientMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: gradientFrag,
      uniforms: {
        u_velocity: { value: velFBO0.texture },
        u_pressure: { value: pressureFBO0.texture },
        u_texelSize: { value: texelSize.clone() },
      },
      depthWrite: false,
    });

    const curlMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: curlFrag,
      uniforms: {
        u_velocity: { value: velFBO0.texture },
        u_texelSize: { value: texelSize.clone() },
        u_curl: { value: 30 },
      },
      depthWrite: false,
    });

    const advectDensityMaterial = new ShaderMaterial({
      vertexShader: vertexShaderQuad,
      fragmentShader: advectFrag,
      uniforms: {
        u_velocity: { value: velFBO0.texture },
        u_source: { value: densityFBO0.texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipationMultiply: { value: 0.93 },
      },
      depthWrite: false,
    });

    const sizes = new Vector2();
    let cachedBounds = container.getBoundingClientRect();

    const updateFromDOM = () => {
      const actualWidth = Math.max(container.clientWidth, 2);
      const actualHeight = Math.max(container.clientHeight, 2);
      sizes.set(actualWidth, actualHeight);
      mesh.position.set(0, 0, 0);
      mesh.scale.set(actualWidth, actualHeight, 1);

      renderer.setSize(actualWidth, actualHeight, false);
      camera.aspect = actualWidth / actualHeight;
      camera.updateProjectionMatrix();
      camera.position.z = perspective;
      camera.lookAt(0, 0, 0);

      uniforms.u_planeRes.value.set(actualWidth, actualHeight);
      uniforms.u_windowSize.value.set(window.innerWidth, window.innerHeight);

      const containerRect = container.getBoundingClientRect();
      cachedBounds = containerRect;
      uniforms.u_containerOffset.value.set(containerRect.left, containerRect.top);

      const containerAspect = actualWidth / actualHeight;
      uniforms.u_containerAspect.value = containerAspect;

      if (frontTexture.image) {
        const imageAspect = frontTexture.image.width / frontTexture.image.height;
        uniforms.u_frontImageAspect.value = imageAspect;
      }

      resizeFluidFBOs(actualWidth, actualHeight);
      texelSize.set(1 / simWidth, 1 / simHeight);
      uniforms.u_simResolution.value.set(simWidth, simHeight);

      if (isAnimating) {
        renderer.render(scene, camera);
      }
    };

    let isIntersecting = cachedBounds.top < window.innerHeight && cachedBounds.bottom > 0;
    let isPageVisible = document.visibilityState === 'visible';
    let hoverActive = false;
    let settleUntil = 0;

    updateFromDOM();

    let targetProgress = 0;
    let rafId = 0;
    const clock = new Clock();
    const targetParallaxOffset = new Vector2(0, 0);

    const shouldAnimate = () => {
      return isPageVisible && isIntersecting && (hoverActive || performance.now() < settleUntil);
    };

    const render = () => {
      if (!shouldAnimate()) {
        isAnimating = false;
        return;
      }
      isAnimating = true;
      rafId = 0;
      const dt = clock.getDelta();
      uniforms.u_time.value += dt;

      if (!debouncedProps.parallax) {
        uniforms.u_parallaxOffset.value.set(0, 0);
        targetParallaxOffset.set(0, 0);
      } else {
        const s = Math.max(0, Math.min(1, debouncedProps.parallaxSmoothing ?? 0));
        if (s === 0) {
          uniforms.u_parallaxOffset.value.copy(targetParallaxOffset);
        } else {
          const tauMin = 0.04;
          const tauMax = 0.25;
          const tau = tauMin + (tauMax - tauMin) * s;
          const alpha = 1 - Math.exp(-dt / Math.max(1e-6, tau));
          uniforms.u_parallaxOffset.value.lerp(targetParallaxOffset, alpha);
        }
      }

      const mouseTarget = uniforms.u_mouse.value;
      mouseVelocity.x = mouseTarget.x - lastMouseUV.x;
      mouseVelocity.y = mouseTarget.y - lastMouseUV.y;
      lastMouseUV.x = mouseTarget.x;
      lastMouseUV.y = mouseTarget.y;

      const actualW = Math.max(container.clientWidth, 2);
      const actualH = Math.max(container.clientHeight, 2);
      const containerAspect = actualW / actualH;
      uniforms.u_containerAspect.value = containerAspect;
      uniforms.u_planeRes.value.set(actualW, actualH);

      if (
        renderer.getSize(new Vector2()).x !== actualW ||
        renderer.getSize(new Vector2()).y !== actualH
      ) {
        renderer.setSize(actualW, actualH, false);
        camera.aspect = containerAspect;
        camera.updateProjectionMatrix();
        mesh.scale.set(actualW, actualH, 1);
      }

      resizeFluidFBOs(actualW, actualH);

      const simMouseX = mouseTarget.x;
      const simMouseY = mouseTarget.y;

      const splatRad = Math.max(0.005, debouncedProps.splatRadius);
      const velDiss = Math.max(0.9, Math.min(1, debouncedProps.velocityDissipation));
      const T = Math.max(0.5, Math.min(10, debouncedProps.shrinkTimeSeconds));
      const denDiss = Math.pow(0.01, 1 / (60 * T));
      const pressureIters = Math.max(
        10,
        Math.min(50, Math.round(debouncedProps.pressureIterations))
      );

      texelSize.set(1 / simWidth, 1 / simHeight);
      advectMaterial.uniforms.u_texelSize.value.copy(texelSize);
      divergenceMaterial.uniforms.u_texelSize.value.copy(texelSize);
      pressureMaterial.uniforms.u_texelSize.value.copy(texelSize);
      gradientMaterial.uniforms.u_texelSize.value.copy(texelSize);
      advectDensityMaterial.uniforms.u_texelSize.value.copy(texelSize);

      const gl = renderer.getContext();
      gl.disable(gl.BLEND);

      // 1) Splat velocity
      splatVelMaterial.uniforms.u_point.value.set(simMouseX, simMouseY);
      splatVelMaterial.uniforms.u_aspectRatio.value = containerAspect;
      splatVelMaterial.uniforms.u_splatColor.value.set(mouseVelocity.x * 30, mouseVelocity.y * 30);
      splatVelMaterial.uniforms.u_radius.value = splatRad;
      splatVelMaterial.uniforms.u_target.value = velFBO0.texture;
      quadMesh.material = splatVelMaterial;
      renderer.setRenderTarget(velFBO1);
      renderer.render(fluidScene, orthoCamera);

      // 2) Splat density
      splatDensityMaterial.uniforms.u_point.value.set(simMouseX, simMouseY);
      splatDensityMaterial.uniforms.u_aspectRatio.value = containerAspect;
      splatDensityMaterial.uniforms.u_radius.value = splatRad;
      splatDensityMaterial.uniforms.u_densityAmount.value = 1;
      splatDensityMaterial.uniforms.u_target.value = densityFBO0.texture;
      quadMesh.material = splatDensityMaterial;
      renderer.setRenderTarget(densityFBO1);
      renderer.render(fluidScene, orthoCamera);

      // 3) Advect velocity
      advectMaterial.uniforms.u_velocity.value = velFBO1.texture;
      advectMaterial.uniforms.u_source.value = velFBO1.texture;
      advectMaterial.uniforms.u_dt.value = 1;
      advectMaterial.uniforms.u_dissipationMultiply.value = velDiss;
      quadMesh.material = advectMaterial;
      renderer.setRenderTarget(velFBO0);
      renderer.render(fluidScene, orthoCamera);

      // 3b) Curl
      if (debouncedProps.curl > 0) {
        curlMaterial.uniforms.u_velocity.value = velFBO0.texture;
        curlMaterial.uniforms.u_curl.value = debouncedProps.curl;
        quadMesh.material = curlMaterial;
        renderer.setRenderTarget(velFBO1);
        renderer.render(fluidScene, orthoCamera);
      }

      // 4) Divergence
      const velForDiv = debouncedProps.curl > 0 ? velFBO1.texture : velFBO0.texture;
      divergenceMaterial.uniforms.u_velocity.value = velForDiv;
      quadMesh.material = divergenceMaterial;
      renderer.setRenderTarget(divFBO);
      renderer.render(fluidScene, orthoCamera);

      // 5) Pressure
      pressureMaterial.uniforms.u_divergence.value = divFBO.texture;
      let pressureRead = pressureFBO0;
      let pressureWrite = pressureFBO1;
      for (let i = 0; i < pressureIters; i++) {
        pressureMaterial.uniforms.u_pressure.value = pressureRead.texture;
        quadMesh.material = pressureMaterial;
        renderer.setRenderTarget(pressureWrite);
        renderer.render(fluidScene, orthoCamera);
        const tmp = pressureRead;
        pressureRead = pressureWrite;
        pressureWrite = tmp;
      }

      // 6) Gradient
      const velForGradientRead = debouncedProps.curl > 0 ? velFBO1 : velFBO0;
      const velForGradientWrite = debouncedProps.curl > 0 ? velFBO0 : velFBO1;
      gradientMaterial.uniforms.u_velocity.value = velForGradientRead.texture;
      gradientMaterial.uniforms.u_pressure.value = pressureRead.texture;
      quadMesh.material = gradientMaterial;
      renderer.setRenderTarget(velForGradientWrite);
      renderer.render(fluidScene, orthoCamera);

      // 7) Advect density
      advectDensityMaterial.uniforms.u_velocity.value = velForGradientWrite.texture;
      advectDensityMaterial.uniforms.u_source.value = densityFBO1.texture;
      advectDensityMaterial.uniforms.u_dt.value = 1;
      advectDensityMaterial.uniforms.u_dissipationMultiply.value = denDiss;
      quadMesh.material = advectDensityMaterial;
      renderer.setRenderTarget(densityFBO0);
      renderer.render(fluidScene, orthoCamera);

      if (debouncedProps.curl <= 0) {
        const tmp = velFBO0;
        velFBO0 = velFBO1;
        velFBO1 = tmp;
      }

      renderer.setRenderTarget(null);
      renderer.clear();
      gl.enable(gl.BLEND);

      uniforms.u_densityTex.value = densityFBO0.texture;
      uniforms.u_parallaxMax.value = debouncedProps.parallax
        ? Math.max(0, Math.min(200, debouncedProps.parallaxAmount ?? 0))
        : 0;
      uniforms.u_blur.value = mapBlur(debouncedProps.blur);
      uniforms.u_circleBoost.value = mapCircleBoost(debouncedProps.circleBoost);
      const currentTextureParams = mapTexture(debouncedProps.texture);
      uniforms.u_noiseFreq.value = currentTextureParams.freq;
      uniforms.u_noiseStrength.value = currentTextureParams.strength;
      uniforms.u_noiseSize.value = currentTextureParams.size;
      uniforms.u_timeSpeed.value = mapTimeSpeed(debouncedProps.timeSpeed);
      uniforms.u_radius.value = mapRadius(debouncedProps.radius);

      uniforms.u_progress.value += (targetProgress - uniforms.u_progress.value) * 0.08;

      renderer.render(scene, camera);

      if (shouldAnimate()) {
        rafId = requestAnimationFrame(render);
      } else {
        isAnimating = false;
      }
    };

    let resizeTimeout: NodeJS.Timeout | null = null;
    const throttledResize = () => {
      if (resizeTimeout) return;
      resizeTimeout = setTimeout(() => {
        cachedBounds = container.getBoundingClientRect();
        updateFromDOM();
        if (isAnimating) {
          renderer.render(scene, camera);
        }
        resizeTimeout = null;
      }, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        if (width !== sizes.x || height !== sizes.y) {
          updateFromDOM();
        }
      });
      throttledResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', throttledResize);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting && !isAnimating && shouldAnimate()) {
            render();
          }
        });
      },
      { root: null, rootMargin: '50px', threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      if (isPageVisible && isIntersecting && !isAnimating && shouldAnimate()) {
        clock.getDelta();
        render();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onScroll = () => {
      cachedBounds = container.getBoundingClientRect();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const parallaxPx = debouncedProps.parallax
      ? Math.max(0, Math.min(200, debouncedProps.parallaxAmount ?? 0))
      : 0;

    const onMove = (e: MouseEvent | { clientX: number; clientY: number }) => {
      if (!hoverActive) {
        onEnter();
      }
      if (!isAnimating && shouldAnimate()) {
        render();
      }
      const x = (e.clientX - cachedBounds.left) / cachedBounds.width;
      const y = 1 - (e.clientY - cachedBounds.top) / cachedBounds.height;
      const nx = Math.max(0, Math.min(1, x));
      const ny = Math.max(0, Math.min(1, y));
      uniforms.u_mouse.value.set(nx, ny);

      if (debouncedProps.parallax && parallaxPx > 0) {
        const offsetX = Math.max(-parallaxPx, Math.min(parallaxPx, (nx - 0.5) * 2 * parallaxPx));
        const offsetY = Math.max(-parallaxPx, Math.min(parallaxPx, (ny - 0.5) * 2 * parallaxPx));
        targetParallaxOffset.set(offsetX, offsetY);
      }
    };

    const onEnter = () => {
      const gl = renderer.getContext();
      gl.clearColor(0, 0, 0, 0);
      renderer.setRenderTarget(densityFBO0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.setRenderTarget(densityFBO1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.setRenderTarget(velFBO0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.setRenderTarget(velFBO1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.setRenderTarget(null);

      hoverActive = true;
      settleUntil = Number.POSITIVE_INFINITY;
      targetProgress = 1;

      if (!isAnimating && shouldAnimate()) {
        render();
      }
    };

    const onLeave = () => {
      hoverActive = false;
      settleUntil =
        performance.now() + Math.max(0.5, debouncedProps.shrinkTimeSeconds) * 1000 + 250;
      targetProgress = 0;
      targetParallaxOffset.set(0, 0);
      if (
        !debouncedProps.parallax ||
        Math.max(0, Math.min(1, debouncedProps.parallaxSmoothing ?? 0)) === 0
      ) {
        uniforms.u_parallaxOffset.value.set(0, 0);
      }
    };

    // Touch event support for mobile & tablet fluid interaction
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      onMove({ clientX: touch.clientX, clientY: touch.clientY });
    };

    const onTouchStart = (e: TouchEvent) => {
      onEnter();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        onMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    const onTouchEnd = () => {
      onLeave();
    };

    const interactionOwner = container;
    interactionOwner.addEventListener('mousemove', onMove);
    interactionOwner.addEventListener('mouseenter', onEnter);
    interactionOwner.addEventListener('mouseleave', onLeave);
    interactionOwner.addEventListener('touchmove', onTouchMove, { passive: true });
    interactionOwner.addEventListener('touchstart', onTouchStart, { passive: true });
    interactionOwner.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);

      interactionOwner.removeEventListener('mousemove', onMove);
      interactionOwner.removeEventListener('mouseenter', onEnter);
      interactionOwner.removeEventListener('mouseleave', onLeave);
      interactionOwner.removeEventListener('touchmove', onTouchMove);
      interactionOwner.removeEventListener('touchstart', onTouchStart);
      interactionOwner.removeEventListener('touchend', onTouchEnd);

      disposeFluidFBOs();
      quadGeometry.dispose();
      splatVelMaterial.dispose();
      splatDensityMaterial.dispose();
      advectMaterial.dispose();
      divergenceMaterial.dispose();
      pressureMaterial.dispose();
      gradientMaterial.dispose();
      curlMaterial.dispose();
      advectDensityMaterial.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    debouncedProps.radius,
    debouncedProps.blur,
    debouncedProps.circleBoost,
    debouncedProps.texture,
    debouncedProps.timeSpeed,
    debouncedProps.splatRadius,
    debouncedProps.velocityDissipation,
    debouncedProps.shrinkTimeSeconds,
    debouncedProps.curl,
    debouncedProps.pressureIterations,
    imageBase?.src,
    imageHover?.src,
    debouncedProps.parallax,
    debouncedProps.parallaxAmount,
    debouncedProps.parallaxSmoothing,
    mapRadius,
    mapBlur,
    mapCircleBoost,
    mapTexture,
    mapTimeSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden select-none cursor-pointer ${className}`}
      style={{
        borderRadius,
        ...style,
      }}
    >
      {/* Base Image (Human Face) */}
      <figure className="absolute inset-0 m-0 p-0 z-[1] pointer-events-none">
        <img
          ref={imgRef}
          src={imageBase?.src}
          alt={imageBase?.alt || 'Base face image'}
          draggable={false}
          className="w-full h-full object-cover object-center pointer-events-none select-none filter contrast-105"
        />
      </figure>

      {/* WebGL Fluid Mask Canvas Overlay (Reveals Cybernetic Mask on Cursor Hover) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[3] pointer-events-none bg-transparent"
        style={{ mixBlendMode: 'normal' }}
      />
    </div>
  );
}
