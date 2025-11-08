<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	// Wichtig: Importiere den theme store
	import { language, theme, translations } from '$lib/stores.js';

	// User data
	let user = null;
	let profileImage = '/default-profile.png';
	let backgroundImage = '/default-background.png';
	let isLoading = false;
	let message = { text: '', type: '' };

	// Form data
	let emailForm = { currentEmail: '', newEmail: '', confirmEmail: '', password: '' };
	let passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
	let profileForm = { username: '', bio: '' };

	// Image Editor Variablen
	let showImageEditor = false;
	let currentImageType = ''; // 'profile' oder 'background'
	let originalImageFile = null;
	let croppedImageBlob = null;
	let imagePreviewUrl = '';
	let cropAspectRatio = 1;

	// Crop Bereich Variablen
	let cropArea = { x: 0, y: 0, width: 200, height: 200 };
	let isDragging = false;
	let isResizing = false;
	let dragStart = { x: 0, y: 0 };
	let resizeCorner = '';
	let imageSize = { width: 0, height: 0 };
	let containerRef;
	let imageRef;

	const t = get(translations);

	onMount(() => loadUserData());
	async function loadUserData() {
		try {
			const res = await fetch('http://localhost:3000/api/user/profile', {
				credentials: 'include'
			});
			if (!res.ok) throw new Error();
			const data = await res.json();
			user = data.user || {};
			profileImage = data.profilePicture || profileImage;
			backgroundImage = data.backgroundImage || backgroundImage;
			emailForm.currentEmail = user.email || '';
			profileForm.username = user.username || '';
			profileForm.bio = user.bio || '';
		} catch {
			showMessage(t.profileLoadError || 'Fehler beim Laden des Profils', 'error');
		}
	}

	function showMessage(text, type = 'success') {
		message = { text, type };
		setTimeout(() => (message = { text: '', type: '' }), 5000);
	}

	// Image Editor Funktionen
	function openImageEditor(e, type) {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			return showMessage(t.pleaseSelectImage || 'Bitte Bilddatei wählen', 'error');
		}
		
		if (file.size > 10 * 1024 * 1024) {
			return showMessage(t.imageTooLarge || 'Bild zu groß (max. 10MB)', 'error');
		}

		originalImageFile = file;
		currentImageType = type;
		cropAspectRatio = type === 'profile' ? 1 : 16/9;
		
		const reader = new FileReader();
		reader.onload = (e) => {
			imagePreviewUrl = e.target.result;
			showImageEditor = true;
		};
		reader.readAsDataURL(file);
		e.target.value = '';
	}

	function initializeCropArea() {
		if (!imageRef || !containerRef) return;

		const img = imageRef;
		const container = containerRef;

		// Warte bis Bild komplett geladen ist
		setTimeout(() => {
			const containerRect = container.getBoundingClientRect();
			const imgRect = img.getBoundingClientRect();
			
			// Berechne die tatsächliche Anzeigegröße des Bildes
			const displayWidth = imgRect.width;
			const displayHeight = imgRect.height;
			
			// Initialisiere Crop-Bereich (zentriert, 60% der kleineren Dimension)
			const minDimension = Math.min(displayWidth, displayHeight);
			let cropWidth, cropHeight;

			if (currentImageType === 'profile') {
				cropWidth = cropHeight = minDimension * 0.6;
			} else {
				// Für Hintergrundbilder: Passe die Größe an das verfügbare Bild an
				cropWidth = Math.min(displayWidth * 0.8, displayHeight * cropAspectRatio * 0.8);
				cropHeight = cropWidth / cropAspectRatio;
			}

			// Stelle sicher, dass der Crop-Bereich nicht größer als das Bild ist
			cropWidth = Math.min(cropWidth, displayWidth);
			cropHeight = Math.min(cropHeight, displayHeight);

			// Begrenze die Position auf den sichtbaren Bereich
			const maxX = displayWidth - cropWidth;
			const maxY = displayHeight - cropHeight;
			cropArea = {
				x: Math.max(0, Math.min(maxX, (displayWidth - cropWidth) / 2)),
				y: Math.max(0, Math.min(maxY, (displayHeight - cropHeight) / 2)),
				width: cropWidth,
				height: cropHeight
			};
		}, 100);
	}

	function closeImageEditor() {
		showImageEditor = false;
		originalImageFile = null;
		croppedImageBlob = null;
		currentImageType = '';
		isDragging = false;
		isResizing = false;
		if (imagePreviewUrl) {
			URL.revokeObjectURL(imagePreviewUrl);
			imagePreviewUrl = '';
		}
	}

	function handleOverlayClick(e) {
		// Stellt sicher, dass das Modal nur beim Klick auf das Overlay schließt
		if (e.target === e.currentTarget && e.type === 'click') {
			closeImageEditor();
		}
		// Optional: Schließen mit Escape-Taste
		if (e.type === 'keydown' && e.key === 'Escape') {
			closeImageEditor();
		}
	}

	// Mouse Event Handler für Crop-Bereich
	function handleMouseDown(e, action = 'move', corner = '') {
		e.preventDefault();
		e.stopPropagation();
		
		const containerRect = containerRef.getBoundingClientRect();
		dragStart = { 
			x: e.clientX - containerRect.left, 
			y: e.clientY - containerRect.top 
		};
		
		if (action === 'resize') {
			isResizing = true;
			resizeCorner = corner;
		} else {
			isDragging = true;
		}
	}

	function handleMouseMove(e) {
		if (!isDragging && !isResizing) return;

		const containerRect = containerRef.getBoundingClientRect();
		const currentX = e.clientX - containerRect.left;
		const currentY = e.clientY - containerRect.top;
		
		const dx = currentX - dragStart.x;
		const dy = currentY - dragStart.y;

		if (isDragging) {
			// Bewege den gesamten Crop-Bereich
			const newX = cropArea.x + dx;
			const newY = cropArea.y + dy;
			
			// Begrenze die Bewegung auf den sichtbaren Bereich des Containers
			const maxX = getDisplayWidth() - cropArea.width;
			const maxY = getDisplayHeight() - cropArea.height;
			
			cropArea.x = Math.max(0, Math.min(maxX, newX));
			cropArea.y = Math.max(0, Math.min(maxY, newY));
		} else if (isResizing) {
			// Ändere die Größe des Crop-Bereichs
			const minSize = 50;
			const maxWidth = getDisplayWidth();
			const maxHeight = getDisplayHeight();
			
			let newWidth = cropArea.width;
			let newHeight = cropArea.height;
			let newX = cropArea.x;
			let newY = cropArea.y;
			
			// Berechne die Größenänderung basierend auf der Ecke und behalte das Seitenverhältnis
			const calculateResize = (currentWidth, currentHeight, dx, dy, corner, ratio) => {
				let tempW = currentWidth;
				let tempH = currentHeight;
				let tempX = cropArea.x;
				let tempY = cropArea.y;

				if (corner.includes('left')) {
					tempW = Math.max(minSize, currentWidth - dx);
					tempX = cropArea.x + (currentWidth - tempW);
				} else if (corner.includes('right')) {
					tempW = Math.max(minSize, currentWidth + dx);
				}

				// Wenn es ein quadratisches Profilbild ist, wird die Höhe angepasst
				if (ratio === 1) {
					tempH = tempW;
					if (corner.includes('top')) {
						tempY = cropArea.y + (currentHeight - tempH);
					}
				} else {
					// Für andere Verhältnisse (z.B. 16/9)
					tempH = tempW / ratio;
					if (corner.includes('top')) {
						tempY = cropArea.y + (currentHeight - tempH);
					}
				}
				
				// Post-Correction, um im Bild zu bleiben
				tempW = Math.min(tempW, maxWidth - tempX);
				tempH = Math.min(tempH, maxHeight - tempY);
				
				// Re-Adjustiere die Position, wenn die Größe korrigiert wurde (nur für Top/Left)
				if (corner.includes('left') && tempW !== Math.max(minSize, currentWidth - dx)) {
					tempX = cropArea.x + (currentWidth - tempW);
				}
				if (corner.includes('top') && tempH !== Math.max(minSize, currentHeight - dy) && ratio === 1) {
					tempY = cropArea.y + (currentHeight - tempH);
				}

				return { width: tempW, height: tempH, x: tempX, y: tempY };
			}

			// Führe die Größenberechnung durch
			const resized = calculateResize(
				cropArea.width, 
				cropArea.height, 
				dx, 
				dy, 
				resizeCorner, 
				cropAspectRatio
			);

			// Prüfe die Endposition und Größe
			if (resized.x >= 0 && resized.y >= 0 && resized.width >= minSize && resized.height >= minSize) {
				cropArea.width = resized.width;
				cropArea.height = resized.height;
				cropArea.x = resized.x;
				cropArea.y = resized.y;
			}
		}

		dragStart = { x: currentX, y: currentY };
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
		resizeCorner = '';
	}

	function getDisplayWidth() {
		if (!imageRef) return 400;
		const rect = imageRef.getBoundingClientRect();
		return rect.width;
	}

	function getDisplayHeight() {
		if (!imageRef) return 300;
		const rect = imageRef.getBoundingClientRect();
		return rect.height;
	}

	// Crop und speichere das Bild
	async function cropAndSaveImage() {
		if (!originalImageFile) return;

		const img = new Image();
		img.src = imagePreviewUrl;
		await new Promise((resolve) => {
			img.onload = resolve;
		});

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		
		let targetWidth, targetHeight;
		if (currentImageType === 'profile') {
			targetWidth = 500;
			targetHeight = 500;
		} else {
			targetWidth = 1920;
			targetHeight = 1080;
		}
		
		canvas.width = targetWidth;
		canvas.height = targetHeight;

		const displayWidth = getDisplayWidth();
		const displayHeight = getDisplayHeight();
		const scaleX = img.width / displayWidth;
		const scaleY = img.height / displayHeight;

		const sourceX = cropArea.x * scaleX;
		const sourceY = cropArea.y * scaleY;
		const sourceWidth = cropArea.width * scaleX;
		const sourceHeight = cropArea.height * scaleY;
		ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
		
		canvas.toBlob((blob) => {
			croppedImageBlob = blob;
			saveCroppedImage();
		}, 'image/jpeg', 0.9);
	}

	async function saveCroppedImage() {
		if (!croppedImageBlob) {
			showMessage(t.noImageSelected || 'Kein Bild ausgewählt', 'error');
			return;
		}

		isLoading = true;
		try {
			const formData = new FormData();
			const file = new File([croppedImageBlob], `cropped-${currentImageType}.jpg`, { 
				type: 'image/jpeg' 
			});
			formData.append('file', file);
			const endpoint = currentImageType === 'profile' 
				? 'http://localhost:3000/api/user/upload/profile-image'
				: 'http://localhost:3000/api/user/upload/background-image';

			const res = await fetch(endpoint, { 
				method: 'POST', 
				body: formData,
				credentials: 'include'
			});
			const data = await res.json();
			if (res.ok) {
				if (currentImageType === 'profile') {
					profileImage = data.profilePictureUrl;
					showMessage(t.profileImageUpdated || 'Profilbild aktualisiert');
				} else {
					backgroundImage = data.backgroundImageUrl;
					document.body.style.backgroundImage = `url(${backgroundImage})`;
					showMessage(t.backgroundImageUpdated || 'Hintergrund aktualisiert');
				}
				closeImageEditor();
				// Seite neu laden nach erfolgreichem Speichern
				setTimeout(() => {
					window.location.reload();
				}, 1000);
				
			} else {
				showMessage(data.error || t.uploadError || 'Fehler beim Hochladen', 'error');
			}
		} catch {
			showMessage(t.uploadError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
		}
	}

	// Restliche Funktionen
	async function updateEmail(e) {
		e.preventDefault();
		if (emailForm.newEmail !== emailForm.confirmEmail)
			return showMessage(t.emailsDontMatch || 'E-Mails stimmen nicht überein', 'error');

		isLoading = true;
		try {
			const res = await fetch('http://localhost:3000/api/user/update-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					newEmail: emailForm.newEmail,
					password: emailForm.password
				}),
				credentials: 'include'
			});
			const data = await res.json();
			if (res.ok) {
				showMessage(t.emailUpdateSuccess || 'E-Mail aktualisiert');
				emailForm.newEmail = emailForm.confirmEmail = emailForm.password = '';
				setTimeout(() => window.location.reload(), 1000);
			} else showMessage(data.error || t.emailUpdateError || 'Fehler beim Aktualisieren', 'error');
		} catch {
			showMessage(t.emailUpdateError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function updatePassword(e) {
		e.preventDefault();
		if (passwordForm.newPassword !== passwordForm.confirmPassword)
			return showMessage(t.passwordsDontMatch || 'Passwörter stimmen nicht überein', 'error');
		if (passwordForm.newPassword.length < 6)
			return showMessage(t.passwordTooShort || 'Passwort zu kurz (min. 6 Zeichen)', 'error');

		isLoading = true;
		try {
			const res = await fetch('http://localhost:3000/api/user/update-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					currentPassword: passwordForm.currentPassword,
					newPassword: passwordForm.newPassword
				}),
				credentials: 'include'
			});
			const data = await res.json();
			if (res.ok) {
				showMessage(t.passwordUpdateSuccess || 'Passwort aktualisiert');
				passwordForm.currentPassword = passwordForm.newPassword = passwordForm.confirmPassword = '';
				setTimeout(() => window.location.reload(), 1000);
			} else showMessage(data.error || t.passwordUpdateError || 'Fehler beim Aktualisieren', 'error');
		} catch {
			showMessage(t.passwordUpdateError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function updateProfile(e) {
		e.preventDefault();
		isLoading = true;
		try {
			const res = await fetch('http://localhost:3000/api/user/update-profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: profileForm.username,
					bio: profileForm.bio
				}),
				credentials: 'include'
			});
			const data = await res.json();
			if (res.ok) {
				user = { ...user, ...data.user };
				showMessage(t.profileUpdateSuccess || 'Profil gespeichert');
				setTimeout(() => window.location.reload(), 1000);
			} else showMessage(data.error || t.profileUpdateError || 'Fehler beim Speichern', 'error');
		} catch {
			showMessage(t.profileUpdateError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function resetBackground() {
		if (!confirm(t.confirmResetBackground || 'Möchten Sie den Hintergrund wirklich auf das Standardbild zurücksetzen?')) {
			return;
		}

		isLoading = true;
		try {
			const res = await fetch('http://localhost:3000/api/user/reset-background', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();
			if (res.ok) {
				backgroundImage = data.backgroundImageUrl || '/default-background.png';
				document.documentElement.style.setProperty('--background-image', `url('${backgroundImage}')`);
				document.body.style.backgroundImage = `url('${backgroundImage}')`;
				showMessage(t.backgroundReset || 'Hintergrund zurückgesetzt');
				setTimeout(() => window.location.reload(), 1000);
			} else {
				showMessage(data.error || t.backgroundResetError || 'Fehler beim Zurücksetzen', 'error');
			}
		} catch (error) {
			console.error('Reset background failed:', error);
			showMessage(t.backgroundResetError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="profile-container" data-theme={$theme}>
	{#if message.text}
		<div class="message {message.type}">{message.text}</div>
	{/if}

	<div class="profile-grid">
		<div class="profile-sidebar">
			<div class="profile-card glass-card-base" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3>{t.profilePicture || 'Profilbild'}</h3>
                    <div class="profile-picture-container">
                        <img src={profileImage} alt="Profil" class="profile-picture" />
                    </div>
                    
                    <input type="file" id="profile-upload" accept="image/*" on:change={(e) => openImageEditor(e, 'profile')} />
                    <label for="profile-upload" class="upload-button">
                        <i class="fas fa-camera">&nbsp;&nbsp;</i>
                        {t.changePicture || 'Bild ändern'}
                    </label>
                </div>
			</div>

			<div class="profile-card profile-card--wide glass-card-base" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3>{t.profileBackground || 'Hintergrundbild'}</h3>
                    <div class="background-preview-container">
                        <img src={backgroundImage} alt="Hintergrund" class="background-preview" />
                    </div>

                    <input type="file" id="background-upload" accept="image/*" on:change={(e) => openImageEditor(e, 'background')} />
                    <label for="background-upload" class="upload-button">
                        <i class="fas fa-image">&nbsp;&nbsp;</i>
                        {t.changeBackground || 'Hintergrund ändern'}
                    </label>

                    <button class="reset-button" on:click={resetBackground} disabled={isLoading}>
                        <i class="fas fa-trash">&nbsp;&nbsp;</i>
                        {t.resetBackground || 'Zurücksetzen'}
                    </button>
                </div>
			</div>
		</div>

		<div class="profile-content">
			<div class="profile-card glass-card-base" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3>{t.profileSettings || 'Profileinstellungen'}</h3>
                    <form on:submit={updateProfile}>
                        <label for="username">{t.username || 'Benutzername'}</label>
                        <input id="username" type="text" bind:value={profileForm.username} required disabled={isLoading} />
        
                        <label for="bio">{t.bio || 'Bio'}</label>
                        <textarea id="bio" bind:value={profileForm.bio} maxlength="255" rows="3" disabled={isLoading}></textarea>
        
                        <button type="submit" class="save-button" disabled={isLoading || profileForm.username.length === 0}>
                            {#if isLoading}
                                <i class="fas fa-spinner fa-spin"></i>
                            {:else}
                                <i class="fas fa-save"></i>
                            {/if}
                            {t.saveProfile || 'Profil speichern'}
                        </button>
                    </form>
                </div>
			</div>

			<div class="profile-card glass-card-base" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3>{t.emailSettings || 'E-Mail-Einstellungen'}</h3>
                    <form on:submit={updateEmail}>
                        <label for="current-email">{t.currentEmail || 'Aktuelle E-Mail'}</label>
                        <input id="current-email" type="email" value={emailForm.currentEmail} disabled />

                        <label for="new-email">{t.newEmail || 'Neue E-Mail'}</label>
                        <input id="new-email" type="email" bind:value={emailForm.newEmail} required disabled={isLoading} />

                        <label for="confirm-email">{t.confirmEmail || 'E-Mail bestätigen'}</label>
                        <input id="confirm-email" type="email" bind:value={emailForm.confirmEmail} required disabled={isLoading} />

                        <label for="email-password">{t.password || 'Passwort (zur Bestätigung)'}</label>
                        <input id="email-password" type="password" bind:value={emailForm.password} required disabled={isLoading} />

                        <button type="submit" class="save-button" disabled={isLoading || emailForm.newEmail.length === 0 || emailForm.password.length === 0}>
                            {#if isLoading}
                                <i class="fas fa-spinner fa-spin"></i>
                            {:else}
                                <i class="fas fa-save"></i>
                            {/if}
                            {t.updateEmail || 'E-Mail aktualisieren'}
                        </button>
                    </form>
                </div>
			</div>

			<div class="profile-card glass-card-base" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3>{t.passwordSettings || 'Passwort-Einstellungen'}</h3>
                    <form on:submit={updatePassword}>
                        <label for="current-password">{t.currentPassword || 'Aktuelles Passwort'}</label>
                        <input id="current-password" type="password" bind:value={passwordForm.currentPassword} required disabled={isLoading} />

                        <label for="new-password">{t.newPassword || 'Neues Passwort'}</label>
                        <input id="new-password" type="password" bind:value={passwordForm.newPassword} required disabled={isLoading} />

                        <label for="confirm-password">{t.confirmPassword || 'Passwort bestätigen'}</label>
                        <input id="confirm-password" type="password" bind:value={passwordForm.confirmPassword} required disabled={isLoading} />

                        <button type="submit" class="save-button" disabled={isLoading || passwordForm.newPassword.length < 6 || passwordForm.currentPassword.length === 0}>
                            {#if isLoading}
                                <i class="fas fa-spinner fa-spin"></i>
                            {:else}
                                <i class="fas fa-save"></i>
                            {/if}
                            {t.updatePassword || 'Passwort aktualisieren'}
                        </button>
                    </form>
                </div>
			</div>
		</div>
	</div>

	{#if showImageEditor}
		<div class="modal-overlay" on:click={handleOverlayClick} on:keydown={handleOverlayClick} role="button" tabindex="0">
			<div class="image-editor-modal glass-card-base" data-theme={$theme} on:click|stopPropagation>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
				
				<div class="modal-header glass-content--modal">
					<h3>
						{#if currentImageType === 'profile'}
							{t.cropProfileImage || 'Profilbild zuschneiden'}
						{:else}
							{t.cropBackgroundImage || 'Hintergrundbild zuschneiden'}
						{/if}
					</h3>
					<button class="close-button" on:click={closeImageEditor}>
						<i class="fas fa-times"></i>
					</button>
				</div>
				
				<div class="modal-content glass-content--modal">
					<div 
						class="image-crop-container" 
						bind:this={containerRef} 
						on:mousemove={handleMouseMove} 
						on:mouseup={handleMouseUp} 
						on:mouseleave={handleMouseUp}
					>
						{#if imagePreviewUrl}
							<img bind:this={imageRef} src={imagePreviewUrl} alt="Zu schneidendes Bild" class="crop-image" on:load={initializeCropArea} />

							<div class="crop-overlay">
								<div 
									class="crop-area" 
									style="left: {cropArea.x}px; top: {cropArea.y}px; width: {cropArea.width}px; height: {cropArea.height}px;"
									on:mousedown={(e) => handleMouseDown(e, 'move')}
								>
									<div class="resize-handle top-left" on:mousedown={(e) => handleMouseDown(e, 'resize', 'top-left')}></div>
									<div class="resize-handle top-right" on:mousedown={(e) => handleMouseDown(e, 'resize', 'top-right')}></div>
									<div class="resize-handle bottom-left" on:mousedown={(e) => handleMouseDown(e, 'resize', 'bottom-left')}></div>
									<div class="resize-handle bottom-right" on:mousedown={(e) => handleMouseDown(e, 'resize', 'bottom-right')}></div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="modal-actions glass-content--modal">
					<button class="cancel-button" on:click={closeImageEditor} disabled={isLoading}>
						{t.cancel || 'Abbrechen'}
					</button>
					<button class="save-button" on:click={cropAndSaveImage} disabled={isLoading}>
						{#if isLoading}
							<i class="fas fa-spinner fa-spin"></i>
						{:else}
							<i class="fas fa-crop"></i>
						{/if}
						{t.cropAndSave || 'Zuschneiden & Speichern'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* ========================================================== */
	/* Glass-Morphismus Variablen und Basis-Styles                */
	/* ========================================================== */
	
	/* Diese Variablen werden benötigt, da der Theme-Store ($theme) nur hier gelesen wird */
	.profile-container[data-theme='dark'] {
		/* Hintergrund und Textfarbe (sollten global definiert sein, aber für Sicherheit) */
		--text: #ffffff;
		--text-secondary: #aaaaaa;
		--input-bg: rgba(255, 255, 255, 0.05);
		--border: #333333;
		
		/* Glass-Variablen */
		--card-bg-color: rgba(0, 0, 0, 0.25);
		--card-highlight: rgba(255, 255, 255, 0.15);
	}

	.profile-container[data-theme='light'] {
		--text: #1d1d1f;
		--text-secondary: #666666;
		--input-bg: rgba(255, 255, 255, 0.9);
		--border: #e0e0e0;

		/* Glass-Variablen */
		--card-bg-color: rgba(255, 255, 255, 0.25);
		--card-highlight: rgba(255, 255, 255, 0.75);
	}

	/* Card Base Styling */
	.glass-card-base {
		position: relative;
		border-radius: 12px;
		overflow: hidden;
		background: transparent;
		pointer-events: all;
		isolation: isolate; 
		height: 100%; 
	}

	/* Glass Layers */
	.glass-filter, .glass-overlay, .glass-specular {
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}

	.glass-filter {
		z-index: 1;
		backdrop-filter: blur(4px);
		/* HINWEIS: #glass-distortion muss in der +layout.svelte im SVG-Tag definiert sein, damit dieser Filter funktioniert. */
		filter: url(#glass-distortion) saturate(120%) brightness(1.15);
	}

	.glass-overlay {
		z-index: 2;
		background: var(--card-bg-color);
	}

	.glass-specular {
		z-index: 3;
		box-shadow: inset 1px 1px 1px var(--card-highlight);
	}

	.glass-content {
		position: relative;
		z-index: 4;
		padding: 1.5rem; 
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.glass-content--modal {
		position: relative;
		z-index: 4;
	}


	/* ========================================================== */
	/* Flexbox Layout Styles                                      */
	/* ========================================================== */
	.profile-container {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	/* Haupt-Flex-Container */
	.profile-grid {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap; /* Wichtig für Responsivität */
		align-items: stretch; /* Stellt sicher, dass die Spalten gleich hoch sind */
	}

	/* Linke Spalte (Bilder) */
	.profile-sidebar {
		/* Nimmt min. 300px ein, wächst 1x */
		flex: 1 1 300px; 
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	/* Rechte Spalte (Formulare) */
	.profile-content {
		/* Nimmt min. 600px ein, wächst 2x so schnell */
		flex: 2 1 600px; 
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.profile-card {
		background: transparent; 
		border: none; 
		box-shadow: none; 
		height: auto;
		flex-grow: 1; 
	}

	/* Stellt sicher, dass der Form-Container im Card-Inhalt den Platz nutzt */
	.profile-content .profile-card {
		min-height: 200px;
	}

	.profile-card h3 {
		margin-top: 0;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 1.5rem;
	}

	/* ========================================================== */
	/* Form & Input Styles                  					  */
	/* ========================================================== */
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-grow: 1; 
	}
	

	label, input, textarea, button {
		width: 100%;
		box-sizing: border-box;
	}
	
	label {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin-top: 0.5rem;
	}


	input[type='text'],
	input[type='email'],
	input[type='password'],
	textarea {
		padding: 10px 15px;
		border: 1px solid var(--border);
		border-radius: 6px;
		background-color: var(--input-bg) !important; /* Normaler Hintergrund basierend auf Theme */
		color: var(--text);
		font-size: 1rem;
		transition: border-color 0.2s;
	}
	
	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 2px var(--accent-light);
	}

	textarea {
		resize: vertical;
	}

	/* ... (Restliche Button/Image Styles bleiben gleich) ... */

	/* ========================================================== */
	/* Image Editor Modal Styles                                  */
	/* ========================================================== */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		animation: fadeIn 0.3s ease-out;
	}

	.image-editor-modal {
		width: 90%;
		max-width: 800px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		background: transparent; 
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 12px;
		overflow: hidden;
		animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--card-highlight); 
	}

	.modal-content {
		flex-grow: 1;
		padding: 1.5rem;
		overflow: hidden; 
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* ... (Restliche Modal/Crop Styles bleiben gleich) ... */


	/* ========================================================== */
	/* Responsive Design (Flexbox Anpassungen)                    */
	/* ========================================================== */
	@media (max-width: 968px) {
		/* Haupt-Layout wird zu einer einzigen Spalte */
		.profile-grid {
			flex-direction: column;
			gap: 1rem;
		}

		/* Optional: Reihenfolge ändern, damit Bilder oben sind */
		.profile-content {
			order: 1;
		}
		
		.profile-sidebar {
			order: 2;
		}
		
		/* Flex-Werte auf 100% setzen */
		.profile-content,
		.profile-sidebar {
			flex-basis: 100%;
			flex-grow: 1;
		}

		.modal-actions {
			flex-direction: column;
		}
	}
	
	@media (max-width: 600px) {
		.profile-container {
			padding: 1rem;
		}
		
		.profile-card h3 {
			font-size: 1.1rem;
		}
		
		.modal-content {
			padding: 0.75rem;
		}
	}

	/* ========================================================== */
	/* Wiederholte Styles aus Platzgründen am Ende (bitte nur einmal verwenden) */
	/* ========================================================== */

	.message {
		position: fixed;
		top: 100px; 
		left: 50%;
		transform: translateX(-50%);
		padding: 10px 20px;
		border-radius: 8px;
		color: white;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		animation: fadeIn 0.3s ease-out;
		font-weight: 500;
	}

	.message.success {
		background-color: #4caf50;
	}

	.message.error {
		background-color: #f44336;
	}

	.profile-picture-container {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto 1.5rem auto;
		border: 3px solid var(--accent);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.profile-picture {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.background-preview-container {
		width: 100%;
		height: 150px;
		overflow: hidden;
		border-radius: 8px;
		margin-bottom: 1rem;
		border: 1px solid var(--border);
	}

	.background-preview {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	input[type='file'] {
		display: none;
	}

	.upload-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text);
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		font-weight: 500;
		margin-bottom: 1rem;
		width: 100%;
		justify-content: center;
	}

	.upload-button:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}
	
	input[type="file"] {
		display: none;
	}

	.reset-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 59, 48, 0.1);
		border: 1px solid rgba(255, 59, 48, 0.3);
		color: #ff3b30;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		font-weight: 500;
		width: 100%;
		justify-content: center;
		border: none;
	}

	.reset-button:hover:not(:disabled) {
		background: rgba(255, 59, 48, 0.2);
		transform: translateY(-1px);
	}

	.reset-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}


	.save-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #007AFF, #5856D6);
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
	}

	.save-button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
	}

	.save-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	

		/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
		animation: fadeIn 0.3s ease-out;
	}

	.image-editor-modal {
		background: var(--bg-color);
		border-radius: 16px;
		width: 100%;
		max-width: 800px;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		animation: slideUp 0.3s ease-out;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.modal-header h3 {
		margin: 0;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text);
	}

	.close-button {
		background: none;
		border: none;
		color: var(--text);
		font-size: 1.2rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.1);
	}

	.modal-content {
		padding: 2rem;
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Image Crop Container - FIXED FOR ALL ASPECT RATIOS */
	.image-crop-container {
		position: relative;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 20px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 400px;
		max-height: 60vh;
		overflow: hidden;
		cursor: default;
		width: 100%;
	}

	.crop-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
		display: block;
		margin: 0 auto;
	}

	/* Crop Overlay - FIXED FOR ALL IMAGE SIZES */
	.crop-overlay {
		position: absolute;
		top: 20px;
		left: 20px;
		right: 20px;
		bottom: 20px;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 8px;
		pointer-events: none;
	}

	/* Crop Area (der auswählbare Bereich) */
	.crop-area {
		position: absolute;
		background: transparent;
		border: 3px solid #007AFF;
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
		cursor: move;
		transition: border-color 0.2s ease;
		pointer-events: auto;
	}

	.crop-area:hover {
		border-color: #0056CC;
		border-width: 4px;
	}

	/* Resize Handles - NUR ECKEN */
	.resize-handle {
		position: absolute;
		width: 20px;
		height: 20px;
		background: #007AFF;
		border: 3px solid white;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 10;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		pointer-events: auto;
	}

	.resize-handle:hover {
		background: #0056CC;
		transform: scale(1.4);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	}

	.resize-handle.top-left {
		top: -10px;
		left: -10px;
		cursor: nw-resize;
	}

	.resize-handle.top-right {
		top: -10px;
		right: -10px;
		cursor: ne-resize;
	}

	.resize-handle.bottom-left {
		bottom: -10px;
		left: -10px;
		cursor: sw-resize;
	}

	.resize-handle.bottom-right {
		bottom: -10px;
		right: -10px;
		cursor: se-resize;
	}

	/* Instructions */
	.editor-instructions {
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		border-left: 4px solid #007AFF;
	}

	.editor-instructions p {
		margin: 0.5rem 0;
		color: var(--text);
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.editor-instructions .hint {
		font-size: 0.8rem;
		opacity: 0.7;
		font-style: italic;
	}

	.editor-instructions i {
		color: #007AFF;
		font-size: 1rem;
		width: 16px;
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		padding: 1.5rem 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.modal-actions .cancel-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text);
		padding: 0.75rem 2rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		flex: 1;
		justify-content: center;
	}

	.modal-actions .cancel-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	.modal-actions .save-button {
		flex: 1;
		justify-content: center;
	}
</style>