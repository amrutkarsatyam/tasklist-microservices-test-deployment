import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Parse JSON bodies

// In-memory "database"
let tasks = [
    { id: 1, text: "Learn Microservices", completed: true },
    { id: 2, text: "Set up Docker Compose", completed: false },
];
let nextId = 3;

// --- API Routes ---

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    if (!req.body.text || req.body.text.trim() === '') {
        return res.status(400).json({ error: 'Task text cannot be empty' });
    }
    const newTask = {
        id: nextId++,
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send(); // No Content
});

// PUT (update) a task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = req.body.completed;
    res.json(task);
});

// Conditionally start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Backend API service listening at http://localhost:${port}`);
    });
}

export default app; // Export the app for testing