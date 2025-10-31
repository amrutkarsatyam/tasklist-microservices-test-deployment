document.addEventListener('DOMContentLoaded', () => {
    // The backend API will be running on port 3000
    const API_URL = window.config.API_URL;
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // --- API Communication ---
    const fetchAPI = async (endpoint, method = 'GET', body = null) => {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(endpoint, options);
        if (response.status === 204) return null; // Handle No Content for DELETE
        return response.json();
    };

    // --- Render and Core Functions ---
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.sort((a, b) => a.id - b.id); // Sort by ID
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleComplete(task.id, !task.completed));

            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            li.append(checkbox, textSpan, deleteBtn);
            taskList.appendChild(li);
        });
    };

    const loadTasks = async () => {
        const tasks = await fetchAPI(API_URL);
        renderTasks(tasks);
    };

    const addTask = async () => {
        const text = taskInput.value.trim();
        if (text === '') return;

        await fetchAPI(API_URL, 'POST', { text });
        taskInput.value = '';
        loadTasks();
    };

    const deleteTask = async (id) => {
        await fetchAPI(`${API_URL}/${id}`, 'DELETE');
        loadTasks();
    };

    const toggleComplete = async (id, completed) => {
        await fetchAPI(`${API_URL}/${id}`, 'PUT', { completed });
        loadTasks();
    };

    // --- Event Listeners ---
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial load
    loadTasks();
});