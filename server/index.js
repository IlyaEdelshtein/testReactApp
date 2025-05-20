import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const port = process.env.PORT || 4000;

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data ||= { tasks: [], nextId: 1 };
  await db.write();
}

await init();

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  await db.read();
  res.json(db.data.tasks);
});

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  await db.read();
  const task = { id: db.data.nextId++, text, completed: false };
  db.data.tasks.push(task);
  await db.write();
  res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db.read();
  const task = db.data.tasks.find(t => t.id === id);
  if (!task) return res.sendStatus(404);
  Object.assign(task, req.body);
  await db.write();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db.read();
  const index = db.data.tasks.findIndex(t => t.id === id);
  if (index === -1) return res.sendStatus(404);
  db.data.tasks.splice(index, 1);
  await db.write();
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
