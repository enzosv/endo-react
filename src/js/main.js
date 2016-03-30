// (function() {
"use strict";
var todoist = document.getElementById("todoist");
var searchForm = document.getElementById("searchForm");

// sharedTodoistService.login(<EMAIL>, <PASSWORD>, function(success) {
//     if (success) {
//         ReactDOM.render(React.createElement(ItemTableComponent, {
//             elements: [],
//             key: "todoist-table"
//         }), todoist);

        ReactDOM.render(React.createElement(SearchFormComponent, {
            key: "search-form"
        }), searchForm);
//     }
// });
	ReactDOM.render(React.createElement(TodoistLoginComponent, {
		key: "todoist-login"
	}), todoist);
