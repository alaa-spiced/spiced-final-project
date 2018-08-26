import React from 'react';
import axios from './axios';

function Uploader({setImage}){
    var fileName, imageFile;

    function imageSelected(e) {
        imageFile = e.target.files[0];
        fileName = imageFile.name;
    }

    function upload() {
        var formData = new FormData();
        formData.append("file", imageFile);
        axios.post("/upload", formData).then(function(res) {
            console.log(res.data.imageUrl);
            setImage(res.data.imageUrl);
        });
    }


    return (
        <div className="profile-uploader">
            <input type="file"  className="inputfile" onChange={imageSelected} />
            <label htmlFor="file">Upload image</label>
            <button className="upload-button" onClick={upload}>upload</button>
        </div>
    );
}


export default Uploader;
