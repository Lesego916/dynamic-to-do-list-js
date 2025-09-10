// Main script for dynamic to-do list with localStorage
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements (names required by the auto-checker)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask(taskText, save = true)
     * - If taskText is provided, uses it; otherwise reads from the input.
     * - If save === true, the task is also saved to localStorage.
     */
    function addTask(taskText, save = true) {
        // If no taskText passed, read it from the input field
        if (typeof taskText === 'undefined' || taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create and configure remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove handler: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Update localStorage: remove first occurrence of this task text
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append remove button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save to localStorage when required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * loadTasks()
     * - Reads tasks from localStorage and populates the DOM.
     * - Calls addTask(taskText, false) to avoid re-saving already saved tasks.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Allow adding task with the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks from localStorage on page load
    loadTasks();
});
