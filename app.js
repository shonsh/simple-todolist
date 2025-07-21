/**
 * Simple ToDoList Application
 * Clean and minimal implementation
 */

class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 1;
        this.init();
    }

    init() {
        console.log('Initializing TodoApp...');
        console.log('Protocol:', window.location.protocol);
        console.log('localStorage available:', this.isStorageAvailable());

        // Load tasks from storage
        this.loadTasks();

        // Get DOM elements
        this.taskInput = document.getElementById('taskInput');
        this.addTaskForm = document.getElementById('addTaskForm');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.errorMessage = document.getElementById('errorMessage');

        // Set up event listeners
        this.addTaskForm.addEventListener('submit', (e) => this.handleAddTask(e));

        // Initial render
        this.render();

        console.log('TodoApp initialized successfully');

        // Show storage warning if running from file://
        if (window.location.protocol === 'file:' && !this.isStorageAvailable()) {
            this.showError('Running from file system. For full persistence, please use a local server.', 'warning', 8000);
        }
    }

    handleAddTask(event) {
        event.preventDefault();

        const taskText = this.taskInput.value.trim();

        if (!taskText) {
            this.showError('Please enter a task description');
            return;
        }

        // Add the task
        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        this.saveTasks();

        // Clear input and render
        this.taskInput.value = '';
        this.clearError();
        this.render();

        // Focus back to input
        this.taskInput.focus();

        console.log('Task added:', task);
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            console.log('Task toggled:', taskId);
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.render();
        console.log('Task deleted:', taskId);
    }

    render() {
        // Clear error
        this.clearError();

        // Show/hide empty state
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        // Sort tasks: incomplete first, then completed
        const sortedTasks = [...this.tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                return b.createdAt - a.createdAt; // Newer first
            }
            return a.completed - b.completed; // Incomplete first
        });

        // Render tasks
        this.taskList.innerHTML = sortedTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="todoApp.toggleTask(${task.id})"
                    aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
                >
                <span class="task-text" title="${this.escapeHtml(task.text)}">${this.escapeHtml(task.text)}</span>
                <button 
                    class="delete-button" 
                    onclick="todoApp.deleteTask(${task.id})"
                    aria-label="Delete task"
                >×</button>
            </div>
        `).join('');
    }

    showError(message, type = 'error', duration = 0) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.errorMessage.className = `error-message error-${type}`;

        if (type === 'error') {
            console.error('Error:', message);
        } else if (type === 'warning') {
            console.warn('Warning:', message);
        } else {
            console.log('Info:', message);
        }

        // Auto-hide if duration is specified
        if (duration > 0) {
            setTimeout(() => {
                this.clearError();
            }, duration);
        }
    }

    clearError() {
        this.errorMessage.textContent = '';
        this.errorMessage.classList.add('hidden');
    }

    saveTasks() {
        try {
            // Try localStorage first
            if (this.isStorageAvailable()) {
                localStorage.setItem('todolist_tasks', JSON.stringify(this.tasks));
                console.log('Tasks saved to localStorage');
            } else {
                // Fallback to sessionStorage
                sessionStorage.setItem('todolist_tasks', JSON.stringify(this.tasks));
                console.log('Tasks saved to sessionStorage (temporary)');
                this.showError('Using temporary storage. Tasks will be lost when browser closes.', 'warning', 5000);
            }
        } catch (error) {
            console.error('Failed to save tasks:', error);
            this.showError('Failed to save tasks. Changes may not persist.');
        }
    }

    loadTasks() {
        try {
            let saved = null;

            // Try localStorage first
            if (this.isStorageAvailable()) {
                saved = localStorage.getItem('todolist_tasks');
                console.log('Loaded from localStorage');
            } else {
                // Fallback to sessionStorage
                saved = sessionStorage.getItem('todolist_tasks');
                console.log('Loaded from sessionStorage');
            }

            if (saved) {
                this.tasks = JSON.parse(saved);
                // Convert date strings back to Date objects
                this.tasks.forEach(task => {
                    task.createdAt = new Date(task.createdAt);
                });
                // Update counter to avoid ID conflicts
                this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
                console.log(`Loaded ${this.tasks.length} tasks`);
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.tasks = [];
            this.showError('Failed to load saved tasks. Starting fresh.');
        }
    }

    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});