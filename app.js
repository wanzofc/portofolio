import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

function App() {
  const canvasRef = useRef();
  const projectsRef = useRef([]);

  useEffect(() => {
    // Pengaturan adegan Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Pemuat model (Ganti dengan jalur ke model Anda)
    const loader = new GLTFLoader();
    loader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Animasi model (contoh)
      gsap.to(model.rotation, { duration: 2, y: Math.PI * 2, repeat: -1, ease: "none" });
    }, undefined, (error) => {
      console.error(error);
    });

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Ambil proyek dari API (jika Anda menggunakan back-end C++)
    fetch('/api/projects')
      .then(res => res.json())
      .then(projects => {
        // Animasikan proyek saat mereka dimuat
        gsap.from(projectsRef.current, {
          duration: 1,
          x: -50,
          opacity: 0,
          stagger: 0.2,
          ease: 'power2.out',
        });
      })
      .catch(error => console.error("Error mengambil proyek:", error));

    return () => renderer.dispose();
  }, []);

  // Data proyek contoh (gunakan ini jika tidak menggunakan back-end C++)
  const projects = [
    { title: "Proyek 1", description: "Deskripsi Proyek 1.", url: "#" },
    { title: "Proyek 2", description: "Deskripsi Proyek 2.", url: "#" },
    // ... tambahkan lebih banyak proyek
  ];

  return (
    <div>
      <div ref={canvasRef}></div>
      <div className="info">
        <h1>Portofolio Saya</h1>
        <p>Selamat datang di portofolio saya. Gulir ke bawah untuk melihat proyek saya.</p>
      </div>
      <div className="project-container">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project"
            ref={el => projectsRef.current[index] = el}
            onClick={() => window.open(project.url, '_blank')}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));