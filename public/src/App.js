import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import ConnectionsComponent from "./components/ConnectionsComponent";
import NotConnected from "./components/NotConnected";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<SearchBar />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/connections/connection" element={<ConnectionsComponent />} />
        <Route path="/connections/addfriend" element={<NotConnected />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}