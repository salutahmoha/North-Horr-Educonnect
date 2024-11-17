import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/HomePage/Home";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
