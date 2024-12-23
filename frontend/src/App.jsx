import React from 'react';
import Login from './components/Login'
import Signup from './components/Signup';
import Home from './components/Home'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import DetailStats from './components/DetailStats';
import Clients from './components/Clients';
import ViewClient from './components/ViewClient';
import Audience from './components/Audience';
import ViewAudience from './components/ViewAudience';
import Campaigns from './components/Campains';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailstats" element={<DetailStats />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/viewclient" element={<ViewClient />} />
            <Route path="/audience" element={<Audience />} />
            <Route path="/viewaudience" element={<ViewAudience />} />
            <Route path="/campaigns" element={<Campaigns />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  )
}

export default App;