const express = require('express');
const app = express();
const server = require('http').Server(app);
const nodeMailer = require('nodemailer');
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const s3 = require("./s3");
const config = require('./config');
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const csurf = require('csurf');
const bcrypt = require('./db/bcrypt');
const cookieSession = require("cookie-session");
const db = require("./db/db");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
const compression = require('compression');
const secrets = require('./secrets');

app.use(compression());


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static(__dirname + '/public'));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

function checkLogin(req, res, next) {
    !req.session.isLoggedIn
        ? res.redirect('/welcome')
        : next();
}

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {

    if (req.file) {
        var imageUrl = config.s3UrlStart + req.file.filename;
        db.addImage(req.session.userId , req.file.filename).then(()=>{
        }).then(()=>{
            db.updateUserProfilePic(req.session.userId , imageUrl ).then(()=>{
                res.json({
                    imageUrl : imageUrl,
                    success: true });
            });
        });


    } else {
        res.json({ success: false });
    }

});

app.post("/upload-add-images", uploader.single("file"),s3.upload, function(req, res) {
    if (req.file) {
        var imageUrl = config.s3UrlStart + req.file.filename;

        db.addAddImages(req.session.createdAddInfo.id , imageUrl ).then((results)=>{
            res.json({
                imageUrl : imageUrl,
                imageId : results.id,
                success: true });

        });


    } else {
        res.json({ success: false });
    }

});

app.post('/registration', (req , res)=>{
    if (req.body.firstname == "" || req.body.lastname == "" || req.body.email == "" || req.body.password == "") {
        res.json({
            "success" : false,
            "message" : "Please Fill in the whole fields"
        });
    }else {
        db.checkEmail(req.body.email).then((results)=>{
            if (results.length == 0) {
                bcrypt.hashPassword(req.body.password).then((hashedPassword)=>{
                    db.createUser(req.body.firstname, req.body.lastname, req.body.email, hashedPassword,req.body.gender, req.body.phonenumber,req.body.profile_pic_url,req.body.bio).then((results)=>{
                        req.session.isLoggedIn = true;
                        console.log(results);
                        req.session.userId = results.id;
                        res.json({
                            success : true,
                            message : "User created successfully"
                        });
                    });
                }).catch(err=>{
                    console.log(err);
                });
            }else {
                req.session.loggedIn = false;
                res.json({
                    success : false,
                    message : "Duplicate Email found, Please use another email address"
                });
            }
        });
    }
});

app.post('/login' , (req , res) => {
    var userInfo;
    if (req.body.email == "" || req.body.password == "") {
        res.json({
            "success" : false,
            userId : req.session.userId,
            isLoggedIn : false,
            "message" : "Please Fill in the whole fields"
        });
    }else {
        db.checkEmail(req.body.email).then((results)=>{
            if (results.length == 0) {
                res.json({
                    "success" : false,
                    userId : req.session.userId,
                    isLoggedIn : false,
                    "message" : "E-Mail does not exist, Please try again"
                });
            }else {
                userInfo = results[0];
                const hashedPwd = userInfo.hashed_password;
                bcrypt.checkPassword(req.body.password,hashedPwd).then((checked)=>{
                    if (checked) {
                        req.session.isLoggedIn = true;
                        req.session.userId = userInfo.id;
                        res.json({
                            success : true,
                            userId : req.session.userId,
                            isLoggedIn : req.session.isLoggedIn,
                            message : "User Logged in successfully"
                        });
                    }else {
                        res.json({
                            success : false,
                            userId : req.session.userId,
                            isLoggedIn : false,
                            message : "Password does not match, Please try again"
                        });
                    }
                });
            }
        });
    }
});

let userAdsImagesArray = [];
app.post('/get-user-info', (req , res) => {
    console.log(req.body.userId);
    let userInfo;
    let adds = [];
    db.getUserInfoById(req.session.userId).then((results)=>{
        console.log(results);
        userInfo = results;
        db.getAllUserAds(req.body.userId).then((userAdsArray)=>{
            adds =userAdsArray;
            for (let i = 0; i < userAdsArray.length; i++) {
                db.getAddImages(userAdsArray[i].id).then((results)=>{
                    adds[i].images= results;
                    userAdsImagesArray.push(adds[i]);
                    // console.log('user Ads Images Array ',userAdsImagesArray);
                });
            }
            setTimeout(function() {
                console.log('user Ads Images Array ',userAdsImagesArray);
                let userAdsImages=[];
                for (var i = 0; i < userAdsImagesArray.length; i++) {
                    userAdsImages.push(userAdsImagesArray[i]);
                }
                userAdsImagesArray =[];
                console.log(userAdsImages);
                console.log(userInfo);
                res.json({
                    userAdsImages,
                    userInfo
                });
            },500);


        });
    });
});



