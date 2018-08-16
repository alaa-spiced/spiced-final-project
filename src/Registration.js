import React, {Component} from "react";
import { connect } from 'react-redux';
import { receiveUserInfo , userIsLoggedIn , userIsLoggedOut } from './actions';
import axios from './axios';
import Profile from './Profile';

class Registration extends Component {
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
        axios.post('/registration', this.state).then((results)=>{
            console.log(results.data);
            if (results.data.success) {
                this.props.dispatch(receiveUserInfo(results.data.userId));
                this.props.dispatch(userIsLoggedIn(results.data.userId));
                setTimeout(()=>{
                    console.log("Im changing the state");
                    this.setState({
                        loggedInUserId : results.data.userId
                    });}
                    ,700);
                console.log(results.data.message);
                console.log("I want it here",this.props);
                // location.replace('/welcome');
            }else {
                this.props.dispatch(userIsLoggedOut());
                console.log(results.data.message);
            }
        });

    }

    render() {
        if (this.state.loggedInUserId) {
            console.log("returning profile component", this.props.userInfo);
            return (<Profile userInfoProfile={this.props.userInfo}/>);

        }
        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <label> First Name: </label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />

                    <label> Last Name: </label>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />

                    <label> Gender: </label>
                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        onChange={this.handleChange}
                    />

                    <label> Phone Number: </label>
                    <input
                        type="text"
                        name="phonenumber"
                        placeholder="Phone Number"
                        onChange={this.handleChange}
                    />

                    <label> E-Mail: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        onChange={this.handleChange}
                    />

                    <label> Password:  </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <input type="submit" value="submit" />

                </form>
            </div>
        );
    }
    // }

}

const mapStateToProps = function(state) {
    return {
        userInfo : state.userInfo,
        userAdsImages : state.userAdsImages,
        loggedInUserId : state.loggedInUserId
    };
};

export default connect(mapStateToProps)(Registration);
