let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `
      <strong>${task.text}</strong>
      <span class="badge category-${task.category}">${task.category}</span>
      <span class="badge priority-${task.priority}">${task.priority}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "actions";

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done");
    doneBtn.textContent = "✔";
    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = "✏";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.append(doneBtn, editBtn, deleteBtn);
    li.append(info, actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const category = document.getElementById("categorySelect").value;
  const priority = document.getElementById("prioritySelect").value;

  if (text === "") return;

  const newTask = { text, category, priority, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  document.getElementById("taskInput").value = "";
}

// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeToggle").checked = true;
  }
}

// Init
loadTheme();
renderTasks();
