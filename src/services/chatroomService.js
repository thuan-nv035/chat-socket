import { Axios } from "./Axios";

function getallchatroom(payload) {
    return Axios.get('/chatroom', payload);
}

function creatchatroom(payload) {
    return Axios.post('/chatroom/create', payload);
}

export const chatroomService = {
    creatchatroom,
    getallchatroom
};