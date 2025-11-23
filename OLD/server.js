import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import db from './db.js';
import { fileURLToPath } from 'url';
import busboy from 'busboy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const FRONTEND_PORT = 5173;
const FRONTEND = `http://localhost:${FRONTEND_PORT}`;

// ===== MIDDLEWARE =====
app.use(cors({ 
  origin: FRONTEND, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24h
  }
}));

// ===== UPLOADS ORDNER STRUKTUR IM ROOT =====
const uploadsRootPath = path.join(__dirname, 'uploads');
const profilePicsPath = path.join(uploadsRootPath, 'profile-pic');
const backgroundPicsPath = path.join(uploadsRootPath, 'background-pic');

// Uploads-Ordnerstruktur erstellen
[uploadsRootPath, profilePicsPath, backgroundPicsPath].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Ordner erstellt: ${dir}`);
  }
});

// ===== STATISCHE UPLOADS FREIGEBEN =====
app.use('/uploads', express.static(uploadsRootPath));

// ===== PATH CONFIGURATION =====
const userDATAPath = path.join(__dirname, 'userDATA');
if (!fs.existsSync(userDATAPath)) {
  fs.mkdirSync(userDATAPath, { recursive: true });
}

// ===== HELPER FUNCTIONS =====
const getUserDataPath = (userId) => path.join(userDATAPath, userId);
const getUserJsonPath = (userId) => path.join(getUserDataPath(userId), 'user.json');

const ensureUserDirectory = (userId) => {
  const userFolder = getUserDataPath(userId);
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
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
    backgroundImage: '/default-background.png',
    toggleStates: {
      darkMode: false,
      notifications: true,
      autoSave: false,
      analytics: true,
      privacyMode: false,
      emailUpdates: true,
      liquidToggle: false,
      cookies: true,
      termsAccepted: false
    }
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

const getUserIdFromCookies = (req) => {
  return req.cookies.auth;
};

const requireAuth = (req, res, next) => {
  const userId = getUserIdFromCookies(req);
  if (!userId) {
    return res.status(401).json({ error: 'Nicht eingeloggt' });
  }
  req.userId = userId;
  next();
};

// ===== VALIDATION FUNCTIONS =====
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password) => {
  return password && password.length >= 8;
};

// ===== RESPONSE STANDARDIZATION =====
const successResponse = (data = {}, message = '') => {
  return { success: true, ...data, message };
};

const errorResponses = {
  database: { error: 'Datenbankfehler' },
  auth: { error: 'Nicht autorisiert' },
  not_found: { error: 'Nicht gefunden' },
  validation: { error: 'Ungültige Eingabe' },
  server: { error: 'Server Fehler' }
};

// ===== SECURE FILE DELETE =====
const safeDeleteFiles = (directory, pattern) => {
  try {
    if (!fs.existsSync(directory)) return;
    
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      if (file.startsWith(pattern)) {
        const filePath = path.join(directory, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`✅ Gelöscht: ${filePath}`);
        } catch (err) {
          console.warn(`⚠️ Konnte nicht löschen ${filePath}:`, err.message);
        }
      }
    });
  } catch (error) {
    console.error('❌ Fehler in safeDeleteFiles:', error);
  }
};

// ===== FILE UPLOAD HANDLER (SICHER) =====
const handleFileUpload = (req, res, options) => {
  const { uploadType, maxFileSize, onSuccess } = options;
  
  const userId = getUserIdFromCookies(req);
  if (!userId) {
    return res.status(401).json(errorResponses.auth);
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  const bb = busboy({ 
    headers: req.headers,
    limits: {
      fileSize: maxFileSize,
      files: 1
    }
  });

  let fileBuffer = null;
  let fileExtension = null;
  let mimeType = null;

  // Upload Timeout
  const uploadTimeout = setTimeout(() => {
    bb.destroy();
    res.status(408).json({ error: 'Upload timeout' });
  }, 30000);

  bb.on('file', (name, file, info) => {
    const { filename, mimeType: fileMimeType } = info;
    mimeType = fileMimeType;
    
    // MIME-Type validieren
    if (!allowedMimeTypes.includes(mimeType)) {
      bb.destroy();
      return res.status(400).json({ error: 'Nur Bilddateien (JPEG, PNG, WebP, GIF) erlaubt' });
    }
    
    // Dateiendung validieren
    fileExtension = path.extname(filename).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      bb.destroy();
      return res.status(400).json({ error: 'Ungültige Dateiendung' });
    }
    
    const chunks = [];
    
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => fileBuffer = Buffer.concat(chunks));
    file.on('error', (err) => {
      console.error('File stream error:', err);
      res.status(500).json({ error: 'Datei Upload Fehler' });
    });
  });

  bb.on('close', async () => {
    clearTimeout(uploadTimeout);
    
    try {
      if (!fileBuffer) {
        return res.status(400).json({ error: 'Keine Datei hochgeladen' });
      }
      
      if (fileBuffer.length > maxFileSize) {
        return res.status(400).json({ 
          error: `Datei zu groß (max. ${maxFileSize / 1024 / 1024}MB)` 
        });
      }

      // Bestimme den Zielordner und Dateinamen
      const targetDir = uploadType === 'profile' ? profilePicsPath : backgroundPicsPath;
      const fileName = `${userId}${fileExtension}`;
      const filePath = path.join(targetDir, fileName);

      // Alte Dateien mit gleicher UUID löschen (alle Extensions)
      safeDeleteFiles(targetDir, userId);

      // Neue Datei speichern
      fs.writeFileSync(filePath, fileBuffer);

      await onSuccess(userId, fileName, filePath);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Fehler beim Hochladen' });
    }
  });

  bb.on('error', (err) => {
    clearTimeout(uploadTimeout);
    console.error('Busboy error:', err);
    res.status(500).json({ error: 'Upload Fehler' });
  });

  req.pipe(bb);
};

// ===== USER ID GENERATION =====
const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// ===== BACKGROUND PICTURE ENDPOINT =====
app.get('/api/user/:userId/background-picture', (req, res) => {
    try {
        const userId = req.params.userId;
        let backgroundPictureUrl = '/default-background.png';
        
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        
        for (const ext of imageExtensions) {
            const imgPath = path.join(backgroundPicsPath, `${userId}${ext}`);
            if (fs.existsSync(imgPath)) {
                backgroundPictureUrl = `/uploads/background-pic/${userId}${ext}`;
                break;
            }
        }
        
        if (backgroundPictureUrl === '/default-background.png') {
            const userJsonPath = path.join(userDATAPath, userId, 'user.json');
            if (fs.existsSync(userJsonPath)) {
                const userData = JSON.parse(fs.readFileSync(userJsonPath));
                if (userData.backgroundImage && userData.backgroundImage !== '/default-background.png') {
                    backgroundPictureUrl = userData.backgroundImage;
                }
            }
        }
        
        res.json({ 
            backgroundPictureUrl
        });
    } catch (error) {
        console.error('Background picture error:', error);
        res.json({ backgroundPictureUrl: '/default-background.png' });
    }
});

// ===== AUTHENTICATION ENDPOINTS =====
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, remember } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Alle Felder ausfüllen' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Ungültige Email-Adresse' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein' });
    }

    const userId = generateUserId();
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

        res.json(successResponse({ 
          redirect: '/profile', 
          userId 
        }, 'Erfolgreich registriert'));
      }
    );
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json(errorResponses.server);
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { identifier, password, remember } = req.body;
    
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email/Username und Passwort benötigt' });
    }

    db.get(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [identifier, identifier],
      async (err, user) => {
        if (err) {
          return res.status(500).json(errorResponses.database);
        }
        if (!user) {
          return res.status(400).json({ error: 'User nicht gefunden' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(400).json({ error: 'Falsches Passwort' });
        }

        setAuthCookie(res, user.id, remember);
        res.json(successResponse({ 
          redirect: '/profile', 
          userId: user.id 
        }, 'Erfolgreich eingeloggt'));
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(errorResponses.server);
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth');
  res.json(successResponse({}, 'Erfolgreich ausgeloggt'));
});

app.get('/api/session', (req, res) => {
  try {
    const userId = getUserIdFromCookies(req);
    
    if (!userId) {
      return res.json({ loggedIn: false });
    }

    const userJsonPath = getUserJsonPath(userId);
    if (!fs.existsSync(userJsonPath)) {
      return res.json({ loggedIn: false });
    }

    const user = JSON.parse(fs.readFileSync(userJsonPath));
    res.json({ loggedIn: true, user });
  } catch (error) {
    console.error('Session error:', error);
    res.json({ loggedIn: false });
  }
});

// ===== UPLOAD ENDPOINTS (AKTUALISIERT) =====
app.post('/api/user/upload/profile-image', (req, res) => {
  handleFileUpload(req, res, {
    uploadType: 'profile',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    onSuccess: async (userId, fileName) => {
      const userJsonPath = getUserJsonPath(userId);
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      
      userData.profilePicture = `/uploads/profile-pic/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json(successResponse({ 
        profilePictureUrl: userData.profilePicture 
      }, 'Profilbild aktualisiert'));
    }
  });
});

