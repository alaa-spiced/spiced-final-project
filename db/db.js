const spicedPg = require("spiced-pg");
let db; //connecting to heroku or localhost
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
}else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/free_your_stuff");
}

exports.createUser = function(firstName, lastName, email, password,gender,phoneNumber,bio) {
    const query =
    "INSERT INTO users (first_name, last_name,email,hashed_password,gender,phone_number,bio) VALUES ($1, $2 ,$3, $4, $5, $6, $7) RETURNING *";

    const params = [firstName, lastName, email, password,gender,phoneNumber,bio];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.checkEmail = function(email) {
    const q = "SELECT * FROM users WHERE email = $1;";
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getUserInfoById = function(userId) {
    const q = "SELECT * FROM users WHERE id = $1;";
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};


exports.updateUserProfilePic = function(userId , imageUrl) {
    const q =
    "UPDATE users SET profile_pic_url = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , imageUrl];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

// exports.updateUserBio = function(userId, bio) {
//     const q =
//     "UPDATE users SET bio = ($2) WHERE id = ($1) RETURNING *;";
//
//     const params = [userId , bio];
//     return db.query(q, params).then(results => {
//         return results.rows[0];
//     });
// };
//
// exports.getFriendshipStatusById = function(userId) {
//     const q = "SELECT * FROM friendships WHERE (receiver_id = $1);";
//     const params = [userId];
//     return db.query(q, params).then(results => {
//         return results.rows;
//     });
// };
//
// exports.getFriendshipStatus = function(senderId, receiverId) {
//     const q = "SELECT * FROM friendships WHERE ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1));";
//     const params = [senderId, receiverId];
//     return db.query(q, params).then(results => {
//         return results.rows;
//     });
// };
//
// exports.setFriendshipStatus = function(senderId, receiverId , status) {
//     const q = "UPDATE friendships SET status = $3 WHERE (sender_id = $1 AND receiver_id = $2) RETURNING *;";
//     const params = [senderId, receiverId, status];
//     return db.query(q, params).then(results => {
//         return results.rows[0];
//     });
// };
//
// exports.deleteFriendship = function(senderId, receiverId) {
//     const q = "DELETE FROM friendships where ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) RETURNING *;";
//     const params = [senderId, receiverId];
//     return db.query(q, params).then(results => {
//         return results.rows[0];
//     });
// };
//
// exports.addFriend = function(senderId, receiverId , status) {
//     const q = "INSERT INTO friendships (sender_id,receiver_id,status) VALUES ($1, $2, $3) RETURNING *;";
//     const params = [senderId, receiverId, status];
//     return db.query(q, params).then(results => {
//         return results.rows[0];
//     });
// };
//
//
// exports.getFriendsAndWannabes = function(userId) {
//     const q = `
//            SELECT users.id, first_name, last_name, image_url, status
//            FROM friendships
//            JOIN users
//            ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
//            OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
//            OR (status = 2 AND sender_id = $1 AND receiver_id = users.id);
//        `;
//     const params = [userId];
//     return db.query(q, params).then(results => {
//         return results.rows;
//     });
// };
//
exports.getUsersInfosByIds = function(arrayOfIds) {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds])
        .then(results => {
            console.log(results.rows);
            return results.rows;
        });
};
//
// exports.deleteUserFriendships = function(userId) {
//     const query = `DELETE FROM friendships WHERE (sender_id =($1) OR receiver_id = ($1))`;
//     return db.query(query, [userId])
//         .then(results => {
//             return results.rows[0];
//         });
// };
//
// exports.getUserImages = function(userId) {
//     const query = `SELECT image_urls FROM images WHERE user_id =($1);`;
//     return db.query(query, [userId])
//         .then(results => {
//             return results.rows;
//         });
// };
//
// exports.deleteUserImagesDb = function(userId) {
//     const query = `DELETE FROM images WHERE user_id =($1);`;
//     return db.query(query, [userId])
//         .then(results => {
//             return results.rows;
//         });
// };
//
exports.addImage = function(userId, imageName) {
    const q = "INSERT INTO profile_images (user_id,image_urls) VALUES ($1, $2);";
    const params = [userId, imageName];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};
//
// exports.deleteUser = function(userId) {
//     const query = `DELETE FROM users WHERE id =($1);`;
//     return db.query(query, [userId])
//         .then(results => {
//             return results.rows;
//         });
// };
//
//
// exports.getOtherUserFriends = function(userId) {
//     const q = `
//            SELECT users.id, first_name, last_name, image_url, status
//            FROM friendships
//            JOIN users
//            ON (status = 2 AND receiver_id = $1 AND sender_id = users.id)
//            OR (status = 2 AND sender_id = $1 AND receiver_id = users.id);
//        `;
//     const params = [userId];
//     return db.query(q, params).then(results => {
//         return results.rows;
//     });
// };

exports.updateUserInfo = function (firstName,lastName,gender,phoneNumber,email,password,userId) {
    const q =
  "UPDATE users SET first_name = ($1), last_name = ($2), gender = ($3), phone_number = ($4), email = ($5), hashed_password = ($6) WHERE id = ($7) RETURNING *;";

    const params = [firstName,lastName,gender,phoneNumber,email,password,userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getAllAdds = function() {
    const q = `
           SELECT * from adds ORDER BY created_at ASC;
       `;
    return db.query(q).then(results => {
        return results.rows;
    });
};

exports.getAddImages = function(addId) {
    const q = `
         SELECT id,image_urls from images where adds_id = $1;
     `;
    const params = [addId];
    return db.query(q,params).then(results => {
        return results.rows;
    });
};

exports.getAllUserAds = function(userId) {
    const q = `
           SELECT * from adds where user_id=($1);
       `;
    const params = [userId];
    return db.query(q , params).then(results => {
        return results.rows;
    });
};

exports.createAdd = function(userId, title, clas, category,postalCode,city,country,description) {
    const query =
    "INSERT INTO adds (user_id, title, class, category,post_code,city,country,description) VALUES ($1, $2 ,$3, $4, $5, $6, $7, $8) RETURNING *";

    const params = [userId, title, clas, category,postalCode,city,country,description];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.addAddImages = function(addId, imageUrl) {
    const q = "INSERT INTO images (adds_id,image_urls) VALUES ($1, $2) RETURNING *;";
    const params = [addId, imageUrl];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};
