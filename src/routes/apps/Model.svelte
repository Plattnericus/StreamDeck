<script lang="ts">
	import { onMount } from "svelte";
	import * as THREE from "three";
	import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
	import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

	let container: HTMLDivElement | undefined;
	let orientationContainer: HTMLDivElement | undefined;
	let selectedModel: string = "/models/baseModel.stl";
	let currentMesh: any = null;
	let scene: any;
	let renderer: any;
	let camera: any;
	let controls: any;
	let loader: any;
	let isRotating: boolean = false;
	let isZoomedIn: boolean = false;
	let defaultCameraDistance: number = 200;
	let isLidModel: boolean = false;
	let orientationScene: any;
	let orientationRenderer: any;
	let orientationCamera: any;
	let orientationCube: any;
	let orientationLabel: string = "VORNE";
	let orientationLabels: { [key: string]: [number, number, number] } = {
		RECHTS: [1, 0, 0],
		LINKS: [-1, 0, 0],
		OBEN: [0, 1, 0],
		UNTEN: [0, -1, 0],
		VORNE: [0, 0, 1],
		HINTEN: [0, 0, -1]
	};

	$: isLidModel = selectedModel === models[1].path;

	const models = [
		{ name: "Base Model", path: "/models/baseModel.stl" },
		{ name: "Lid Model", path: "/models/lidModel.stl" }
	];

	function downloadModel() {
		if (!loader) return;
		
		const link = document.createElement("a");
		const currentModelData = models.find(m => m.path === selectedModel);
		const filename = currentModelData?.name.replace(/\s+/g, "_") || "model";
		
		link.href = selectedModel;
		link.download = `${filename}.stl`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function toggleRotation() {
		isRotating = !isRotating;
		if (controls) {
			controls.autoRotate = isRotating;
		}
	}

	function resetView() {
		if (!camera || !controls) return;

		camera.position.set(0, defaultCameraDistance * 0.6, defaultCameraDistance * 0.8);
		camera.lookAt(0, 0, 0);
		camera.updateProjectionMatrix();

		controls.target.set(0, 0, 0);
		controls.autoRotate = false;
		isRotating = false;
		isZoomedIn = false;
	}

	function toggleZoom() {
		if (!camera || !controls) return;

		const currentPos = camera.position.clone();
		const targetPos = new THREE.Vector3();

		if (isZoomedIn) {
			targetPos.set(0, defaultCameraDistance * 0.6, defaultCameraDistance * 0.8);
			isZoomedIn = false;
		} else {
			const direction = currentPos.clone().normalize();
			targetPos.copy(direction).multiplyScalar(defaultCameraDistance * 0.4);
			isZoomedIn = true;
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

			if (progress < 1) {
				requestAnimationFrame(animateZoom);
			}
		};

		animateZoom();
	}

	function toggleFullscreen() {
		if (!container) return;
		
		if (!document.fullscreenElement) {
			container.requestFullscreen().catch((err) => {
				console.error("Fullscreen request failed:", err);
			});
		} else {
			document.exitFullscreen();
		}
	}

	function createOrientationCube() {
		orientationScene = new THREE.Scene();
		orientationCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
		orientationCamera.position.set(0, 0, 100);

		orientationRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		orientationRenderer.setSize(120, 120);
		orientationRenderer.setClearColor(0x000000, 0);

		const geometry = new THREE.BoxGeometry(60, 60, 60);
		
		const createTextTexture = (text: string) => {
			const canvas = document.createElement('canvas');
			canvas.width = 256;
			canvas.height = 256;
			const ctx = canvas.getContext('2d');
			
			if (ctx) {
				ctx.fillStyle = '#cccccc';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				ctx.fillStyle = '#333333';
				ctx.font = 'bold 48px Arial';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(text, canvas.width / 2, canvas.height / 2);
			}
			
			const texture = new THREE.CanvasTexture(canvas);
			return texture;
		};
		
		const materials = [
			new THREE.MeshBasicMaterial({ map: createTextTexture('RECHTS'), wireframe: false }),
			new THREE.MeshBasicMaterial({ map: createTextTexture('LINKS'), wireframe: false }),
			new THREE.MeshBasicMaterial({ map: createTextTexture('OBEN'), wireframe: false }),
			new THREE.MeshBasicMaterial({ map: createTextTexture('UNTEN'), wireframe: false }),
			new THREE.MeshBasicMaterial({ map: createTextTexture('VORNE'), wireframe: false }),
			new THREE.MeshBasicMaterial({ map: createTextTexture('HINTEN'), wireframe: false })
		];

		orientationCube = new THREE.Mesh(geometry, materials);
		orientationScene.add(orientationCube);

		const edgesGeometry = new THREE.EdgesGeometry(geometry);
		const line = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
		orientationCube.add(line);

		if (orientationContainer) {
			orientationContainer.appendChild(orientationRenderer.domElement);
		}

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		orientationScene.add(ambientLight);

		const animateOrientation = () => {
			requestAnimationFrame(animateOrientation);
			
			if (controls && camera) {
				const quaternion = new THREE.Quaternion();
				quaternion.copy((camera as any).quaternion);
				quaternion.invert();
				orientationCube.quaternion.copy(quaternion);
				
				const forward = new THREE.Vector3(0, 0, 1);
				forward.applyQuaternion((camera as any).quaternion);
				
				const labels = Object.entries(orientationLabels);
				let closestLabel = labels[0];
				let closestDot = -2;
				
				labels.forEach(([label, direction]) => {
					const dir = new THREE.Vector3(...direction);
					const dot = forward.dot(dir);
					if (dot > closestDot) {
						closestDot = dot;
						closestLabel = [label, direction];
					}
				});
				
				orientationLabel = closestLabel[0];
			}

			orientationRenderer.render(orientationScene, orientationCamera);
		};

		animateOrientation();
	}

	function animateModelTransition() {
		if (currentMesh) {
			scene.remove(currentMesh);
			currentMesh = null;
		}
	}

	function loadModel(modelPath: string) {
		animateModelTransition();

		loader.load(
			modelPath,
			(geometry: any) => {
				const material = new THREE.MeshStandardMaterial({
					color: 0x2a2a2a,
					metalness: 0.3,
					roughness: 0.8,
					opacity: 0,
					transparent: true
				});

				const mesh = new THREE.Mesh(geometry, material);
				(mesh as any).rotation.x = -Math.PI / 2;
				geometry.center();
				geometry.computeBoundingBox();
				
				const boundingBox = geometry.boundingBox;
				if (boundingBox) {
					const size = boundingBox.getSize(new THREE.Vector3());
					const maxDim = Math.max(size.x, size.y, size.z);
					
					const fov = camera.fov * (Math.PI / 180);
					let distance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
					distance *= 2.2;
					defaultCameraDistance = distance;
					
					camera.position.set(0, distance * 0.6, distance * 0.8);
					camera.lookAt(0, 0, 0);
					controls.target.set(0, 0, 0);
				}

				scene.add(mesh);
				currentMesh = mesh;

				const duration = 500;
				const startTime = Date.now();

				const animateOpacity = () => {
					const elapsed = Date.now() - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const eased = progress * progress * (3 - 2 * progress);
					
					(mesh.material as any).opacity = eased;
					
					if (progress < 1) {
						requestAnimationFrame(animateOpacity);
					}
				};

				animateOpacity();


			},
			undefined,
			(error: unknown) => {
				console.error("Error loading model:", error);
			}
		);
	}

	function handleModelChange(newPath: string) {
		if (newPath === selectedModel) return;
		selectedModel = newPath;
		if (loader && scene && camera) {
			loadModel(selectedModel);
		}
	}

	onMount(() => {
		if (!container) return;

		scene = new THREE.Scene();
		scene.background = null;

		camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			10000
		);
		camera.position.set(0, 80, 120);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		container.appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
		scene.add(ambientLight);

		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
		(directionalLight1 as any).position.set(10, 20, 10);
		scene.add(directionalLight1);

		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
		(directionalLight2 as any).position.set(-10, 15, -10);
		scene.add(directionalLight2);

		const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
		(directionalLight3 as any).position.set(0, -10, 5);
		scene.add(directionalLight3);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.target.set(0, 0, 0);
		controls.dampingFactor = 0.05;
		controls.autoRotate = isRotating;
		controls.autoRotateSpeed = 3;

		loader = new STLLoader();
		
		setTimeout(() => {
			if (loader) {
				loadModel(selectedModel);
			}
		}, 50);

		createOrientationCube();

		const handleResize = () => {
			if (!container) return;
			const width = container.clientWidth;
			const height = container.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};

		window.addEventListener("resize", handleResize);

		function animate() {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		}

		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
			renderer.dispose();
		};
	});
