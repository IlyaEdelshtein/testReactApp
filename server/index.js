import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import crypto from 'crypto';

const app = express();
const port = process.env.PORT || 4000;

const adapter = new JSONFile('db.json');
const defaultData = {
  tasks: [],
  nextId: 1,
  users: [],
  nextUserId: 1,
};
const db = new Low(adapter, defaultData);

async function init() {
  await db.read();
  // Ensure the database has all expected properties
  db.data ||= { ...defaultData };
  db.data.tasks ||= [];
  db.data.nextId ||= 1;
  db.data.users ||= [];
  db.data.nextUserId ||= 1;
  // ensure default admin user exists
  if (!db.data.users.find(u => u.username === 'admin')) {
    const { salt, hash } = hashPassword('admin');
    const user = { id: db.data.nextUserId++, username: 'admin', salt, hash };
    db.data.users.push(user);
  }
  await db.write();
}

await init();

const secret = process.env.JWT_SECRET || 'secret';

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function signToken(payload) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  if (signature !== expected) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch {
    return null;
  }
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hashed === hash;
}

app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);
  const payload = verifyToken(auth.slice(7));
  if (!payload) return res.sendStatus(401);
  req.user = payload;
  next();
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  await db.read();
  if (db.data.users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'user exists' });
  }
  const { salt, hash } = hashPassword(password);
  const user = { id: db.data.nextUserId++, username, salt, hash };
  db.data.users.push(user);
  await db.write();
  const token = signToken({ id: user.id, username: user.username });
  res.status(201).json({ token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.username === username);
  if (!user || !verifyPassword(password, user.salt, user.hash)) {
    return res.status(400).json({ error: 'invalid credentials' });
  }
  const token = signToken({ id: user.id, username: user.username });
  res.json({ token });
});

app.get('/me', authMiddleware, async (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

app.get('/tasks', authMiddleware, async (req, res) => {
  await db.read();
  const tasks = db.data.tasks.filter(t => t.userId === req.user.id);
  res.json(tasks);
});

app.post('/tasks', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  await db.read();
  const task = {
    id: db.data.nextId++,
    text,
    completed: false,
    userId: req.user.id,
  };
  db.data.tasks.push(task);
  await db.write();
  res.status(201).json(task);
});

app.put('/tasks/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db.read();
  const task = db.data.tasks.find(t => t.id === id && t.userId === req.user.id);
  if (!task) return res.sendStatus(404);
  Object.assign(task, req.body);
  await db.write();
  res.json(task);
});

app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db.read();
  const index = db.data.tasks.findIndex(
    t => t.id === id && t.userId === req.user.id
  );
  if (index === -1) return res.sendStatus(404);
  db.data.tasks.splice(index, 1);
  await db.write();
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
