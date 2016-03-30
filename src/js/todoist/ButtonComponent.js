"use strict";

var TaskButtonComponent = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
        id: React.PropTypes.number
    },
    getInitialState: function() {
        return {
            completed: false
        };
    },
    handleClick: function(event) {
        this.setState({
            completed: !this.state.completed
        });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.completed !== nextState.completed;
    },
    render: function() {
        var icon;
        if (this.state.completed) {
            icon = "icon-check"
        } else {
            icon = "icon-check-empty"
        }
        return (
            button({
                key: "task-button-" + this.props.id,
                onClick: this.handleClick,
                style: {
                    backgroundColor: "transparent",
                    paddingTop: "4px",
                    border: "none",
                    height: "42px",
                    width: "42px",
                    color: this.props.color
                },
                className: icon + " pull-left"
            })
        );
    }
});
