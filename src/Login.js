import React, {Component} from "react";
import axios from './axios';
import App from './App';
import { receiveUserInfo } from './actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/login', this.state).then((results)=>{
            if (results.data.success) {
                this.setState({isloggedIn : true});
                location.replace('/');

            }else {
                super.setState({isloggedIn : false});
                console.log(results.data.message);
            }
        });

    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <App />
            );
        }else {
            return (
                <div className="registration-div">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <div className="input-div">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-Mail"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-div">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-div">
                            <input type="submit" value="Log In" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Login;
