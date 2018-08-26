import React, {Component} from "react";
import { connect } from 'react-redux';
import { receiveUserInfo , userIsLoggedIn , userIsLoggedOut } from './actions';
import axios from './axios';
// import Profile from './Profile';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info : this.props.userInfo
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/update-user-info', this.state).then((results)=>{
            console.log(results.data);
        //     if (results.data.success) {
        //         this.props.dispatch(receiveUserInfo(results.data.userId));
        //         this.props.dispatch(userIsLoggedIn(results.data.userId));
        //         setTimeout(()=>{
        //             console.log("Im changing the state");
        //             this.setState({
        //                 loggedInUserId : results.data.userId
        //             });}
        //             ,700);
        //         console.log(results.data.message);
        //         console.log("I want it here",this.props);
        //         // location.replace('/welcome');
        //     }else {
        //         this.props.dispatch(userIsLoggedOut());
        //         console.log(results.data.message);
        //     }
        });

    }

    render() {
        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="firstname"
                            placeholder={this.state.info.first_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="lastname"
                            placeholder={this.state.info.last_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="gender"
                            placeholder={this.state.info.gender}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="phonenumber"
                            placeholder={this.state.info.phone_number}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="email"
                            name="email"
                            placeholder={this.state.info.email}
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
                        <input type="submit" value="Save" />
                    </div>
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

export default connect(mapStateToProps)(EditProfile);
