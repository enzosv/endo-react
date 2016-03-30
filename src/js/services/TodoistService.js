"use strict";

var sharedTodoistService = (function() {
    var token;
    var projects = {};
    var items = [];
    var projectColors = ["#95ef63", "#ff8581", "#ffc471", "#f9ec75", "#a8c8e4", "#d2b8a3", "#e2a8e4", "#cccccc", "#fb886e", "#ffcc00", "#74e8d3", "#3bd5fb"];

    var login = function(email, password, callback) {
        axios.get("https://todoist.com/API/v6/login", {
                params: {
                    email: email,
                    password: password
                }
            })
            .then(function(response) {
                token = response.data.token;
                callback(true);
            })
            .catch(function(response) {
                token = false;
                console.error(response);
                callback(false, response);
            });
    };

    var fetch = function(callback) {
        axios.get("https://todoist.com/API/v6/sync", {
                params: {
                    token: token,
                    seq_no: 0,
                    seq_no_global: 0,
                    resource_types: '["items", "projects"]'
                }
            })
            .then(function(response) {
                projects = {};
                response.data.Projects.map(function(project) {
                    processProject(project);
                });
                items = response.data.Items.map(function(item) {
                    return processTask(item);
                });
                callback(true);
                return;
            })
            .catch(function(response) {
                console.error(response);
                callback(false);
                return;
            });
    };

    var generateTaskRows = function() {
        return items.map(function(task) {
            var dateString = "";
            if (task.due_date) {
                dateString = " - " + task.due_date;
            }
            return React.createElement(TaskRowComponent, {
                color: task.project.color,
                id: task.id,
                content: task.content + dateString,
                project: task.project.name,
                key: task.id
            });
        })
    }

    var generateProjectHeaders = function() {
        // return
        var headers = [];
        for (var key in projects) {
            if (projects.hasOwnProperty(key)) {
                var project = projects[key];
                headers.push(React.createElement(ProjectHeaderComponent, {
                    key: project.id,
                    project: project
                }));
            }

        }
        return headers;
    }

    function processTask(item) {
        var task = {
            content: item.content,
            id: item.id,
            project: projects[item.project_id],
            completed: false
        };

        if (item.due_date_utc) {
            task.due_date = sharedDateService.getDateStringFromUTCString(item.due_date_utc);
        }
        return task;
    }

    function processProject(project) {
        projects[project.id] = {
            name: project.name,
            id: project.id,
            color: projectColors[project.color],
            order: project.item_order
        };
    }

    var service = {
        login: login,
        fetch: fetch,
        generateTaskRows: generateTaskRows,
        generateProjectHeaders: generateProjectHeaders
    };

    return service;
})();
