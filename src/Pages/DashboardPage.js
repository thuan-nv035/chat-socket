import React, { useEffect, useState } from "react";
import { chatroomService } from "../services/chatroomService";
import { Link } from "react-router-dom";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  
  const [name, setName] = useState('')

  const getChatRoom = async () => {
    try {
      const response = await chatroomService.getallchatroom();
      setChatrooms(response.data)
    } catch (e) {
      console.log(e);
    }
  };

  const createChatroom = async () => {
    try {
      const response = await chatroomService.creatchatroom({
        name: name,
      }) 
      getChatRoom()
      setName('')
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getChatRoom()
  },[])
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms?.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage