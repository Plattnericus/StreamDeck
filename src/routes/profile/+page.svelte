<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { language, theme, translations } from '$lib/stores.js';

	let user = null;
	let profileImage = '/default-profile.png';
	let backgroundImage = '/default-background.png';
	let isLoading = false;
	let message = { text: '', type: '' };

	let emailForm = { currentEmail: '', newEmail: '', confirmEmail: '', password: '' };
	let passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
	let profileForm = { username: '', bio: '' };

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

	async function uploadProfileImage(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) return showMessage(t.pleaseSelectImage || 'Bitte Bilddatei wählen', 'error');
		if (file.size > 10 * 1024 * 1024) return showMessage(t.imageTooLarge || 'Bild zu groß (max. 10MB)', 'error');

		isLoading = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			
			const res = await fetch('http://localhost:3000/api/user/upload/profile-image', { 
				method: 'POST', 
				body: formData,
				credentials: 'include'
			});
			
			const data = await res.json();
			if (res.ok) {
				profileImage = data.profilePictureUrl;
				showMessage(t.profileImageUpdated || 'Profilbild aktualisiert');
			} else {
				showMessage(data.error || t.profileImageError || 'Fehler beim Hochladen', 'error');
			}
		} catch {
			showMessage(t.profileImageError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
			e.target.value = '';
		}
	}

	async function uploadBackgroundImage(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) return showMessage(t.pleaseSelectImage || 'Bitte Bild wählen', 'error');
		if (file.size > 10 * 1024 * 1024) return showMessage(t.backgroundImageTooLarge || 'Bild zu groß (max. 10MB)', 'error');

		isLoading = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			
			const res = await fetch('http://localhost:3000/api/user/upload/background-image', { 
				method: 'POST', 
				body: formData,
				credentials: 'include'
			});
			
			const data = await res.json();
			if (res.ok) {
				backgroundImage = data.backgroundImageUrl;
				document.body.style.backgroundImage = `url(${backgroundImage})`;
				showMessage(t.backgroundImageUpdated || 'Hintergrund aktualisiert');
			} else {
				showMessage(data.error || t.backgroundImageError || 'Fehler beim Hochladen', 'error');
			}
		} catch {
			showMessage(t.backgroundImageError || 'Serverfehler', 'error');
		} finally {
			isLoading = false;
			e.target.value = '';
		}
	}

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
            // Verwende das zurückgegebene Default-Bild
            backgroundImage = data.backgroundImageUrl || '/default-background.png';
            
            // Aktualisiere das Hintergrundbild auf der Seite
            document.documentElement.style.setProperty('--background-image', `url('${backgroundImage}')`);
            document.body.style.backgroundImage = `url('${backgroundImage}')`;
            
            showMessage(t.backgroundReset || 'Hintergrund zurückgesetzt');
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
						onchange={uploadProfileImage}
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
						onchange={uploadBackgroundImage}
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
	}
</style>