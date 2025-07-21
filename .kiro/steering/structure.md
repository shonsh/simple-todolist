# Project Structure

## Root Directory Organization
```
ToDoList/
├── app.js              # Main TodoApp class and logic
├── index.html          # Application HTML structure
├── styles.css          # All styling and responsive design
├── package.json        # Project metadata
├── README.md           # Documentation
├── .gitignore          # Git ignore rules
├── tests/              # Test files
│   └── simple-test.html # Manual testing page
└── .kiro/              # Kiro configuration
    ├── specs/          # Feature specifications
    └── steering/       # Project guidance
```

## Naming Conventions
- Use camelCase for JavaScript variables and functions
- Use PascalCase for classes (TodoApp)
- Use kebab-case for HTML/CSS classes
- Use lowercase for file names

## File Organization
- Single-file components for simplicity
- All JavaScript in app.js
- All styles in styles.css
- Minimal file structure for easy maintenance

## Code Organization Principles
- Simple, readable code over complex abstractions
- Direct DOM manipulation for performance
- Class-based architecture for organization
- No build process or dependencies required