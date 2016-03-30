"use strict";

var TodoistLoginComponent = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        color: React.PropTypes.string,
        conent: React.PropTypes.string,
        project: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            error: false,
            email: "",
            password: "",
            loggedIn: false
        };
    },
    login: function(event) {
        event.preventDefault();
        var self = this;
        this.setState({
            error: false
        });
        sharedTodoistService.login(this.state.email, this.state.password, function(success, response) {
            if (!success) {

                if (response.status === 400) {
                    self.setState({
                        error: "Invalid email/password combination. Please try again"
                    });
                } else if (response.status === 401) {
                    //email found?
                    self.setState({
                        error: "Invalid email/password combination. Please try again"
                    });
                } else {
                    console.error(response);
                }
            } else {
                self.setState({
                    loggedIn: true
                });

            }
        });
    },
    passwordChange: function(event) {
        this.setState({
            password: event.target.value
        });
    },
    emailChange: function(event) {
        this.setState({
            email: event.target.value
        });
    },
    render: function() {
        if (this.state.loggedIn) {
            return React.createElement(ItemTableComponent, {
                headers: [],
                elements: [],
                classes: "table table-bordered",
                key: "todoist-table"
            });
        }
        var enableButton = this.state.password.length > 0 && this.state.email.length > 0;
        return (
            React.createElement("form", {
                className: "form-horizontal",
                onSubmit: this.login,
                style: {
                    marginTop: "10%",
                    width: "60%",
                    margin: "0 auto"
                }
            }, [
                center({
                    key: "todoist-login-title"
                }, [
                    React.createElement("h3", {
                        key: "todoist-login-h3"
                    }, [
                        "Login to ",
                        link({
                            href: "https://todoist.com",
                            key: "todoist-login-h3-link"
                        }, "Todoist")
                    ]),
                    React.createElement("div", {
                        key: "todoist-login-status",
                        className: "alert alert-danger",
                        role: "alert",
                        hidden: !this.state.error
                    }, this.state.error)
                ]),
                div({
                    className: "form-group",
                    key: "todoist-login-email-form"
                }, [
                    label({
                        key: "todoist-login-email-label"
                    }, "Email"),
                    input({
                        key: "todoist-login-email-input",
                        type: "email",
                        className: "form-control",
                        placeholder: "Email",
                        onChange: this.emailChange
                    })
                ]),
                div({
                    className: "form-group",
                    key: "todoist-login-password-form"
                }, [
                    label({
                        key: "todoist-login-password-label"
                    }, "Password"),
                    input({
                        key: "todoist-login-password-input",
                        type: "password",
                        className: "form-control",
                        placeholder: "Password",
                        onChange: this.passwordChange
                    })
                ]),
                center({
                    key: "todoist-login-buttons"
                }, [
                    button({
                        key: "todoist-login-button",
                        className: "btn btn-default",
                        type: "Submit",
                        disabled: !enableButton
                    }, "Sign In"),
                    link({
                        key: "todoist-login-signup",
                        href: "https://todoist.com/Users/showRegister",
                        className: "btn btn-default"
                    }, "Sign up")
                ])
            ])
        );
    }
});
