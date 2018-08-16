import React, {Component} from "react";
// import axios from './axios';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { receiveFriendsWannabes , acceptFriendRequest , endFriendship} from './actions';
//import App from './App';

class Contact extends Component { //inherits properties of Component
    constructor(props) {
        super(props);
        //
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(e) {
    //     this.setState({ [e.target.name] : e.target.value }, ()=>{
    //         console.log(this.state);
    //     });
    // }

    handleSubmit(e) {
        e.preventDefault();
        // axios.post('/contact', this.state).then((results)=>{
        //     if (results.data.success) {
        //         console.log(results.data.success);
        //         this.setState({isloggedIn : true});
        //         location.replace('/');
        //
        //     }else {
        //         this.setState({isloggedIn : false});
        //
        //     }
        // });

    }

    render() {

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

                    <label> E-Mail: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        onChange={this.handleChange}
                    />

                    <label> Phone Number:  </label>
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        onChange={this.handleChange}
                    />

                    <label> Message:  </label>
                    <textarea name="contact_message" onChange={this.handleChange}></textarea>

                    <input type="submit" value="submit" />

                </form>
            </div>
        );
    }
    // }

}


export default Contact;
