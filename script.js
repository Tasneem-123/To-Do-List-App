// Update task counter
function updateTaskCount() {
  const tasks = document.querySelectorAll("li");
  document.getElementById("task-count").innerText =
    `You have ${tasks.length} task(s) to complete.`;
}

// Add task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${taskText}</strong>
    <p>Due: ${dueDate || "No date"} | Category: ${category} | Priority: ${priority}</p>
    <div class="task-buttons">
      <button class="edit-btn" onclick="editTask(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    </div>
  `;

  document.getElementById("task-list").appendChild(li);

  taskInput.value = "";
  document.getElementById("due-date").value = "";
  document.getElementById("category").value = "Work";
  document.getElementById("priority").value = "Low";

  saveTasks();
  updateTaskCount();
}

// Edit task
function editTask(button) {
  const li = button.parentElement.parentElement;
  const taskText = li.querySelector("strong").innerText;
  const details = li.querySelector("p").innerText;

  // Parse details
  const dueDate = details.match(/Due: (.*?) \|/)[1];
  const category = details.match(/Category: (.*?) \|/)[1];
  const priority = details.match(/Priority: (.*)/)[1];

  document.getElementById("task-input").value = taskText;
  document.getElementById("due-date").value = (dueDate === "No date") ? "" : dueDate;
  document.getElementById("category").value = category;
  document.getElementById("priority").value = priority;

  li.remove();
  saveTasks();
  updateTaskCount();
}

// Delete task
function deleteTask(button) {
  button.parentElement.parentElement.remove();
  saveTasks();
  updateTaskCount();
}

// Clear all tasks
function clearAllTasks() {
  document.getElementById("task-list").innerHTML = "";
  saveTasks();
  updateTaskCount();
}

// Save tasks
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push(li.innerHTML);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = task;
    document.getElementById("task-list").appendChild(li);
  });
  updateTaskCount();
}

window.onload = loadTasks;
