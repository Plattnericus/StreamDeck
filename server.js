import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import db from './db.js';
import { fileURLToPath } from 'url';
import busboy from 'busboy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const FRONTEND = 'http://localhost:5173';

// Middleware
app.use(cors({ origin: FRONTEND, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// WICHTIG: Statische Dateien zuerst definieren
app.use('/user-data', express.static(path.join(__dirname, 'userDATA')));
app.use('/default-profile.png', express.static(path.join(__dirname, 'default-profile.png')));

// Pfade konfigurieren
const userDATAPath = path.join(__dirname, 'userDATA');
if (!fs.existsSync(userDATAPath)) {
  fs.mkdirSync(userDATAPath, { recursive: true });
}

// Hilfsfunktionen
const getUserDataPath = (userId) => path.join(userDATAPath, userId);
const getUserJsonPath = (userId) => path.join(getUserDataPath(userId), 'user.json');
const getUploadsPath = (userId) => path.join(getUserDataPath(userId), 'uploads');

const ensureUserDirectory = (userId) => {
  const userFolder = getUserDataPath(userId);
  const uploadsFolder = getUploadsPath(userId);
  
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
  }
  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
  }
};

const createUserJson = (userId, username, email) => {
  const userJson = {
    id: userId,
    username,
    email,
    role: 'user',
    created_at: new Date().toISOString(),
    verified: false,
    bio: '',
    profilePicture: '/default-profile.png',
    backgroundImage: 'https://images.pexels.com/photos/2563854/pexels-photo-2563854.jpeg'
  };
  
  fs.writeFileSync(getUserJsonPath(userId), JSON.stringify(userJson, null, 2));
  return userJson;
};

const setAuthCookie = (res, userId, remember = false) => {
  res.cookie('auth', userId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : undefined
  });
};

// Authentifizierungs-Endpoints (bleiben gleich)
app.post('/api/register', async (req, res) => {
  const { username, email, password, remember } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Alle Felder ausfüllen' });
  }

  const userId = randomUUID();
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (id, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)`,
    [userId, username, email, hashedPassword, new Date().toISOString()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'User existiert bereits' });
      }

      ensureUserDirectory(userId);
      createUserJson(userId, username, email);
      setAuthCookie(res, userId, remember);

      res.json({ 
        success: true, 
        redirect: '/settings', 
        userId 
      });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { identifier, password, remember } = req.body;
  
  db.get(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [identifier, identifier],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Datenbankfehler' });
      }
      if (!user) {
        return res.status(400).json({ error: 'User nicht gefunden' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Falsches Passwort' });
      }

      setAuthCookie(res, user.id, remember);
      res.json({ 
        success: true, 
        redirect: '/settings', 
        userId: user.id 
      });
    }
  );
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth');
  res.json({ 
    success: true, 
    message: 'Erfolgreich ausgeloggt' 
  });
});

app.get('/api/session', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.json({ loggedIn: false });
  }

  try {
    const userJsonPath = getUserJsonPath(userId);
    if (!fs.existsSync(userJsonPath)) {
      return res.json({ loggedIn: false });
    }

    const user = JSON.parse(fs.readFileSync(userJsonPath));
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});

// Datei-Upload-Hilfsfunktion
const handleFileUpload = (req, res, options) => {
  const { 
    fileNamePrefix, 
    maxFileSize, 
    onSuccess 
  } = options;
  
  const userId = req.cookies.auth;
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  const bb = busboy({ headers: req.headers });
  let fileBuffer = null;
  let fileName = null;

  bb.on('file', (name, file, info) => {
    const { filename, mimeType } = info;
    
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Nur Bilddateien erlaubt' });
    }
    
    fileName = `${fileNamePrefix}${path.extname(filename)}`;
    const chunks = [];
    
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => fileBuffer = Buffer.concat(chunks));
  });

  bb.on('close', async () => {
    if (!fileBuffer) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }
    
    if (fileBuffer.length > maxFileSize) {
      return res.status(400).json({ 
        error: `Datei zu groß (max. ${maxFileSize / 1024 / 1024}MB)` 
      });
    }

    try {
      const uploadsDir = getUploadsPath(userId);
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Alte Dateien mit gleichem Präfix löschen
      fs.readdirSync(uploadsDir)
        .filter(file => file.startsWith(fileNamePrefix))
        .forEach(file => fs.unlinkSync(path.join(uploadsDir, file)));

      // Neue Datei speichern
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);

      await onSuccess(userId, fileName, filePath);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Fehler beim Hochladen' });
    }
  });

  req.pipe(bb);
};

// Upload-Endpoints
app.post('/api/user/upload/profile-image', (req, res) => {
  handleFileUpload(req, res, {
    fileNamePrefix: 'profile-picture',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    onSuccess: async (userId, fileName) => {
      const userJsonPath = getUserJsonPath(userId);
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      
      userData.profilePicture = `/user-data/${userId}/uploads/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json({ 
        success: true, 
        profilePictureUrl: userData.profilePicture 
      });
    }
  });
});

