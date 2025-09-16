import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { RoomPage } from './pages/RoomPage';

const AppRoutes: React.FC = () => {
  const { state } = useApp();

  return (
    <Routes>
      <Route 
        path="/" 
        element={state.currentRoom ? <RoomPage /> : <LandingPage />} 
      />
      <Route path="/room/:id" element={<RoomPage />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
