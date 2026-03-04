import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './Model.css';

const models = [
  { name: 'Base Model', path: '/models/baseModel.stl' },
  { name: 'Lid Model', path: '/models/lidModel.stl' },
];

const orientationLabels = {
  RECHTS: [1, 0, 0],
  LINKS: [-1, 0, 0],
  OBEN: [0, 1, 0],
  UNTEN: [0, -1, 0],
  VORNE: [0, 0, 1],
  HINTEN: [0, 0, -1],
};

export default function Model() {
  const containerRef = useRef(null);
  const orientationContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const loaderRef = useRef(null);
  const currentMeshRef = useRef(null);
  const defaultDistRef = useRef(200);
  const orientRendererRef = useRef(null);
  const orientSceneRef = useRef(null);
  const orientCameraRef = useRef(null);
  const orientCubeRef = useRef(null);

  const [selectedModel, setSelectedModel] = useState(models[0].path);
  const [isRotating, setIsRotating] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [orientationLabel, setOrientationLabel] = useState('VORNE');

  const isLidModel = selectedModel === models[1].path;

  const loadModel = useCallback((modelPath) => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const loader = loaderRef.current;
    if (!scene || !camera || !controls || !loader) return;

    if (currentMeshRef.current) {
      scene.remove(currentMeshRef.current);
      currentMeshRef.current = null;
    }

    loader.load(modelPath, (geometry) => {
      const material = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a, metalness: 0.3, roughness: 0.8, opacity: 0, transparent: true
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      geometry.center();
      geometry.computeBoundingBox();

      const bb = geometry.boundingBox;
      if (bb) {
        const size = bb.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let distance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 2.2;
        defaultDistRef.current = distance;
        camera.position.set(0, distance * 0.6, distance * 0.8);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
      }

      scene.add(mesh);
      currentMeshRef.current = mesh;

      const duration = 500;
      const startTime = Date.now();
      const animateOpacity = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress * progress * (3 - 2 * progress);
        material.opacity = eased;
        if (progress < 1) requestAnimationFrame(animateOpacity);
      };
      animateOpacity();
    }, undefined, (error) => console.error('Error loading model:', error));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
    camera.position.set(0, 80, 120);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dl1 = new THREE.DirectionalLight(0xffffff, 1.5); dl1.position.set(10, 20, 10); scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0xffffff, 0.8); dl2.position.set(-10, 15, -10); scene.add(dl2);
    const dl3 = new THREE.DirectionalLight(0xffffff, 0.6); dl3.position.set(0, -10, 5); scene.add(dl3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 3;
    controlsRef.current = controls;

    const loader = new STLLoader();
    loaderRef.current = loader;

    const oScene = new THREE.Scene();
    const oCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    oCamera.position.set(0, 0, 100);
    const oRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    oRenderer.setSize(120, 120);
    oRenderer.setClearColor(0x000000, 0);
    orientSceneRef.current = oScene;
    orientCameraRef.current = oCamera;
    orientRendererRef.current = oRenderer;

    const createTextTexture = (text) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const geo = new THREE.BoxGeometry(60, 60, 60);
    const mats = ['RECHTS', 'LINKS', 'OBEN', 'UNTEN', 'VORNE', 'HINTEN'].map(
      t => new THREE.MeshBasicMaterial({ map: createTextTexture(t) })
    );
    const cube = new THREE.Mesh(geo, mats);
    oScene.add(cube);
    orientCubeRef.current = cube;

    const edges = new THREE.EdgesGeometry(geo);
    cube.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })));
    oScene.add(new THREE.AmbientLight(0xffffff, 1));

    if (orientationContainerRef.current) {
      orientationContainerRef.current.innerHTML = '';
      orientationContainerRef.current.appendChild(oRenderer.domElement);
    }

    setTimeout(() => loadModel(models[0].path), 50);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      if (cube && camera) {
        const q = new THREE.Quaternion();
        q.copy(camera.quaternion);
        q.invert();
        cube.quaternion.copy(q);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(camera.quaternion);
        let closestLabel = 'VORNE';
        let closestDot = -2;
        Object.entries(orientationLabels).forEach(([label, dir]) => {
          const d = forward.dot(new THREE.Vector3(...dir));
          if (d > closestDot) { closestDot = d; closestLabel = label; }
        });
        setOrientationLabel(closestLabel);
      }
      oRenderer.render(oScene, oCamera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      oRenderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (orientationContainerRef.current) {
        orientationContainerRef.current.innerHTML = '';
      }
    };
  }, [loadModel]);

  function toggleRotation() {
    setIsRotating(prev => {
      const next = !prev;
      if (controlsRef.current) controlsRef.current.autoRotate = next;
      return next;
    });
  }

  function resetView() {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const d = defaultDistRef.current;
    camera.position.set(0, d * 0.6, d * 0.8);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.autoRotate = false;
    setIsRotating(false);
    setIsZoomedIn(false);
  }

  function toggleZoom() {
    const camera = cameraRef.current;
    if (!camera) return;
    const d = defaultDistRef.current;
    const currentPos = camera.position.clone();
    let targetPos;

    if (isZoomedIn) {
      targetPos = new THREE.Vector3(0, d * 0.6, d * 0.8);
      setIsZoomedIn(false);
    } else {
      const dir = currentPos.clone().normalize();
      targetPos = dir.multiplyScalar(d * 0.4);
      setIsZoomedIn(true);
    }

    const duration = 500;
    const startTime = Date.now();
    const startPos = currentPos.clone();
    const animateZoom = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      camera.position.lerpVectors(startPos, targetPos, eased);
      camera.lookAt(0, 0, 0);
      if (progress < 1) requestAnimationFrame(animateZoom);
    };
    animateZoom();
  }

  function downloadModel() {
    const data = models.find(m => m.path === selectedModel);
    const filename = data?.name.replace(/\s+/g, '_') || 'model';
    const link = document.createElement('a');
    link.href = selectedModel;
    link.download = `${filename}.stl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen().catch(console.error);
    else document.exitFullscreen();
  }

  function handleModelChange(e) {
    const newPath = e.target.checked ? models[1].path : models[0].path;
    if (newPath === selectedModel) return;
    setSelectedModel(newPath);
    loadModel(newPath);
  }

  return (
    <div className="viewer-container">
      <div className="viewport-wrapper">
        <div ref={containerRef} className="viewport" />

        <div className="orientation-display">
          <div ref={orientationContainerRef} className="orientation-cube" />
          <div className="orientation-label">{orientationLabel}</div>
        </div>

        <div className="model-selector-bottom">
          <div className="toolbar">
            <div className="toolbar-group">
              <button className={`toolbar-btn${isRotating ? ' active' : ''}`} onClick={toggleRotation}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                <span className="tooltip">Auto Rotate</span>
              </button>
              <button className="toolbar-btn" onClick={resetView}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 12a8 8 0 0 0 8 8a8.006 8.006 0 0 0 5.93-2.614m2.828-4.95A8 8 0 0 0 12 4m0-2v4m0 12v4" />
                </svg>
                <span className="tooltip">Reset View</span>
              </button>
              <button className={`toolbar-btn${isZoomedIn ? ' active' : ''}`} onClick={toggleZoom}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  {isZoomedIn ? <path d="M8 11h6" /> : <><path d="M11 8v6" /><path d="M8 11h6" /></>}
                </svg>
                <span className="tooltip">{isZoomedIn ? 'Zoom Out' : 'Zoom In'}</span>
              </button>
            </div>
            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={downloadModel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="tooltip">Download Model</span>
              </button>
              <button className="toolbar-btn" onClick={toggleFullscreen}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
                <span className="tooltip">Fullscreen</span>
              </button>
            </div>
          </div>
          <div className="model-selector">
            <div className="selector-label">Select Model</div>
            <div className="toggle-switch">
              <input type="checkbox" id="model-toggle" checked={isLidModel} onChange={handleModelChange} />
              <label htmlFor="model-toggle" className="toggle-label">
                <span className="toggle-option left">{models[0].name}</span>
                <span className="toggle-slider" />
                <span className="toggle-option right">{models[1].name}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
