import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/index";
import { SignIn } from "./pages/sign-in/index";
import { Room } from "./pages/room/index";
import { StreamCall } from "@stream-io/video-react-sdk";
import { useUser } from "./user-context";
function App() {
  const {call} = useUser();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/room"
            element={
              call ?
              <StreamCall call={call}>
                <Room />
              </StreamCall> : <Navigate to="/"/>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
