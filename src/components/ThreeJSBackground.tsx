import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeJSBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(2, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const glowMaterial = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.8
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    mainGroup.add(glowSphere);

    const shardCount = 12;
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < shardCount; i++) {
      const shardGeom = new THREE.OctahedronGeometry(0.2, 0);
      const shardMat = new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
        flatShading: true
      });
      const shard = new THREE.Mesh(shardGeom, shardMat);
      
      const angle = (i / shardCount) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, (Math.random() - 0.5) * 2);
      shard.userData = {
        angle: angle,
        speed: 0.005 + Math.random() * 0.01,
        orbitRadius: 3.5 + (Math.random() - 0.5)
      };
      
      shards.push(shard);
      mainGroup.add(shard);
    }

    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i+1] = (Math.random() - 0.5) * 20;
      positions[i+2] = (Math.random() - 0.5) * 20;
      
      colors[i] = 0.22; 
      colors[i+1] = 0.74;
      colors[i+2] = 0.97;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const p1 = new THREE.PointLight(0x38bdf8, 2, 20);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    
    const p2 = new THREE.PointLight(0x38bdf8, 1, 20);
    p2.position.set(-5, -5, 2);
    scene.add(p2);

    camera.position.z = 8;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    function animate(t: number) {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = t * 0.001;
      
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      
      mainGroup.rotation.y = mouseX * 0.5;
      mainGroup.rotation.x = -mouseY * 0.5;
      
      coreMesh.rotation.y += 0.002;
      coreMesh.rotation.x += 0.001;
      
      glowSphere.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      
      shards.forEach(shard => {
        shard.userData.angle += shard.userData.speed;
        shard.position.x = Math.cos(shard.userData.angle) * shard.userData.orbitRadius;
        shard.position.y = Math.sin(shard.userData.angle) * shard.userData.orbitRadius;
        shard.rotation.x += 0.02;
        shard.rotation.y += 0.02;
      });
      
      particleSystem.rotation.y += 0.0005;
      particleSystem.position.y = Math.sin(time * 0.5) * 0.5;
      
      renderer.render(scene, camera);
    }
    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full mix-blend-screen" style={{ display: 'block' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}
