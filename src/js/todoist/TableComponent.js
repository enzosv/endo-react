"use strict";

var ItemTableComponent = React.createClass({
    propTypes: {
        elements: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            elements: this.props.elements
        };
    },
    componentDidMount: function() {
        this.fetch();
    },
    fetch: function() {
        var self = this;
        sharedTodoistService.fetch(function(success, items) {
            if (success) {
                self.setState({});
            }
        });
    },
    render: function() {
        return (
            div({
                key: "todoist-table-container"
            }, [
                table({
                    className: "table table-bordered",
                    style: {
                        tableLayout: "fixed"
                    },
                    key: "todoist-table-projects"
                }, [
                    thead({ key: "todoist-table-thead" }, [
                        tr({
                            key: "todoist-table-tr"
                        }, td({
                            key: "todoist-table-project-header"
                        }, sharedTodoistService.generateProjectHeaders()))
                    ])
                ]),
                div({
                    key: "todoist-table-tasks"
                }, table({
                    className: "table table-bordered",
                    style: {
                        overflowY: "auto",
                        height: "66%",
                        marginTop: "-22px"
                    }
                }, tbody({},
                    sharedTodoistService.generateTaskRows())))
            ])
        );
    }
});
