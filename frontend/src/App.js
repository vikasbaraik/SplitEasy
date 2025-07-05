import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GroupsPage from './pages/GroupsPage';
import FriendsPage from './pages/FriendsPage';
import ActivityPage from './pages/ActivityPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedTestPage from './pages/ProtectedTestPage';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GroupsPage />} />
        <Route path="/groups" element={<PrivateRoute><GroupsPage /></PrivateRoute>} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/protected" element={<PrivateRoute><ProtectedTestPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
