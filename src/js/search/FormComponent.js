// < div id = "search"
// style = "width: calc(100% - 64px)" >
//     < input type = "text"
// class = "form-control pull-left"
// placeholder = "Search"
// id = "searchField" >
//     < /div>

"use strict";

var SearchFormComponent = React.createClass({
    propTypes: {},
    getInitialState: function() {
        return {
            query: "",
            buttonHidden: true
        };
    },
    searchChange: function(event) {
        var query = event.target.value;
        var buttonHidden = this.state.buttonHidden;
        if (query.length > 0 && buttonHidden) {
            this.setState({
                query: query,
                buttonHidden: false
            });
        } else if (query.length === 0 && !buttonHidden) {
            this.setState({
                query: query,
                buttonHidden: true
            });
        } else {
            this.setState({
                query: query
            });
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.buttonHidden !== nextState.buttonHidden;
    },
    componentDidMount: function() {},
    render: function() {
        var width;
        var style;
        var helper;
        if (this.state.buttonHidden) {
            style = {
                display: "none"
            };
            width = "100%";
            helper = "[alt-s]";
        } else {
            style = {
                width: "56px",
                marginLeft: "8px"
            };
            width = "calc(100% - 64px)";
            helper = "[alt-enter]";
        }
        return (
            div({
                key: "search-container",
                style: {
                    width: "80%",
                    margin: "0 auto"
                },
            }, [
                input({
                    type: "text",
                    className: "form-control pull-left",
                    placeholder: "Search or add",
                    key: "search-input",
                    onChange: this.searchChange,
                    style: {
                        width: width
                    }
                }),
                button({
                    key: "search-button",
                    className: "btn btn-default",
                    style: style,
                }, "Add"),
                br({
                    key: "search-br"
                }),
                small({
                    key: "search-helper",
                    className: "pull-right"
                }, helper)
            ])
        );
    }
});
