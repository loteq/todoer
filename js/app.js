const model = {

	getTasks() {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	},

	setTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	},
	
	addTask(task) {

		const tasks = model.getTasks();

		tasks.push({ 'task': task, 'done': false });
		
		model.setTasks(tasks);
	},

	taskDone(event) {
		const tasks = model.getTasks();
		const task = event.target.previousElementSibling.innerHTML;

		for (let t of tasks) {

			if (task === t.task) {
				t.done = true;
				break;
			}
		}

		model.setTasks(tasks);
	},
	
	removeTask(event) {

		const tasks = model.getTasks();
		const task = event.target.previousElementSibling.innerHTML;

		const res = tasks.filter(function (t) {
			return t.task !== task;
		});
		
		model.setTasks(res);
	},
	
}

const view = {

	renderTasks(tasks) {

		const ul = document.querySelector('ul');
		const input = document.querySelector('input');
		
		ul.innerHTML = '';

		if(tasks) {
			for (let task of tasks) {

				if(task.done) {
					ul.innerHTML += `<li><span class="done">${task.task}</span>${view.createButton('remove')}</li>`;
				}else {
					ul.innerHTML += `<li><span>${task.task}</span>${view.createButton('done')}</li>`;
				}
			}
		}

		input.value = '';
		input.blur();

	},

	createButton(type) {

		const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

		return `<button id="${type}">${typeCapitalized}</button>`;
	}
}

const controller = {

	init() {

		const input = document.querySelector('input');

		document.addEventListener('click', (event) => {

			switch (event.target.id) {
				case 'add':
					model.addTask(event.target.previousElementSibling.value);
					view.renderTasks(model.getTasks());
					break;
				case 'done':
					model.taskDone(event);
					view.renderTasks(model.getTasks());
					break;
				case 'remove':
					model.removeTask(event);
					view.renderTasks(model.getTasks());
			}
		});

		input.addEventListener("keypress", (event) => {

			if (event.key === "Enter") {

				event.preventDefault();
				model.addTask(event.target.value);
				view.renderTasks(model.getTasks());
			}
		});

		view.renderTasks(model.getTasks());
		input.focus();
	},

}

controller.init();