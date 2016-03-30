"use strict";

var TaskRowComponent = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        color: React.PropTypes.string,
        conent: React.PropTypes.string,
        project: React.PropTypes.string
    },
    render: function() {
        return (
            tr({},
                td({
                    style: {
                        height: "58px"
                    }
                }, React.createElement("ul", {
                        className: "middle nav"
                    },
                    React.createElement("li", {}, [
                        React.createElement(TaskButtonComponent, {
                            color: this.props.color,
                            id: this.props.id,
                            key: this.props.id+"-button"
                        }),
                        this.props.content,
                        React.createElement("br", {
                            key: this.props.id+"-br"
                        }),
                        this.props.project
                    ])
                ))
            )
        );
    }
});
