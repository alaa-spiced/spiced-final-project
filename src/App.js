import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import history from "./history";
import axios from "./axios";
import Profile from "./Profile";
import About from "./About";
import Contact from "./Contact";
import Ads from "./Ads";
import { Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            userInfo: "",
            userAdsImages: "",
        };

    }

    UNSAFE_componentWillMount() {
        axios.post("/get-user-info").then(results => {
            console.log("User Info", results.data.userInfo);
            console.log("User Ads Images", results.data.userAdsImages);
            this.setState({
                userInfo: results.data.userInfo,
                userAdsImages: results.data.userAdsImages
            });
        });
    }
    //
    // componentDidMount() {
    //   history.push("/profile");
    // }
    render() {
        if (!this.state.userInfo.id) {
            return <div className="progressbar-div"> <img src="./images/progressbar.gif" /> </div>;
        }
        return (
            <div id="app">
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

                                <Link className="profile-link" to="/profile">
                  Profile
                                </Link>
                            </div>
                        </div>
                        <div className="main-content">
                            <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/ads" component={Ads} />
                            <Route
                                exact
                                path="/profile"
                                render={() => (
                                    <Profile
                                        userInfoProfile={this.state.userInfo}
                                    />
                                )}
                            />
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


export default App;
