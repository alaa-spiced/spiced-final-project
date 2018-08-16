import React, {Component} from "react";
import AddImagesUploader from './AddImagesUploader';
import axios from './axios';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { receiveFriendsWannabes , acceptFriendRequest , endFriendship} from './actions';
//import App from './App';

class CreateAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {addImagesUploaderIsVisible : false};
        this.showAddImagesUploader = this.showAddImagesUploader.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showAddImagesUploader() {
        this.setState({
            addImagesUploaderIsVisible : !this.state.addImagesUploaderIsVisible
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
        axios.post('/create-add', this.state).then((results)=>{
            console.log(results.data);
            this.setState({
                addImagesUploaderIsVisible : true
            });
        });

    }

    render() {

        return (
            <div className="create-add-div">
                <form className="create-add-form" onSubmit={this.handleSubmit}>
                    <label> Title: </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />

                    <label> Class: </label>
                    <select id="class" name="class" form="class">
                        <option value="givings">Givings</option>
                        <option value="needs">Needs</option>
                    </select>

                    <label> Category: </label>
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

                    <label> POSTAL_CODE:  </label>
                    <input
                        type="text"
                        name="postalcode"
                        placeholder="Postal Code"
                        onChange={this.handleChange}
                    />

                    <label> CITY:  </label>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={this.handleChange}
                    />

                    <label> Country:  </label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        onChange={this.handleChange}
                    />

                    <label> Description:  </label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                    />

                    <input type="submit" value="submit" />

                </form>
                {this.state.addImagesUploaderIsVisible && <AddImagesUploader  />}
            </div>
        );
    }
    // }

}


export default CreateAdd;
