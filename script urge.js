// Get elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const themeToggle = document.getElementById("toggle-theme");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add new task
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

// Toggle task as completed
list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  } else if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render task list
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.index = index;
    if (task.completed) li.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete");
    delBtn.dataset.index = index;
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

