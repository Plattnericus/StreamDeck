<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
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
				cropHeight = minDimension * 0.6;
				cropWidth = cropHeight * cropAspectRatio;
			}

			// Stelle sicher, dass der Crop-Bereich nicht größer als das Bild ist
			cropWidth = Math.min(cropWidth, displayWidth);
			cropHeight = Math.min(cropHeight, displayHeight);

			cropArea = {
				x: (displayWidth - cropWidth) / 2,
				y: (displayHeight - cropHeight) / 2,
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
		if (e.target === e.currentTarget) {
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

			switch (resizeCorner) {
				case 'top-left':
					newWidth = Math.max(minSize, cropArea.width - dx);
					newHeight = currentImageType === 'profile' ? newWidth : Math.max(minSize, newWidth / cropAspectRatio);
					newX = cropArea.x + dx;
					newY = cropArea.y + dy;
					break;
					
				case 'top-right':
					newWidth = Math.max(minSize, cropArea.width + dx);
					newHeight = currentImageType === 'profile' ? newWidth : Math.max(minSize, newWidth / cropAspectRatio);
					newY = cropArea.y + dy;
					break;
					
				case 'bottom-left':
					newWidth = Math.max(minSize, cropArea.width - dx);
					newHeight = currentImageType === 'profile' ? newWidth : Math.max(minSize, newWidth / cropAspectRatio);
					newX = cropArea.x + dx;
					break;
					
				case 'bottom-right':
					newWidth = Math.max(minSize, cropArea.width + dx);
					newHeight = currentImageType === 'profile' ? newWidth : Math.max(minSize, newWidth / cropAspectRatio);
					break;
			}

			// Stelle sicher, dass der Bereich im Bild bleibt
			const constrainedWidth = Math.min(newWidth, maxWidth - newX);
			const constrainedHeight = Math.min(newHeight, maxHeight - newY);
			
			if (newX >= 0 && newY >= 0 && constrainedWidth >= minSize && constrainedHeight >= minSize) {
				cropArea.width = constrainedWidth;
				cropArea.height = constrainedHeight;
				cropArea.x = newX;
				cropArea.y = newY;
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
				showMessage(t.passwordUpdateSuccess || 'Passwort geändert');
				passwordForm.currentPassword = passwordForm.newPassword = passwordForm.confirmPassword = '';
			} else showMessage(data.error || t.passwordUpdateError || 'Fehler beim Ändern', 'error');
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
				headers: {
					'Content-Type': 'application/json'
				}
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

<div class="profile-container">
	<div class="profile-header">
		<h1>{t.profile || 'Profil'}</h1>
		<p class="profile-subtitle">{t.manageAccountSettings || 'Verwalten Sie Ihre Kontoeinstellungen'}</p>
	</div>

	{#if message.text}
		<div class="message {message.type}">{message.text}</div>
	{/if}

	<div class="profile-grid">
		<!-- Left Column - Profile Image & Background -->
		<div class="profile-sidebar">
			<div class="profile-card">
				<h3>{t.profilePicture || 'Profilbild'}</h3>
				<div class="image-upload-section">
					<div class="current-image">
						<img src={profileImage} alt="Profilbild" class="profile-preview" />
					</div>
					<label class="upload-button" for="profile-upload">
						<i class="fas fa-camera"></i>
						{t.selectImage || 'Bild auswählen'}
					</label>
					<input 
						id="profile-upload" 
						type="file" 
						accept="image/*" 
						onchange={(e) => openImageEditor(e, 'profile')}
					/>
				</div>
			</div>

			<div class="profile-card">
				<h3>{t.backgroundImage || 'Hintergrundbild'}</h3>
				<div class="image-upload-section">
					<div class="current-image">
						<img src={backgroundImage} alt="Hintergrundbild" class="background-preview" />
					</div>
					<label class="upload-button" for="background-upload">
						<i class="fas fa-image"></i>
						{t.selectBackground || 'Hintergrund auswählen'}
					</label>
					<input 
						id="background-upload" 
						type="file" 
						accept="image/*" 
						onchange={(e) => openImageEditor(e, 'background')}
					/>
					<button class="reset-button" onclick={resetBackground} type="button" disabled={isLoading}>
						<i class="fas fa-undo"></i>
						{t.resetToDefault || 'Standard zurücksetzen'}
					</button>
				</div>
			</div>
		</div>

		<!-- Right Column - Forms -->
		<div class="profile-content">
			<!-- Profile Information -->
			<div class="profile-card">
				<h3>{t.profileInformation || 'Profilinformationen'}</h3>
				<form onsubmit={updateProfile}>
					<div class="form-group">
						<label for="username">{t.username || 'Benutzername'}</label>
						<input 
							id="username"
							type="text" 
							bind:value={profileForm.username}
							placeholder={t.usernamePlaceholder || 'Ihr Benutzername'}
						/>
					</div>
					
					<div class="form-group">
						<label for="bio">{t.aboutMe || 'Über mich'}</label>
						<textarea 
							id="bio"
							bind:value={profileForm.bio}
							placeholder={t.aboutMePlaceholder || 'Erzählen Sie etwas über sich...'}
							rows="4"
						></textarea>
					</div>
					
					<button type="submit" class="save-button" disabled={isLoading}>
						{#if isLoading}
							<i class="fas fa-spinner fa-spin"></i>
						{:else}
							<i class="fas fa-save"></i>
						{/if}
						{t.saveProfile || 'Profil speichern'}
					</button>
				</form>
			</div>

			<!-- Email Update -->
			<div class="profile-card">
				<h3>{t.changeEmail || 'E-Mail ändern'}</h3>
				<form onsubmit={updateEmail}>
					<div class="form-group">
						<label for="current-email">{t.currentEmail || 'Aktuelle E-Mail'}</label>
						<input 
							id="current-email"
							type="email" 
							value={emailForm.currentEmail}
							disabled
						/>
					</div>
					
					<div class="form-group">
						<label for="new-email">{t.newEmail || 'Neue E-Mail'}</label>
						<input 
							id="new-email"
							type="email" 
							bind:value={emailForm.newEmail}
							placeholder={t.newEmailPlaceholder || 'neue.email@beispiel.de'}
							required
						/>
					</div>
					
					<div class="form-group">
						<label for="confirm-email">{t.confirmEmail || 'E-Mail bestätigen'}</label>
						<input 
							id="confirm-email"
							type="email" 
							bind:value={emailForm.confirmEmail}
							placeholder={t.newEmailPlaceholder || 'neue.email@beispiel.de'}
							required
						/>
					</div>
					
					<div class="form-group">
						<label for="email-password">{t.currentPassword || 'Aktuelles Passwort'}</label>
						<input 
							id="email-password"
							type="password" 
							bind:value={emailForm.password}
							placeholder={t.currentPasswordPlaceholder || 'Ihr aktuelles Passwort'}
							required
						/>
					</div>
					
					<button type="submit" class="save-button" disabled={isLoading}>
						{#if isLoading}
							<i class="fas fa-spinner fa-spin"></i>
						{:else}
							<i class="fas fa-envelope"></i>
						{/if}
						{t.updateEmail || 'E-Mail aktualisieren'}
					</button>
				</form>
			</div>

			<!-- Password Update -->
			<div class="profile-card">
				<h3>{t.changePassword || 'Passwort ändern'}</h3>
				<form onsubmit={updatePassword}>
					<div class="form-group">
						<label for="current-password">{t.currentPassword || 'Aktuelles Passwort'}</label>
						<input 
							id="current-password"
							type="password" 
							bind:value={passwordForm.currentPassword}
							placeholder={t.currentPasswordPlaceholder || 'Ihr aktuelles Passwort'}
							required
						/>
					</div>
					
					<div class="form-group">
						<label for="new-password">{t.newPassword || 'Neues Passwort'}</label>
						<input 
							id="new-password"
							type="password" 
							bind:value={passwordForm.newPassword}
							placeholder={t.newPasswordPlaceholder || 'Neues Passwort (min. 6 Zeichen)'}
							required
						/>
					</div>
					
					<div class="form-group">
						<label for="confirm-password">{t.confirmPassword || 'Passwort bestätigen'}</label>
						<input 
							id="confirm-password"
							type="password" 
							bind:value={passwordForm.confirmPassword}
							placeholder={t.confirmPasswordPlaceholder || 'Passwort wiederholen'}
							required
						/>
					</div>
					
					<button type="submit" class="save-button" disabled={isLoading}>
						{#if isLoading}
							<i class="fas fa-spinner fa-spin"></i>
						{:else}
							<i class="fas fa-key"></i>
						{/if}
						{t.updatePassword || 'Passwort aktualisieren'}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- Image Editor Modal -->
{#if showImageEditor}
	<div class="modal-overlay" onclick={handleOverlayClick}>
		<div class="image-editor-modal">
			<div class="modal-header">
				<h3>
					{#if currentImageType === 'profile'}
						{t.cropProfileImage || 'Profilbild zuschneiden'}
					{:else}
						{t.cropBackgroundImage || 'Hintergrundbild zuschneiden'}
					{/if}
				</h3>
				<button class="close-button" onclick={closeImageEditor}>
					<i class="fas fa-times"></i>
				</button>
			</div>
			
			<div class="modal-content">
				<div 
					class="image-crop-container" 
					bind:this={containerRef}
					onmousemove={handleMouseMove}
					onmouseup={handleMouseUp}
					onmouseleave={handleMouseUp}
				>
					{#if imagePreviewUrl}
						<img 
							bind:this={imageRef}
							src={imagePreviewUrl} 
							alt="Zu schneidendes Bild" 
							class="crop-image"
							onload={initializeCropArea}
						/>
						
						<!-- Overlay für abgedunkelte Bereiche -->
						<div class="crop-overlay">
							<!-- Transparenter Crop-Bereich -->
							<div 
								class="crop-area"
								style="left: {cropArea.x}px; top: {cropArea.y}px; width: {cropArea.width}px; height: {cropArea.height}px;"
								onmousedown={(e) => handleMouseDown(e, 'move')}
							>
								<!-- Resize Handles - NUR ECKEN -->
								<div class="resize-handle top-left" onmousedown={(e) => handleMouseDown(e, 'resize', 'top-left')}></div>
								<div class="resize-handle top-right" onmousedown={(e) => handleMouseDown(e, 'resize', 'top-right')}></div>
								<div class="resize-handle bottom-left" onmousedown={(e) => handleMouseDown(e, 'resize', 'bottom-left')}></div>
								<div class="resize-handle bottom-right" onmousedown={(e) => handleMouseDown(e, 'resize', 'bottom-right')}></div>
							</div>
						</div>
					{/if}
				</div>
				
			</div>
			
			<div class="modal-actions">
				<button class="cancel-button" onclick={closeImageEditor} disabled={isLoading}>
					{t.cancel || 'Abbrechen'}
				</button>
				<button class="save-button" onclick={cropAndSaveImage} disabled={isLoading}>
					{#if isLoading}
						<i class="fas fa-spinner fa-spin"></i>
					{:else}
						<i class="fas fa-check"></i>
					{/if}
					{t.saveImage || 'Bild speichern'}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.profile-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.profile-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.profile-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
		color: var(--text);
	}

	.profile-subtitle {
		font-size: 1.1rem;
		color: var(--text);
		opacity: 0.7;
		margin: 0;
	}

	.message {
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 2rem;
		text-align: center;
		font-weight: 500;
	}

	.message.success {
		background: rgba(52, 199, 89, 0.1);
		border: 1px solid rgba(52, 199, 89, 0.3);
		color: #34c759;
	}

	.message.error {
		background: rgba(255, 59, 48, 0.1);
		border: 1px solid rgba(255, 59, 48, 0.3);
		color: #ff3b30;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: 350px 1fr;
		gap: 2rem;
		align-items: start;
	}

	.profile-card {
		background: var(--bg-color);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 2rem;
		margin-bottom: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.profile-card h3 {
		margin: 0 0 1.5rem 0;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text);
	}

	.image-upload-section {
		text-align: center;
	}

	.current-image {
		margin-bottom: 1.5rem;
	}

	.profile-preview {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid rgba(255, 255, 255, 0.2);
	}

	.background-preview {
		width: 100%;
		height: 120px;
		border-radius: 12px;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.2);
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

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text);
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: var(--text);
		font-size: 1rem;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.15);
	}

	.form-group input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 100px;
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

	/* Image Crop Container */
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
	}

	.crop-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
	}

	/* Crop Overlay */
	.crop-overlay {
		position: absolute;
		top: 20px;
		left: 20px;
		right: 20px;
		bottom: 20px;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 8px;
	}

	/* Crop Area (der auswählbare Bereich) */
	.crop-area {
		position: absolute;
		background: transparent;
		border: 3px solid #007AFF;
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
		cursor: move;
		transition: border-color 0.2s ease;
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

	/* Animations */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Responsive Design */
	@media (max-width: 968px) {
		.profile-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.profile-sidebar {
			order: 2;
		}

		.profile-content {
			order: 1;
		}

		.profile-container {
			padding: 1rem;
		}

		.modal-overlay {
			padding: 1rem;
		}

		.image-editor-modal {
			max-height: 95vh;
		}

		.modal-header,
		.modal-content,
		.modal-actions {
			padding: 1rem 1.5rem;
		}

		.image-crop-container {
			min-height: 300px;
			max-height: 50vh;
		}
	}

	@media (max-width: 768px) {
		.profile-header h1 {
			font-size: 2rem;
		}

		.profile-card {
			padding: 1.5rem;
		}

		.profile-preview {
			width: 120px;
			height: 120px;
		}

		.modal-actions {
			flex-direction: column;
		}

		.resize-handle {
			width: 18px;
			height: 18px;
		}
	}
</style>