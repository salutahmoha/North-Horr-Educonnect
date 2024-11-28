import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import About from "./pages/About-section/About";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/HomePage/Home";
import SignIn from "./components/Forms/SignIn";
import SignUp from "./components/Forms/SignUp";
import Write from "./pages/Write/Write";
import EduNavbar from "./pages/EduNavbar/EduNavbar";
import FullReport from "./pages/FullReport/FullReport";
import Reports from "./pages/Reports/Reports";
import Comments from "./components/Previews/Comments";
import Profile from "./pages/Profile/Profile";

import "./App.css";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/Write" && location.pathname !== "/Profile" && (
        <Navbar />
      )}{" "}
      {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/EduNavbar" element={<EduNavbar />} />
        <Route path="/reports/:id" element={<FullReport />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
