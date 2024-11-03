class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.term = "";
        this.editingTaskId = null;
        this.loadEventListeners();
        this.draw();
    }

    loadEventListeners() {
        document.getElementById("addTaskBtn").addEventListener("click", () => this.addTask());
        document.getElementById("search").addEventListener("input", (event) => {
            this.term = event.target.value.toLowerCase();
            this.draw();
        });
        document.addEventListener("click", (event) => this.finishEditing(event));
    }

    addTask() {
        const taskInput = document.getElementById("taskInput");
        const dueDate = document.getElementById("dueDate");
        const taskText = taskInput.value.trim();
        const taskDate = dueDate.value ? new Date(dueDate.value) : null;

        if (taskText.length < 3 || taskText.length > 255) {
            alert("Zadanie musi mieć od 3 do 255 znaków.");
            return;
        }

        if (taskDate && taskDate <= new Date()) {
            alert("Data musi być w przyszłości.");
            return;
        }

        this.tasks.unshift({ id: Date.now(), text: taskText, date: taskDate });
        this.saveTasks();
        this.draw();
        taskInput.value = "";
        dueDate.value = "";
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.draw();
    }

    editTask(id) {
        this.editingTaskId = id;
        this.draw();
    }

    finishEditing(event) {
        if (this.editingTaskId !== null && !event.target.classList.contains("task-text")) {
            const input = document.querySelector(`#task-${this.editingTaskId} input`);
            if (input) {
                const updatedText = input.value.trim();
                if (updatedText.length >= 3 && updatedText.length <= 255) {
                    const task = this.tasks.find(task => task.id === this.editingTaskId);
                    task.text = updatedText;
                    this.saveTasks();
                }
                this.editingTaskId = null;
                this.draw();
            }
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    get filteredTasks() {
        if (this.term.length < 2) return this.tasks;
        return this.tasks.filter(task => task.text.toLowerCase().includes(this.term));
    }

    highlightTerm(text) {
        const regex = new RegExp(`(${this.term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    draw() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        this.filteredTasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.id = `task-${task.id}`;
            taskItem.classList.add("task-item");

            if (this.editingTaskId === task.id) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = task.text;
                input.classList.add("task-text");
                taskItem.appendChild(input);
                input.focus();
            } else {
                const taskText = document.createElement("span");
                taskText.classList.add("task-text");
                taskText.innerHTML = this.highlightTerm(task.text);
                taskText.addEventListener("click", () => this.editTask(task.id));
                taskItem.appendChild(taskText);
            }

            if (task.date) {
                const taskDate = document.createElement("span");
                taskDate.classList.add("task-date");
                taskDate.textContent = new Date(task.date).toLocaleString();
                taskItem.appendChild(taskDate);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Usuń";
            deleteBtn.addEventListener("click", () => this.deleteTask(task.id));
            taskItem.appendChild(deleteBtn);

            taskList.appendChild(taskItem);
        });
    }
}

const todo = new Todo();