app.get('/welcome', (req , res) => {
    req.session.isLoggedIn
        ? res.redirect('/')
        : res.sendFile(`${__dirname}/index.html`);
});

app.post('/create-add', (req , res) => {
    if (req.session.isLoggedIn) {
        db.createAdd(req.session.userId,req.body.title,req.body.classValue,req.body.categoryValue,req.body.postalcode,req.body.city,req.body.country,req.body.description).then((add)=>{
            req.session.createdAddInfo = add;
            console.log(req.session.createdAddInfo);
            res.json({
                ...add
            });
        });
    }

});

app.post('/update-user-info', (req ,res)=>{
    var hashedPassword;
    console.log(req.body);
    if (req.body.password) {
        bcrypt.hashPassword(req.body.password).then((results)=>{
            hashedPassword = results;
        });
    }
    db.updateUserInfo(req.body.firstname || req.body.info.first_name ,
        req.body.lastname || req.body.info.last_name ,
        req.body.gender || req.body.info.gender,
        req.body.phonenumber || req.body.info.phone_number,
        req.body.email || req.body.info.email,
        hashedPassword || req.body.info.hashed_password,
        req.session.userId ).then((results)=>{
        console.log(results);
        res.json({
            ...results
        });
    });

});


// app.get('/user/:id.json', (req , res)=> {
//     if (req.session.userId == req.params.id) {
//         console.log('redirecting user');
//         res.json({
//             redirect: '/'
//         });
//     } else {
//         db.getUserInfoById(req.params.id).then((results)=>{
//             console.log("getting user info");
//             res.json({
//                 ...results
//             });
//         }).catch(()=>{
//             res.sendStatus(500);
//         });
//     }
// });
//
// app.post('/user-bio', checkLogin, (req , res)=>{
//     console.log(req.body.bioText);
//     console.log(req.session.userId);
//     db.updateUserBio(req.session.userId, req.body.bioText).then((results)=>{
//         res.json({
//             bioText : results.bio,
//             success : true,
//             message : "User created successfully"
//         });
//     }).catch(err=>{
//         console.log(err);
//     });
//
// });
//

//
// app.get('/user-friendship/:id.json', (req , res)=> {
//     console.log(req.params.id, req.session.userId);
//     db.getFriendshipStatus(req.params.id, req.session.userId).then((results)=>{
//         if (results.length == 0) {
//             results = {id : null,
//                 loggedInUserId: req.session.userId};
//             res.json({
//                 ...results
//             });
//         }else {
//             results = results[0];
//             results.loggedInUserId = req.session.userId;
//             res.json({
//                 ...results
//             });
//
//         }
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
//
// });
//
// app.post('/accept-request', (req , res) => {
//     db.addFriend(req.body.senderId, req.body.receiverId, req.body.status).then((results)=>{
//         console.log(results);
//         res.json({
//             ...results
//         });
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
// });

// app.post('/accept-friend-request', (req , res) =>{
//     console.log(req.body);
// });

//
// app.post('/add-friend', (req , res) => {
//     db.addFriend(req.body.senderId, req.body.receiverId, req.body.status).then((results)=>{
//         console.log(results);
//         res.json({
//             ...results
//         });
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
// });
//
// app.post('/update-friend', (req , res) => {
//     db.setFriendshipStatus(req.body.senderId, req.body.receiverId || req.session.userId, req.body.status).then((results)=>{
//         res.json({
//             ...results
//         });
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
// });
//
// app.post('/delete-friendship', (req , res) => {
//     db.deleteFriendship(req.body.senderId, req.body.receiverId || req.session.userId).then((results)=>{
//         res.json({
//             ...results
//         });
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
// });
//
// app.get('/friends-wannabes', (req , res) => {
//     db.getFriendsAndWannabes(req.session.userId).then((userFriendsAndWannabes)=>{
//         console.log(userFriendsAndWannabes);
//         res.json({
//             userFriendsAndWannabes
//         });
//
//     }).catch(()=>{
//         res.sendStatus(500);
//     });
// });
//
app.get('/delete-account', checkLogin, (req, res) =>{
    var userImages = [];
    db.getUserImages(req.session.userId).then((results)=>{
        console.log(results);

        if (results.length != 0) {
            for (var i = 0; i < results.length; i++) {
                userImages.push(results[i].image_urls);
            }
            console.log(userImages);
            s3.deleteUserImagesS3(userImages);
            db.deleteUserImagesDb(req.session.userId).then(()=>{
            });
        }
    }).then(()=>{
        db.deleteUserFriendships(req.session.userId).then(()=>{
            db.deleteUser(req.session.userId).then(()=>{
                console.log("The account is deleted successfully");
                req.session.userId = null;
                req.session.isLoggedIn = false;
                res.json({
                    success : true,
                    message : 'Your account has been deleted successfully'
                });
            });
        });
    });


});

