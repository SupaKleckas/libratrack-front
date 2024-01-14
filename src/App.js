import './index.css'
import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { tokenValid } from './utils/Auth'
import Home from './pages/Home';
import Library from './pages/Libraries';
import Section from './pages/Sections';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  const CheckAuth = ({ children }) => {
    if (!tokenValid()) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/libraries" element={
          <CheckAuth redirect="/">
            <Library />
          </CheckAuth>
        } />

        <Route path="/sections" element={
          <CheckAuth redirect="/">
            <Section />
          </CheckAuth>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
