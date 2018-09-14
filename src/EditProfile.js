import React, {Component} from "react";


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfoProfile : this.props.userInfoProfile,
            showProfileIsUpdatedMessage : this.props.showProfileIsUpdatedMessage
        };
        this.handleInfoChange = this.handleInfoChange.bind(this);

    }

    handleInfoChange(e){
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });
    }
    // UNSAFE_componentWillMount(){
    //     this.setState = ({
    //         userInfoProfile : this.props.userInfoProfile
    //         // showProfileIsUpdatedMessage : this.props.showProfileIsUpdatedMessage
    //     });
    // }
    //   handleSubmit(e) {
    //       e.preventDefault();
    //       if (this.state.firstname || this.state.lastname || this.state.gender || this.state.phonenumber || this.state.email || this.state.password) {
    //         axios.post('/update-user-info', this.state).then((results)=>{
    //             console.log("After updating ", results.data);
    //             this.setState({
    //               info : results.data,
    //               showUpdatedMessage : 'Udpated Successfully'
    //             });
    //             location.replace('/profile');
    //       });
    //     }else {
    //       this.setState({
    //         showUpdatedMessage : 'Nothing Changed To Update!'
    //       });
    //     }
    // }

    render() {
        const { userInfoProfile, showProfileIsUpdatedMessage} = this.state;
        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={(event)=>this.props.updateProfile(event, this.state)}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="firstname"
                            placeholder={userInfoProfile.first_name}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="lastname"
                            placeholder={userInfoProfile.last_name}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="gender"
                            placeholder={userInfoProfile.gender}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="phonenumber"
                            placeholder={userInfoProfile.phone_number}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="email"
                            name="email"
                            placeholder={userInfoProfile.email}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">
                        <input type="submit" value="Save" />
                    </div>
                    {showProfileIsUpdatedMessage && <div className="profile-updated">
                        {showProfileIsUpdatedMessage}
                    </div>}
                </form>
            </div>
        );
    }
    // }

}

export default EditProfile;
