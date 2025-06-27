import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeonCursorProps {
  className?: string;
  color?: number;
  shaderPoints?: number;
  curvePoints?: number;
  curveLerp?: number;
  radius1?: number;
  radius2?: number;
  velocityThreshold?: number;
  sleepRadiusX?: number;
  sleepRadiusY?: number;
  sleepTimeCoefX?: number;
  sleepTimeCoefY?: number;
}

export default function NeonCursor({
  className = '',
  color = 0x9F2BFF, // Violet brillant VelocitAI
  shaderPoints = 12,
  curvePoints = 100,
  curveLerp = 0.8,
  radius1 = 5,
  radius2 = 8,
  velocityThreshold = 10,
  sleepRadiusX = 150,
  sleepRadiusY = 150,
  sleepTimeCoefX = 0.0025,
  sleepTimeCoefY = 0.0025
}: NeonCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    plane: THREE.Mesh;
    points: THREE.Vector2[];
    spline: THREE.SplineCurve;
    velocity: THREE.Vector3;
    velocityTarget: THREE.Vector3;
    uniforms: {
      uRatio: { value: THREE.Vector2 };
      uSize: { value: THREE.Vector2 };
      uPoints: { value: THREE.Vector2[] };
      uColor: { value: THREE.Color };
    };
    hover: boolean;
    clock: THREE.Clock;
    animationId?: number;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Désactiver sur mobile pour les performances
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
      return; // Ne pas initialiser Three.js sur mobile
    }

    const container = containerRef.current;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      premultipliedAlpha: false 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Initialize points and spline
    const points = new Array(curvePoints).fill(0).map(() => new THREE.Vector2());
    const spline = new THREE.SplineCurve(points);

    const velocity = new THREE.Vector3();
    const velocityTarget = new THREE.Vector3();

    // Uniforms
    const uniforms = {
      uRatio: { value: new THREE.Vector2() },
      uSize: { value: new THREE.Vector2() },
      uPoints: { value: new Array(shaderPoints).fill(0).map(() => new THREE.Vector2()) },
      uColor: { value: new THREE.Color(color) }
    };

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      defines: {
        SHADER_POINTS: shaderPoints
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        // https://www.shadertoy.com/view/wdy3DD
        // https://www.shadertoy.com/view/MlKcDD
        // Signed distance to a quadratic bezier
        float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
          vec2 a = B - A;
          vec2 b = A - 2.0*B + C;
          vec2 c = a * 2.0;
          vec2 d = A - pos;
          float kk = 1.0 / dot(b,b);
          float kx = kk * dot(a,b);
          float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
          float kz = kk * dot(d,a);
          float res = 0.0;
          float p = ky - kx*kx;
          float p3 = p*p*p;
          float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
          float h = q*q + 4.0*p3;
          if(h >= 0.0){
            h = sqrt(h);
            vec2 x = (vec2(h, -h) - q) / 2.0;
            vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
            float t = uv.x + uv.y - kx;
            t = clamp( t, 0.0, 1.0 );
            // 1 root
            vec2 qos = d + (c + b*t)*t;
            res = length(qos);
          } else {
            float z = sqrt(-p);
            float v = acos( q/(p*z*2.0) ) / 3.0;
            float m = cos(v);
            float n = sin(v)*1.732050808;
            vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
            t = clamp( t, 0.0, 1.0 );
            // 3 roots
            vec2 qos = d + (c + b*t.x)*t.x;
            float dis = dot(qos,qos);
            res = dis;
            qos = d + (c + b*t.y)*t.y;
            dis = dot(qos,qos);
            res = min(res,dis);
            qos = d + (c + b*t.z)*t.z;
            dis = dot(qos,qos);
            res = min(res,dis);
            res = sqrt( res );
          }
          return res;
        }

        uniform vec2 uRatio;
        uniform vec2 uSize;
        uniform vec2 uPoints[SHADER_POINTS];
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float intensity = 1.8;

          vec2 pos = (vUv - 0.5) * uRatio;

          vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
          vec2 c_prev;
          float dist = 10000.0;
          for(int i = 0; i < SHADER_POINTS - 1; i++){
            c_prev = c;
            c = (uPoints[i] + uPoints[i + 1]) / 2.0;
            dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
          }
          dist = max(0.0, dist);

          // Effet neon simple et pur comme l'original
          float glow = pow(uSize.y / (dist + 0.001), intensity);
          vec3 col = vec3(0.0);
          
          // Trait neon violet pur avec intensité
          col += 15.0 * uColor * smoothstep(uSize.x, 0.0, dist);
          col += glow * uColor * 1.2;

          // Tone mapping simple pour garder l'intensité
          col = 1.0 - exp(-col * 1.5);
          col = pow(col, vec3(0.4545));

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();

    // Store all references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      plane,
      points,
      spline,
      velocity,
      velocityTarget,
      uniforms,
      hover: false,
      clock
    };

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      
      uniforms.uSize.value.set(radius1, radius2);
      if (width >= height) {
        uniforms.uRatio.value.set(1, height / width);
        uniforms.uSize.value.multiplyScalar(1 / width);
      } else {
        uniforms.uRatio.value.set(width / height, 1);
        uniforms.uSize.value.multiplyScalar(1 / height);
      }
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return;

      const { uniforms, spline, velocity, velocityTarget } = sceneRef.current;
      sceneRef.current.hover = true;

      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Normalize mouse position
      const nPosition = {
        x: (event.clientX / width) * 2 - 1,
        y: -(event.clientY / height) * 2 + 1
      };

      const x = (0.5 * nPosition.x) * uniforms.uRatio.value.x;
      const y = (0.5 * nPosition.y) * uniforms.uRatio.value.y;
      spline.points[0].set(x, y);

      // Calculate velocity
      const deltaX = event.movementX || 0;
      const deltaY = event.movementY || 0;
      
      velocityTarget.x = Math.min(velocity.x + Math.abs(deltaX) / velocityThreshold, 1);
      velocityTarget.y = Math.min(velocity.y + Math.abs(deltaY) / velocityThreshold, 1);
      velocityTarget.z = Math.sqrt(velocityTarget.x * velocityTarget.x + velocityTarget.y * velocityTarget.y);
      velocity.lerp(velocityTarget, 0.05);
    };

    const handleMouseLeave = () => {
      if (sceneRef.current) {
        sceneRef.current.hover = false;
      }
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      const { 
        scene, 
        camera, 
        renderer, 
        points, 
        spline, 
        velocity, 
        uniforms, 
        hover, 
        clock 
      } = sceneRef.current;

      // Update trail points
      for (let i = 1; i < curvePoints; i++) {
        points[i].lerp(points[i - 1], curveLerp);
      }

      // Update shader points
      for (let i = 0; i < shaderPoints; i++) {
        spline.getPoint(i / (shaderPoints - 1), uniforms.uPoints.value[i]);
      }

      // Update color based on hover state - EXACTEMENT comme l'original
      if (!hover) {
        const time = clock.getElapsedTime();
        const t1 = time * sleepTimeCoefX;
        const t2 = time * sleepTimeCoefY;
        const cos = Math.cos(t1);
        const sin = Math.sin(t2);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const wWidth = Math.max(width, height);
        const r1 = sleepRadiusX * wWidth / width;
        const r2 = sleepRadiusY * wWidth / width;
        const x = r1 * cos;
        const y = r2 * sin;
        spline.points[0].set(x, y);
        
        // Animation couleur violette pure (pas rouge comme l'original)
        uniforms.uColor.value.r = 0.5 + 0.5 * Math.cos(time * 0.0015);
        uniforms.uColor.value.g = 0.1; // Un peu de vert pour la richesse
        uniforms.uColor.value.b = 1.0; // Toujours maximum bleu pour le violet
      } else {
        // Couleur basée sur la vélocité - style original mais violet
        uniforms.uColor.value.r = velocity.z * 0.8 + 0.2; // Violet-rouge variable
        uniforms.uColor.value.g = 0.1; // Toujours minimal
        uniforms.uColor.value.b = 1.0; // Toujours maximum pour le violet
        velocity.multiplyScalar(0.95);
      }

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Clean up Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    color,
    shaderPoints,
    curvePoints,
    curveLerp,
    radius1,
    radius2,
    velocityThreshold,
    sleepRadiusX,
    sleepRadiusY,
    sleepTimeCoefX,
    sleepTimeCoefY
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'screen'
      }}
    />
  );
}