import React from 'react';
import axios from './axios';

function Uploader(){
    var fileName, imageFile;

    function imageSelected(e) {
        imageFile = e.target.files[0];
        fileName = imageFile.name;
    }

    function upload() {
        var formData = new FormData();
        formData.append("file", imageFile);
        axios.post("/upload", formData).then(function(res) {
            console.log(res.data);
            this.props.setImage(res.data.imageUrl);
        });
    }


    return (
        <div >
            <label className="file-field">select image</label> {fileName}
            <input type="file"  id="file-field" onChange={imageSelected} />
            <button className="upload-button" onClick={upload}>upload!</button>
        </div>
    );
}


export default Uploader;
