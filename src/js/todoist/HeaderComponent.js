var ProjectHeaderComponent = React.createClass({
    propTypes: {
        project: React.PropTypes.object
    },
    render: function() {
        var id = this.props.project.id;
        return (
            small({
                style: {
                    marginLeft: "6px"
                }
            }, [
                label({
                    style: {
                        color: this.props.project.color
                    },
                    key: id + "-label"
                }, [
                    input({
                        type: "checkbox",
                        key: id + "-input"
                    }),
                    span({
                        key: id + "-span"
                    })
                ]),
                this.props.project.name
            ])
        );
    }
});
