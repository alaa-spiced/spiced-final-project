import React from 'react';

function ProfilePic ({image, first, last, gender, email, phoneNumber, clickHandler}) {
    return (
        <div className="profilepic-container">
            <img className="profile-profilepic" src={image} onClick={clickHandler} />
            <h1 className="user-name-profile">{first}{" "}{last}</h1>
            <h2 className="user-gender-profile">{gender}</h2>
            <h2 className="user-email-profile">{email}</h2>
            <h2 className="user-phone-profile">{phoneNumber}</h2>
        </div>
    );
}


export default ProfilePic;
