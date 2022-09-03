import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import IndexPage from "./Pages/IndexPage";
import ChatroomPage from "./Pages/ChatroomPage";
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token && !socket) {
      const newSocket = io(process.env.REACT_APP_API_URL, {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket()
  },[])
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={IndexPage} exact />
        <Route
          path="/login"
          render={() => <LoginPage setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" component={RegisterPage} exact />
        <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        <Route
          path="/chatroom/:id"
          render={() => <ChatroomPage socket={socket} />}
          exact
        />
          {/* <Route path="/" component={IndexPage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/chatroom/:id" component={ChatroomPage} exact /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
