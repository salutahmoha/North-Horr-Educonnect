import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";

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
      <Routes>`</Routes>
    </>
  );
}

export default App;