// app.post('/other-user-friends', (req , res)=>{
//     console.log(req.body.ouId);
//     db.getOtherUserFriends(req.body.ouId).then((otherUserFriends)=>{
//         console.log(otherUserFriends);
//         res.json({
//             otherUserFriends
//         });
//     });
// });


app.post("/contact-us", (req, res) => {
    console.log(req.body);
    const output = `
       <p>New message from mcse.alaa@gmail.com received!</p>
       <h3>ContactDetails</h3>
       <ul>
           <li>FullName: ${req.body.firstname} ${req.body.lastname}</li>
           <li>Emailadresse: ${req.body.email}</li>
           <li>TelephoneNumber: ${req.body.phone_number}</li>
       </ul>
       <h3>Message</h3>
       <p>${req.body.message}</p>`;

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: secrets.user,
            pass: secrets.pass
        }
    });

    let mailOptions = {
        from: '"free your stuff" <mcse.alaa@gmail.com>',
        to: "mcse.alaa@gmail.com",
        subject: "Hello :heavy_check_mark:",
        text: "Hello world?",
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

        res.render("contact", { message: "Your Email sent successfully!" });
    });
});




let addsImagesArray = [];
app.get('/adds', (req , res)=>{
    let adds =[];
    db.getAllAdds().then((addsArray)=>{
        adds =addsArray;
        for (let i = 0; i < addsArray.length; i++) {
            db.getAddImages(addsArray[i].id).then((results)=>{
                adds[i].images= results;
                addsImagesArray.push(adds[i]);
            });
        }

        let addsImages=[];
        for (var i = 0; i < addsImagesArray.length; i++) {
            addsImages.push(addsImagesArray[i]);
        }
        addsImagesArray =[];
        console.log(addsImages);
        res.json({
            addsImages
        });
    });
});




app.get('/logout', checkLogin, (req, res) =>{
    req.session.isLoggedIn = false;
    req.session.userId = null;
    res.sendFile(`${__dirname}/index.html`);

});

app.get('*', checkLogin, (req, res) =>
    res.sendFile(`${__dirname}/index.html`)
);

let onlineUsers = {};
let chatMessages = [];

io.on('connection', function(socket) {

    onlineUsers[socket.id]= socket.request.session.userId;
    db.getUsersInfosByIds(Object.values(onlineUsers)).then(users => {
        console.log("online users are : ", users);
        socket.emit("onlineUsers", users);
    });

    socket.emit("chatMessages", chatMessages.slice(-10,));

    if ( Object.values(onlineUsers).filter(id => id == socket.request.session.userId).length == 1 ) {
        db.getUserInfoById(socket.request.session.userId).then(
            results => {
                socket.broadcast.emit("userJoined", results);
            }).catch(error => {
            console.log(error);
        });
    }

    socket.on('disconnect', function() {

        if ( Object.values(onlineUsers).filter( id => id == socket.request.session.userId ).length == 1 ) {
            db.getUserInfoById(socket.request.session.userId).then(
                results => {
                    socket.broadcast.emit("userLeft", results);
                }).catch(error => {
                console.log(error);
            });

        }
        delete onlineUsers[socket.id];

    });

    socket.on('newMessage', function (newMessage) {
        db.getUserInfoById(socket.request.session.userId).then(
            data => {
                let completNewMessage = {
                    firstName: data.first_name,
                    lastName : data.last_name,
                    profilePic: data.image_url,
                    userId: socket.request.session.userId,
                    content: newMessage,
                    date: new Date()
                };

                chatMessages = [...chatMessages, completNewMessage];
                io.sockets.emit('newMessageBack', completNewMessage);

            }).catch(error => {
            console.log(error);
        });
    });
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
