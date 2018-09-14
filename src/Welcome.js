import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import About from "./About";
import Contact from "./Contact";
import Ads from './Ads';
import { Link } from "react-router-dom";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="welcome">
                <BrowserRouter>
                    <div className="welcome-page">
                        <div className="header">
                            <div className="logo-image-container">
                                <div className="image-wraper">
                                    <img
                                        className="logo-image-welcome"
                                        src="/images/logo1.png"
                                        alt="Logo image"
                                    />
                                </div>
                                <div className="logo-text">
                                    <h2>
                                        <i>Free Your Stuff</i>
                                    </h2>
                                </div>
                            </div>

                            <div className="welcome-nav">
                                <Link className="about-link" to="/about">
                  About us
                                </Link>
                                <Link className="contact-link" to="/contact">
                  Contact us
                                </Link>

                                <Link className="ads-link" to="/ads">
                  Ads
                                </Link>

                                <Link className="register-link" to="/sign-up">
                    Sign Up
                                </Link>


                                <Link className="login-link" to="/log-in">
                    Log In
                                </Link>

                            </div>
                        </div>
                        <div className="main-content">
                            <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/ads" render={() => (
                                <Ads
                                    ads={ this.props.ads }
                                />
                            )} />
                            <Route exact path="/sign-up" component={Registration} />
                            <Route path="/log-in" component={Login} />
                        </div>

                        <div className="footer">
                            <footer>&#169; 2018 Created by Alaa Abushkayyan</footer>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Welcome;
