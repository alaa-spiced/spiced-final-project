import React, { Component } from 'react';
import ProfilePic from './ProfilePic';
import Uploader from './Uploader';
// import { receiveUserInfo } from './actions';
// import axios from './axios';
import { connect } from 'react-redux';
// import FriendshipButton from './FriendshipButton';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfoProfile : this.props.userInfoProfile,
            uploaderIsVisible : false
        };
        console.log("constructor",this.props);
        this.handleChange = this.handleChange.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    UNSAFE_componentWillMount(){
        console.log("inside profile ");
        // this.props.dispatch(receiveUserInfo(this.props.loggedInUserId));
        this.setState({
            profilePic : this.props.userInfoProfile.profile_pic_url || "/images/default.jpg"
        });
        console.log("this.props" ,this.props.userInfoProfile);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible : !this.state.uploaderIsVisible
        });
    }

    setImage(url){
        this.setState({
            profilePic : url,
            uploaderIsVisible : false
        });
    }

    handleChange(e){
        // textArea = e.target.value;
        this.setState({ [e.target.name] : e.target.value }, ()=>{
        });
    }

    render() {

        return (
            <div id="profile">
                <ProfilePic className="profile-profilepic" image={this.state.profilePic} first={this.props.userInfoProfile.first_name} last={this.props.userInfoProfile.last_name} gender={this.props.userInfoProfile.gender} phoneNumber={this.props.userInfoProfile.phone_number} email={this.props.userInfoProfile.email} clickHandler={this.showUploader} />
                {this.state.uploaderIsVisible && <Uploader className="uploader" setImage={this.setImage} />}
                {/*<div className="bio-div">{userBio && <h5 className="user-bio">{userBio}</h5>}*/}

                {/*{ showBio
                        ? (<form onSubmit={()=>setBio(this.state.bioText)}><textarea name="bioText" onChange={this.handleChange}></textarea> <input type="submit" value="submit" /></form>)
                        : <p onClick={ toggleShowBio } >Click to Edit a bio</p>
                    }*/}
            </div>

        );
    }
}

const mapStateToProps = function(state) {
    console.log("Staaaaaaaaaaaaaate ",state);
    return {
        adds : state.adds,
        userInfo : state.userInfo,
        userAdsImages : state.userAdsImages,
        loggedInUserId : state.loggedInUserId
    };

};

export default connect(mapStateToProps)(Profile);