app.post('/api/user/upload/background-image', (req, res) => {
  handleFileUpload(req, res, {
    uploadType: 'background',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    onSuccess: async (userId, fileName) => {
      const userJsonPath = getUserJsonPath(userId);
      const userData = JSON.parse(fs.readFileSync(userJsonPath));
      
      userData.backgroundImage = `/uploads/background-pic/${fileName}`;
      fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

      res.json(successResponse({ 
        backgroundImageUrl: userData.backgroundImage 
      }, 'Hintergrundbild aktualisiert'));
    }
  });
});

// ===== PROFILE ENDPOINTS =====
app.get('/api/user/profile', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const userJsonPath = getUserJsonPath(userId);
    
    if (!fs.existsSync(userJsonPath)) {
      return res.status(404).json(errorResponses.not_found);
    }

    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    
    db.get(
      'SELECT email, username FROM users WHERE id = ?', 
      [userId], 
      (err, row) => {
        if (err) {
          return res.status(500).json(errorResponses.database);
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

        res.json(successResponse(profileData));
      }
    );
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json(errorResponses.server);
  }
});

app.post('/api/user/update-profile', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const { username, bio } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username ist erforderlich' });
    }

    db.run(
      'UPDATE users SET username = ? WHERE id = ?', 
      [username, userId], 
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Fehler beim Aktualisieren' });
        }

        const userJsonPath = getUserJsonPath(userId);
        const userData = JSON.parse(fs.readFileSync(userJsonPath));
        
        userData.username = username;
        userData.bio = bio || '';
        fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

        res.json(successResponse({ 
          user: userData 
        }, 'Profil aktualisiert'));
      }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json(errorResponses.server);
  }
});

