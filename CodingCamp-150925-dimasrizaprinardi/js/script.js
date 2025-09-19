const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskTableBody = document.getElementById("taskTableBody");

let tasks = [];
let showOnlyPending = false;

function renderTasks() {
  taskTableBody.innerHTML = "";

  let filteredTasks = tasks;
  if (showOnlyPending) {
    filteredTasks = tasks.filter((task) => task.status === "Pending");
  }

  if (filteredTasks.length === 0) {
    taskTableBody.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date || "-"}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name) {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    name,
    date,
    status: "Pending",
  });

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
});

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "Pending" ? "Done" : "Pending";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

filterBtn.addEventListener("click", () => {
  showOnlyPending = !showOnlyPending;
  filterBtn.textContent = showOnlyPending ? "FILTER (Pending)" : "FILTER (All)";
  renderTasks();
});

renderTasks();
