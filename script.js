// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? "↩️" : "✔️"}</button>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">❌</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        // Add event listeners
        const completeBtn = taskItem.querySelector(".complete-btn");
        const editBtn = taskItem.querySelector(".edit-btn");
        const deleteBtn = taskItem.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => toggleComplete(index));
        editBtn.addEventListener("click", () => editTask(index));
        deleteBtn.addEventListener("click", () => deleteTask(index));
    });
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
    });
});

// Event Listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
taskElement.classList.toggle("completed");

