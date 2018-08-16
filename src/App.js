import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
// import Logo from './Logo';
import axios from './axios';
import Profile from './Profile';
// import Uploader from './Uploader';
// import Friends from './Friends';
// import Chat from './chat';
// import OnlineUsers from './OnlineUsers';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBio: false,
            uploaderIsVisible : false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
        // this.deleteAccount = this.deleteAccount.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible : !this.state.uploaderIsVisible
        });
    }

    // deleteAccount() {
    //     var confirm_1 = confirm('Are you sure, you wanna delete your account?');
    //     if (confirm_1 == true) {
    //         var confirm_2 = confirm("We are so sad to know that, please don't leave us :(");
    //         if (confirm_2 == true) {
    //             var confirm_3 = confirm("Please take a minute and think again :(");
    //             if (confirm_3 == true) {
    //                 axios.get('/delete-account').then((results)=>{
    //                     if(results.data.success){
    //                         location.replace('/');
    //                     }
    //                 });
    //             }
    //         }
    //     }
    //
    // }

    setImage(url){
        this.setState({
            profilePic : url,
            uploaderIsVisible : false
        });
    }

    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        });

    }

    setBio(bioText){
        axios.post('/user-bio',{bioText}).then((results)=>{
            console.log(results);
            this.setState({
                showBio : false
            });
        });
    }

    componentDidMount(){
        axios.get('/user').then((results)=>{
            this.setState({
                userId : results.data.id,
                firstName : results.data.first_name,
                lastName : results.data.last_name,
                profilePic : results.data.image_url || './images/default.jpg',
                bio : results.data.bio
            });
        });
    }

    render() {
        if(!this.state.userId){
            return (
                <img src="./images/progressbar.gif"/>
            );
        }
        return (
            <div id="app">
                <BrowserRouter>
                    <div>
                        <div className="header">
                            {/*<Logo first={this.state.firstName} last={this.state.lastName}/>*/}
                            <img className="profilepic" src={this.state.profilePic} onClick={this.showUploader} />{this.state.firstName} {this.state.lastName}
                            <div className="delete-account"> <button className="delete-account-button" onClick={this.deleteAccount}>Delete Your Account</button></div>
                            {/*{this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}*/}
                        </div>

                        <Route path="/profile" render={() => (
                            <Profile
                                firstName={ this.state.firstName }
                                lastName={ this.state.lastName }
                                userId={ this.state.userId }
                                profilePic={ this.state.profilePic }
                                showBio={ this.state.showBio }
                                uploaderIsVisible = {this.state.uploaderIsVisible}
                                userBio={this.state.bio}
                                toggleShowBio={ this.toggleShowBio }
                                showUploader ={this.showUploader}
                                setImage = {this.setImage}
                                setBio = {this.setBio}
                            />
                        )} />
                        {/*<Route exact path="/friends" component={Friends} />
                        <Route exact path='/online' component= {OnlineUsers} />
                        <Route exact path="/chat" component={Chat} />*/}

                    </div>

                </BrowserRouter>


            </div>
        );

    }
}

export default App;
