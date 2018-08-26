import React, {Component} from "react";
import axios from './axios';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { receiveFriendsWannabes , acceptFriendRequest , endFriendship} from './actions';
//import App from './App';

class Contact extends Component { //inherits properties of Component
    constructor(props) {
        super(props);
        this.state = {};
        //
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            // console.log(this.state);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/contact-us', this.state).then((results)=>{
            if (results.data.success) {
                console.log(results.data.success);
                this.setState({isloggedIn : true});
                // location.replace('/');

            }else {
                this.setState({isloggedIn : false});

            }
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
                            placeholder="First Name"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                        />
                    </div>
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
                            type="text"
                            name="phone_number"
                            placeholder="Phone Number"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input name="contact_message" placeholder="Message" onChange={this.handleChange}/>
                    </div>
                    <div className="input-div">
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
        );
    }
    // }

}


export default Contact;
