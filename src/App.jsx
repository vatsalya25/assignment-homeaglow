import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ChatLayout from "./layouts/ChatLayout";
import Login from "./views/Login/Login";
import ChatList from "./views/ChatList/ChatList";
import Chat from "./views/Chat/Chat";
import AuthRoute from "./AuthRoute";
import verifyToken from "./utils/verifyToken";
import fetchUserInfo from "./utils/fetchUserInfo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const isValidToken = await verifyToken();
      if (isValidToken) {
        await fetchUserInfo();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/chats" /> : <Login />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/chats" /> : <Login />}
        </Route>

        {isLoggedIn ? (
          <AuthRoute path="/chats">
            <ChatLayout>
              <Switch>
                <Route exact path="/chats" component={ChatList} />
                <Route path="/chats/:customerId" component={Chat} />
              </Switch>
            </ChatLayout>
          </AuthRoute>
        ) : (
          <Redirect to="/login" />
        )}

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
