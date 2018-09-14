import React, {Component} from "react";
import AdImagesUploader from './AdImagesUploader';
import axios from './axios';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { receiveFriendsWannabes , acceptFriendRequest , endFriendship} from './actions';
//import App from './App';

class CreateAd extends Component {
    constructor(props) {
        super(props);
        this.state = {adImagesUploaderIsVisible : false};
        this.showAdImagesUploader = this.showAdImagesUploader.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showAdImagesUploader() {
        this.setState({
            adImagesUploaderIsVisible : !this.state.adImagesUploaderIsVisible
        });
    }

    handleChange(e) {
        var classSelector = document.getElementById('class');
        var classValue = classSelector.options[classSelector.selectedIndex].value;

        var categorySelector = document.getElementById('category');
        var categoryValue = categorySelector.options[categorySelector.selectedIndex].value;
        this.setState({ [e.target.name] : e.target.value, classValue:classValue, categoryValue:categoryValue }, ()=>{
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log(this.state);
        axios.post('/create-ad', this.state).then((results)=>{
            console.log(results.data);
            this.setState({
                adImagesUploaderIsVisible : true
            });
        });

    }

    render() {

        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <select id="class" name="class" form="class">
                            <option value="givings">Givings</option>
                            <option value="needs">Needs</option>
                        </select>


                        <select id="category" name="category" form="category">
                            <option value="living_garden">Living & Garden</option>
                            <option value="furniture_lamps">Furniture & Lamps</option>
                            <option value="electronics_technology">Electronics & Technology</option>
                            <option value="books_movies_musics">Books, Movies & Musics</option>
                            <option value="fashion">Fashion</option>
                            <option value="child_baby">Child & Baby</option>
                            <option value="leisure_sports">Leisure & Sports</option>
                            <option value="cars_engines">Cars & Engines</option>
                            <option value="vouchers_tickets">Vouchers & Tickets</option>
                            <option value="foods">Foods</option>
                            <option value="pets_accessories">Pets & Accessories</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="postalcode"
                            placeholder="Postal Code"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input type="submit" value="submit" />
                    </div>
                </form>
                {this.state.adImagesUploaderIsVisible && <AdImagesUploader  />}
            </div>
        );
    }
    // }

}


export default CreateAd;
