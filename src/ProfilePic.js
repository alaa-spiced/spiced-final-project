import React from 'react';

function ProfilePic ({image, first, last, gender, email, phoneNumber, clickHandler}) {
    return (
        <div className="profilepic-container">
            <img className="profile-profilepic" src={image} onClick={clickHandler} />
            <div className="user-information">
                <h1 className="user"> {first}{" "}{last}</h1>
                <h2 className="user"> {gender}</h2>
                <h2 className="user"> {email}</h2>
                <h2 className="user"> {phoneNumber}</h2>
            </div>
        </div>
    );
}


export default ProfilePic;
