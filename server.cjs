const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const db = require('./db.cjs');

const app = express();
const FRONTEND = 'http://localhost:5173';

app.use(cors({ origin: FRONTEND, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const userDATAPath = path.join(__dirname, 'userDATA');
if (!fs.existsSync(userDATAPath)) fs.mkdirSync(userDATAPath, { recursive: true });

// Registrierung
app.post('/api/register', async (req, res) => {
  const { username, email, password, remember } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Alle Felder ausfüllen' });

  const userId = randomUUID();
  const hashed = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO users (id, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)`,
    [userId, username, email, hashed, createdAt],
    function (err) {
      if (err) return res.status(500).json({ error: 'User existiert bereits' });

      // user folder + uploads + user.json
      const folder = path.join(userDATAPath, userId);
      fs.mkdirSync(path.join(folder, 'uploads'), { recursive: true });
      const userJson = { 
        id: userId, 
        username, 
        email, 
        role: 'user', 
        created_at: createdAt, 
        verified: false,
        bio: '',
        profilePicture: '/default-profile.png',
        backgroundImage: 'https://images.pexels.com/photos/2563854/pexels-photo-2563854.jpeg'
      };
      fs.writeFileSync(path.join(folder, 'user.json'), JSON.stringify(userJson, null, 2));

      // cookie setzen
      res.cookie('auth', userId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : undefined
      });

      res.json({ success: true, redirect: '/settings', userId });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { identifier, password, remember } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [identifier, identifier],
    async (err, user) => {
      if (err) return res.status(500).json({ error: 'Datenbankfehler' });
      if (!user) return res.status(400).json({ error: 'User nicht gefunden' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ error: 'Falsches Passwort' });

      res.cookie('auth', user.id, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : undefined
      });

      res.json({ success: true, redirect: '/settings', userId: user.id });
    }
  );
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('auth');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get user session
app.get('/api/session', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.json({ loggedIn: false });

  const userFolder = path.join(userDATAPath, userId);
  const metaPath = path.join(userFolder, 'user.json');
  
  if (!fs.existsSync(metaPath)) {
    return res.json({ loggedIn: false });
  }

  try {
    const user = JSON.parse(fs.readFileSync(metaPath));
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});

// UPLOAD ENDPOINTS

// Upload Profile Image
app.post('/api/user/upload/profile-image', async (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const busboy = require('busboy');
  const bb = busboy({ headers: req.headers });
  let fileBuffer = null;
  let fileName = null;

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Nur Bilddateien erlaubt' });
    }
    
    fileName = `profile-picture${path.extname(filename)}`;
    const chunks = [];
    
    file.on('data', (chunk) => {
      chunks.push(chunk);
    });
    
    file.on('end', () => {
      fileBuffer = Buffer.concat(chunks);
    });
  });

  bb.on('close', async () => {
    if (!fileBuffer) return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Datei zu groß (max. 5MB)' });
    }

    try {
      const uploadsDir = path.join(userDATAPath, userId, 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      // Alte Profilbilder löschen
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        if (file.startsWith('profile-picture.')) {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      });

      // Neue Datei speichern
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);

      // User.json aktualisieren
      const userJsonPath = path.join(userDATAPath, userId, 'user.json');
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      userData.profilePicture = `/user-data/${userId}/uploads/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json({ 
        success: true, 
        profilePictureUrl: userData.profilePicture 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Fehler beim Hochladen' });
    }
  });

  req.pipe(bb);
});

// Upload Background Image
app.post('/api/user/upload/background-image', async (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const busboy = require('busboy');
  const bb = busboy({ headers: req.headers });
  let fileBuffer = null;
  let fileName = null;

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Nur Bilddateien erlaubt' });
    }
    
    fileName = `background-image${path.extname(filename)}`;
    const chunks = [];
    
    file.on('data', (chunk) => {
      chunks.push(chunk);
    });
    
    file.on('end', () => {
      fileBuffer = Buffer.concat(chunks);
    });
  });

  bb.on('close', async () => {
    if (!fileBuffer) return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    if (fileBuffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'Datei zu groß (max. 10MB)' });
    }

    try {
      const uploadsDir = path.join(userDATAPath, userId, 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      // Alte Hintergrundbilder löschen
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        if (file.startsWith('background-image.')) {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      });

      // Neue Datei speichern
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);

      // User.json aktualisieren
      const userJsonPath = path.join(userDATAPath, userId, 'user.json');
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      userData.backgroundImage = `/user-data/${userId}/uploads/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json({ 
        success: true, 
        backgroundImageUrl: userData.backgroundImage 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Fehler beim Hochladen' });
    }
  });

  req.pipe(bb);
});

// Reset Background
app.post('/api/user/reset-background', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  try {
    const userJsonPath = path.join(userDATAPath, userId, 'user.json');
    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    
    // Hintergrund auf Standard zurücksetzen
    userData.backgroundImage = 'https://images.pexels.com/photos/2563854/pexels-photo-2563854.jpeg';
    fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

    res.json({ success: true, message: 'Hintergrund zurückgesetzt' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Zurücksetzen' });
  }
});

// Get User Profile Data
app.get('/api/user/profile', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  try {
    const userJsonPath = path.join(userDATAPath, userId, 'user.json');
    if (!fs.existsSync(userJsonPath)) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    
    // Aus der Datenbank zusätzliche Daten holen
    db.get('SELECT email, username FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Datenbankfehler' });
      }

      const profileData = {
        user: {
          ...userData,
          email: row?.email || '',
          username: row?.username || ''
        },
        profilePicture: userData.profilePicture || '/default-profile.png',
        backgroundImage: userData.backgroundImage || 'https://images.pexels.com/photos/2563854/pexels-photo-2563854.jpeg'
      };

      res.json(profileData);
    });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden des Profils' });
  }
});

// Update Profile
app.post('/api/user/update-profile', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const { username, bio } = req.body;
  
  try {
    // In Datenbank aktualisieren
    db.run('UPDATE users SET username = ? WHERE id = ?', [username, userId], function(err) {
      if (err) return res.status(500).json({ error: 'Fehler beim Aktualisieren' });

      // In user.json aktualisieren
      const userJsonPath = path.join(userDATAPath, userId, 'user.json');
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      userData.username = username;
      userData.bio = bio || '';
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json({ 
        success: true, 
        user: userData 
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern' });
  }
});

// Update Email
app.post('/api/user/update-email', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const { newEmail, password } = req.body;
  
  // Passwort überprüfen
  db.get('SELECT password FROM users WHERE id = ?', [userId], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Datenbankfehler' });
    
    const valid = await bcrypt.compare(password, row.password);
    if (!valid) return res.status(400).json({ error: 'Falsches Passwort' });

    // Email aktualisieren
    db.run('UPDATE users SET email = ? WHERE id = ?', [newEmail, userId], function(err) {
      if (err) return res.status(500).json({ error: 'Email bereits vergeben' });
      
      res.json({ success: true, message: 'Email aktualisiert' });
    });
  });
});

// Update Password
app.post('/api/user/update-password', (req, res) => {
  const userId = req.cookies.auth;
  if (!userId) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const { currentPassword, newPassword } = req.body;
  
  // Aktuelles Passwort überprüfen
  db.get('SELECT password FROM users WHERE id = ?', [userId], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Datenbankfehler' });
    
    const valid = await bcrypt.compare(currentPassword, row.password);
    if (!valid) return res.status(400).json({ error: 'Falsches aktuelles Passwort' });

    // Neues Passwort hashen und speichern
    const hashed = await bcrypt.hash(newPassword, 10);
    db.run('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], function(err) {
      if (err) return res.status(500).json({ error: 'Fehler beim Ändern des Passworts' });
      
      res.json({ success: true, message: 'Passwort geändert' });
    });
  });
});

// Get user profile picture
app.get('/api/user/:userId/profile-picture', (req, res) => {
  const userId = req.params.userId;
  const userFolder = path.join(userDATAPath, userId, 'uploads');
  
  if (!fs.existsSync(userFolder)) {
    return res.json({ profilePictureUrl: '/default-profile.png' });
  }
  
  // Look for common image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let profilePicture = null;
  
  for (const ext of imageExtensions) {
    const possiblePaths = [
      path.join(userFolder, `profile-picture${ext}`),
      path.join(userFolder, `profile${ext}`),
      path.join(userFolder, `avatar${ext}`)
    ];
    
    for (const imgPath of possiblePaths) {
      if (fs.existsSync(imgPath)) {
        profilePicture = `/user-data/${userId}/uploads/${path.basename(imgPath)}`;
        break;
      }
    }
    if (profilePicture) break;
  }
  
  res.json({ 
    profilePictureUrl: profilePicture || '/default-profile.png' 
  });
});

// Server user uploaded files
app.use('/user-data/:userId/uploads', (req, res) => {
  const userId = req.params.userId;
  const filename = req.path.split('/').pop();
  const filePath = path.join(userDATAPath, userId, 'uploads', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.use('/api/images', express.static(path.join(__dirname, 'changelog-images')));

// CHANGELOG Endpoint
app.get('/api/changelog', (req, res) => {
  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    return res.status(404).json({ error: 'CHANGELOG.md nicht gefunden' });
  }
  res.sendFile(changelogPath);
});


app.listen(3000, () => console.log('✅ Server läuft auf http://localhost:3000'));