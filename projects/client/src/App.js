import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutClient from "./components/LayoutClient";
import LayoutAdmin from "./components/LayoutAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import Homepage from "./pages/Homepage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/greetings`);
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
