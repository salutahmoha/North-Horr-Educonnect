import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import About from "./pages/About-section/About";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/HomePage/Home";
import SignIn from "./components/Forms/SignIn";
import SignUp from "./components/Forms/SignUp";

import "./App.css";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home  />} /> 
        <Route path="/About" element={<About />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
