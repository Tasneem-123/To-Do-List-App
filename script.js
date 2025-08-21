const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date");
const categorySelect = document.getElementById("category-select");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
  listContainer.innerHTML = "";
  let filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortSelect.value === "priority") {
    filteredTasks.sort((a, b) => b.priority.localeCompare(a.priority));
  } else if (sortSelect.value === "due") {
    filteredTasks.sort((a, b) => new Date(a.due) - new Date(b.due));
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    const left = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks(searchInput.value);
    };

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = `${task.text} [${task.priority}] (${task.category}) - Due: ${task.due}`;

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      inputBox.value = task.text;
      prioritySelect.value = task.priority;
      dueDateInput.value = task.due;
      categorySelect.value = task.category;
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(searchInput.value);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(searchInput.value);
    };

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);

    listContainer.appendChild(li);
  });
}

addBtn.onclick = () => {
  if (inputBox.value === "") return;
  tasks.push({
    text: inputBox.value,
    priority: prioritySelect.value,
    due: dueDateInput.value || "No date",
    category: categorySelect.value,
    done: false
  });
  inputBox.value = "";
  saveTasks();
  renderTasks(searchInput.value);
};

searchInput.oninput = () => renderTasks(searchInput.value);
sortSelect.onchange = () => renderTasks(searchInput.value);

renderTasks();
