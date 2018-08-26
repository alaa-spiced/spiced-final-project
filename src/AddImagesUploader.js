import React from 'react';
import axios from './axios';

class AddImagesUploader extends React.Component{
    constructor(props){
        super(props);
        this.state ={addImagesArray : []};
        this.imageSelected = this.imageSelected.bind(this);
        this.upload = this.upload.bind(this);
        this.imageFile;
        this.fileName;

    }

    imageSelected(e) {
        this.imageFile = e.target.files[0];
        this.fileName = this.imageFile.name;
    }

    upload() {
        var formData = new FormData();
        formData.append("file", this.imageFile);
        axios.post("/upload-add-images", formData).then((res)=> {
            console.log(res.data.success);
            if (res.data.success) {
                let obj = {
                    imageUrl : res.data.imageUrl,
                    imageId : res.data.imageId
                };
                console.log(obj);
                this.state.addImagesArray.push(obj);
                console.log(this.state.addImagesArray);
                this.setState({
                    addImagesArray : this.state.addImagesArray
                });
            }
        });
    }

    render(){
        return (
            <div>
                <div className="profile-uploader">
                    <input type="file"  className="inputfile" onChange={this.imageSelected} />
                    <label htmlFor="file">Upload image</label>
                    <button className="upload-button" onClick={this.upload}>upload!</button>
                </div>
                {this.state.addImagesArray.length && (<div id="image">
                    {this.state.addImagesArray.map(image =>(
                        <img key={image.imageId} className="add-image" src={image.imageUrl} />

                    ))}
                </div>)}

            </div>
        );
    }
}

export default AddImagesUploader;
