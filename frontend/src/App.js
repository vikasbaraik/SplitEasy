import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GroupsPage from './pages/GroupsPage';
import FriendsPage from './pages/FriendsPage';
import ActivityPage from './pages/ActivityPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GroupsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
