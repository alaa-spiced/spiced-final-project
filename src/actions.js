import axios from './axios';

export async function receiveAdds() {
    const results  = await axios.get('/adds');
    console.log(results.data.addsImages);
    return {
        type                    :   'RECEIVE_ADDS',
        adds  :   results.data.addsImages
    };
}

export async function receiveUserInfo(userId) {
    const results  = await axios.post('/get-user-info',({userId : userId}));
    console.log("User Info" , results.data.userInfo);
    console.log("User Ads Images" , results.data.userAdsImages);
    return {
        type                    :   'RECEIVE_USER_INFO',
        userInfo  :   results.data.userInfo,
        userAdsImages   :   results.data.userAdsImages
    };
}

export function userIsLoggedIn(userId) {
    return {
        type                    :   'USER_IS_LOGGED_IN',
        loggedInUserId  :   userId
    };
}

export function userIsLoggedOut() {
    return {
        type                    :   'USER_IS_LOGGED_OUT',
        loggedInUserId  :   null
    };
}

export async function acceptFriendRequest(senderId) {
    const results = await axios.post('/update-friend',{senderId : senderId, status : 2});
    console.log("hellooooooo", results);
    return {
        type: 'ACCEPT_FRIEND',
        newFriend : results.data

    };
}

export async function endFriendship(senderId) {
    const results = await axios.post('/delete-friendship',{senderId : senderId});
    console.log("hellooooooo delete", results);
    return {
        type: 'END_FRIENDSHIP',
        deletedFriend : results.data

    };
}


export function pushOnlineUsersToRedux(onlineUsers) {
    return {
        type: 'PUSH_ONLINE_USERS_TO_REDUX',
        onlineUsers

    };
}
export function userJoined (user) {
    console.log('userjoined' , user);
    return {
        type:'USER_JOINED',
        user
    };
}

export function userLeft (user) {
    console.log('userLeft' , user);
    return {
        type:'USER_LEFT',
        user
    };
}
export function pushChatMessagesToRedux(chatMessages) {
    return {
        type: 'PUSH_CHAT_MESSAGES_TO_REDUX',
        chatMessages
    };
}
export function newMessageAction (chatMessage) {
    console.log('newMessage' , chatMessage);
    return {
        type:'NEW_MESSAGE',
        chatMessage
    };
}
