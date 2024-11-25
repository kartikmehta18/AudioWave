import { FloatingDock } from "./components/ui/floating-dock";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { MainPage } from "./pages/main/index";
import { SignIn } from "./pages/sign-in/index";
import { Room } from "./pages/room/index";
import { StreamCall } from "@stream-io/video-react-sdk";
import { useUser } from "./user-context";
import Navbar from "./Header";
import Home from "./Home";
import {
  IconBrandGithub,
  IconBrandX,
  IconUser,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";
function App() {
  const { call } = useUser();
  const links = [
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/kartik-mehta-6729b0255/",
    },
    {
      title: "Portfolio",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://bento.me/kartikmehta18",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/kartikmehta.png/",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/Kartikmehta_png",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/kartikmehta18",
    },
  ];
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/room"
            element={
              call ? (
                <StreamCall call={call}>
                  <Room />
                  {/* </StreamCall> : <Navigate to="/"/> */}
                </StreamCall>
              ) : (
                <Navigate to="/main" />
              )
            }
          />
        </Routes>
        <div className="flex items-center justify-center ">
          <FloatingDock
            mobileClassName="translate-y-20" // only for demo, remove for production
            items={links}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
