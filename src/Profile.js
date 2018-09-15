import React, { Component } from "react";
import axios from './axios';
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import EditProfile from "./EditProfile";
import CreateAd from './CreateAd';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(" User Info Profile", this.props.userInfoProfile);
        this.state = {
            userInfoProfile: this.props.userInfoProfile,
            showProfileIsUpdatedMessage : '',
            uploaderIsVisible: false,
            editProfile: false,
            createAd : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.logout = this.logout.bind(this);
        this.createAd = this.createAd.bind(this);

    }

    updateProfile(e, profileUpdatedInfo) {
        e.preventDefault();
        console.log("before updating ", profileUpdatedInfo);
        if (profileUpdatedInfo.firstname || profileUpdatedInfo.lastname || profileUpdatedInfo.gender || profileUpdatedInfo.phonenumber || profileUpdatedInfo.email || profileUpdatedInfo.password) {
            axios.post('/update-user-info', profileUpdatedInfo).then((results)=>{
                console.log("After updating ", results.data);
                this.setState({
                    userInfoProfile : results.data,
                    showProfileIsUpdatedMessage : 'Udpated Successfully',
                    editProfile: false
                });
                this.setState({
                    editProfile: true
                });
                setTimeout(function () {
                    this.setState({showProfileIsUpdatedMessage: '',
                        editProfile: false
                    });
                }.bind(this), 5000);
                setTimeout(function () {
                    this.setState({
                        editProfile: true
                    });
                }.bind(this), 5001);
            });
        }else {
            this.setState({
                showProfileIsUpdatedMessage : 'Nothing Changed To Update!',
                editProfile: false
            });
            setTimeout(function () {
                this.setState({editProfile: true});
            }.bind(this), 0.0001);
            setTimeout(function () {
                this.setState({showProfileIsUpdatedMessage: '',
                    editProfile: false
                });
            }.bind(this), 5000);
            setTimeout(function () {
                this.setState({
                    editProfile: true
                });
            }.bind(this), 5001);
        }
    }

    logout(e) {
        e.preventDefault();
        axios.get('/logout').then(()=>{
            // super.setState({isLoggedIn : false});
            location.replace('/welcome');
        });
    }

    UNSAFE_componentWillMount() {
        this.setState({
            profilePic:
        this.props.userInfoProfile.profile_pic_url || "/images/default.jpg",
            userInfoProfile : this.props.userInfoProfile,
            showProfileIsUpdatedMessage : this.state.showProfileIsUpdatedMessage
        });
        console.log("this.props", this.props.userInfoProfile);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    setImage(url) {
        this.setState({
            profilePic: url,
            uploaderIsVisible: false
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {});
    }

    editProfile() {
        console.log("Editing Profile");
        this.setState({
            createAd: false,
            editProfile: !this.state.editProfile
        });
    }

    createAd() {
        console.log("Creating Ad");
        this.setState({
            editProfile : false,
            createAd: !this.state.createAd
        });
    }

    render() {
        const {
            userInfoProfile,
            showProfileIsUpdatedMessage,
            profilePic
        } = this.state;
        return (
            <div className="profile-page">
                <div id="profile">
                    <ProfilePic
                        className="profile-profilepic"
                        image={profilePic}
                        first={userInfoProfile.first_name}
                        last={userInfoProfile.last_name}
                        gender={userInfoProfile.gender}
                        phoneNumber={userInfoProfile.phone_number}
                        email={userInfoProfile.email}
                        clickHandler={this.showUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader className="uploader" setImage={this.setImage} />
                    )}

                    <button className="edit-profile-button" onClick={this.editProfile}>
            Edit Profile
                    </button>
                    <button className="edit-profile-button" onClick={this.createAd}>
            Create Ad
                    </button>
                    <button className="edit-profile-button" onClick={this.logout}>
            Logout
                    </button>
                </div>
                <div className="edit-profile">
                    {this.state.editProfile && (
                        <EditProfile
                            userInfoProfile={userInfoProfile}
                            updateProfile={this.updateProfile}
                            showProfileIsUpdatedMessage={showProfileIsUpdatedMessage}
                            handleInfoChange={this.handleInfoChange}
                        />
                    )}
                    {this.state.createAd && (
                        <CreateAd />
                    )}
                </div>
            </div>
        );
    }
}

export default Profile;
