'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Verifica se o elemento está montado
    if (!mountRef.current) return;

    // 1. Criar a cena
    const scene = new THREE.Scene();

    // 2. Criar a câmera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Criar o renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 4. Carregar a fonte e criar o texto
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('EU E MEU CASCA DE BALA', {
        font: font,
        size: 1,
        height: 0.2,
      });

      // Criar material para o texto
      const textMaterial = new THREE.MeshBasicMaterial({ color: cccc });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Adicionar texto à cena
      textMesh.position.set(-2.5, 0, 0);
      scene.add(textMesh);

      // Função de animação
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotação do texto
        textMesh.rotation.x += 0.01;

        // Renderizar a cena
        renderer.render(scene, camera);
      };

      animate();
    });

    // Ajustar o renderizador em caso de redimensionamento da janela
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup ao desmontar o componente
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={mountRef}></div>;
}