app.post('/api/user/update-email', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const { newEmail, password } = req.body;
    
    if (!newEmail || !password) {
      return res.status(400).json({ error: 'Email und Passwort benötigt' });
    }

    if (!isValidEmail(newEmail)) {
      return res.status(400).json({ error: 'Ungültige Email-Adresse' });
    }

    db.get(
      'SELECT password FROM users WHERE id = ?', 
      [userId], 
      async (err, row) => {
        if (err) {
          return res.status(500).json(errorResponses.database);
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
            
            res.json(successResponse({}, 'Email aktualisiert'));
          }
        );
      }
    );
  } catch (error) {
    console.error('Update email error:', error);
    res.status(500).json(errorResponses.server);
  }
});

app.post('/api/user/update-password', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Aktuelles und neues Passwort benötigt' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'Neues Passwort muss mindestens 8 Zeichen lang sein' });
    }

    db.get(
      'SELECT password FROM users WHERE id = ?', 
      [userId], 
      async (err, row) => {
        if (err) {
          return res.status(500).json(errorResponses.database);
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
            
            res.json(successResponse({}, 'Passwort geändert'));
          }
        );
      }
    );
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json(errorResponses.server);
  }
});

// ===== RESET BACKGROUND PICTURE ENDPOINT =====
app.post('/api/user/reset-background', requireAuth, (req, res) => {
    try {
        const userId = req.userId;
        const userJsonPath = getUserJsonPath(userId);
        
        if (!fs.existsSync(userJsonPath)) {
            return res.status(404).json(errorResponses.not_found);
        }

        const userData = JSON.parse(fs.readFileSync(userJsonPath));
        
        // Lösche die Background-Bild-Datei
        safeDeleteFiles(backgroundPicsPath, userId);
        
        // Setze auf Default Background zurück
        userData.backgroundImage = '/default-background.png';
        fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));

        res.json(successResponse({ 
            backgroundImageUrl: '/default-background.png'
        }, 'Hintergrund zurückgesetzt'));
        
    } catch (error) {
        console.error('Reset background error:', error);
        res.status(500).json({ error: 'Fehler beim Zurücksetzen des Hintergrunds' });
    }
});

