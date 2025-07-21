# TodoList Application

A simple, clean task management application built with vanilla JavaScript.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Persistent storage (localStorage)
- ✅ Responsive design
- ✅ Accessibility features

## Files

- `index.html` - Main application page
- `app.js` - Application logic (TodoApp class)
- `styles.css` - Styling and responsive design
- `package.json` - Project metadata and scripts
- `tests/simple-test.html` - Test page with additional controls

## Usage

1. Open `index.html` in your browser
2. Type a task description and press Enter or click "Add Task"
3. Click checkboxes to mark tasks complete/incomplete
4. Click × to delete tasks

## How to Run

**Simplest method:**
Just double-click `index.html` to open directly in your browser.

**With development server:**
```bash
# Using npm scripts
npm start              # Node.js server with auto-open
npm run serve          # Python server

# Direct commands
npx http-server -p 8000 -o    # Node.js (recommended)
python -m http.server 8000    # Python alternative
```

The app will be available at http://localhost:8000

## Development

**Version Control:**
```bash
git init                # Initialize repository
git add .              # Stage all files
git commit -m "Initial commit"  # Commit changes
```

## Testing

Open `tests/simple-test.html` for a test page with additional controls:
- Run basic functionality tests
- Clear all tasks
- Add sample tasks

## Architecture

Simple class-based architecture:
- `TodoApp` class handles all application logic
- Direct DOM manipulation for rendering
- localStorage for persistence
- Event-driven interactions