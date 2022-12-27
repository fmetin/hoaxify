import React from "react";
import { signup } from '../api/apiCall'
import Input from "../component/Input";

class UserSignupPage extends React.Component {


    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignUp = async event => {
        event.preventDefault();
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }
        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        this.setState({ pendingApiCall: false });
    }



    render() {
        const { pendingApiCall, errors } = this.state;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={errors.username} onChange={this.onChange}/>
                    <Input name="displayName" label="Display Name" error={errors.displayName} onChange={this.onChange}/>
                    <Input name="password" label="Password" error={errors.password} onChange={this.onChange} type="password"/>
                    <Input name="passwordRepeat" label="Password Repeat" error={errors.passwordRepeat} onChange={this.onChange} type="password"/>
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}

                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;