</script>

<div class="viewer-container">
	<div class="viewport-wrapper">
		<div bind:this={container} class="viewport"></div>
		
		<div class="orientation-display">
			<div bind:this={orientationContainer} class="orientation-cube"></div>
			<div class="orientation-label">{orientationLabel}</div>
		</div>

		<div class="model-selector-bottom">
			<div class="toolbar">
				<div class="toolbar-group">
					<button 
						class="toolbar-btn"
						class:active={isRotating}
						on:click={toggleRotation}
						data-tooltip="Auto Rotate"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
							<path d="M21 3v5h-5"></path>
							<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
							<path d="M3 21v-5h5"></path>
						</svg>
						<span class="tooltip">Auto Rotate</span>
					</button>
				<button 
					class="toolbar-btn"
					on:click={resetView}
					data-tooltip="Reset View"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M4 12a8 8 0 0 0 8 8a8.006 8.006 0 0 0 5.93-2.614m2.828-4.95A8 8 0 0 0 12 4m0-2v4m0 12v4"/>
					</svg>
					<span class="tooltip">Reset View</span>
				</button>
					<button 
						class="toolbar-btn" 
						class:active={isZoomedIn}
						on:click={toggleZoom} 
						data-tooltip={isZoomedIn ? "Zoom Out" : "Zoom In"}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.35-4.35"></path>
							{#if isZoomedIn}
								<path d="M8 11h6"></path>
							{:else}
								<path d="M11 8v6M8 11h6"></path>
							{/if}
						</svg>
						<span class="tooltip">{isZoomedIn ? 'Zoom Out' : 'Zoom In'}</span>
					</button>
				</div>

				<div class="toolbar-group">
					<button 
						class="toolbar-btn"
						on:click={downloadModel}
						data-tooltip="Download Model"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span class="tooltip">Download Model</span>
					</button>
					<button class="toolbar-btn" on:click={toggleFullscreen} data-tooltip="Fullscreen">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
						</svg>
						<span class="tooltip">Fullscreen</span>
					</button>
				</div>
			</div>

			<div class="model-selector">
				<div class="selector-label">Select Model</div>
				<div class="toggle-switch">
					<input
						type="checkbox"
						id="model-toggle"
						checked={isLidModel}
						on:change={(e) => {
							const newPath = e.currentTarget.checked ? models[1].path : models[0].path;
							handleModelChange(newPath);
						}}
					/>
					<label for="model-toggle" class="toggle-label">
						<span class="toggle-option left">{models[0].name}</span>
						<span class="toggle-slider"></span>
						<span class="toggle-option right">{models[1].name}</span>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.viewer-container {
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		max-width: 720px;
		max-height: 960px;
		background: transparent;
	}

	.viewport-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: transparent;
		position: relative;
	}

	.viewport {
		flex: 1;
		width: 100%;
		background: transparent;
	}

	.orientation-cube {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 150px;
		height: 150px;
		z-index: 5;
		pointer-events: none;
        margin-right: -70px;
	}

	.orientation-display {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.orientation-label {
		font-size: 14px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		background: rgba(50, 50, 50, 0.8);
		padding: 6px 12px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		text-transform: uppercase;
		letter-spacing: 1px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.model-selector-bottom {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		justify-content: center;
		max-width: 90%;
	}

	.toolbar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 12px;
		background: rgba(50, 50, 50, 0.95);
		padding: 14px 16px;
		border-radius: 12px;
		backdrop-filter: blur(16px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.15);
		animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		align-items: center;
		justify-content: center;
		width: fit-content;
		margin: 0 auto;
	}

	.toolbar-group {
		display: flex;
		gap: 6px;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.toolbar-group:not(:last-child) {
		border-right: 1px solid rgba(255, 255, 255, 0.15);
		padding-right: 12px;
		margin-right: 4px;
	}

	.toolbar-btn {
		position: relative;
		width: 40px;
		height: 40px;
		padding: 8px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		font-size: 18px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.8);
	}

	.toolbar-btn svg {
		width: 20px;
		height: 20px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.toolbar-btn .tooltip {
		position: absolute;
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%) translateY(8px);
		background: rgba(30, 30, 30, 0.95);
		color: rgba(255, 255, 255, 0.95);
		padding: 8px 12px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		white-space: nowrap;
		pointer-events: none;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 1000;
	}

	.toolbar-btn .tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 6px solid transparent;
		border-top-color: rgba(30, 30, 30, 0.95);
	}

	.toolbar-btn:hover .tooltip {
		opacity: 1;
		visibility: visible;
		transform: translateX(-50%) translateY(0);
	}

	.toolbar-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.4);
		transform: translateY(-2px);
	}

	.toolbar-btn.active {
		background: rgba(42, 170, 220, 0.5);
		border-color: rgba(42, 170, 220, 0.8);
		box-shadow: 0 0 10px rgba(42, 170, 220, 0.4);
	}

	.model-selector {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.95);
		padding: 16px 24px;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		width: fit-content;
		margin: 0 auto;
	}

	.selector-label {
		font-size: 13px;
		font-weight: 600;
		color: #333;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 220px;
		height: 44px;
	}

	.toggle-switch input {
		display: none;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #f0f0f0 0%, #e5e5e5 100%);
		border: 2px solid #ddd;
		border-radius: 8px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		padding: 0 8px;
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	.toggle-label:hover {
		border-color: #999;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.toggle-option {
		flex: 1;
		text-align: center;
		font-size: 12px;
		font-weight: 600;
		color: #666;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		z-index: 1;
		position: relative;
	}

	.toggle-slider {
		position: absolute;
		top: 3px;
		left: 5px;
		width: calc(50% - 4px);
		height: calc(100% - 6px);
		background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
		border-radius: 6px;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 2px 8px rgba(42, 42, 42, 0.2);
		z-index: 0;
	}

	.toggle-switch input:checked ~ .toggle-label .toggle-slider {
		left: calc(50% + 5px);
	}

	.toggle-switch input:checked ~ .toggle-label .toggle-option.left {
		color: #666;
	}

	.toggle-switch input:checked ~ .toggle-label .toggle-option.right {
		color: white;
	}

	.toggle-switch input:not(:checked) ~ .toggle-label .toggle-option.left {
		color: white;
	}

	.toggle-switch input:not(:checked) ~ .toggle-label .toggle-option.right {
		color: #666;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.model-selector-bottom {
			bottom: 10px;
			max-width: 95%;
		}

		.toolbar {
			padding: 10px 12px;
			gap: 8px;
		}

		.toolbar-group {
			gap: 4px;
		}

		.toolbar-group:not(:last-child) {
			padding-right: 8px;
			margin-right: 2px;
		}

		.toolbar-btn {
			width: 36px;
			height: 36px;
			font-size: 16px;
		}

		.toolbar-btn svg {
			width: 18px;
			height: 18px;
		}

		.toolbar-btn .tooltip {
			font-size: 11px;
			padding: 6px 10px;
			bottom: calc(100% + 10px);
		}

		.orientation-display {
			top: 10px;
			right: 10px;
			gap: 8px;
		}

		.orientation-cube {
			width: 130px;
			height: 130px;
		}

		.orientation-label {
			font-size: 12px;
			padding: 4px 10px;
		}

		.model-selector {
			padding: 12px 16px;
		}

		.toggle-switch {
			width: 180px;
		}

		.toggle-option {
			font-size: 11px;
		}
	}

	@media (max-width: 500px) {
		.toolbar {
			flex-direction: column;
			gap: 6px;
		}

		.toolbar-group:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.15);
			padding-right: 0;
			padding-bottom: 6px;
			margin-right: 0;
			margin-bottom: 6px;
		}
	}
</style>