// ===== PUBLIC ENDPOINTS =====
app.get('/api/user/:userId/profile-picture', (req, res) => {
  try {
    const userId = req.params.userId;
    let profilePictureUrl = '/default-profile.png';
    
    // Prüfe ob eine Profilbild-Datei für diese UUID existiert
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    for (const ext of imageExtensions) {
      const imgPath = path.join(profilePicsPath, `${userId}${ext}`);
      if (fs.existsSync(imgPath)) {
        profilePictureUrl = `/uploads/profile-pic/${userId}${ext}`;
        break;
      }
    }
    
    res.json({ 
      profilePictureUrl
    });
  } catch (error) {
    console.error('Profile picture error:', error);
    res.json({ profilePictureUrl: '/default-profile.png' });
  }
});

// ===== MISC ENDPOINTS =====
app.get('/api/changelog', (req, res) => {
  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  
  if (!fs.existsSync(changelogPath)) {
    return res.status(404).json({ error: 'CHANGELOG.md nicht gefunden' });
  }
  
  res.sendFile(changelogPath);
});

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.json({});
});

// ===== MULTI TOGGLE STATES ENDPOINTS =====
app.get('/api/user/toggle-states', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const userJsonPath = getUserJsonPath(userId);
    if (!fs.existsSync(userJsonPath)) return res.status(404).json(errorResponses.not_found);
    
    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    const defaults = {
      darkMode: false,
      notifications: true,
      autoSave: false,
      analytics: true,
      privacyMode: false,
      emailUpdates: true,
      liquidToggle: false,
      cookies: true,
      termsAccepted: false
    };
    
    const toggleStates = { ...defaults, ...(userData.toggleStates || {}) };
    // persist merged
    userData.toggleStates = toggleStates;
    fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));
    
    res.json(successResponse({ toggleStates }));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Fehler beim Laden der Toggle-Status' });
  }
});

app.post('/api/user/update-toggle-states', requireAuth, (req, res) => {
  try {
    const userId = req.userId;
    const incoming = req.body.toggleStates || {};
    const userJsonPath = getUserJsonPath(userId);
    
    if (!fs.existsSync(userJsonPath)) return res.status(404).json(errorResponses.not_found);
    
    const userData = JSON.parse(fs.readFileSync(userJsonPath));
    const allowedKeys = [
      'darkMode','notifications','autoSave','analytics',
      'privacyMode','emailUpdates','liquidToggle','cookies','termsAccepted'
    ];
    
    const sanitized = {};
    for (const k of allowedKeys) sanitized[k] = !!incoming[k];
    userData.toggleStates = { ...userData.toggleStates, ...sanitized };
    fs.writeFileSync(userJsonPath, JSON.stringify(userData, null, 2));
    
    res.json(successResponse({ 
      toggleStates: userData.toggleStates 
    }, 'Toggle-Status aktualisiert'));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Fehler beim Speichern der Toggle-Status' });
  }
});

// ===== ERROR HANDLING =====
app.use('/api/', (req, res) => {
  res.status(404).json({ error: 'API Endpoint nicht gefunden' });
});

// ===== SERVER START =====
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
  console.log(`✅ CORS aktiv für Frontend: ${FRONTEND}`);
  console.log(`✅ Uploads-Ordner: ${uploadsRootPath}`);
  console.log(`✅ Session Management aktiviert`);
  console.log(`✅ Sichere Datei-Uploads aktiviert`);
});