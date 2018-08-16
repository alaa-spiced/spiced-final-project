import React from "react";
import { BrowserRouter , Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from "./Login";
import Registration from "./Registration";
import About from "./About";
import Contact from "./Contact";
import Adds from "./Adds";
import CreateAdd from './CreateAdd';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import axios from './axios';

class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userId : null,
            isLoggedIn : this.props.isLoggedIn
        };
    }
    // componentDidMount(){
    //     axios.get('user-info').then((results)=>{
    //         console.log(results.data);
    //         if (results.data.userId) {
    //             this.setState({
    //                 userId : results.data.userId,
    //                 isLoggedIn : true
    //             });
    //         }else {
    //             this.setState({
    //                 userId : null,
    //                 isLoggedIn : false
    //             });
    //         }
    //     });
    //
    // }
    render(){
        return (
            <div id="welcome">
                <BrowserRouter>
                    <div className="welcome-page">
                        <div className="header">
                            <div className="logo-image-container">
                                <div className="image-wraper"><img className="logo-image-welcome"  src="/images/logo1.png" alt="Logo image" /></div>
                                <div className="logo-text">
                                    <h2><i>Free Your Stuff</i></h2>
                                </div>
                            </div>


                            <div className="welcome-nav">
                                <Link className="about-link" to="/about">About us</Link>
                                <Link className="contact-link" to="/contact">Contact us</Link>
                                <Link className="adds-link" to ="/adds">Ads</Link>
                                {!this.props.loggedInUserId && <Link className="register-link" to ="/sign-up">Sign Up</Link>}
                                {!this.props.loggedInUserId && <Link className="login-link" to ="/log-in">Log In</Link>}
                                {this.props.loggedInUserId && <Link className="create-add-link" to ="/create-add">Create Ad</Link>}
                                {this.props.loggedInUserId && <Link className="profile-link" to ="/user-profile">Profile</Link>}
                            </div>
                        </div>
                        <div className="main-content">
                            <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/adds"  component={Adds} />
                            <Route path="/create-add"  component={CreateAdd} />
                            <Route exact path="/sign-up" component={Registration} />
                            <Route path="/log-in" component={Login} />
                            <Route path="/user-profile" render={() => (<Profile userInfoProfile={this.props.userInfo}/>)} />

                        </div>


                        <div className="footer">
                            <footer>
            &#169; 2018 Created by Alaa Abushkayyan
                            </footer>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log('State    ',state);
    return {
        adds : state.adds,
        userInfo : state.userInfo,
        userAdsImages : state.userAdsImages,
        loggedInUserId : state.loggedInUserId
    };
};

export default connect(mapStateToProps)(Welcome);
