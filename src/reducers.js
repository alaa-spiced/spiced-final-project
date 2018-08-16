export default function(state = {}, action) {
    if (action.type == 'RECEIVE_ADDS') {
        state = {
            ...state,
            adds: action.adds
        };
    }

    if (action.type == 'RECEIVE_USER_INFO') {
        state = {
            ...state,
            userInfo: action.userInfo,
            userAdsImages : action.userAdsImages
        };
    }

    if (action.type == 'USER_IS_LOGGED_IN') {
        state = {
            ...state,
            loggedInUserId: action.loggedInUserId
        };
    }

    if (action.type == 'USER_IS_LOGGED_OUT') {
        state = {
            ...state,
            loggedInUserId: action.loggedInUserId
        };
    }


    if (action.type == 'ACCEPT_FRIEND') {
        state = {
            ...state,
            userFriendsAndWannabes: state.userFriendsAndWannabes.map(user => {
                if (user.id == action.newFriend.sender_id) {
                    return {
                        ...user,
                        status : 2
                    };
                }else {
                    return user;
                }
            })

        };
    }

    if (action.type == 'END_FRIENDSHIP') {
        state = {
            ...state,
            userFriendsAndWannabes: state.userFriendsAndWannabes.map(user => {
                if (user.id == action.deletedFriend.sender_id || user.id == action.deletedFriend.receiver_id) {
                    return {
                        ...user,
                        status : 0
                    };
                }else {
                    return user;
                }
            })

        };
    }

    if (action.type == 'RECEIVE_OTHER_USER_FRIENDS') {
        state = {
            ...state,
            otherUserFriends: action.otherUserFriends
        };
    }

    if (action.type == 'PUSH_ONLINE_USERS_TO_REDUX') {
        console.log("pushOnlineUsersToRedux", action.onlineUsers);
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == 'USER_JOINED') {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.user]
        };
    }

    if (action.type == 'USER_LEFT') {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.user.id
            )
        };
    }

    if (action.type == 'PUSH_CHAT_MESSAGES_TO_REDUX') {
        console.log("pushChatMessagesToRedux", action.chatMessages);
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == 'NEW_MESSAGE') {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage]
        };
    }

    return state;
}
