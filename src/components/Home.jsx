import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Home = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const cursorRef = useRef(null);
  
  useEffect(() => {
    // Custom mouse follower
    const cursor = document.createElement('div');
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.backgroundColor = '#FF7A00';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'all 0.1s ease-out'; // Increased transition duration
    document.body.appendChild(cursor);

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const moveCursor = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursorPosition = () => {
      // Interpolate between current and target positions
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      
      requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', moveCursor);
    updateCursorPosition();

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Create 3D text
    const loader = new FontLoader();
    loader.load(
      '/fonts/helvetiker_regular.typeface.json', // Use local path instead of CDN
      (font) => {
        const textGeometry = new TextGeometry('SquirShop', {
          font: font,
          size: 0.5,
          height: 0.2,
        });
        textGeometry.center();

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff7a00 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.castShadow = true;
        textMesh.position.y = 1; // Move text up to make room for centered model
        scene.add(textMesh);
      },
      undefined,
      (error) => console.error('Error loading font:', error)
    );

    // Load 3D Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/paper_bag.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0); // Center the model
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        modelRef.current = model; // Store model reference
        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffffff, 1);
    keyLight.position.set(5, 5, 0);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const fillLight = new THREE.SpotLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, 0);
    scene.add(fillLight);

    const backLight = new THREE.SpotLight(0xffffff, 0.7);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    // Camera setup
    camera.position.set(0, 1, 5);

    // Orbit Controls
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.maxPolarAngle = Math.PI / 2;
    controlsRef.current.enableRotate = true;
    controlsRef.current.enableZoom = true;
    controlsRef.current.enablePan = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the model if it exists
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
      }
      
      controlsRef.current.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      controlsRef.current.dispose();
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen  overflow-hidden" style={{ background: 'linear-gradient(270deg, #240046 0%, #ff6d00 100%)'}}>
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9100]">
          Welcome to SquirShop
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Discover a new dimension of online shopping with our innovative 3D experience.
        </p>
        <div className="space-x-4">
          <button className="bg-[#FF7A00] hover:bg-[#FF9100] text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
          <button className="border-2 border-[#FF7A00] hover:bg-[#FF7A00] text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
