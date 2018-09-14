import React from 'react';
import axios from './axios';

class AdImagesUploader extends React.Component{
    constructor(props){
        super(props);
        this.state ={adImagesArray : []};
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
        axios.post("/upload-ad-images", formData).then((res)=> {
            console.log(res.data.success);
            if (res.data.success) {
                let obj = {
                    imageUrl : res.data.imageUrl,
                    imageId : res.data.imageId
                };
                console.log(obj);
                this.state.adImagesArray.push(obj);
                console.log(this.state.adImagesArray);
                this.setState({
                    adImagesArray : this.state.adImagesArray
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
                {this.state.adImagesArray.length && (<div id="image">
                    {this.state.adImagesArray.map(image =>(
                        <img key={image.imageId} className="ad-image" src={image.imageUrl} />

                    ))}
                </div>)}

            </div>
        );
    }
}

export default AdImagesUploader;
