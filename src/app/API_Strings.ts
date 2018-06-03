// const API = 'http://localhost:4567/api/';
const API = 'https://foodandfriendsapp.herokuapp.com/api/';
export const login_endpoint = API + 'login';
export const logout_endpoint = API + 'logout';
export const register_endpoint = API + 'register';
export const events_endpoint = API + 'events';
export const put_event_endpoint = API + 'event/';
export const post_events_endpoint = API + 'event';
export const delete_events_endpoint = API + 'event/';
export const groups_endpoint = API + 'groups';
export const leave_group_endpoint = API + 'group/leave/';
export const post_new_group_endpoint = API + 'group';
export const put_group_endpoint = API + 'group/';
export const fetch_email = API + 'fetch_email';
export const friends_enpoint = API + 'friends';
export const friend_requests_enpoint = API + 'friendRequests';
export const delete_friend_requests_enpoint = API + 'friendRequest/reject/';
export const accept_friend_requests_enpoint = API + 'friendRequest/accept/';
export const create_friend_requests_enpoint = API + 'friendRequest/';
export const usernames_endpoint = API + 'usernames';
export const detailed_username_endpoint = API + 'user/';
export const delete_friend = API + 'friend/';
// export const WS_HOME = 'wss://localhost:4567/api/hello';
// export const WS_LOGIN = 'ws://localhost:4567/api/loginWS';
export const WS_LOGIN = 'wss://foodandfriendsapp.herokuapp.com/api/loginWS';
export const WS_HOME = 'wss://foodandfriendsapp.herokuapp.com/api/hello';
