const tasks = [
  { id: 1, title: 'Mettre à jour le README', completed: false },
  { id: 2, title: 'Corriger le bug du formulaire', completed: true },
  { id: 3, title: 'Revoir les PRs en attente', completed: false },
  { id: 4, title: 'Nettoyer le CSS', completed: true }
];

const tasksListEl = document.querySelector('#tasks-list');
const emptyStateEl = document.querySelector('#empty-state');

const filterAllBtn = document.querySelector('#filter-all-btn');
const filterActiveBtn = document.querySelector('#filter-active-btn');
const filterCompletedBtn = document.querySelector('#filter-completed-btn');

let currentFilter = "all";

const filters = {
  all:   () => tasks,
  active: () => tasks.filter(t => !t.completed),
  completed: () => tasks.filter(t => t.completed)
};

function updateTasksList(filterName) {
  currentFilter = filterName;
  const filteredTasks = filters[filterName]();

  tasksListEl.innerHTML = ""; // nettoyer
  emptyStateEl.style.display = filteredTasks.length ? "none" : "block";

  if (!filteredTasks.length) {
    emptyStateEl.textContent =
      filterName === "active" ? "Aucune tâche en cours." :
      filterName === "completed" ? "Aucune tâche terminée." :
      "Aucune tâche à afficher.";
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("task-completed");

    li.textContent = task.title;
    tasksListEl.appendChild(li);
  });
}

filterAllBtn.addEventListener("click", () => updateTasksList("all"));
filterActiveBtn.addEventListener("click", () => updateTasksList("active"));
filterCompletedBtn.addEventListener("click", () => updateTasksList("completed"));

updateTasksList("all");
