(function (ko) {
    var ChecklistViewModel = function (checkList) {
        var self = this;

        this.inputCheck = ko.observable(false);
        this.checkList = checkList;
        this.newTaskTitle = ko.observable("");
        this.tasks = ko.observableArray();
        this.completeTask = ko.observableArray();

        this.addTask = function () {
            if (this.newTaskTitle().length < 4) {
                this.inputCheck(true);
                return;
            }
            this.inputCheck(false);
            this.checkList.addTask(this.newTaskTitle());
            this.newTaskTitle("");
            this.tasks(this.checkList.tasks);

        };

        this.removeTask = function (taskObject, event) {
            self.checkList.removeTask(taskObject.id);
            self.tasks(self.checkList.tasks);
        };

        this.checkTask = function (taskObject, event) {
            self.checkList.checkTask(taskObject.id);
            self.tasks(self.checkList.tasks);
            self.completeTask(self.checkList.completeTask);
        };

        this.undoTask = function (taskObject, event) {
            self.checkList.undoTask(taskObject.id);
            self.tasks(self.checkList.tasks);
            self.completeTask(self.checkList.completeTask);
        }
    };

    var CheckList = function () {
        this.tasks = [];
        this.completeTask = [];

        this.addTask = function (taskTitle) {
            this.tasks.push({
                id: this.tasks.length,
                title: taskTitle
            });

        };

        this.removeTask = function (id) {
            var taskIndex = this.getIndexById(id, this.tasks);

            if (typeof taskIndex !== 'undefined') {
                this.tasks.splice(taskIndex, 1);
            }
        };

        this.checkTask = function (id) {
            var taskIndex = this.getIndexById(id, this.tasks),
                tasks;

            if (typeof taskIndex !== 'undefined') {
                tasks = this.tasks[taskIndex];
                this.tasks.splice(taskIndex, 1);
                this.completeTask.push(tasks);
            }

        };

        this.undoTask = function (id) {
            var taskIndex = this.getIndexById(id, this.completeTask),
                tasks;

            if (typeof taskIndex !== 'undefined') {
                tasks = this.completeTask[taskIndex];
                this.completeTask.splice(taskIndex, 1);
                this.tasks.push(tasks);
            }
        };

        this.getIndexById = function (id, tasks) {   //получяем индекс елемента в масиве
            var index;

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    };

    var checkList = new CheckList();

    ko.applyBindings(new ChecklistViewModel(checkList), document.getElementById('todoList'));

})(ko);