app.post('/api/user/upload/background-image', (req, res) => {
  handleFileUpload(req, res, {
    fileNamePrefix: 'background-image',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    onSuccess: async (userId, fileName) => {
      const userJsonPath = getUserJsonPath(userId);
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      
      userData.backgroundImage = `/user-data/${userId}/uploads/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json({ 
        success: true, 
        backgroundImageUrl: userData.backgroundImage 
      });
    }
  });
});

// Profil-Endpoints
app.get('/api/user/profile', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  try {
    const userJsonPath = getUserJsonPath(userId);
    if (!fs.existsSync(userJsonPath)) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    
    db.get(
      'SELECT email, username FROM users WHERE id = ?', 
      [userId], 
      (err, row) => {
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
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden des Profils' });
  }
});

app.post('/api/user/update-profile', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  const { username, bio } = req.body;
  
  db.run(
    'UPDATE users SET username = ? WHERE id = ?', 
    [username, userId], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Fehler beim Aktualisieren' });
      }

      try {
        const userJsonPath = getUserJsonPath(userId);
        const userData = JSON.parse(fs.readFileSync(userJsonPath));
        
        userData.username = username;
        userData.bio = bio || '';
        fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

        res.json({ 
          success: true, 
          user: userData 
        });
      } catch (error) {
        res.status(500).json({ error: 'Fehler beim Speichern' });
      }
    }
  );
});

app.post('/api/user/update-email', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  const { newEmail, password } = req.body;
  
  db.get(
    'SELECT password FROM users WHERE id = ?', 
    [userId], 
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Datenbankfehler' });
      }
      
      const validPassword = await bcrypt.compare(password, row.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Falsches Passwort' });
      }

      db.run(
        'UPDATE users SET email = ? WHERE id = ?', 
        [newEmail, userId], 
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Email bereits vergeben' });
          }
          
          res.json({ 
            success: true, 
            message: 'Email aktualisiert' 
          });
        }
      );
    }
  );
});

app.post('/api/user/update-password', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  const { currentPassword, newPassword } = req.body;
  
  db.get(
    'SELECT password FROM users WHERE id = ?', 
    [userId], 
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Datenbankfehler' });
      }
      
      const validPassword = await bcrypt.compare(currentPassword, row.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Falsches aktuelles Passwort' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.run(
        'UPDATE users SET password = ? WHERE id = ?', 
        [hashedPassword, userId], 
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Fehler beim Ändern des Passworts' });
          }
          
          res.json({ 
            success: true, 
            message: 'Passwort geändert' 
          });
        }
      );
    }
  );
});

app.post('/api/user/reset-background', (req, res) => {
  const userId = req.cookies.auth;
  
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }

  try {
    const userJsonPath = getUserJsonPath(userId);
    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    
    userData.backgroundImage = 'https://images.pexels.com/photos/2563854/pexels-photo-2563854.jpeg';
    fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

    res.json({ 
      success: true, 
      message: 'Hintergrund zurückgesetzt' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Zurücksetzen' });
  }
});

// Public Endpoints
app.get('/api/user/:userId/profile-picture', (req, res) => {
  const userId = req.params.userId;
  const uploadsDir = getUploadsPath(userId);
  
  if (!fs.existsSync(uploadsDir)) {
    return res.json({ profilePictureUrl: '/default-profile.png' });
  }
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let profilePicture = null;
  
  for (const ext of imageExtensions) {
    const possiblePaths = [
      path.join(uploadsDir, `profile-picture${ext}`),
      path.join(uploadsDir, `profile${ext}`),
      path.join(uploadsDir, `avatar${ext}`)
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

// Changelog Endpoint
app.get('/api/changelog', (req, res) => {
  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  
  if (!fs.existsSync(changelogPath)) {
    return res.status(404).json({ error: 'CHANGELOG.md nicht gefunden' });
  }
  
  res.sendFile(changelogPath);
});

// Server starten
app.listen(3000, () => {
  console.log('✅ Server läuft auf http://localhost:3000');
});